import { useState } from 'react'
import {
  Heart, Smartphone, Eye, Moon, Shield, Users, MessageCircle,
  CheckSquare, AlertTriangle, ChevronDown, ChevronUp,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader } from '../components/Card'
import Badge from '../components/Badge'

const ONGIZATE_ARLOAK = [
  {
    id: 'arreta',
    izena: 'Arreta eta kontzentrazioa',
    ikonoa: Eye,
    kolorea: '#6366f1',
    deskribapena: 'Pantailen eraginaren kudeaketa arretaren eta ikaskuntzaren kalitatean.',
    egiaztapenak: [
      'Gelako arau argiak daude gailuen erabilerari buruz',
      'Tutoretzan pantaila-denborari buruzko hausnarketa saioak daude',
      'Irakasleak kontzentrazio-teknikak erabiltzen dituzte gela digitalean',
      'Ikasleek beren pantaila-ohiturak identifikatzen dituzte',
    ],
  },
  {
    id: 'atsedena',
    izena: 'Atseden digitala',
    ikonoa: Moon,
    kolorea: '#8b5cf6',
    deskribapena: 'Deskonexio uneak eta atsedenaren kultura digitala.',
    egiaztapenak: [
      'Jolas-orduan mugikorra erabiltzeko arau argiak daude',
      'Ikastetxeak "deskonexio-uneak" sustatzen ditu',
      'Irakasleak irakasgaiaren ondoren atseden digitalak proposatzen dituzte',
      'Familiei etxerako deskonexio gomendioak helarazi zaizkie',
    ],
  },
  {
    id: 'mugikorrak',
    izena: 'Mugikor eta gailu politika',
    ikonoa: Smartphone,
    kolorea: '#ef4444',
    deskribapena: 'Mugikor, tableta eta erloju adimendunen erabilerari buruzko araudia.',
    egiaztapenak: [
      'Mugikorraren erabilerari buruzko arau-dokumentu formal bat dago',
      'Arauak adinaren arabera egokituta daude (LH/DBH/Batx)',
      'Salbuespenak pedagogiko argiak daude dokumentatuta',
      'Komunitateak (familiak barne) arauak ezagutzen ditu',
      'Urtean behin berrikusi eta eguneratzen dira',
    ],
  },
  {
    id: 'ziberbizikidetza',
    izena: 'Ziberbizikidetza',
    ikonoa: Shield,
    kolorea: '#f59e0b',
    deskribapena: 'Ziberbullyinga, sexting, grooming eta bestelako arriskuen prebentzioa eta esku-hartzea.',
    egiaztapenak: [
      'Prebentzio protokoloa dokumentatuta eta aktibo dago',
      'Tutoretzan ziberbizikidetzari buruzko saioak programatuta daude',
      'Ikasleak jakiten dute nori jotzea gertaera bat izan badute',
      'Irakasleek formazioa jaso dute esku-hartze protokoloari buruz',
      'Familiei informazioa eman zaie eta kooperazio mekanismoak daude',
    ],
  },
  {
    id: 'ongizate_emozionala',
    izena: 'Ongizate emozionala eta digitala',
    ikonoa: Heart,
    kolorea: '#ec4899',
    deskribapena: 'Dimentsio emozionala arlo digitalean: autoestimua, konparaketa soziala, presioa.',
    egiaztapenak: [
      'Tutoretzan sare sozialen eragina lantzen da (autoirudia, konparaketa...)',
      'Ikasleei baliabideak ematen zaizkie ongizate digitala lantzeko',
      'Presio digitala (FOMO, like-dependentzia) gaitzat hartzen da',
      'Laguntza-baliabideak eskuragarri daude ikasleentzat',
    ],
  },
  {
    id: 'familiak',
    izena: 'Familien sentsibilizazioa',
    ikonoa: Users,
    kolorea: '#f97316',
    deskribapena: 'Familiek parte har dezaten hezkuntza digitalean, orientazio koherenteekin.',
    egiaztapenak: [
      'Urtean gutxienez saio bat antolatu da familientzat gai digitalei buruz',
      'Etxerako orientabide materialak bidali dira',
      'Familien galdera ohikoenak jasoak eta erantzunak prestatuak dira',
      'Adinaren araberako gomendioak existitzen dira (LH, DBH, Batx)',
    ],
  },
]

