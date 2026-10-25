import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  PlusCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import Card from "../../components/common/Card";
import StatusBadge from "../../components/common/StatusBadge";
import { complaints } from "../../data/mockData";

export default function CitizenDashboard() {
  const reported = complaints.filter(
    (item) => item.status === "Reported"
  ).length;

  const progress = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <div className="space-y-7">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 p-7 text-white shadow-xl">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div className="max-w-xl">

            <div className="mb-3 flex items-center gap-2">

              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                ✨ AI-Powered Civic Services
              </span>

            </div>

            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Make your city better.
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50 md:text-base">
              Report civic problems in seconds. SevaSetu AI
              analyzes your complaint and connects it with the
              right department.
            </p>

          </div>

          <Link to="/citizen/report">
            <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">

              <PlusCircle size={20} />

              Report an Issue

              <ArrowRight size={17} />

            </button>
          </Link>

        </div>

      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Reported */}
        <div className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-200/40 blur-xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-blue-600">
                Reported
              </p>

              <p className="mt-2 text-4xl font-extrabold text-slate-900">
                {reported}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Awaiting assignment
              </p>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-200">
              <AlertTriangle size={25} />
            </div>

          </div>

        </div>

        {/* Progress */}
        <div className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-200/40 blur-xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-orange-600">
                In Progress
              </p>

              <p className="mt-2 text-4xl font-extrabold text-slate-900">
                {progress}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Being worked on
              </p>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-200">
              <Clock3 size={25} />
            </div>

          </div>

        </div>

        {/* Resolved */}
        <div className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/40 blur-xl" />

          <div className="relative flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-emerald-600">
                Resolved
              </p>

              <p className="mt-2 text-4xl font-extrabold text-slate-900">
                {resolved}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Successfully completed
              </p>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200">
              <CheckCircle2 size={25} />
            </div>

          </div>

        </div>

      </div>

      {/* AI banner */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 via-white to-blue-50 p-5">

        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-300/20 blur-3xl" />

        <div className="relative flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-200">
            <Sparkles size={23} />
          </div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-bold text-slate-900">
                SevaSetu AI Assistant
              </h3>

              <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-purple-700">
                Smart
              </span>

            </div>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Upload a photo and describe the issue. Our AI
              prototype will classify the problem, estimate
              priority and suggest the responsible department.
            </p>

          </div>

          <ShieldCheck
            className="hidden text-purple-300 sm:block"
            size={30}
          />

        </div>

      </div>

      {/* Complaints */}
      <Card
        title="Recent Complaints"
        subtitle="Track your latest civic reports"
      >

        <div className="space-y-3">

          {complaints.slice(0, 4).map((complaint) => (

            <div
              key={complaint.id}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm md:flex-row md:items-center md:justify-between"
            >

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-blue-100 text-emerald-700">
                  <TrendingUp size={19} />
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="text-xs font-bold text-emerald-600">
                      {complaint.id}
                    </span>

                    <StatusBadge status={complaint.status} />

                  </div>

                  <h3 className="mt-1.5 font-semibold text-slate-800">
                    {complaint.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    📍 {complaint.location}
                  </p>

                </div>

              </div>

              <Link
                to={`/citizen/complaints/${complaint.id}`}
                className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition group-hover:bg-white group-hover:text-emerald-600"
              >
                View
                <ArrowRight size={16} />
              </Link>

            </div>

          ))}

        </div>

      </Card>

    </div>
  );
}