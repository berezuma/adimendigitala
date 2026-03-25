export default function Badge({ children, color = '#64748b', variant = 'filled' }) {
  if (variant === 'outline') {
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border"
        style={{ color, borderColor: `${color}40` }}
      >
        {children}
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  )
}
