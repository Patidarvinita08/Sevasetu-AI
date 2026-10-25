import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  MapPin,
  LogOut,
  ShieldCheck,
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
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-950 text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold">SevaSetu AI</h1>
          <p className="text-xs text-slate-400">
            Citizen Services
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-6">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/citizen"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}