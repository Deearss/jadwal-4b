import { Utensils } from "lucide-react";
import clsx from "clsx";
import { SesiData, ScheduleRow } from "@/lib/schedule";

interface SesiSectionProps {
  data: SesiData;
  isDimmed: boolean;
  isRowActive: (start: string, end: string) => boolean;
}

const colorMap = {
  A: {
    badge: "text-teal border-[var(--teal-mid)] bg-[var(--teal-dim)]",
    dateChip:
      "bg-[var(--teal-dim)] border border-[var(--teal-mid)] text-teal opacity-80",
    time: "text-teal",
    ruangTag: "bg-[var(--teal-dim)] border border-[var(--teal-mid)] text-teal",
  },
  B: {
    badge: "text-blue border-[var(--blue-mid)] bg-[var(--blue-dim)]",
    dateChip:
      "bg-[var(--blue-dim)] border border-[var(--blue-mid)] text-blue opacity-80",
    time: "text-blue",
    ruangTag: "bg-[var(--blue-dim)] border border-[var(--blue-mid)] text-blue",
  },
};

// Baris individual dalam tabel — menangani baris kelas reguler dan baris ISHOMA
function ScheduleRowItem({
  row,
  sesiId,
  isRowActive,
}: {
  row: ScheduleRow;
  sesiId: "A" | "B";
  isRowActive: (start: string, end: string) => boolean;
}) {
  const colors = colorMap[sesiId];

  if (row.type === "ishoma") {
    return (
      <tr className="bg-border text-center">
        <td colSpan={4} className="px-3 h-16">
          <span className="relative text-[0.7rem] tracking-widest text-muted uppercase font-bold">
            <Utensils
              size={14}
              className="mr-1.5 inline-flex relative -top-[0.5px]"
            />
            {row.label}
          </span>
        </td>
      </tr>
    );
  }

  const active = isRowActive(row.start, row.end);

  return (
    <tr
      className={`border-b border-border last:border-b-0 transition-colors hover:bg-black/25 ${active ? "tr-active" : ""}`}
    >
      <td
        className={clsx(
          "xl:w-43.75",
          "lg:w-43.75",
          `td-time py-[0.7rem] px-3 text-[0.7rem] font-semibold whitespace-nowrap ${colors.time}`,
        )}
      >
        {row.start.replace(":", ".")}&nbsp;–&nbsp;{row.end.replace(":", ".")}
      </td>
      <td className="td-mapel py-[0.7rem] px-3 text-[0.82rem] font-semibold text-prose align-middle">
        {row.subject}
        <span className="block text-[0.5rem] font-medium tracking-[0.08em] uppercase text-muted mt-0.5">
          {row.abbreviation}
        </span>
      </td>
      <td className="td-dosen py-[0.7rem] px-3 text-[0.7rem] font-normal text-muted w-67.5 align-middle">
        {row.lecturer}
      </td>
      <td className="td-ruang py-[0.7rem] px-3 text-center w-23.75 align-middle">
        <span
          className={`ruang-tag inline-flex items-center justify-center text-[0.58rem] font-semibold tracking-[0.05em] py-[0.2rem] px-[0.55rem] rounded-sm ${colors.ruangTag}`}
        >
          4B
        </span>
      </td>
    </tr>
  );
}

// Section satu sesi jadwal (A atau B) — header info sesi dan tabel jadwal
export default function SesiSection({
  data,
  isDimmed,
  isRowActive,
}: SesiSectionProps) {
  const colors = colorMap[data.id];

  return (
    <div
      className={clsx(
        `px-3 overflow-hidden border-2 border-dashed border-border rounded-lg m-6 transition-opacity duration-400 ${isDimmed ? "sesi-dim" : ""}`,
        `lg:px-[1.8rem]`,
      )}
    >
      {/* Header sesi — badge, label, dan chip tanggal pertemuan */}
      <div
        className={clsx(
          "xl:flex-row xl:items-center",
          "lg:flex-row lg:items-center",
          "flex flex-col items-center gap-2 py-[1.1rem] pb-[0.8rem]",
        )}
      >
        {/* Badge sesi + label hari — stacked di mobile, sebaris di laptop/desktop */}
        <div
          className={clsx(
            "xl:flex-row xl:items-center",
            "lg:flex-row lg:items-center",
            "flex flex-col items-center gap-1.5",
          )}
        >
          <span
            className={`inline-flex items-center mb-2 lg:mb-0 gap-1.5 text-[0.58rem] font-semibold tracking-widest uppercase py-[0.22rem] px-[0.65rem] rounded-sm border ${colors.badge}`}
          >
            <span className="w-1.25 h-1.25 rounded-full bg-current" />
            Sesi {data.id}
          </span>

          <span className="text-[1rem] lg:text-[0.82rem] font-semibold text-prose">
            {data.label}
          </span>
        </div>

        {/* Chip tanggal pertemuan */}
        <div
          className={clsx(
            "xl:ml-auto xl:justify-end",
            "lg:ml-auto lg:justify-end",
            "flex gap-1 flex-wrap",
          )}
        >
          {data.displayDates.map((d) => (
            <span
              key={d}
              className={`text-[0.6rem] font-medium py-0.5 px-1.5 rounded-sm ${colors.dateChip}`}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Hint scroll — hanya muncul di mobile */}
      <p className="lg:hidden text-[0.5rem] text-muted/50 tracking-widest uppercase mb-2 text-center">
        ← geser untuk info lengkap →
      </p>

      {/* Tabel jadwal — scroll horizontal di mobile */}
      <div className="overflow-x-auto -mx-[1.8rem] px-[1.8rem]">
        <table
          className={clsx(
            "xl:w-full",
            "lg:w-full",
            "w-max border-collapse mb-1.5",
          )}
        >
          <thead>
            <tr>
              <th className="text-[0.55rem] font-semibold tracking-widest uppercase text-muted py-2 px-3 border-b border-border text-left">
                Waktu
              </th>
              <th className="text-[0.55rem] font-semibold tracking-widest uppercase text-muted py-2 px-3 border-b border-border text-left">
                Mata Kuliah
              </th>
              <th className="text-[0.55rem] font-semibold tracking-widest uppercase text-muted py-2 px-3 border-b border-border text-left">
                Dosen
              </th>
              <th className="text-[0.55rem] font-semibold tracking-widest uppercase text-muted py-2 px-3 border-b border-border text-center">
                Ruang
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <ScheduleRowItem
                key={i}
                row={row}
                sesiId={data.id}
                isRowActive={isRowActive}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
