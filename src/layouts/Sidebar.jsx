import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  FileText,
  FolderOpen,
  ListChecks,
  Activity,
  Heart,
  Brain,
  Home,
  FileDown,
  Settings,
  Sparkles,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboarda' },
  { to: '/diagnostikoa', icon: ClipboardList, label: 'Diagnostikoa' },
  { to: '/heldutasuna', icon: BarChart3, label: 'Heldutasun mapa' },
  { to: '/ipd', icon: FileText, label: 'IPD sortzailea' },
  { to: '/dokumentuak', icon: FolderOpen, label: 'Dokumentu-lantegia' },
  { to: '/ekintzak', icon: ListChecks, label: 'Ekintza plana' },
  { to: '/jarraipena', icon: Activity, label: 'Jarraipena eta KPIak' },
  { divider: true, label: 'Arlo espezifikoak' },
  { to: '/ongizatea', icon: Heart, label: 'Ongizate digitala' },
  { to: '/aa', icon: Brain, label: 'AA eta gardentasuna' },
  { to: '/familiak', icon: Home, label: 'Familien orientazioa' },
  { divider: true, label: 'Irteerak' },
  { to: '/txostenak', icon: FileDown, label: 'Txostenak' },
  { to: '/ezarpenak', icon: Settings, label: 'Ezarpenak' },
]

export default function Sidebar() {
  return (
    <aside className="no-print fixed left-0 top-0 bottom-0 w-64 bg-[#0f172a] text-[#94a3b8] flex flex-col z-50">
      {/* Logoa */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">
              Adimen Digitala
            </h1>
            <p className="text-[11px] text-[#64748b] leading-tight">
              Ikastetxeen plataforma
            </p>
          </div>
        </div>
      </div>

      {/* Nabigazioa */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {NAV_ITEMS.map((item, i) => {
          if (item.divider) {
            return (
              <div key={i} className="mt-5 mb-2 px-3">
                <span className="text-[10px] uppercase tracking-wider text-[#475569] font-semibold">
                  {item.label}
                </span>
              </div>
            )
          }

          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium mb-0.5 ${
                  isActive
                    ? 'bg-[#1e3a5f] text-white'
                    : 'hover:bg-[#1e293b] hover:text-[#e2e8f0]'
                }`
              }
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Oina */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-[10px] text-[#475569] leading-relaxed">
          Adimen Digitala 2025-2029
          <br />
          Eusko Jaurlaritzaren planean oinarritua
        </p>
      </div>
    </aside>
  )
}
