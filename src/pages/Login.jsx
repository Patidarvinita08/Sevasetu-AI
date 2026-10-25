import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
            <ShieldCheck size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            SevaSetu AI
          </h1>

          <p className="mt-2 text-slate-500">
            AI-powered citizen grievance platform
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h2 className="text-xl font-bold text-slate-900">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose a prototype portal to continue.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              to="/citizen"
              className="flex items-center justify-between rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Citizen Portal
              <ArrowRight size={19} />
            </Link>

            <Link
              to="/admin"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-5 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Admin Portal
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          SevaSetu AI • Prototype
        </p>
      </div>
    </div>
  );
}