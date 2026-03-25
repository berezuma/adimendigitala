import { useState } from 'react'
import {
  FileText, Brain, Heart, Smartphone, Mail, Users, Shield,
  ClipboardList, ChevronDown, ChevronUp, Edit3, CheckCircle, Download,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader } from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { DOKUMENTU_MOTAK } from '../data/dokumentuak'

const IKONOAK = {
  FileText, Brain, Heart, Smartphone, Mail, Users, Shield, ClipboardList,
}

const KATEGORIA_KOLOREAK = {
  estrategia: '#3378ff',
  gobernantza: '#8b5cf6',
  ongizatea: '#14b8a6',
  komunikazioa: '#f97316',
  jarraipena: '#64748b',
}

export default function DokumentuLantegia({ store }) {
  const { state, updateDokumentua } = store
  const [docAktiboa, setDocAktiboa] = useState(null)
  const [atalEditatzen, setAtalEditatzen] = useState({})
  const [atalZabalduak, setAtalZabalduak] = useState({})

  const mvpDokumentuak = DOKUMENTU_MOTAK.filter((d) => d.mvp)
  const geroagokoak = DOKUMENTU_MOTAK.filter((d) => !d.mvp)

  function toggleDoc(id) {
    setDocAktiboa(docAktiboa === id ? null : id)
  }

  function toggleAtal(docId, atalId) {
    const key = `${docId}_${atalId}`
    setAtalZabalduak((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function getEdukia(docId, atalId) {
    return state.dokumentuak[docId]?.[atalId] || ''
  }

  function deskargatuDokumentua(doc) {
    const content = doc.atalak
      .map((atal) => {
        const edukia = getEdukia(doc.id, atal.id)
        return `## ${atal.izena}\n${atal.deskribapena ? `_${atal.deskribapena}_\n` : ''}\n${edukia || '[Edukia gehitu behar da]'}\n`
      })
      .join('\n---\n\n')

    const blob = new Blob(
      [`# ${doc.izena}\n\n${content}`],
      { type: 'text/markdown' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.id}_dokumentua.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <PageHeader
        title="Dokumentu-lantegia"
        description="Ikastetxeak behar dituen dokumentu estrategikoak sortu, egokitu eta kudeatzeko espazioa. Txantiloi profesionalak eskaintzen dira abiapuntu bezala."
      />

      {/* MVP dokumentuak */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">
          Dokumentu nagusiak
        </h2>
        <div className="space-y-3">
          {mvpDokumentuak.map((doc) => {
            const Icon = IKONOAK[doc.ikonoa] || FileText
            const zabalduta = docAktiboa === doc.id
            const atalBetetak = doc.atalak.filter(
              (a) => getEdukia(doc.id, a.id)
            ).length

            return (
              <Card key={doc.id} padding={false}>
                <button
                  onClick={() => toggleDoc(doc.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer hover:bg-slate-50"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${KATEGORIA_KOLOREAK[doc.kategoria]}15` }}
                  >
                    <Icon
                      size={20}
                      style={{ color: KATEGORIA_KOLOREAK[doc.kategoria] }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {doc.izena}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {doc.deskribapena}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400">
                      {atalBetetak}/{doc.atalak.length} atal
                    </span>
                    <Badge color={KATEGORIA_KOLOREAK[doc.kategoria]} variant="outline">
                      {doc.kategoria}
                    </Badge>
                    {zabalduta ? (
                      <ChevronUp size={16} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400" />
                    )}
                  </div>
                </button>

                {zabalduta && (
                  <div className="border-t border-slate-100 px-5 py-4">
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Download}
                        onClick={() => deskargatuDokumentua(doc)}
                      >
                        Deskargatu
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {doc.atalak.map((atal) => {
                        const key = `${doc.id}_${atal.id}`
                        const zab = atalZabalduak[key]
                        const edukia = getEdukia(doc.id, atal.id)

                        return (
                          <div
                            key={atal.id}
                            className="border border-slate-200 rounded-lg"
                          >
                            <button
                              onClick={() => toggleAtal(doc.id, atal.id)}
                              className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-slate-50"
                            >
                              <div className="flex items-center gap-2">
                                {edukia ? (
                                  <CheckCircle size={14} className="text-green-500" />
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                                )}
                                <span className="text-xs font-medium text-slate-700">
                                  {atal.izena}
                                </span>
                              </div>
                              {zab ? (
                                <ChevronUp size={14} className="text-slate-400" />
                              ) : (
                                <ChevronDown size={14} className="text-slate-400" />
                              )}
                            </button>

                            {zab && (
                              <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                                {atal.deskribapena && (
                                  <p className="text-[11px] text-slate-500 mb-3 italic">
                                    {atal.deskribapena}
                                  </p>
                                )}
                                <textarea
                                  className="w-full border border-slate-300 rounded-lg p-3 text-sm text-slate-800 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
                                  placeholder="Idatzi hemen atal honen edukia..."
                                  value={edukia}
                                  onChange={(e) =>
                                    updateDokumentua(doc.id, atal.id, e.target.value)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Geroagoko dokumentuak */}
      {geroagokoak.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-500 mb-4">
            Hurrengo faseetarako
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {geroagokoak.map((doc) => {
              const Icon = IKONOAK[doc.ikonoa] || FileText
              return (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs font-medium text-slate-600">
                        {doc.izena}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        2. fasean eskuragarri
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
