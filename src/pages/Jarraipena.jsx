import {
  Activity, CheckCircle, Clock, Target, TrendingUp,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader, StatCard } from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import Badge from '../components/Badge'
import { KPI_LEHENETSIAK, KPI_KATEGORIAK, kalkulatuKPIAurrerabidea } from '../data/kpiak'

export default function Jarraipena({ store }) {
  const { state, updateKPI } = store
  const balioak = state.kpiBaloak
  const aurrerabidea = kalkulatuKPIAurrerabidea(KPI_LEHENETSIAK, balioak)

  const kategoriaKopuruak = KPI_KATEGORIAK.map((kat) => {
    const katKPIak = KPI_LEHENETSIAK.filter((k) => k.kategoria === kat.id)
    const betatuak = katKPIak.filter((kpi) => {
      const b = balioak[kpi.id]
      if (b === undefined) return false
      if (kpi.mota === 'bai_ez') return b === true
      return b >= kpi.helburua
    }).length
    return { ...kat, guztira: katKPIak.length, betatuak }
  })

  return (
    <div>
      <PageHeader
        title="Jarraipena eta KPIak"
        description="Digitalizazio prozesuaren adierazle nagusiak. Urtean zehar betetzen joan beharreko helburuak."
      />

      {/* Laburpena */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          label="KPI guztira"
          value={aurrerabidea.guztira}
          sublabel="adierazle"
          color="#3378ff"
          icon={Target}
        />
        <StatCard
          label="Beteta"
          value={aurrerabidea.betatuak}
          sublabel={`${aurrerabidea.ehunekoa}% beteta`}
          color="#22c55e"
          icon={CheckCircle}
        />
        <StatCard
          label="Hasi gabe"
          value={
            KPI_LEHENETSIAK.filter((k) => balioak[k.id] === undefined).length
          }
          sublabel="erregistratu gabeak"
          color="#94a3b8"
          icon={Clock}
        />
        <StatCard
          label="Aurrerabidea"
          value={`${aurrerabidea.ehunekoa}%`}
          sublabel="helburu orokorrarantz"
          color="#f59e0b"
          icon={TrendingUp}
        />
      </div>

      {/* Kategoriako aurrerabidea */}
      <Card className="mb-8">
        <CardHeader title="Kategoriako aurrerabidea" />
        <div className="grid grid-cols-5 gap-4">
          {kategoriaKopuruak.map((kat) => (
            <div key={kat.id} className="text-center">
              <div
                className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-2"
                style={{ backgroundColor: `${kat.kolorea}15` }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ color: kat.kolorea }}
                >
                  {kat.betatuak}/{kat.guztira}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-700">{kat.izena}</p>
              <ProgressBar
                value={kat.betatuak}
                max={kat.guztira}
                color={kat.kolorea}
                size="sm"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* KPI zerrenda */}
      <Card padding={false}>
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">
            Adierazle guztiak
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {KPI_LEHENETSIAK.map((kpi) => {
            const balioa = balioak[kpi.id]
            const kat = KPI_KATEGORIAK.find((k) => k.id === kpi.kategoria)
            const beteta =
              kpi.mota === 'bai_ez'
                ? balioa === true
                : balioa !== undefined && balioa >= kpi.helburua

            return (
              <div
                key={kpi.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-slate-800">
                      {kpi.izena}
                    </h4>
                    <Badge color={kat?.kolorea} variant="outline">
                      {kat?.izena}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {kpi.deskribapena}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Helburua */}
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400">Helburua</p>
                    <p className="text-xs font-medium text-slate-600">
                      {kpi.mota === 'bai_ez'
                        ? 'Bai'
                        : kpi.mota === 'ehunekoa'
                        ? `${kpi.helburua}%`
                        : kpi.helburua}
                    </p>
                  </div>

                  {/* Balioa sartu */}
                  <div className="w-28">
                    {kpi.mota === 'bai_ez' ? (
                      <button
                        onClick={() => updateKPI(kpi.id, balioa === true ? false : true)}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium border cursor-pointer ${
                          balioa === true
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : balioa === false
                            ? 'bg-red-50 border-red-300 text-red-700'
                            : 'bg-slate-50 border-slate-300 text-slate-500'
                        }`}
                      >
                        {balioa === true ? 'Bai' : balioa === false ? 'Ez' : 'Erregistratu'}
                      </button>
                    ) : (
                      <input
                        type="number"
                        placeholder={kpi.mota === 'ehunekoa' ? '0-100' : '0'}
                        className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-right focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={balioa ?? ''}
                        onChange={(e) =>
                          updateKPI(kpi.id, e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    )}
                  </div>

                  {/* Egoera */}
                  <div className="w-6">
                    {beteta ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : balioa !== undefined ? (
                      <Clock size={16} className="text-amber-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 ml-1" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
