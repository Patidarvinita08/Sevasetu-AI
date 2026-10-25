const variants = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
  outline:
    "border border-emerald-600 text-emerald-700 hover:bg-emerald-50",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-xl px-4 py-2.5 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}