import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

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
        throw new Error("Unable to load dashboard data");
      }

      const data = await response.json();

      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Admin dashboard error:", err);

      setError(
        err.message || "Unable to load dashboard data"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const stats = useMemo(() => {
    const total = complaints.length;

    const reported = complaints.filter(
      (item) => item.status === "Reported"
    ).length;

    const assigned = complaints.filter(
      (item) => item.status === "Assigned"
    ).length;

    const inProgress = complaints.filter(
      (item) => item.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
      (item) => item.status === "Resolved"
    ).length;

    const highPriority = complaints.filter(
      (item) => item.severity === "High"
    ).length;

    const resolutionRate =
      total > 0
        ? Math.round((resolved / total) * 100)
        : 0;

    return {
      total,
      reported,
      assigned,
      inProgress,
      resolved,
      highPriority,
      resolutionRate,
    };
  }, [complaints]);

  const recentComplaints = useMemo(() => {
    return [...complaints]
      .sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      )
      .slice(0, 6);
  }, [complaints]);

  const categoryStats = useMemo(() => {
    const counts = {};

    complaints.forEach((complaint) => {
      const category = complaint.category || "Other";

      counts[category] =
        (counts[category] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
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
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 p-7 text-white shadow-xl md:p-8">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <Sparkles size={14} />
              SevaSetu AI Admin
            </div>

            <h1 className="mt-4 text-3xl font-black md:text-4xl">
              Civic Command Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Monitor citizen complaints, departmental workload,
              priorities and resolution progress from one place.
            </p>
          </div>

          <button
            onClick={() => loadComplaints(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
          >
            {refreshing ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <RefreshCw size={17} />
            )}

            Refresh Data
          </button>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle
            size={20}
            className="mt-0.5 shrink-0 text-red-500"
          />

          <div>
            <p className="font-bold text-red-700">
              Dashboard data unavailable
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
      )}

      {/* Main statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          label="Total Complaints"
          value={stats.total}
          description="All submitted complaints"
          icon={<FileText size={22} />}
          iconClass="bg-blue-100 text-blue-600"
        />

        <DashboardStat
          label="Active Complaints"
          value={
            stats.reported +
            stats.assigned +
            stats.inProgress
          }
          description="Require departmental action"
          icon={<Clock3 size={22} />}
          iconClass="bg-purple-100 text-purple-600"
        />

        <DashboardStat
          label="Resolved"
          value={stats.resolved}
          description={`${stats.resolutionRate}% resolution rate`}
          icon={<CheckCircle2 size={22} />}
          iconClass="bg-emerald-100 text-emerald-600"
        />

        <DashboardStat
          label="High Priority"
          value={stats.highPriority}
          description="Complaints requiring attention"
          icon={<AlertTriangle size={22} />}
          iconClass="bg-red-100 text-red-600"
        />
      </section>

      {/* Workflow */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Complaint Workflow
            </h2>

            <p className="text-xs text-slate-500">
              Current distribution across the resolution pipeline
            </p>
          </div>

          <TrendingUp
            size={21}
            className="text-emerald-500"
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <WorkflowCard
            number="01"
            label="Reported"
            value={stats.reported}
            color="amber"
          />

          <WorkflowCard
            number="02"
            label="Assigned"
            value={stats.assigned}
            color="blue"
          />

          <WorkflowCard
            number="03"
            label="In Progress"
            value={stats.inProgress}
            color="purple"
          />

          <WorkflowCard
            number="04"
            label="Resolved"
            value={stats.resolved}
            color="emerald"
          />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        {/* Recent complaints */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="font-bold text-slate-900">
                Recent Complaints
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest complaints received by SevaSetu
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/admin/complaints")
              }
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>

          {recentComplaints.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-slate-100">
              {recentComplaints.map((complaint) => (
                <button
                  key={complaint.complaint_id}
                  onClick={() =>
                    navigate(
                      `/admin/complaints/${complaint.complaint_id}`
                    )
                  }
                  className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FileText size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-extrabold text-slate-900">
                        {complaint.complaint_id}
                      </p>

                      <StatusBadge
                        status={complaint.status}
                      />
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-600">
                      {complaint.description}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {complaint.category} •{" "}
                      {complaint.location}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="shrink-0 text-slate-300"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-900">
              Issue Categories
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Complaint distribution by category
            </p>
          </div>

          {categoryStats.length === 0 ? (
            <div className="mt-8">
              <EmptyState />
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              {categoryStats.map(
                ([category, count]) => {
                  const percentage =
                    stats.total > 0
                      ? Math.round(
                          (count / stats.total) * 100
                        )
                      : 0;

                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-700">
                          {category}
                        </p>

                        <p className="text-xs font-bold text-slate-400">
                          {count} ({percentage}%)
                        </p>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function DashboardStat({
  label,
  value,
  description,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-3xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

function WorkflowCard({
  number,
  label,
  value,
  color,
}) {
  const colors = {
    amber: "bg-amber-50 border-amber-100 text-amber-600",
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    purple:
      "bg-purple-50 border-purple-100 text-purple-600",
    emerald:
      "bg-emerald-50 border-emerald-100 text-emerald-600",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${colors[color]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-black opacity-70">
          {number}
        </span>

        <span className="text-2xl font-black">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-800">
        {label}
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
      className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Reported"}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
        <FileText
          size={22}
          className="text-slate-400"
        />
      </div>

      <p className="mt-3 text-sm font-bold text-slate-600">
        No complaints yet
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Submitted complaints will appear here.
      </p>
    </div>
  );
}