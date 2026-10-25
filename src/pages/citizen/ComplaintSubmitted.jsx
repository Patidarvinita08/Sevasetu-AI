import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  Home,
  MapPin,
  Sparkles,
  TicketCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComplaintSubmitted() {
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [complaintId, setComplaintId] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("sevasetuComplaint");

    if (saved) {
      try {
        const data = JSON.parse(saved);

        const generatedId =
          data.complaintId ||
          `SVS-${Math.floor(1000 + Math.random() * 9000)}`;

        const finalComplaint = {
          ...data,
          complaintId: generatedId,
          submitted: true,
          status: "Reported",
        };

        sessionStorage.setItem(
          "sevasetuComplaint",
          JSON.stringify(finalComplaint)
        );

        setComplaint(finalComplaint);
        setComplaintId(generatedId);

        // Save it for My Complaints
        const existing =
          JSON.parse(
            localStorage.getItem("sevasetuComplaints") || "[]"
          );

        const alreadyExists = existing.some(
          (item) => item.complaintId === generatedId
        );

        if (!alreadyExists) {
          localStorage.setItem(
            "sevasetuComplaints",
            JSON.stringify([
              finalComplaint,
              ...existing,
            ])
          );
        }
      } catch (error) {
        console.error(
          "Unable to process complaint:",
          error
        );
      }
    }
  }, []);

  const copyComplaintId = async () => {
    if (!complaintId) return;

    try {
      await navigator.clipboard.writeText(complaintId);
      alert("Complaint ID copied!");
    } catch {
      alert(`Complaint ID: ${complaintId}`);
    }
  };

  if (!complaint) {
    return (
      <div className="mx-auto max-w-2xl py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <TicketCheck
              size={30}
              className="text-slate-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Complaint information unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please create a complaint first.
          </p>

          <button
            onClick={() => navigate("/citizen/report")}
            className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white"
          >
            Report an Issue
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* SUCCESS */}
      <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600 p-8 text-center text-white shadow-xl md:p-12">

        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-500 shadow-xl">

            <CheckCircle2 size={44} />

          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold">
            <Sparkles size={14} />
            SevaSetu AI
          </div>

          <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Complaint Submitted Successfully!
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-emerald-50 md:text-base">
            Your civic issue has been registered and sent to
            the appropriate department for action.
          </p>

        </div>

      </section>

      {/* COMPLAINT ID */}
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">

        <div className="text-center">

          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Your Complaint ID
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">

            <span className="text-3xl font-black tracking-wider text-slate-900">
              {complaintId}
            </span>

            <button
              onClick={copyComplaintId}
              title="Copy complaint ID"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-emerald-100 hover:text-emerald-600"
            >
              <Copy size={17} />
            </button>

          </div>

          <p className="mt-2 text-sm text-slate-500">
            Keep this ID to track your complaint.
          </p>

        </div>

      </section>

      {/* SUMMARY */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ClipboardCheck size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Complaint Summary
              </h2>

              <p className="text-xs text-slate-500">
                Details registered with SevaSetu
              </p>
            </div>

          </div>

        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">

          <Summary
            label="Category"
            value={complaint.category}
            icon="🏷️"
            className="bg-blue-50"
          />

          <Summary
            label="Priority"
            value={complaint.severity}
            icon="⚠️"
            className="bg-red-50"
          />

          <Summary
            label="Department"
            value={complaint.department}
            icon="🏢"
            className="bg-purple-50"
          />

          <Summary
            label="Status"
            value="Reported"
            icon="📋"
            className="bg-emerald-50"
          />

        </div>

        <div className="border-t border-slate-100 p-6">

          <div className="flex gap-3">

            <MapPin
              size={19}
              className="mt-1 shrink-0 text-blue-500"
            />

            <div>

              <p className="text-xs font-semibold text-slate-400">
                LOCATION
              </p>

              <p className="mt-1 font-bold text-slate-800">
                {complaint.location}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* NEXT STEPS */}
      <section className="rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500 text-white shadow-lg shadow-purple-200">
            <Sparkles size={20} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              What happens next?
            </h2>

            <p className="text-xs text-slate-500">
              SevaSetu workflow
            </p>
          </div>

        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <NextStep
            number="01"
            title="Department Review"
            text="The responsible department receives your complaint."
          />

          <NextStep
            number="02"
            title="Action"
            text="The department assigns and works on the issue."
          />

          <NextStep
            number="03"
            title="Resolution"
            text="You can track progress until the issue is resolved."
          />

        </div>

      </section>

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 pb-8 sm:flex-row">

        <button
          onClick={() => navigate("/citizen")}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          <Home size={17} />
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate(
              `/citizen/complaints/${complaintId}`
            )
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Track Complaint
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}

function Summary({
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

      <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-extrabold text-slate-900">
        {value}
      </p>

    </div>
  );
}

function NextStep({
  number,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-white bg-white/80 p-4">

      <span className="text-xs font-black text-purple-500">
        {number}
      </span>

      <h3 className="mt-2 text-sm font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>

    </div>
  );
}