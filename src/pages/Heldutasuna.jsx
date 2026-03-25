import { Link } from 'react-router-dom'
import {
  Building2, Wifi, Shield, GraduationCap, Users, BookOpen,
  Brain, Lock, Heart, Home, Globe, BarChart3,
  ArrowRight, AlertCircle, TrendingUp, TrendingDown,
} from 'lucide-react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader, EmptyState } from '../components/Card'
import Badge from '../components/Badge'
import ProgressBar from '../components/ProgressBar'
import { DIAGNOSTIKO_DIMENTSIOAK, kalkulatuGuztira, HELDUTASUN_MAILAK } from '../data/diagnostikoa'

const IKONOAK = {
  Building2, Wifi, Shield, GraduationCap, Users, BookOpen,
  Brain, Lock, Heart, Home, Globe, BarChart3,
}

export default function Heldutasuna({ store }) {
  const { state } = store

  if (!state.diagnostikoa.amaituta) {
    return (
      <div>
        <PageHeader title="Heldutasun digitalaren mapa" />
        <Card>
          <EmptyState
            icon={BarChart3}
            title="Diagnostikoa bete gabe dago"
            description="Heldutasun digitalaren mapa ikusteko, lehenik diagnostiko galdetegia osatu behar duzu."
            action={
              <Link
                to="/diagnostikoa"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Diagnostikoa hasi <ArrowRight size={14} />
              </Link>
            }
          />
        </Card>
      </div>
    )
  }

  const emaitzak = kalkulatuGuztira(state.diagnostikoa.erantzunak)

  const radarData = DIAGNOSTIKO_DIMENTSIOAK.map((dim) => {
    const em = emaitzak.dimentsioak.find((d) => d.dimentsioa.id === dim.id)
    return {
      dimentsioa: dim.izena.length > 18 ? dim.izena.substring(0, 16) + '...' : dim.izena,
      puntuazioa: em?.puntuazioa || 0,
    }
  })

  const barData = emaitzak.dimentsioak
    .filter((d) => d.puntuazioa !== null)
    .sort((a, b) => a.puntuazioa - b.puntuazioa)
    .map((d) => ({
      izena: d.dimentsioa.izena,
      puntuazioa: d.puntuazioa,
      kolorea: d.dimentsioa.kolorea,
    }))

  const ahulak = emaitzak.dimentsioak
    .filter((d) => d.puntuazioa !== null && d.puntuazioa < 3)
    .sort((a, b) => a.puntuazioa - b.puntuazioa)

  const sendoak = emaitzak.dimentsioak
    .filter((d) => d.puntuazioa !== null && d.puntuazioa >= 3)
    .sort((a, b) => b.puntuazioa - a.puntuazioa)

  return (
    <div>
      <PageHeader
        title="Heldutasun digitalaren mapa"
        description={`Diagnostikoaren emaitzak — ${new Date(state.diagnostikoa.data).toLocaleDateString('eu-ES')}`}
      />

      {/* Puntuazio orokorra */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
              Heldutasun orokorra
            </p>
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 mb-3"
              style={{
                borderColor: emaitzak.mailaOrokorra?.kolorea,
                backgroundColor: `${emaitzak.mailaOrokorra?.kolorea}10`,
              }}
            >
              <span className="text-3xl font-bold text-slate-900">
                {emaitzak.orokorra}
              </span>
            </div>
            <Badge color={emaitzak.mailaOrokorra?.kolorea}>
              {emaitzak.mailaOrokorra?.izena}
            </Badge>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              {emaitzak.mailaOrokorra?.deskribapena}
            </p>
          </div>
        </Card>

        {/* Mailak azalpena */}
        <Card className="col-span-2">
          <CardHeader title="Heldutasun mailak" description="Zer esan nahi du maila bakoitzak?" />
          <div className="space-y-2">
            {HELDUTASUN_MAILAK.map((m) => (
              <div
                key={m.maila}
                className={`flex items-center gap-3 p-2.5 rounded-lg ${
                  emaitzak.mailaOrokorra?.maila === m.maila ? 'bg-slate-50 ring-1 ring-slate-200' : ''
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: m.kolorea }}
                >
                  {m.maila}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{m.izena}</p>
                  <p className="text-[11px] text-slate-500">{m.deskribapena}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Grafikoak */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader title="Profil erradiala" description="12 dimentsioen ikuspegi orokorra" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dimentsioa" tick={{ fill: '#64748b', fontSize: 9 }} />
                <Radar dataKey="puntuazioa" stroke="#3378ff" fill="#3378ff" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Dimentsio bakoitzaren puntuazioa" description="Txikienetik handienera" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="izena" tick={{ fontSize: 9 }} width={120} />
                <Tooltip />
                <Bar dataKey="puntuazioa" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.kolorea} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Dimentsio zerrenda xehatua */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Hobetzeko arloak */}
        <Card>
          <CardHeader
            title="Hobetzeko lehentasun arloak"
            description="Puntuazio baxuena duten dimentsioak"
          />
          {ahulak.length === 0 ? (
            <p className="text-xs text-slate-500">Dimentsio guztiak 3 puntutik gora daude.</p>
          ) : (
            <div className="space-y-3">
              {ahulak.map((d) => {
                const DIcon = IKONOAK[d.dimentsioa.ikonoa] || Building2
                return (
                  <div key={d.dimentsioa.id} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                    <TrendingDown size={14} className="text-red-500 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-800">{d.dimentsioa.izena}</p>
                      <ProgressBar value={d.puntuazioa} max={5} color={d.maila?.kolorea} size="sm" />
                    </div>
                    <Badge color={d.maila?.kolorea}>{d.puntuazioa}/5</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Indarguneak */}
        <Card>
          <CardHeader
            title="Indarguneak"
            description="Maila onean dauden dimentsioak"
          />
          {sendoak.length === 0 ? (
            <p className="text-xs text-slate-500">Ez dago dimentsiorik 3 puntutik gora.</p>
          ) : (
            <div className="space-y-3">
              {sendoak.map((d) => (
                <div key={d.dimentsioa.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <TrendingUp size={14} className="text-green-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-800">{d.dimentsioa.izena}</p>
                    <ProgressBar value={d.puntuazioa} max={5} color={d.maila?.kolorea} size="sm" />
                  </div>
                  <Badge color={d.maila?.kolorea}>{d.puntuazioa}/5</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Gomendio orokorra */}
      <Card>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <AlertCircle size={20} className="text-amber-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Interpretazio oharra
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Puntuazio hauek ikastetxearen autoebaluaziotik datoz eta orientagarriak dira.
              Ez dute epaitzen, diagnostikatzeko eta lehentasunak zehazteko balio dute.
              Kontuan izan dimentsio batzuek zure testuinguru espezifikoan pisua handiagoa
              izan dezaketela. Gomendatzen dugu emaitza hauek zuzendaritza taldean
              eztabaidatzea eta IPDa egiteko abiapuntu bezala erabiltzea.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
