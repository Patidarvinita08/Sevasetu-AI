import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const STEPS = [
  {
    key: "Reported",
    title: "Complaint Reported",
    description: "Your complaint has been successfully registered.",
    icon: "📋",
  },
  {
    key: "Assigned",
    title: "Department Assigned",
    description: "The complaint is assigned to the responsible department.",
    icon: "🏢",
  },
  {
    key: "In Progress",
    title: "Work In Progress",
    description: "The concerned team is working on the reported issue.",
    icon: "🔧",
  },
  {
    key: "Resolved",
    title: "Issue Resolved",
    description: "The reported civic issue has been resolved.",
    icon: "✅",
  },
];

export default function ComplaintTracking() {
  const navigate = useNavigate();
  const { complaintId } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    loadComplaint();
  }, [complaintId]);

  const loadComplaint = () => {
    let foundComplaint = null;

    // 1. Check submitted/current complaint
    const currentComplaint =
      sessionStorage.getItem("sevasetuComplaint");

    if (currentComplaint) {
      try {
        const parsed = JSON.parse(currentComplaint);

        if (parsed.complaintId === complaintId) {
          foundComplaint = parsed;
        }
      } catch (error) {
        console.error(error);
      }
    }

    // 2. Check saved complaints
    if (!foundComplaint) {
      try {
        const complaints = JSON.parse(
          localStorage.getItem("sevasetuComplaints") || "[]"
        );

        foundComplaint = complaints.find(
          (item) => item.complaintId === complaintId
        );
      } catch (error) {
        console.error(error);
      }
    }

    setComplaint(foundComplaint);
  };

  if (!complaint) {
    return (
      <div className="mx-auto max-w-3xl py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <ShieldCheck
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Complaint Not Found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't find complaint{" "}
            <strong>{complaintId}</strong>.
            Please check the complaint ID or open it from
            My Complaints.
          </p>

          <button
            onClick={() => navigate("/citizen/complaints")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg"
          >
            <ArrowLeft size={17} />
            My Complaints
          </button>

        </div>
      </div>
    );
  }

  const currentStatus = complaint.status || "Reported";

  const currentIndex = STEPS.findIndex(
    (step) => step.key === currentStatus
  );

  const progressIndex =
    currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-indigo-700 via-purple-600 to-fuchsia-600 p-7 text-white shadow-xl md:p-9">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" />

        <div className="relative">

          <button
            onClick={() => navigate("/citizen/complaints")}
            className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur transition hover:bg-white/20"
          >
            <ArrowLeft size={15} />
            Back to My Complaints
          </button>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur">
                <Sparkles size={14} />
                SevaSetu AI Tracking
              </div>

              <h1 className="mt-4 text-3xl font-black md:text-4xl">
                Track Your Complaint
              </h1>

              <p className="mt-2 text-sm text-purple-100">
                Complaint ID:{" "}
                <span className="font-extrabold text-white">
                  {complaint.complaintId}
                </span>
              </p>

            </div>

            <StatusBadge status={currentStatus} />

          </div>

        </div>

      </section>

      {/* STATUS TIMELINE */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

        <div className="mb-8">

          <h2 className="text-xl font-extrabold text-slate-900">
            Complaint Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Follow the progress of your civic complaint.
          </p>

        </div>

        <div className="space-y-6">

          {STEPS.map((step, index) => {

            const completed = index <= progressIndex;
            const active = index === progressIndex;

            return (
              <div
                key={step.key}
                className="relative flex gap-4"
              >

                {index < STEPS.length - 1 && (
                  <div
                    className={`absolute left-[23px] top-12 h-[calc(100%+1.5rem)] w-1 rounded-full ${
                      index < progressIndex
                        ? "bg-emerald-400"
                        : "bg-slate-100"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg shadow-sm ${
                    completed
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400"
                  } ${
                    active
                      ? "ring-4 ring-emerald-100"
                      : ""
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 size={21} />
                  ) : (
                    step.icon
                  )}
                </div>

                <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50 p-4">

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                    <h3
                      className={`font-bold ${
                        completed
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {active && (
                      <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                        Current Status
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </section>

      {/* COMPLAINT DETAILS */}
      <div className="grid gap-6 lg:grid-cols-3">

        <section className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                📋
              </div>

              <div>
                <h2 className="font-extrabold text-slate-900">
                  Complaint Details
                </h2>

                <p className="text-xs text-slate-500">
                  Information submitted through SevaSetu
                </p>
              </div>

            </div>

          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2">

            <Detail
              label="Complaint ID"
              value={complaint.complaintId}
            />

            <Detail
              label="Category"
              value={complaint.category}
            />

            <Detail
              label="Priority"
              value={complaint.severity}
            />

            <Detail
              label="Department"
              value={complaint.department}
            />

          </div>

          <div className="border-t border-slate-100 p-6">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Description
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-700">
              {complaint.description}
            </p>

          </div>

          <div className="border-t border-slate-100 p-6">

            <div className="flex gap-3">

              <MapPin
                size={19}
                className="mt-1 shrink-0 text-blue-500"
              />

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Location
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {complaint.location}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* SIDE CARD */}
        <section className="space-y-6">

          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <Clock3 size={22} />
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-slate-900">
              Current Status
            </h2>

            <p className="mt-1 text-3xl font-black text-emerald-600">
              {currentStatus}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your complaint is being processed through the
              SevaSetu civic service workflow.
            </p>

          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                <UserRound size={18} />
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  Need Help?
                </p>

                <p className="text-xs text-slate-500">
                  Contact civic support
                </p>
              </div>

            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-600 shadow-sm">
              <Phone size={16} />
              Contact Support
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">

      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-extrabold text-slate-900">
        {value || "Not available"}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Reported: "bg-blue-400/20 text-blue-50 border-blue-200/20",
    Assigned: "bg-yellow-400/20 text-yellow-50 border-yellow-200/20",
    "In Progress":
      "bg-orange-400/20 text-orange-50 border-orange-200/20",
    Resolved:
      "bg-emerald-400/20 text-emerald-50 border-emerald-200/20",
  };

  return (
    <div
      className={`w-fit rounded-full border px-5 py-2.5 text-sm font-extrabold ${
        styles[status] ||
        "border-white/20 bg-white/10 text-white"
      }`}
    >
      {status}
    </div>
  );
}