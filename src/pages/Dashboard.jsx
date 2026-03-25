import {
  BarChart3,
  FileText,
  ListChecks,
  Activity,
  Heart,
  Brain,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import PageHeader from '../components/PageHeader'
import Card, { StatCard, EmptyState, CardHeader } from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import { DIAGNOSTIKO_DIMENTSIOAK, kalkulatuGuztira } from '../data/diagnostikoa'
import { KPI_LEHENETSIAK, kalkulatuKPIAurrerabidea } from '../data/kpiak'

export default function Dashboard({ store }) {
  const { state } = store
  const eskolaIzena = state.eskola.izena || 'Zure ikastetxea'
  const diagnostikoaAmaituta = state.diagnostikoa.amaituta
  const emaitzak = diagnostikoaAmaituta
    ? kalkulatuGuztira(state.diagnostikoa.erantzunak)
    : null

  const ekintzaKop = state.ekintzak.length
  const ekintzaAmaituta = state.ekintzak.filter(
    (e) => e.egoera === 'amaituta'
  ).length
  const ekintzaMartxan = state.ekintzak.filter(
    (e) => e.egoera === 'martxan'
  ).length

  const kpiProgress = kalkulatuKPIAurrerabidea(
    KPI_LEHENETSIAK,
    state.kpiBaloak
  )

  // Radar datuak
  const radarData = diagnostikoaAmaituta
    ? DIAGNOSTIKO_DIMENTSIOAK.map((dim) => {
        const em = emaitzak?.dimentsioak.find(
          (d) => d.dimentsioa.id === dim.id
        )
        return {
          dimentsioa: dim.izena.length > 20 ? dim.izena.substring(0, 18) + '...' : dim.izena,
          puntuazioa: em?.puntuazioa || 0,
          max: 5,
        }
      })
    : []

  return (
    <div>
      <PageHeader
        title={`Ongi etorri, ${eskolaIzena}`}
        description="Ikastetxearen digitalizazio prozesuaren ikuspegi orokorra. Hemendik, zure ibilbide estrategikoa kudea dezakezu."
      />

      {/* Egoera txartelak */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Heldutasun orokorra"
          value={
            emaitzak?.orokorra
              ? `${emaitzak.orokorra}/5`
              : '—'
          }
          sublabel={emaitzak?.mailaOrokorra?.izena || 'Diagnostikoa bete gabe'}
          color="#3378ff"
          icon={BarChart3}
        />
        <StatCard
          label="Ekintzak"
          value={ekintzaKop > 0 ? `${ekintzaAmaituta}/${ekintzaKop}` : '—'}
          sublabel={
            ekintzaKop > 0
              ? `${ekintzaMartxan} martxan`
              : 'Ekintza planik gabe'
          }
          color="#22c55e"
          icon={ListChecks}
        />
        <StatCard
          label="KPI aurrerabidea"
          value={kpiProgress.guztira > 0 ? `${kpiProgress.ehunekoa}%` : '—'}
          sublabel={
            kpiProgress.guztira > 0
              ? `${kpiProgress.betatuak}/${kpiProgress.guztira} beteta`
              : 'KPIak erregistratu gabe'
          }
          color="#f59e0b"
          icon={Activity}
        />
        <StatCard
          label="Dokumentuak"
          value={Object.keys(state.dokumentuak).length}
          sublabel="sortutako dokumentuak"
          color="#8b5cf6"
          icon={FileText}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Ezkerreko bi zutabe */}
        <div className="col-span-2 space-y-6">
          {/* Heldutasun radar */}
          <Card>
            <CardHeader
              title="Heldutasun digitalaren profila"
              description="12 dimentsioen ikuspegi orokorra"
              action={
                diagnostikoaAmaituta && (
                  <Link
                    to="/heldutasuna"
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    Ikusi xehetasuna <ArrowRight size={12} />
                  </Link>
                )
              }
            />
            {diagnostikoaAmaituta ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                      dataKey="dimentsioa"
                      tick={{ fill: '#64748b', fontSize: 10 }}
                    />
                    <Radar
                      name="Puntuazioa"
                      dataKey="puntuazioa"
                      stroke="#3378ff"
                      fill="#3378ff"
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                icon={BarChart3}
                title="Diagnostikoa oraindik bete gabe"
                description="Heldutasun profila ikusteko, lehenik diagnostiko galdetegia bete behar duzu."
                action={
                  <Link
                    to="/diagnostikoa"
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary-600 hover:text-primary-700"
                  >
                    Diagnostikoa hasi <ArrowRight size={12} />
                  </Link>
                }
              />
            )}
          </Card>

          {/* Hurrengo pausoak */}
          <Card>
            <CardHeader
              title="Hurrengo pausoak"
              description="Egin beharreko ekintza nagusiak"
            />
            <div className="space-y-3">
              <NextStep
                done={!!state.eskola.izena}
                label="Ikastetxearen profila bete"
                link="/ezarpenak"
              />
              <NextStep
                done={diagnostikoaAmaituta}
                label="Diagnostikoa osatu"
                link="/diagnostikoa"
              />
              <NextStep
                done={diagnostikoaAmaituta && Object.keys(state.dokumentuak).includes('ipd')}
                label="IPD zirriborroa sortu"
                link="/ipd"
              />
              <NextStep
                done={ekintzaKop > 0}
                label="Ekintza plana definitu"
                link="/ekintzak"
              />
              <NextStep
                done={kpiProgress.betatuak > 0}
                label="KPIak erregistratzen hasi"
                link="/jarraipena"
              />
            </div>
          </Card>
        </div>

        {/* Eskuineko zutabea */}
        <div className="space-y-6">
          {/* Arlo estrategikoak */}
          <Card>
            <CardHeader title="Arlo estrategikoak" />
            <div className="space-y-3">
              <AreaLink
                icon={Heart}
                label="Ongizate digitala"
                color="#14b8a6"
                link="/ongizatea"
              />
              <AreaLink
                icon={Brain}
                label="AA gobernantza"
                color="#6366f1"
                link="/aa"
              />
              <AreaLink
                icon={Sparkles}
                label="Familien orientazioa"
                color="#f97316"
                link="/familiak"
              />
            </div>
          </Card>

          {/* KPI laburpena */}
          <Card>
            <CardHeader
              title="KPI laburpena"
              action={
                <Link
                  to="/jarraipena"
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Ikusi guztiak
                </Link>
              }
            />
            {KPI_LEHENETSIAK.slice(0, 5).map((kpi) => {
              const balioa = state.kpiBaloak[kpi.id]
              const beteta =
                kpi.mota === 'bai_ez'
                  ? balioa === true
                  : balioa >= kpi.helburua
              return (
                <div
                  key={kpi.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <span className="text-xs text-slate-700">{kpi.izena}</span>
                  {balioa !== undefined ? (
                    beteta ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <Clock size={14} className="text-amber-500" />
                    )
                  ) : (
                    <span className="text-[10px] text-slate-400">—</span>
                  )}
                </div>
              )
            })}
          </Card>

          {/* Oharra */}
          <div className="rounded-xl bg-primary-50 border border-primary-200 p-4">
            <div className="flex gap-3">
              <AlertCircle size={16} className="text-primary-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-primary-800">
                  Adimen Digitala 2025-2029
                </p>
                <p className="text-[11px] text-primary-700 mt-1 leading-relaxed">
                  Plataforma honek Eusko Jaurlaritzaren plan estrategikoan
                  oinarritutako tresnak eskaintzen ditu. Ikastetxe bakoitzak
                  bere erritmoan aurrera egin dezake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NextStep({ done, label, link }) {
  return (
    <Link
      to={link}
      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 group"
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          done
            ? 'bg-green-500 border-green-500'
            : 'border-slate-300'
        }`}
      >
        {done && <CheckCircle size={12} className="text-white" />}
      </div>
      <span
        className={`text-sm ${
          done ? 'text-slate-400 line-through' : 'text-slate-700'
        } group-hover:text-primary-600`}
      >
        {label}
      </span>
      <ArrowRight
        size={14}
        className="ml-auto text-slate-300 group-hover:text-primary-500"
      />
    </Link>
  )
}

function AreaLink({ icon: Icon, label, color, link }) {
  return (
    <Link
      to={link}
      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 group"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <span className="text-sm text-slate-700 group-hover:text-primary-600 font-medium">
        {label}
      </span>
      <ArrowRight
        size={14}
        className="ml-auto text-slate-300 group-hover:text-primary-500"
      />
    </Link>
  )
}
