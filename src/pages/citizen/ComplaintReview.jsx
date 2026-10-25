import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  MapPin,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComplaintReview() {
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    try {
      const savedComplaint =
        sessionStorage.getItem("sevasetuComplaint");

      if (savedComplaint) {
        setComplaint(JSON.parse(savedComplaint));
      }
    } catch (error) {
      console.error(
        "Unable to read complaint data:",
        error
      );
    }
  }, []);

  // No AI result available
  if (!complaint) {
    return (
      <div className="mx-auto max-w-3xl py-16">

        <div className="rounded-3xl border border-orange-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <AlertTriangle size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            No AI analysis found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Please go back to the Report Issue page and
            analyze your complaint first.
          </p>

          <button
            onClick={() => navigate("/citizen/report")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg"
          >
            <ArrowLeft size={17} />
            Back to Report Issue
          </button>

        </div>

      </div>
    );
  }

  const handleConfirm = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/api/complaints/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: complaint.category,
          description: complaint.description,
          location: complaint.location,
          severity: complaint.severity || "Medium",
          department:
            complaint.department || "Municipal Corporation",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.detail || "Failed to submit complaint"
      );
    }

    const savedComplaint = await response.json();

    console.log("Complaint saved to database:", savedComplaint);

    const updatedComplaint = {
      ...complaint,
      ...savedComplaint,
      confirmed: true,
    };

    sessionStorage.setItem(
      "sevasetuComplaint",
      JSON.stringify(updatedComplaint)
    );

    navigate("/citizen/submitted");
  } catch (error) {
    console.error("Complaint submission error:", error);

    alert(
      `Unable to submit complaint.\n\n${error.message}`
    );
  }
};
  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 p-7 text-white shadow-xl md:p-9">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur">
            <Sparkles size={14} />
            AI Analysis Complete
          </div>

          <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Review Your Complaint
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
            SevaSetu AI has analyzed your report. Review
            the information below before submitting it to
            the concerned department.
          </p>

        </div>

      </section>

      {/* AI RESULT */}
      <section className="rounded-3xl border border-purple-100 bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-200">
              <Sparkles size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                SevaSetu AI Result
              </h2>

              <p className="text-xs text-slate-500">
                Automated civic issue classification
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5">

            <ShieldCheck
              size={18}
              className="text-emerald-600"
            />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                Confidence
              </p>

              <p className="text-sm font-extrabold text-slate-900">
                {complaint.confidence}%
              </p>
            </div>

          </div>

        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">

          {/* IMAGE */}
          <div>

            <p className="mb-3 text-sm font-bold text-slate-800">
              Submitted Evidence
            </p>

            {complaint.image ? (
              <img
                src={complaint.image}
                alt="Complaint evidence"
                className="h-[300px] w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-400">
                No photo uploaded
              </div>
            )}

          </div>

          {/* AI INFORMATION */}
          <div>

            <p className="mb-3 text-sm font-bold text-slate-800">
              AI Classification
            </p>

            <div className="grid gap-3 sm:grid-cols-2">

              <InfoCard
                label="Category"
                value={complaint.category}
                icon="🏷️"
                className="bg-blue-50"
              />

              <InfoCard
                label="Severity"
                value={complaint.severity}
                icon="⚠️"
                className="bg-red-50"
              />

              <InfoCard
                label="Department"
                value={complaint.department}
                icon="🏢"
                className="bg-purple-50"
              />

              <InfoCard
                label="Confidence"
                value={`${complaint.confidence}%`}
                icon="🤖"
                className="bg-emerald-50"
              />

            </div>

          </div>

        </div>

      </section>

      {/* DESCRIPTION */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-bold text-slate-900">
          Complaint Description
        </h2>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5">

          <p className="text-sm leading-7 text-slate-700">
            {complaint.description}
          </p>

        </div>

      </section>

      {/* LOCATION */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Complaint Location
            </h2>

            <p className="text-xs text-slate-500">
              Location that will be sent with the complaint
            </p>
          </div>

        </div>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">

          <p className="font-semibold text-slate-800">
            {complaint.location}
          </p>

        </div>

      </section>

      {/* CONFIRMATION */}
      <section className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
            <CheckCircle2 size={21} />
          </div>

          <div>

            <h2 className="font-bold text-slate-900">
              Ready to submit?
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Please verify that the AI-generated information
              is correct. Once submitted, your complaint will
              be assigned to the appropriate department.
            </p>

          </div>

        </div>

      </section>

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 pb-8 sm:flex-row">

        <button
          onClick={() => navigate("/citizen/report")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-purple-300 hover:bg-purple-50"
        >
          <ArrowLeft size={17} />
          Edit Report
        </button>

        <button
          onClick={handleConfirm}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Confirm & Submit
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
  className,
}) {
  return (
    <div className={`rounded-2xl p-4 ${className}`}>

      <div className="text-xl">
        {icon}
      </div>

      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-extrabold text-slate-900">
        {value}
      </p>

    </div>
  );
}