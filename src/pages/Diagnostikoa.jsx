import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2,
  Wifi,
  Shield,
  GraduationCap,
  Users,
  BookOpen,
  Brain,
  Lock,
  Heart,
  Home,
  Globe,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { DIAGNOSTIKO_DIMENTSIOAK } from '../data/diagnostikoa'

const IKONOAK = {
  Building2, Wifi, Shield, GraduationCap, Users, BookOpen,
  Brain, Lock, Heart, Home, Globe, BarChart3,
}

const LIKERT_AUKERAK = [
  { balioa: 1, etiketa: 'Oso baxua', deskribapena: 'Ez dago ia ezer egiten arlo honetan.' },
  { balioa: 2, etiketa: 'Baxua', deskribapena: 'Zerbait hasten ari da baina ez da nahikoa.' },
  { balioa: 3, etiketa: 'Ertaina', deskribapena: 'Oinarrizko neurriak hartuak dira.' },
  { balioa: 4, etiketa: 'Altua', deskribapena: 'Ondo garatuta dago, sistematikoa da.' },
  { balioa: 5, etiketa: 'Oso altua', deskribapena: 'Maila bikaina, eredugarria da.' },
]

export default function Diagnostikoa({ store }) {
  const { state, updateDiagnostikoa, markDiagnostikoaAmaituta } = store
  const navigate = useNavigate()
  const [dimAktiboa, setDimAktiboa] = useState(0)
  const [tooltipId, setTooltipId] = useState(null)

  const erantzunak = state.diagnostikoa.erantzunak
  const dim = DIAGNOSTIKO_DIMENTSIOAK[dimAktiboa]
  const Icon = IKONOAK[dim.ikonoa] || Building2

  // Aurrerabidea
  const guztiraAdierazleak = DIAGNOSTIKO_DIMENTSIOAK.reduce(
    (acc, d) => acc + d.adierazleak.length,
    0
  )
  const erantzundakoak = Object.keys(erantzunak).length
  const aurrerabidea = Math.round((erantzundakoak / guztiraAdierazleak) * 100)

  // Dimentsioko aurrerabidea
  const dimErantzundakoak = dim.adierazleak.filter(
    (a) => erantzunak[a.id] !== undefined
  ).length

  const hurrengoaAhalDu = dimErantzundakoak === dim.adierazleak.length
  const amaituAhalDu = erantzundakoak === guztiraAdierazleak

  function amaitu() {
    markDiagnostikoaAmaituta()
    navigate('/heldutasuna')
  }

  return (
    <div>
      <PageHeader
        title="Diagnostiko adimenduna"
        description="Ebaluatu zure ikastetxearen egoera digitala 12 dimentsiotan. Erantzun bakoitzak zure heldutasun digitalaren profila osatzen laguntzen du."
      />

      {/* Aurrerabidea */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-600">
            Aurrerabide orokorra
          </span>
          <span className="text-xs text-slate-500">
            {erantzundakoak}/{guztiraAdierazleak} adierazle
          </span>
        </div>
        <ProgressBar value={aurrerabidea} showLabel />
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Dimentsioen zerrenda */}
        <div className="col-span-4">
          <Card padding={false}>
            <div className="p-4 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Dimentsioak ({DIAGNOSTIKO_DIMENTSIOAK.length})
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {DIAGNOSTIKO_DIMENTSIOAK.map((d, i) => {
                const DIcon = IKONOAK[d.ikonoa] || Building2
                const erantzunda = d.adierazleak.filter(
                  (a) => erantzunak[a.id] !== undefined
                ).length
                const osoa = erantzunda === d.adierazleak.length

                return (
                  <button
                    key={d.id}
                    onClick={() => setDimAktiboa(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer hover:bg-slate-50 ${
                      i === dimAktiboa ? 'bg-primary-50 border-l-2 border-primary-500' : ''
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${d.kolorea}15` }}
                    >
                      <DIcon size={14} style={{ color: d.kolorea }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">
                        {d.izena}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {erantzunda}/{d.adierazleak.length}{' '}
                        {osoa && (
                          <CheckCircle
                            size={10}
                            className="inline text-green-500 ml-1"
                          />
                        )}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Galdetegi area */}
        <div className="col-span-8">
          <Card>
            {/* Dimentsio goiburua */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${dim.kolorea}15` }}
              >
                <Icon size={20} style={{ color: dim.kolorea }} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{dim.izena}</h2>
                <p className="text-xs text-slate-500">{dim.deskribapena}</p>
              </div>
            </div>

            {/* Adierazleak */}
            <div className="space-y-6">
              {dim.adierazleak.map((adierazle, idx) => (
                <div key={adierazle.id} className="relative">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xs font-medium text-slate-400 mt-0.5 w-5 text-right shrink-0">
                      {idx + 1}.
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-800 font-medium leading-relaxed">
                        {adierazle.testua}
                      </p>
                      {adierazle.laguntza && (
                        <button
                          onClick={() =>
                            setTooltipId(
                              tooltipId === adierazle.id ? null : adierazle.id
                            )
                          }
                          className="flex items-center gap-1 mt-1 text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <HelpCircle size={12} />
                          <span>Laguntza</span>
                        </button>
                      )}
                      {tooltipId === adierazle.id && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {adierazle.laguntza}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Likert eskala */}
                  <div className="ml-8 grid grid-cols-5 gap-2">
                    {LIKERT_AUKERAK.map((aukera) => {
                      const hautatuta =
                        erantzunak[adierazle.id] === aukera.balioa
                      return (
                        <button
                          key={aukera.balioa}
                          onClick={() =>
                            updateDiagnostikoa(adierazle.id, aukera.balioa)
                          }
                          className={`py-2 px-2 rounded-lg border text-center cursor-pointer ${
                            hautatuta
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="block text-lg font-bold">
                            {aukera.balioa}
                          </span>
                          <span className="block text-[10px] mt-0.5 leading-tight">
                            {aukera.etiketa}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Nabigazio botoiak */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
              <Button
                variant="secondary"
                icon={ChevronLeft}
                disabled={dimAktiboa === 0}
                onClick={() => setDimAktiboa(dimAktiboa - 1)}
              >
                Aurrekoa
              </Button>

              <span className="text-xs text-slate-500">
                {dimAktiboa + 1} / {DIAGNOSTIKO_DIMENTSIOAK.length}
              </span>

              {dimAktiboa < DIAGNOSTIKO_DIMENTSIOAK.length - 1 ? (
                <Button
                  onClick={() => setDimAktiboa(dimAktiboa + 1)}
                >
                  Hurrengoa <ChevronRight size={14} className="ml-1" />
                </Button>
              ) : (
                <Button
                  variant="success"
                  icon={CheckCircle}
                  onClick={amaitu}
                  disabled={!amaituAhalDu}
                >
                  {amaituAhalDu ? 'Diagnostikoa amaitu' : `${guztiraAdierazleak - erantzundakoak} falta`}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
