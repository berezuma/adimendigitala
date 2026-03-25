import { useState } from 'react'
import {
  Plus, ListChecks, Trash2, Edit3, ChevronDown, ChevronUp,
  Lightbulb, CheckCircle, Clock, AlertTriangle, XCircle, Play,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader, EmptyState } from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { EKINTZA_EGOERAK, LEHENTASUN_MAILAK, EKINTZA_IRADOKIZUNAK, lortuIradokizunak } from '../data/ekintzak'
import { DIAGNOSTIKO_DIMENTSIOAK, kalkulatuGuztira } from '../data/diagnostikoa'

const EGOERA_IKONOAK = {
  pendiente: Clock,
  martxan: Play,
  atzeratua: AlertTriangle,
  amaituta: CheckCircle,
  bertan_behera: XCircle,
}

export default function EkintzaPlana({ store }) {
  const { state, addEkintza, updateEkintza, removeEkintza } = store
  const [erakutsiFormularioa, setErakutsiFormularioa] = useState(false)
  const [erakutsiIradokizunak, setErakutsiIradokizunak] = useState(false)
  const [iragazkia, setIragazkia] = useState('guztiak')
  const [ekintzaBerria, setEkintzaBerria] = useState({
    izenburua: '',
    deskribapena: '',
    dimentsioa: '',
    lehentasuna: 'ertaina',
    ardura: '',
    hasiera_data: '',
    amaiera_data: '',
    oharrak: '',
  })

  const ekintzak = state.ekintzak
  const emaitzak = state.diagnostikoa.amaituta
    ? kalkulatuGuztira(state.diagnostikoa.erantzunak)
    : null
  const iradokizunak = lortuIradokizunak(emaitzak)

  const ekintzaIragaziak =
    iragazkia === 'guztiak'
      ? ekintzak
      : ekintzak.filter((e) => e.egoera === iragazkia)

  function gehituEkintza() {
    if (!ekintzaBerria.izenburua.trim()) return
    addEkintza(ekintzaBerria)
    setEkintzaBerria({
      izenburua: '',
      deskribapena: '',
      dimentsioa: '',
      lehentasuna: 'ertaina',
      ardura: '',
      hasiera_data: '',
      amaiera_data: '',
      oharrak: '',
    })
    setErakutsiFormularioa(false)
  }

  function gehituIradokizuna(ir) {
    addEkintza({
      izenburua: ir.izenburua,
      deskribapena: ir.deskribapena,
      dimentsioa: ir.dimentsioa,
      lehentasuna: ir.lehentasuna,
      ardura: '',
      hasiera_data: '',
      amaiera_data: '',
      oharrak: '',
    })
  }

  // Laburpena
  const egoera_kopuruak = EKINTZA_EGOERAK.map((eg) => ({
    ...eg,
    kopurua: ekintzak.filter((e) => e.egoera === eg.id).length,
  }))

  return (
    <div>
      <PageHeader
        title="Ekintza plana"
        description="Digitalizazio prozesuaren ekintza zehatzak definitu, antolatu eta jarraitu. Estrategiatik exekuziora."
      >
        <Button icon={Plus} onClick={() => setErakutsiFormularioa(true)}>
          Ekintza berria
        </Button>
      </PageHeader>

      {/* Egoera laburpena */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {egoera_kopuruak.map((eg) => (
          <button
            key={eg.id}
            onClick={() => setIragazkia(iragazkia === eg.id ? 'guztiak' : eg.id)}
            className={`bg-white rounded-xl border p-3 text-center cursor-pointer hover:border-slate-300 ${
              iragazkia === eg.id ? 'border-primary-500 ring-1 ring-primary-200' : 'border-slate-200'
            }`}
          >
            <p className="text-xl font-bold" style={{ color: eg.kolorea }}>
              {eg.kopurua}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">{eg.izena}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Ekintza zerrenda */}
        <div className="col-span-2">
          {/* Formulario berria */}
          {erakutsiFormularioa && (
            <Card className="mb-4 border-primary-200 bg-primary-50/30">
              <CardHeader title="Ekintza berria gehitu" />
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ekintzaren izenburua"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={ekintzaBerria.izenburua}
                  onChange={(e) =>
                    setEkintzaBerria((prev) => ({
                      ...prev,
                      izenburua: e.target.value,
                    }))
                  }
                />
                <textarea
                  placeholder="Deskribapena (aukerakoa)"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
                  value={ekintzaBerria.deskribapena}
                  onChange={(e) =>
                    setEkintzaBerria((prev) => ({
                      ...prev,
                      deskribapena: e.target.value,
                    }))
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={ekintzaBerria.dimentsioa}
                    onChange={(e) =>
                      setEkintzaBerria((prev) => ({
                        ...prev,
                        dimentsioa: e.target.value,
                      }))
                    }
                  >
                    <option value="">Dimentsioa (aukerakoa)</option>
                    {DIAGNOSTIKO_DIMENTSIOAK.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.izena}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={ekintzaBerria.lehentasuna}
                    onChange={(e) =>
                      setEkintzaBerria((prev) => ({
                        ...prev,
                        lehentasuna: e.target.value,
                      }))
                    }
                  >
                    {LEHENTASUN_MAILAK.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.izena}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Ardura (pertsona edo taldea)"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={ekintzaBerria.ardura}
                  onChange={(e) =>
                    setEkintzaBerria((prev) => ({
                      ...prev,
                      ardura: e.target.value,
                    }))
                  }
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setErakutsiFormularioa(false)}
                  >
                    Utzi
                  </Button>
                  <Button size="sm" onClick={gehituEkintza}>
                    Gehitu
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Ekintza zerrenda */}
          {ekintzaIragaziak.length === 0 ? (
            <Card>
              <EmptyState
                icon={ListChecks}
                title={
                  ekintzak.length === 0
                    ? 'Oraindik ez dago ekintzarik'
                    : 'Ez dago ekintzarik iragazki honekin'
                }
                description="Gehitu ekintzak zure digitalizazio-planari forma emateko, edo erabili iradokizunak diagnostikoaren arabera."
              />
            </Card>
          ) : (
            <div className="space-y-2">
              {ekintzaIragaziak.map((ekintza) => {
                const egoera = EKINTZA_EGOERAK.find(
                  (e) => e.id === ekintza.egoera
                )
                const lehentasuna = LEHENTASUN_MAILAK.find(
                  (l) => l.id === ekintza.lehentasuna
                )
                const EgoeraIcon = EGOERA_IKONOAK[ekintza.egoera] || Clock

                return (
                  <Card key={ekintza.id} padding={false}>
                    <div className="px-5 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <EgoeraIcon
                            size={16}
                            style={{ color: egoera?.kolorea }}
                            className="mt-0.5 shrink-0"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-slate-800">
                              {ekintza.izenburua}
                            </h3>
                            {ekintza.deskribapena && (
                              <p className="text-xs text-slate-500 mt-1">
                                {ekintza.deskribapena}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {lehentasuna && (
                                <Badge color={lehentasuna.kolorea} variant="outline">
                                  {lehentasuna.izena}
                                </Badge>
                              )}
                              {ekintza.ardura && (
                                <span className="text-[10px] text-slate-400">
                                  {ekintza.ardura}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <select
                            className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none"
                            value={ekintza.egoera}
                            onChange={(e) =>
                              updateEkintza(ekintza.id, {
                                egoera: e.target.value,
                              })
                            }
                          >
                            {EKINTZA_EGOERAK.map((eg) => (
                              <option key={eg.id} value={eg.id}>
                                {eg.izena}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeEkintza(ekintza.id)}
                            className="p-1 hover:bg-red-50 rounded cursor-pointer"
                          >
                            <Trash2 size={14} className="text-slate-400 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Iradokizunak */}
        <div>
          <Card>
            <CardHeader
              title="Iradokitutako ekintzak"
              description="Diagnostikoaren emaitzetan oinarrituta"
              action={
                <Lightbulb size={16} className="text-amber-500" />
              }
            />
            <div className="space-y-2">
              {iradokizunak.slice(0, 8).map((ir, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${
                    ir.iradokita
                      ? 'border-amber-200 bg-amber-50'
                      : 'border-slate-200'
                  }`}
                >
                  <p className="text-xs font-medium text-slate-800">
                    {ir.izenburua}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                    {ir.deskribapena}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      color={
                        LEHENTASUN_MAILAK.find((l) => l.id === ir.lehentasuna)
                          ?.kolorea
                      }
                      variant="outline"
                    >
                      {ir.lehentasuna}
                    </Badge>
                    <button
                      onClick={() => gehituIradokizuna(ir)}
                      className="text-[10px] text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      Gehitu <Plus size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
