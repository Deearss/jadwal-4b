import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";
import { SESI_A, SESI_B } from "../../src/lib/schedule.js";
import type { ClassRow } from "../../src/lib/schedule.js";

// Konversi UTC ke WIB (UTC+7)
function getWIBNow() {
  const now = new Date();
  const wibMs = now.getTime() + 7 * 60 * 60 * 1000;
  const wib = new Date(wibMs);

  const hh = String(wib.getUTCHours()).padStart(2, "0");
  const mm = String(wib.getUTCMinutes()).padStart(2, "0");
  const dateStr = wib.toISOString().split("T")[0]; // YYYY-MM-DD

  return { timeStr: `${hh}:${mm}`, dateStr };
}

function buildEmail(row: ClassRow, sesiLabel: string, email: string): string {
  const unsubUrl = `https://jadwal4b.netlify.app/api/unsubscribe?email=${encodeURIComponent(email)}`;
  const start = row.start.replace(":", ".");
  const end = row.end.replace(":", ".");

  return `<!DOCTYPE html>
<html lang="id">
<body style="margin:0;padding:0;background:#1a1917;font-family:Inter,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#252420;border:1px solid #3a3830;border-radius:8px;overflow:hidden;">
    <div style="height:3px;background:#d4845a;"></div>
    <div style="padding:32px;">
      <div style="font-size:10px;color:#a09880;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:10px;">
        Jadwal Kuliah · Kelas 4B · ${sesiLabel}
      </div>
      <h2 style="margin:0 0 24px;font-size:18px;color:#e8e0d0;font-weight:700;">
        🔔 ${row.subject} dimulai sekarang
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="border-bottom:1px solid #3a3830;">
          <td style="padding:10px 0;color:#a09880;width:110px;">Mata Kuliah</td>
          <td style="padding:10px 0;color:#e8e0d0;font-weight:600;">${row.subject}</td>
        </tr>
        <tr style="border-bottom:1px solid #3a3830;">
          <td style="padding:10px 0;color:#a09880;">Kode</td>
          <td style="padding:10px 0;color:#a09880;">${row.abbreviation}</td>
        </tr>
        <tr style="border-bottom:1px solid #3a3830;">
          <td style="padding:10px 0;color:#a09880;">Waktu</td>
          <td style="padding:10px 0;color:#d4845a;font-weight:600;">${start} – ${end} WIB</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#a09880;">Dosen</td>
          <td style="padding:10px 0;color:#e8e0d0;">${row.lecturer}</td>
        </tr>
      </table>
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #3a3830;">
        <a href="https://jadwal4b.netlify.app" style="font-size:12px;color:#d4845a;text-decoration:none;">
          Lihat jadwal lengkap →
        </a>
      </div>
      <div style="margin-top:16px;font-size:11px;color:#5a5040;">
        Email ini dikirim karena kamu subscribe notifikasi Jadwal4B. &nbsp;
        <a href="${unsubUrl}" style="color:#5a5040;">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Jadwal4B",
        email: process.env.VERIFIED_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });
  return res.ok;
}

export default async function handler() {
  const { timeStr, dateStr } = getWIBNow();

  // Tentukan sesi aktif hari ini
  const activeSesi =
    SESI_A.dates.includes(dateStr)
      ? SESI_A
      : SESI_B.dates.includes(dateStr)
        ? SESI_B
        : null;

  if (!activeSesi) return; // Bukan hari kuliah

  // Cari matkul yang mulai tepat sekarang
  const activeRow = activeSesi.rows.find(
    (row) => row.type === "class" && row.start === timeStr
  );
  if (!activeRow || activeRow.type !== "class") return;

  const store = getStore("jadwal4b");

  // Cegah pengiriman duplikat
  const sentKey = `sent-${dateStr}-${timeStr}`;
  const alreadySent = await store.get(sentKey);
  if (alreadySent) return;
  await store.set(sentKey, "done");

  // Ambil daftar subscriber
  const subscribers = (await store.get("subscribers", { type: "json" })) as string[] | null;
  if (!subscribers || subscribers.length === 0) return;

  const subject = `🔔 ${activeRow.subject} dimulai sekarang`;

  await Promise.all(
    subscribers.map((email) =>
      sendEmail(email, subject, buildEmail(activeRow as ClassRow, activeSesi.label, email))
    )
  );
}

export const config: Config = {
  schedule: "* * * * *",
};