export default function OngizateDigitala({ store }) {
  const [atalZabalduak, setAtalZabalduak] = useState(
    Object.fromEntries(ONGIZATE_ARLOAK.map((a) => [a.id, true]))
  )
  const [egiaztapenak, setEgiaztapenak] = useState({})

  function toggleAtal(id) {
    setAtalZabalduak((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleEgiaztapena(arloId, index) {
    const key = `${arloId}_${index}`
    setEgiaztapenak((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function getArloAurrerabidea(arlo) {
    const betatuak = arlo.egiaztapenak.filter(
      (_, i) => egiaztapenak[`${arlo.id}_${i}`]
    ).length
    return { betatuak, guztira: arlo.egiaztapenak.length }
  }

  // Aurrerabide orokorra
  const guztiraEgiaztapenak = ONGIZATE_ARLOAK.reduce(
    (acc, a) => acc + a.egiaztapenak.length,
    0
  )
  const guztiraBetatuak = Object.values(egiaztapenak).filter(Boolean).length

  return (
    <div>
      <PageHeader
        title="Ongizate digitala"
        description="Ikastetxeko komunitate osoaren ongizate digitala bermatzeko tresnak, egiaztapenak eta protokoloak. Arreta berezia mugikorrei, pantaila-denborari, ziberbizikidetzari eta dimentsio emozionalari."
      />

      {/* Aurrerabide orokorra */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Aurrerabide orokorra
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {guztiraBetatuak}/{guztiraEgiaztapenak} egiaztapen beterik
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">
              {guztiraEgiaztapenak > 0
                ? Math.round((guztiraBetatuak / guztiraEgiaztapenak) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
        <div className="mt-3 h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-500"
            style={{
              width: `${
                guztiraEgiaztapenak > 0
                  ? (guztiraBetatuak / guztiraEgiaztapenak) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </Card>

      {/* Arlo bakoitza */}
      <div className="space-y-4">
        {ONGIZATE_ARLOAK.map((arlo) => {
          const Icon = arlo.ikonoa
          const zabalduta = atalZabalduak[arlo.id]
          const aurr = getArloAurrerabidea(arlo)

          return (
            <Card key={arlo.id} padding={false}>
              <button
                onClick={() => toggleAtal(arlo.id)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left cursor-pointer hover:bg-slate-50"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${arlo.kolorea}15` }}
                >
                  <Icon size={20} style={{ color: arlo.kolorea }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {arlo.izena}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {arlo.deskribapena}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    color={
                      aurr.betatuak === aurr.guztira
                        ? '#22c55e'
                        : aurr.betatuak > 0
                        ? '#f59e0b'
                        : '#94a3b8'
                    }
                    variant="outline"
                  >
                    {aurr.betatuak}/{aurr.guztira}
                  </Badge>
                  {zabalduta ? (
                    <ChevronUp size={16} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400" />
                  )}
                </div>
              </button>

              {zabalduta && (
                <div className="px-6 pb-5 border-t border-slate-100 pt-4">
                  <div className="space-y-2">
                    {arlo.egiaztapenak.map((eg, i) => {
                      const key = `${arlo.id}_${i}`
                      const beteta = egiaztapenak[key]
                      return (
                        <label
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={beteta || false}
                            onChange={() => toggleEgiaztapena(arlo.id, i)}
                            className="mt-0.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span
                            className={`text-sm leading-relaxed ${
                              beteta
                                ? 'text-slate-400 line-through'
                                : 'text-slate-700'
                            }`}
                          >
                            {eg}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Oharra */}
      <div className="mt-6 rounded-xl bg-teal-50 border border-teal-200 p-4 flex gap-3">
        <AlertTriangle size={16} className="text-teal-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-medium text-teal-800">
            Garrantzitsua
          </p>
          <p className="text-[11px] text-teal-700 mt-1 leading-relaxed">
            Ongizate digitaleko neurriak ez dira zertan murrigarriak izan. Helburua ez da teknologia
            debekatzea, baizik eta erabilera kontzientea, osasungarria eta orekatua sustatzea.
            Ikastetxe bakoitzak bere testuingurura egokitu beharko ditu neurri hauek.
          </p>
        </div>
      </div>
    </div>
  )
}
