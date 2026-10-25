import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  PieChart,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

const STATUS_ORDER = [
  "Reported",
  "Assigned",
  "In Progress",
  "Resolved",
];

export default function AdminAnalytics() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAnalytics = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API_URL}/complaints/`);

      if (!response.ok) {
        throw new Error("Unable to load analytics data");
      }

      const data = await response.json();

      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Analytics error:", err);

      setError(
        err.message || "Unable to load analytics"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const analytics = useMemo(() => {
    const total = complaints.length;

    const resolved = complaints.filter(
      (item) => item.status === "Resolved"
    ).length;

    const active = complaints.filter(
      (item) => item.status !== "Resolved"
    ).length;

    const highPriority = complaints.filter(
      (item) => item.severity === "High"
    ).length;

    const resolutionRate =
      total > 0
        ? Math.round((resolved / total) * 100)
        : 0;

    const statusCounts = STATUS_ORDER.map(
      (status) => ({
        status,
        count: complaints.filter(
          (item) => item.status === status
        ).length,
      })
    );

    const categoryMap = {};

    complaints.forEach((item) => {
      const category = item.category || "Other";

      categoryMap[category] =
        (categoryMap[category] || 0) + 1;
    });

    const categories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1]);

    const departmentMap = {};

    complaints.forEach((item) => {
      const department =
        item.department || "Unassigned";

      departmentMap[department] =
        (departmentMap[department] || 0) + 1;
    });

    const departments = Object.entries(
      departmentMap
    ).sort((a, b) => b[1] - a[1]);

    const severityCounts = [
      {
        severity: "High",
        count: complaints.filter(
          (item) => item.severity === "High"
        ).length,
      },
      {
        severity: "Medium",
        count: complaints.filter(
          (item) => item.severity === "Medium"
        ).length,
      },
      {
        severity: "Low",
        count: complaints.filter(
          (item) => item.severity === "Low"
        ).length,
      },
    ];

    return {
      total,
      resolved,
      active,
      highPriority,
      resolutionRate,
      statusCounts,
      categories,
      departments,
      severityCounts,
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
            Loading analytics...
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

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
              <BarChart3 size={14} />
              SevaSetu Intelligence
            </div>

            <h1 className="mt-4 text-3xl font-black md:text-4xl">
              Analytics & Insights
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Understand complaint patterns, priorities,
              departmental workload and resolution performance.
            </p>
          </div>

          <button
            onClick={() => loadAnalytics(true)}
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

            Refresh
          </button>
        </div>
      </section>

      {/* Error */}
      {error && (
        <section className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle
            size={20}
            className="mt-0.5 text-red-500"
          />

          <div>
            <p className="font-bold text-red-700">
              Analytics unavailable
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          </div>
        </section>
      )}

      {/* KPI cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Complaints"
          value={analytics.total}
          description="All registered complaints"
          icon={<FileText size={22} />}
          className="bg-blue-50 text-blue-600"
        />

        <KpiCard
          label="Resolved"
          value={analytics.resolved}
          description={`${analytics.resolutionRate}% resolution rate`}
          icon={<CheckCircle2 size={22} />}
          className="bg-emerald-50 text-emerald-600"
        />

        <KpiCard
          label="Active"
          value={analytics.active}
          description="Require further action"
          icon={<Clock3 size={22} />}
          className="bg-purple-50 text-purple-600"
        />

        <KpiCard
          label="High Priority"
          value={analytics.highPriority}
          description="Need urgent attention"
          icon={<AlertTriangle size={22} />}
          className="bg-red-50 text-red-600"
        />
      </section>

      {/* Resolution overview */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <TrendingUp size={21} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Resolution Performance
            </h2>

            <p className="text-xs text-slate-500">
              Overall complaint resolution progress
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
          {/* Circular score */}
          <div className="flex justify-center">
            <div
              className="relative flex h-40 w-40 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#10b981 ${analytics.resolutionRate}%, #e2e8f0 0)`,
              }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-black text-slate-900">
                  {analytics.resolutionRate}%
                </span>

                <span className="text-xs font-semibold text-slate-400">
                  Resolved
                </span>
              </div>
            </div>
          </div>

          {/* Status bars */}
          <div className="space-y-5">
            {analytics.statusCounts.map(
              ({ status, count }) => {
                const percentage =
                  analytics.total > 0
                    ? Math.round(
                        (count / analytics.total) *
                          100
                      )
                    : 0;

                return (
                  <ProgressRow
                    key={status}
                    label={status}
                    count={count}
                    percentage={percentage}
                    color={statusColor(status)}
                  />
                );
              }
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Category distribution */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={<PieChart size={21} />}
            title="Complaint Categories"
            subtitle="Issues reported by citizens"
            iconClass="bg-blue-100 text-blue-600"
          />

          <div className="mt-6 space-y-5">
            {analytics.categories.length === 0 ? (
              <Empty />
            ) : (
              analytics.categories.map(
                ([category, count]) => {
                  const percentage =
                    analytics.total > 0
                      ? Math.round(
                          (count / analytics.total) *
                            100
                        )
                      : 0;

                  return (
                    <ProgressRow
                      key={category}
                      label={category}
                      count={count}
                      percentage={percentage}
                      color="bg-gradient-to-r from-blue-400 to-cyan-500"
                    />
                  );
                }
              )
            )}
          </div>
        </section>

        {/* Severity */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader
            icon={<AlertTriangle size={21} />}
            title="Severity Distribution"
            subtitle="Priority level of reported issues"
            iconClass="bg-red-100 text-red-600"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {analytics.severityCounts.map(
              ({ severity, count }) => {
                const percentage =
                  analytics.total > 0
                    ? Math.round(
                        (count / analytics.total) *
                          100
                      )
                    : 0;

                return (
                  <SeverityCard
                    key={severity}
                    severity={severity}
                    count={count}
                    percentage={percentage}
                  />
                );
              }
            )}
          </div>
        </section>
      </div>

      {/* Department workload */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          icon={<BarChart3 size={21} />}
          title="Department Workload"
          subtitle="Complaints assigned to each department"
          iconClass="bg-purple-100 text-purple-600"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {analytics.departments.length === 0 ? (
            <Empty />
          ) : (
            analytics.departments.map(
              ([department, count]) => {
                const percentage =
                  analytics.total > 0
                    ? Math.round(
                        (count / analytics.total) *
                          100
                      )
                    : 0;

                return (
                  <div
                    key={department}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {department}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {count} complaint
                          {count !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-purple-600">
                        {percentage}%
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-400 to-indigo-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </section>

      {/* Insight panel */}
      <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
            <SparklesIcon />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              SevaSetu AI Insight
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {generateInsight(analytics)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function KpiCard({
  label,
  value,
  description,
  icon,
  className,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${className}`}
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

function SectionHeader({
  icon,
  title,
  subtitle,
  iconClass,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div>
        <h2 className="font-bold text-slate-900">
          {title}
        </h2>

        <p className="text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  count,
  percentage,
  color,
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-700">
          {label}
        </p>

        <p className="text-xs font-bold text-slate-400">
          {count} ({percentage}%)
        </p>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function SeverityCard({
  severity,
  count,
  percentage,
}) {
  const config = {
    High: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-100",
    },
    Medium: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-100",
    },
    Low: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },
  };

  const style =
    config[severity] || config.Medium;

  return (
    <div
      className={`rounded-2xl border p-5 ${style.bg} ${style.border}`}
    >
      <p
        className={`text-xs font-black uppercase tracking-wider ${style.text}`}
      >
        {severity}
      </p>

      <p className="mt-2 text-3xl font-black text-slate-900">
        {count}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-500">
        {percentage}% of complaints
      </p>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl bg-slate-50 p-8 text-center">
      <FileText
        size={25}
        className="mx-auto text-slate-300"
      />

      <p className="mt-2 text-sm font-bold text-slate-500">
        No data available
      </p>
    </div>
  );
}

function statusColor(status) {
  const colors = {
    Reported:
      "bg-gradient-to-r from-amber-400 to-orange-500",
    Assigned:
      "bg-gradient-to-r from-blue-400 to-cyan-500",
    "In Progress":
      "bg-gradient-to-r from-purple-400 to-indigo-500",
    Resolved:
      "bg-gradient-to-r from-emerald-400 to-teal-500",
  };

  return (
    colors[status] ||
    "bg-gradient-to-r from-slate-400 to-slate-500"
  );
}

function generateInsight(data) {
  if (data.total === 0) {
    return "No complaints have been registered yet. Once citizens start submitting issues, SevaSetu AI will surface operational patterns here.";
  }

  if (data.highPriority > 0) {
    return `There are ${data.highPriority} high-priority complaint${
      data.highPriority !== 1 ? "s" : ""
    } requiring attention. The current resolution rate is ${
      data.resolutionRate
    }%.`;
  }

  if (data.resolutionRate >= 80) {
    return `Excellent operational performance. ${
      data.resolutionRate
    }% of registered complaints have been resolved.`;
  }

  return `${data.active} active complaint${
    data.active !== 1 ? "s" : ""
  } currently require departmental action, while ${
    data.resolved
  } complaint${data.resolved !== 1 ? "s" : ""} ${
    data.resolved === 1 ? "has" : "have"
  } been resolved.`;
}

function SparklesIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z" />
      <path d="m19 15-.75 2.25L16 18l2.25.75L19 21l.75-2.25L22 18l-2.25-.75L19 15Z" />
      <path d="m5 14-.6 1.8L2.6 16.4l1.8.6L5 18.8l.6-1.8 1.8-.6-1.8-.6L5 14Z" />
    </svg>
  );
}