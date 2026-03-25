import { useState } from 'react'
import {
  Settings, Save, Trash2, AlertTriangle, Building2,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader } from '../components/Card'
import Button from '../components/Button'

const ETAPA_AUKERAK = [
  'Haur Hezkuntza',
  'Lehen Hezkuntza',
  'DBH',
  'Batxilergoa',
  'Lanbide Heziketa',
]

const MOTA_AUKERAK = [
  'Ikastetxe publikoa',
  'Ikastola',
  'Itunpeko ikastetxea',
  'Ikastetxe pribatua',
]

export default function Ezarpenak({ store }) {
  const { state, updateEskola, resetAll } = store
  const [confirmReset, setConfirmReset] = useState(false)
  const eskola = state.eskola

  function handleEtapaChange(etapa) {
    const current = eskola.etapak || []
    const updated = current.includes(etapa)
      ? current.filter((e) => e !== etapa)
      : [...current, etapa]
    updateEskola({ etapak: updated })
  }

  return (
    <div>
      <PageHeader
        title="Ezarpenak"
        description="Ikastetxearen profila eta plataformaren konfigurazioa. Datu hauek dokumentuak eta txostenak sortzerako orduan erabiltzen dira."
      />

      {/* Ikastetxearen profila */}
      <Card className="mb-6">
        <CardHeader
          title="Ikastetxearen profila"
          description="Informazio honek IPD eta txostenak automatikoki osatzen laguntzen du."
          action={<Building2 size={18} className="text-slate-400" />}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Ikastetxearen izena
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Adibidez: Amara Berri Ikastola"
              value={eskola.izena}
              onChange={(e) => updateEskola({ izena: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Herria
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Adibidez: Donostia"
              value={eskola.herria}
              onChange={(e) => updateEskola({ herria: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Ikastetxe mota
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={eskola.mota}
              onChange={(e) => updateEskola({ mota: e.target.value })}
            >
              {MOTA_AUKERAK.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Ikastetxe kodea
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="012345"
              value={eskola.kodea}
              onChange={(e) => updateEskola({ kodea: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Ikasle kopurua
            </label>
            <input
              type="number"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="450"
              value={eskola.ikasleKopurua}
              onChange={(e) => updateEskola({ ikasleKopurua: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Irakasle kopurua
            </label>
            <input
              type="number"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="35"
              value={eskola.irakasleKopurua}
              onChange={(e) => updateEskola({ irakasleKopurua: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Zuzendaria
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={eskola.zuzendaria}
              onChange={(e) => updateEskola({ zuzendaria: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Digitalizazio arduraduna
            </label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={eskola.digitalizazioArduraduna}
              onChange={(e) =>
                updateEskola({ digitalizazioArduraduna: e.target.value })
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Kontaktu emaila
            </label>
            <input
              type="email"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={eskola.emaila}
              onChange={(e) => updateEskola({ emaila: e.target.value })}
            />
          </div>
        </div>

        {/* Etapak */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Hezkuntza etapak
          </label>
          <div className="flex flex-wrap gap-2">
            {ETAPA_AUKERAK.map((etapa) => (
              <button
                key={etapa}
                onClick={() => handleEtapaChange(etapa)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                  (eskola.etapak || []).includes(etapa)
                    ? 'bg-primary-50 border-primary-300 text-primary-700'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {etapa}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Datuak garbitu */}
      <Card>
        <CardHeader
          title="Arriskuzko eragiketak"
          description="Kontuz: ekintza hauek ezin dira desegin."
        />
        {!confirmReset ? (
          <Button
            variant="danger"
            icon={Trash2}
            onClick={() => setConfirmReset(true)}
          >
            Datu guztiak ezabatu
          </Button>
        ) : (
          <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle size={20} className="text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">
                Ziur zaude? Ekintza honek datu guztiak ezabatuko ditu.
              </p>
              <p className="text-xs text-red-600 mt-1">
                Diagnostikoa, ekintzak, dokumentuak, KPIak... dena galduko da.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConfirmReset(false)}
              >
                Utzi
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  resetAll()
                  setConfirmReset(false)
                }}
              >
                Bai, ezabatu dena
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
