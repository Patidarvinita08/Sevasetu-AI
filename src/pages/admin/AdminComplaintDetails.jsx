import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  MapPin,
  Save,
  ShieldAlert,
  Sparkles,
  UserRound,
  AlertTriangle,
} from "lucide-react";

const API_URL = "http://localhost:8000/api";

const statuses = [
  "Reported",
  "Assigned",
  "In Progress",
  "Resolved",
];

const departments = [
  "Municipal Corporation",
  "Sanitation Department",
  "Public Works Department",
  "Water Department",
  "Electricity Department",
  "Drainage Department",
];

const severities = ["Low", "Medium", "High"];

export default function AdminComplaintDetails() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [severity, setSeverity] = useState("");

  const loadComplaint = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/complaints/${complaintId}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Complaint not found"
        );
      }

      const data = await response.json();

      setComplaint(data);
      setStatus(data.status || "Reported");
      setDepartment(
        data.department || "Municipal Corporation"
      );
      setSeverity(data.severity || "Medium");
    } catch (err) {
      console.error("Complaint details error:", err);
      setError(
        err.message || "Unable to load complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (complaintId) {
      loadComplaint();
    }
  }, [complaintId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess("");
      setError("");

      const response = await fetch(
        `${API_URL}/complaints/${complaintId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            department,
            severity,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Unable to update complaint"
        );
      }

      const updatedComplaint = await response.json();

      setComplaint(updatedComplaint);

      setStatus(updatedComplaint.status);
      setDepartment(updatedComplaint.department);
      setSeverity(updatedComplaint.severity);

      setSuccess(
        "Complaint updated successfully and saved to PostgreSQL."
      );
    } catch (err) {
      console.error("Update complaint error:", err);

      setError(
        err.message || "Unable to update complaint"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={38}
            className="mx-auto animate-spin text-emerald-500"
          />

          <p className="mt-3 text-sm font-semibold text-slate-500">
            Loading complaint...
          </p>
        </div>
      </div>
    );
  }

  if (error && !complaint) {
    return (
      <div className="mx-auto max-w-2xl py-16">
        <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <AlertTriangle size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Complaint Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={() => navigate("/admin/complaints")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={17} />
            Back to Complaints
          </button>
        </div>
      </div>
    );
  }

  const currentStatusIndex =
    statuses.indexOf(complaint?.status);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-800 p-7 text-white shadow-xl">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <button
            onClick={() => navigate("/admin/complaints")}
            className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            Back to Complaints
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Complaint Details
              </p>

              <h1 className="mt-2 text-3xl font-black">
                {complaint.complaint_id}
              </h1>

              <p className="mt-2 text-sm text-slate-300">
                Review and manage this civic complaint.
              </p>
            </div>

            <StatusBadge status={complaint.status} />
          </div>
        </div>
      </section>

      {/* Error / Success */}
      {error && complaint && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={19} />
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        {/* Complaint information */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Complaint Information
                  </h2>

                  <p className="text-xs text-slate-500">
                    Information submitted by the citizen
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <InfoCard
                label="Complaint ID"
                value={complaint.complaint_id}
              />

              <InfoCard
                label="Category"
                value={complaint.category}
              />

              <InfoCard
                label="Severity"
                value={complaint.severity}
                icon={<ShieldAlert size={16} />}
              />

              <InfoCard
                label="Department"
                value={complaint.department}
                icon={<Building2 size={16} />}
              />

              <div className="sm:col-span-2 rounded-2xl bg-slate-50 p-5">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {complaint.description}
                </p>
              </div>

              <div className="sm:col-span-2 flex gap-3 rounded-2xl bg-blue-50 p-5">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-blue-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {complaint.location}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Status timeline */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Clock3 size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Complaint Progress
                </h2>

                <p className="text-xs text-slate-500">
                  Current workflow status
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-4">
              {statuses.map((item, index) => {
                const completed =
                  index <= currentStatusIndex;

                const active =
                  item === complaint.status;

                return (
                  <div
                    key={item}
                    className={`rounded-2xl border p-4 ${
                      active
                        ? "border-emerald-300 bg-emerald-50"
                        : completed
                        ? "border-slate-200 bg-slate-50"
                        : "border-slate-100 bg-white"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        completed
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <Clock3 size={17} />
                      )}
                    </div>

                    <p
                      className={`mt-3 text-sm font-bold ${
                        completed
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {item}
                    </p>

                    {active && (
                      <p className="mt-1 text-[11px] font-bold text-emerald-600">
                        Current status
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Admin controls */}
        <div className="space-y-6">
          <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Admin Action
                </h2>

                <p className="text-xs text-slate-500">
                  Update complaint workflow
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* Status */}
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                  Department
                </label>

                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity */}
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                  Severity
                </label>

                <select
                  value={severity}
                  onChange={(e) =>
                    setSeverity(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
                >
                  {severities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Meta */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Complaint Metadata
            </h2>

            <div className="mt-5 space-y-4">
              <MetaRow
                icon={<UserRound size={17} />}
                label="Submitted By"
                value="Citizen"
              />

              <MetaRow
                icon={<Clock3 size={17} />}
                label="Created"
                value={formatDate(complaint.created_at)}
              />

              <MetaRow
                icon={<Building2 size={17} />}
                label="Assigned Department"
                value={complaint.department}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-slate-400">
            {icon}
          </span>
        )}

        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-extrabold text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
}

function MetaRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-bold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Reported: "bg-amber-100 text-amber-700",
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Resolved: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-xs font-black ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Reported"}
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