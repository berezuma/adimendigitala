import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText, ArrowRight, Sparkles, Download, Edit3,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader, EmptyState } from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { kalkulatuGuztira, HELDUTASUN_MAILAK } from '../data/diagnostikoa'
import { DOKUMENTU_MOTAK, sortutIPDZirriborroa, IPD_TXANTILOIA } from '../data/dokumentuak'

export default function IPDSortzailea({ store }) {
  const { state, updateDokumentua } = store
  const [atalZabalduak, setAtalZabalduak] = useState({})
  const [editatzen, setEditatzen] = useState({})

  if (!state.diagnostikoa.amaituta) {
    return (
      <div>
        <PageHeader title="IPD sortzailea" />
        <Card>
          <EmptyState
            icon={FileText}
            title="Diagnostikoa bete gabe dago"
            description="IPD zirriborroa automatikoki sortzeko, lehenik diagnostiko galdetegia osatu behar duzu."
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
  const zirriborroa = sortutIPDZirriborroa(state.eskola, emaitzak)
  const ipdDoc = DOKUMENTU_MOTAK.find((d) => d.id === 'ipd')

  function toggleAtal(id) {
    setAtalZabalduak((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function getAtalEdukia(atalId) {
    return state.dokumentuak.ipd?.[atalId] || ''
  }

  function getDefaultEdukia(atalId) {
    switch (atalId) {
      case 'testuingurua':
        return zirriborroa.testuingurua
      case 'printzipioak':
        return zirriborroa.printzipioak
      case 'hasierako_egoera':
        return `Ikastetxearen heldutasun digital orokorra: ${emaitzak.orokorra}/5 (${emaitzak.mailaOrokorra?.izena}).\n\nDiagnostikoa ${new Date(state.diagnostikoa.data).toLocaleDateString('eu-ES')}(e)an burutu zen.`
      case 'diagnostiko_sintesia':
        return zirriborroa.hobetzeko_arloak.length > 0
          ? `Hobetzeko lehentasun arloak:\n${zirriborroa.hobetzeko_arloak.map((a) => `- ${a.dimentsioa}: ${a.puntuazioa}/5 (${a.maila})`).join('\n')}\n\nIndarguneak:\n${zirriborroa.indarguneak.map((a) => `- ${a.dimentsioa}: ${a.puntuazioa}/5 (${a.maila})`).join('\n')}`
          : 'Diagnostikoaren emaitzak hemen laburbilduko dira.'
      case 'helburu_estrategikoak':
        return zirriborroa.hobetzeko_arloak.length > 0
          ? zirriborroa.hobetzeko_arloak
              .slice(0, 3)
              .map((a, i) => `${i + 1}. helburu estrategikoa: "${a.dimentsioa}" arloa indartzea, maila aktuala (${a.maila}) hobetuz.`)
              .join('\n\n')
          : 'Helburu estrategikoak definitu behar dira diagnostikoaren emaitzetan oinarrituta.'
      case 'kpiak':
        return '- IPD eguneratuta: Bai/Ez\n- Urteko berrikuspena egina: Bai/Ez\n- Irakasleen formakuntza digitala: %\n- Ongizate digitaleko ekintzak inplementatuta: kopurua\n- AA gida argitaratua: Bai/Ez\n- Familien parte-hartzea hezkuntza digitaleko jardueretan: %'
      default:
        return ''
    }
  }

  return (
    <div>
      <PageHeader
        title="IPD sortzailea"
        description="Diagnostikoaren emaitzetan oinarritutako Ikastetxeko Proiektu Digitalaren zirriborroa automatikoki sortzen da. Atal guztiak editagarriak dira."
      >
        <Button variant="secondary" icon={Download} onClick={() => {
          const content = ipdDoc.atalak.map(atal => {
            const edukia = getAtalEdukia(atal.id) || getDefaultEdukia(atal.id)
            return `## ${atal.izena}\n\n${edukia || '[Edukia gehitu behar da]'}\n`
          }).join('\n---\n\n')
          const blob = new Blob([`# ${zirriborroa.titulua}\n\nData: ${zirriborroa.data}\n\n---\n\n${content}`], { type: 'text/markdown' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'IPD_zirriborroa.md'
          a.click()
          URL.revokeObjectURL(url)
        }}>
          Deskargatu
        </Button>
      </PageHeader>

      {/* Oharra */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6 flex gap-3">
        <Sparkles size={16} className="text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-medium text-amber-800">Zirriborro automatikoa</p>
          <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">
            Eduki hau zure ikastetxearen datuetan oinarrituta automatikoki sortu da.
            Orientagarria da eta editatu egin behar duzu zure errealitatearekin bat etortzeko.
            Dokumentu honek ez du balio ofizialik zuzenean; zuzendaritza taldeak egokitu eta onartu behar du.
          </p>
        </div>
      </div>

      {/* Dokumentu goiburua */}
      <Card className="mb-6">
        <div className="text-center py-4">
          <h2 className="text-xl font-bold text-slate-900">{zirriborroa.titulua}</h2>
          <p className="text-sm text-slate-500 mt-1">{zirriborroa.data}</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <Badge color={emaitzak.mailaOrokorra?.kolorea}>
              Heldutasun orokorra: {emaitzak.orokorra}/5
            </Badge>
            <Badge color="#64748b" variant="outline">
              {emaitzak.mailaOrokorra?.izena}
            </Badge>
          </div>
        </div>
      </Card>

      {/* IPD atalak */}
      <div className="space-y-3">
        {ipdDoc.atalak.map((atal) => {
          const zabalduta = atalZabalduak[atal.id] ?? false
          const edukia = getAtalEdukia(atal.id)
          const defaultEdukia = getDefaultEdukia(atal.id)
          const duEdukia = edukia || defaultEdukia

          return (
            <Card key={atal.id} padding={false}>
              <button
                onClick={() => toggleAtal(atal.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  {edukia ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {atal.izena}
                    </h3>
                    {atal.deskribapena && (
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {atal.deskribapena}
                      </p>
                    )}
                  </div>
                </div>
                {zabalduta ? (
                  <ChevronUp size={16} className="text-slate-400" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400" />
                )}
              </button>

              {zabalduta && (
                <div className="px-6 pb-5 border-t border-slate-100 pt-4">
                  {editatzen[atal.id] ? (
                    <div>
                      <textarea
                        className="w-full border border-slate-300 rounded-lg p-4 text-sm text-slate-800 leading-relaxed min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                        value={edukia || defaultEdukia}
                        onChange={(e) => updateDokumentua('ipd', atal.id, e.target.value)}
                      />
                      <div className="flex justify-end gap-2 mt-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditatzen((prev) => ({ ...prev, [atal.id]: false }))}
                        >
                          Itxi
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {duEdukia ? (
                        <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                          {edukia || defaultEdukia}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          Atal hau oraindik hutsik dago. Editatu botoian klik egin edukia gehitzeko.
                        </p>
                      )}
                      <div className="flex justify-end mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Edit3}
                          onClick={() => {
                            if (!edukia && defaultEdukia) {
                              updateDokumentua('ipd', atal.id, defaultEdukia)
                            }
                            setEditatzen((prev) => ({ ...prev, [atal.id]: true }))
                          }}
                        >
                          Editatu
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
