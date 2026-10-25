import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Complaints",
      path: "/admin/complaints",
      icon: ClipboardList,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "Departments",
      path: "/admin/departments",
      icon: Users,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-white shadow-2xl transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* BRAND */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg">
              <ShieldCheck
                size={23}
                className="text-slate-950"
              />
            </div>

            <div>
              <h1 className="font-black">
                SevaSetu
              </h1>

              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                Admin Console
              </p>
            </div>

          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* ADMIN PROFILE */}
        <div className="mx-4 mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 font-black text-slate-900">
              A
            </div>

            <div>
              <p className="text-sm font-bold">
                Administrator
              </p>

              <p className="text-xs text-indigo-300">
                Civic Operations
              </p>
            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 px-4 py-6">

          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            Management
          </p>

          {navigation.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                      : "text-indigo-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}

        </nav>

        {/* LOGOUT */}
        <div className="border-t border-white/10 p-4">

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-indigo-200 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <div className="lg:pl-72">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 shadow-sm backdrop-blur md:px-8">

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl bg-slate-100 p-2 text-slate-600 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="hidden lg:block">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Civic Operations Center
            </p>

            <h2 className="text-lg font-extrabold text-slate-900">
              SevaSetu AI Administration
            </h2>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-xs font-bold text-slate-900">
                Administrator
              </p>

              <p className="text-[10px] text-slate-400">
                Online
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 font-black text-white">
              A
            </div>

          </div>

        </header>

        {/* PAGE */}
        <main className="min-h-[calc(100vh-5rem)] p-5 md:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}