import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  PlusCircle,
  ArrowRight,
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
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Welcome back
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Citizen Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Report civic issues and track their resolution.
          </p>
        </div>

        <Link to="/citizen/report">
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700">
            <PlusCircle size={19} />
            Report an Issue
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Reported
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {reported}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <AlertTriangle size={23} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {progress}
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Clock3 size={23} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {resolved}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle2 size={23} />
            </div>
          </div>
        </Card>
      </div>

      <Card
        title="Recent Complaints"
        subtitle="Track your latest civic reports"
      >
        <div className="space-y-3">
          {complaints.slice(0, 4).map((complaint) => (
            <div
              key={complaint.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600">
                    {complaint.id}
                  </span>

                  <StatusBadge status={complaint.status} />
                </div>

                <h3 className="mt-2 font-semibold text-slate-800">
                  {complaint.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {complaint.location}
                </p>
              </div>

              <Link
                to={`/citizen/complaints/${complaint.id}`}
                className="flex items-center gap-1 text-sm font-semibold text-emerald-600"
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