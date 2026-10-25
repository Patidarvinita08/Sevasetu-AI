import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function CitizenLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 bg-[#020617] text-white md:block">

        <div className="flex h-24 items-center gap-3 border-b border-white/10 px-6">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">
            <ShieldCheck size={27} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold">
              SevaSetu AI
            </h1>

            <p className="text-xs text-slate-400">
              Citizen Services
            </p>
          </div>

        </div>

        <nav className="space-y-2 p-4">

          <NavLink
            to="/citizen"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/citizen/report"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <PlusCircle size={19} />
            Report an Issue
          </NavLink>

          <NavLink
            to="/citizen/complaints"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <ClipboardList size={19} />
            My Complaints
          </NavLink>

        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-300">
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      <main className="min-h-screen md:ml-64">

        <div className="p-4 md:p-7 lg:p-9">

          <Outlet />

        </div>

      </main>

    </div>
  );
}