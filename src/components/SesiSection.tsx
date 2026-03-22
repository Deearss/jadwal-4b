import { Utensils } from "lucide-react";
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
      <tr className="border-b border-border text-center">
        <td colSpan={4} className="px-3 pt-[0.3rem] pb-[0.6rem]">
          <span className="relative text-[0.58rem] tracking-widest text-muted uppercase font-medium">
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
        className={`td-time py-[0.7rem] px-3 text-[0.7rem] font-semibold whitespace-nowrap w-43.75 ${colors.time}`}
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

export default function SesiSection({
  data,
  isDimmed,
  isRowActive,
}: SesiSectionProps) {
  const colors = colorMap[data.id];

  return (
    <div
      className={`px-[1.8rem] transition-opacity duration-400 ${isDimmed ? "sesi-dim" : ""}`}
    >
      {/* Sesi Header */}
      <div className="flex items-center gap-2.5 py-[1.1rem] pb-[0.8rem]">
        <span
          className={`inline-flex items-center gap-1.5 text-[0.58rem] font-semibold tracking-widest uppercase py-[0.22rem] px-[0.65rem] rounded-sm border ${colors.badge}`}
        >
          <span className="w-1.25 h-1.25 rounded-full bg-current" />
          Sesi {data.id}
        </span>
        <span className="text-[0.82rem] font-semibold text-prose">
          {data.label}
        </span>
        <div className="ml-auto flex gap-1 flex-wrap justify-end">
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

      {/* Table */}
      <table className="w-full border-collapse mb-[1.4rem]">
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
  );
}
