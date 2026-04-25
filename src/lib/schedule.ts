export interface ClassRow {
  type: "class";
  start: string; // "07:20"
  end: string; // "08:50"
  subject: string;
  abbreviation: string;
  lecturer: string;
}

export interface IshomaSpacer {
  type: "ishoma";
  label: string;
}

export type ScheduleRow = ClassRow | IshomaSpacer;

export interface SesiData {
  id: "A" | "B";
  label: string;
  dates: string[]; // ISO — untuk logika JS ("2026-03-07")
  displayDates: string[]; // Display — untuk UI ("07 Mar")
  rows: ScheduleRow[];
}

export const SESI_A: SesiData = {
  id: "A",
  label: "Sabtu Ganjil",
  dates: ["2026-03-07", "2026-04-11", "2026-05-09", "2026-06-06"],
  displayDates: ["07 Mar", "11 Apr", "09 Mei", "06 Jun"],
  rows: [
    {
      type: "class",
      start: "07:20",
      end: "08:50",
      subject: "Cloud Computing",
      abbreviation: "CLOUD",
      lecturer: "Herry AC, M.Kom",
    },
    {
      type: "class",
      start: "09:00",
      end: "10:30",
      subject: "Sosial Budaya",
      abbreviation: "SOSBUD",
      lecturer: "Nina Muidah, M.Pd., M.Kom",
    },
    {
      type: "class",
      start: "10:40",
      end: "12:10",
      subject: "Kecerdasan Buatan",
      abbreviation: "CERDAS / AI",
      lecturer: "Mayang Sari, M.Kom",
    },
    { type: "ishoma", label: "ISHOMA — (12.10 - 13.00)" },
    {
      type: "class",
      start: "13:00",
      end: "14:30",
      subject: "Sistem Informasi Geografis",
      abbreviation: "S.I. GEOGRAFIS",
      lecturer: "Hidayatul Rahman, M.Kom",
    },
    {
      type: "class",
      start: "14:40",
      end: "16:10",
      subject: "Data Mining",
      abbreviation: "DT MINING",
      lecturer: "Dian Agustini, M.Kom",
    },
    {
      type: "class",
      start: "16:20",
      end: "17:50",
      subject: "Komputasi Paralel",
      abbreviation: "PARALEL",
      lecturer: "Lilis Anggraini, M.Kom",
    },
  ],
};

export const SESI_B: SesiData = {
  id: "B",
  label: "Sabtu Genap",
  dates: ["2026-03-28", "2026-04-25", "2026-05-23", "2026-06-20"],
  displayDates: ["28 Mar", "25 Apr", "23 Mei", "20 Jun"],
  rows: [
    {
      type: "class",
      start: "07:20",
      end: "08:50",
      subject: "Pemrograman Web 2",
      abbreviation: "WEB 2",
      lecturer: "M. Iqbal Firdaus, M.Kom",
    },
    {
      type: "class",
      start: "09:00",
      end: "10:30",
      subject: "Filsafat Ilmu",
      abbreviation: "FILSAFAT",
      lecturer: "Riza Fahlipi",
    },
    {
      type: "class",
      start: "10:40",
      end: "12:10",
      subject: "Pemr. Berbasis Objek 1",
      abbreviation: "PBO 1",
      lecturer: "M. Edya Rosadi, M.Kom",
    },
    {
      type: "class",
      start: "13:00",
      end: "14:30",
      subject: "Tauhid",
      abbreviation: "TAUHID",
      lecturer: "H. Zaini, M.Ag",
    },
  ],
};
