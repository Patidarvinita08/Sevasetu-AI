import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  LogOut,
  ShieldCheck,
  Sparkles,
  MapPin,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    label: "Dashboard",
    path: "/citizen",
    icon: LayoutDashboard,
  },
  {
    label: "Report an Issue",
    path: "/citizen/report",
    icon: PlusCircle,
  },
  {
    label: "My Complaints",
    path: "/citizen/complaints",
    icon: ClipboardList,
  },
];

export default function CitizenSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-hidden bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white shadow-2xl">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Logo */}
      <div className="relative border-b border-white/10 px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/30">

            <ShieldCheck size={26} />

            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-slate-950" />

          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              SevaSetu
            </h1>

            <div className="flex items-center gap-1 text-xs text-emerald-300">
              <Sparkles size={11} />
              AI Citizen Services
            </div>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="relative flex-1 space-y-2 px-4 py-7">

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Citizen Portal
        </p>

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/citizen"}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-900/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon
                size={19}
                className="transition-transform group-hover:scale-110"
              />

              {link.label}
            </NavLink>
          );
        })}

        {/* Location card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">

          <div className="flex items-center gap-2 text-blue-300">
            <MapPin size={17} />

            <span className="text-xs font-semibold">
              Current Location
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-white">
            Indore, Madhya Pradesh
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Location will be confirmed before submission.
          </p>

        </div>

      </nav>

      {/* User */}
      <div className="relative border-t border-white/10 p-4">

        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/5 p-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-bold">
            V
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Citizen User
            </p>

            <p className="text-xs text-slate-400">
              Verified Citizen
            </p>
          </div>

        </div>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-300">
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}