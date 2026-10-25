import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  MapPin,
  RefreshCw,
  Search,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

export default function MyComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadComplaints = async (isRefresh = false) => {
    try {
      if (isRefresh) {
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
      console.error("My complaints error:", err);

      setError(
        err.message || "Unable to load your complaints"
      );
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
        complaint.complaint_id
          ?.toLowerCase()
          .includes(query) ||
        complaint.category
          ?.toLowerCase()
          .includes(query) ||
        complaint.description
          ?.toLowerCase()
          .includes(query) ||
        complaint.location
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: complaints.length,

      active: complaints.filter(
        (item) =>
          item.status !== "Resolved"
      ).length,

      resolved: complaints.filter(
        (item) =>
          item.status === "Resolved"
      ).length,

      high: complaints.filter(
        (item) =>
          item.severity === "High"
      ).length,
    };
  }, [complaints]);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={40}
            className="mx-auto animate-spin text-emerald-500"
          />

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading your complaints...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-600 p-7 text-white shadow-xl md:p-8">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100">
              Citizen Portal
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-4xl">
              My Complaints
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
              View and track all civic complaints registered
              through SevaSetu AI.
            </p>
          </div>

          <button
            onClick={() => loadComplaints(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/25 disabled:opacity-60"
          >
            {refreshing ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
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
          label="Total"
          value={stats.total}
          icon={<FileText size={21} />}
          className="bg-blue-50 text-blue-600"
        />

        <StatCard
          label="Active"
          value={stats.active}
          icon={<Clock3 size={21} />}
          className="bg-purple-50 text-purple-600"
        />

        <StatCard
          label="Resolved"
          value={stats.resolved}
          icon={<CheckCircle2 size={21} />}
          className="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          label="High Priority"
          value={stats.high}
          icon={<AlertTriangle size={21} />}
          className="bg-red-50 text-red-600"
        />
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
                className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-xs font-bold text-white"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search complaint ID, category, location..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 md:w-56"
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Reported">
              Reported
            </option>

            <option value="Assigned">
              Assigned
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>
        </div>
      </section>

      {/* Complaints */}
      {filteredComplaints.length === 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <FileText
              size={28}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-xl font-extrabold text-slate-800">
            No complaints found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {complaints.length === 0
              ? "You have not submitted any complaints yet."
              : "Try changing your search or status filter."}
          </p>

          {complaints.length === 0 && (
            <button
              onClick={() =>
                navigate("/citizen/report")
              }
              className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100"
            >
              Report an Issue
            </button>
          )}
        </section>
      ) : (
        <section className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.complaint_id}
              complaint={complaint}
              onTrack={() =>
                navigate(
                  `/citizen/complaints/${complaint.complaint_id}`
                )
              }
            />
          ))}
        </section>
      )}
    </div>
  );
}

function ComplaintCard({ complaint, onTrack }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          {/* Main */}
          <div className="flex min-w-0 flex-1 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FileText size={21} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-black text-slate-900">
                  {complaint.complaint_id}
                </p>

                <StatusBadge
                  status={complaint.status}
                />

                <SeverityBadge
                  severity={complaint.severity}
                />
              </div>

              <h2 className="mt-2 text-base font-bold text-slate-800">
                {complaint.category}
              </h2>

              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex min-w-0 gap-3 lg:w-64">
            <MapPin
              size={18}
              className="mt-0.5 shrink-0 text-blue-500"
            />

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Location
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                {complaint.location}
              </p>
            </div>
          </div>

          {/* Track */}
          <button
            onClick={onTrack}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-emerald-100 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Track
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-500">
            Department:{" "}
            <span className="font-bold text-slate-700">
              {complaint.department}
            </span>
          </span>

          <span className="text-slate-400">
            Submitted:{" "}
            <span className="font-semibold text-slate-600">
              {formatDate(complaint.created_at)}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function StatCard({
  label,
  value,
  icon,
  className,
}) {
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
    "In Progress":
      "bg-purple-50 text-purple-700",
    Resolved:
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
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
      className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
        styles[severity] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {severity || "Medium"}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "Not available";

  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}