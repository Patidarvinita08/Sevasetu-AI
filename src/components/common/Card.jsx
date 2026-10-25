export default function Card({
  children,
  className = "",
  title,
  subtitle,
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {(title || subtitle) && (
        <div className="border-b border-slate-100 px-5 py-4">
          {title && (
            <h3 className="text-lg font-semibold text-slate-800">
              {title}
            </h3>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  );
}