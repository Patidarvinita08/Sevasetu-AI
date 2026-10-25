const styles = {
  Reported: "bg-blue-50 text-blue-700 border-blue-200",
  Assigned: "bg-purple-50 text-purple-700 border-purple-200",
  "In Progress": "bg-orange-50 text-orange-700 border-orange-200",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-50 text-slate-700 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}