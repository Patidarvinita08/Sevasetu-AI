import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  RefreshCw,
  Loader2,
  AlertTriangle,
  FileText,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

const statusOptions = [
  "All",
  "Reported",
  "Assigned",
  "In Progress",
  "Resolved",
];

const categoryOptions = [
  "All",
  "Garbage",
  "Road",
  "Streetlight",
  "Water",
  "Drainage",
  "Infrastructure",
];

export default function AdminComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadComplaints = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API_URL}/complaints/`);

      if (!response.ok) {
        throw new Error("Unable to load complaints");
      }

      const data = await response.json();

      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Admin complaints error:", err);
      setError(err.message || "Unable to load complaints");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !query ||
        complaint.complaint_id?.toLowerCase().includes(query) ||
        complaint.description?.toLowerCase().includes(query) ||
        complaint.location?.toLowerCase().includes(query) ||
        complaint.department?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        complaint.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    complaints,
    search,
    statusFilter,
    categoryFilter,
  ]);

  const stats = {
    total: complaints.length,
    reported: complaints.filter(
      (item) => item.status === "Reported"
    ).length,
    inProgress: complaints.filter(
      (item) => item.status === "In Progress"
    ).length,
    resolved: complaints.filter(
      (item) => item.status === "Resolved"
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-800 p-7 text-white shadow-xl">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Admin Portal
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Complaints Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              View, filter and manage civic complaints submitted
              through SevaSetu AI.
            </p>
          </div>

          <button
            onClick={() => loadComplaints(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
          >
            {refreshing ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <RefreshCw size={17} />
            )}
            Refresh
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Complaints"
          value={stats.total}
          icon={<FileText size={21} />}
          className="bg-blue-50 text-blue-600"
        />

        <StatCard
          label="Reported"
          value={stats.reported}
          icon={<AlertTriangle size={21} />}
          className="bg-amber-50 text-amber-600"
        />

        <StatCard
          label="In Progress"
          value={stats.inProgress}
          icon={<Clock3 size={21} />}
          className="bg-purple-50 text-purple-600"
        />

        <StatCard
          label="Resolved"
          value={stats.resolved}
          icon={<CheckCircle2 size={21} />}
          className="bg-emerald-50 text-emerald-600"
        />
      </section>

      {/* Filters */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaint ID, description, location..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
            />
          </div>

          {/* Status */}
          <div className="relative">
            <Filter
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-8 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 sm:w-52"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  Status: {status}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 sm:w-52"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                Category: {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Error */}
      {error && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-500"
            />

            <div>
              <p className="font-bold text-red-700">
                Unable to load complaints
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <button
                onClick={() => loadComplaints()}
                className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Loading */}
      {loading ? (
        <section className="flex min-h-[350px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="text-center">
            <Loader2
              size={38}
              className="mx-auto animate-spin text-emerald-500"
            />

            <p className="mt-3 text-sm font-semibold text-slate-500">
              Loading complaints...
            </p>
          </div>
        </section>
      ) : (
        /* Complaints */
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="font-bold text-slate-900">
                All Complaints
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredComplaints.length} of{" "}
                {complaints.length} complaints
              </p>
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <FileText
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                No complaints found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Complaint
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Location
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Department
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Severity
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <ComplaintRow
                      key={complaint.complaint_id}
                      complaint={complaint}
                      onView={() =>
                        navigate(
                          `/admin/complaints/${complaint.complaint_id}`
                        )
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ComplaintRow({ complaint, onView }) {
  return (
    <tr className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/80">
      <td className="px-5 py-4">
        <div>
          <p className="font-extrabold text-slate-900">
            {complaint.complaint_id}
          </p>

          <p className="mt-1 max-w-[250px] truncate text-xs text-slate-500">
            {complaint.description}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
          {complaint.category}
        </span>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[180px] truncate text-sm font-semibold text-slate-700">
          {complaint.location}
        </p>
      </td>

      <td className="px-5 py-4">
        <p className="max-w-[180px] truncate text-sm text-slate-600">
          {complaint.department}
        </p>
      </td>

      <td className="px-5 py-4">
        <SeverityBadge severity={complaint.severity} />
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={complaint.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <button
          onClick={onView}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-700"
        >
          <Eye size={15} />
          View
        </button>
      </td>
    </tr>
  );
}

function StatCard({ label, value, icon, className }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${className}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Reported: "bg-amber-50 text-amber-700",
    Assigned: "bg-blue-50 text-blue-700",
    "In Progress": "bg-purple-50 text-purple-700",
    Resolved: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Reported"}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-orange-50 text-orange-700",
    Low: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
        styles[severity] || "bg-slate-100 text-slate-600"
      }`}
    >
      {severity || "Medium"}
    </span>
  );
}