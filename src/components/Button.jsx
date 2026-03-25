const VARIANTS = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm',
  ghost:
    'text-slate-600 hover:bg-slate-100',
  danger:
    'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  success:
    'bg-green-600 text-white hover:bg-green-700 shadow-sm',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg cursor-pointer ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
    </button>
  )
}
