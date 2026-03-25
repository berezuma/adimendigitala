import {
  FileDown, FileText, BarChart3, ListChecks, Heart, Brain, Home, Download,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { kalkulatuGuztira, DIAGNOSTIKO_DIMENTSIOAK } from '../data/diagnostikoa'
import { KPI_LEHENETSIAK, kalkulatuKPIAurrerabidea } from '../data/kpiak'

const TXOSTEN_MOTAK = [
  {
    id: 'ipd_pdf',
    izena: 'IPD zirriborroa',
    deskribapena: 'Ikastetxeko Proiektu Digitalaren zirriborro osoa.',
    ikonoa: FileText,
    kolorea: '#3378ff',
    formatua: 'Markdown',
  },
  {
    id: 'diagnostiko_laburpena',
    izena: 'Diagnostikoaren laburpena',
    deskribapena: 'Heldutasun digitalaren profila eta dimentsio bakoitzaren emaitzak.',
    ikonoa: BarChart3,
    kolorea: '#8b5cf6',
    formatua: 'Markdown',
  },
  {
    id: 'ekintza_plana',
    izena: 'Ekintza planaren txostena',
    deskribapena: 'Ekintza guztien zerrenda, egoerak eta arduradunak.',
    ikonoa: ListChecks,
    kolorea: '#22c55e',
    formatua: 'Markdown',
  },
  {
    id: 'kpi_txostena',
    izena: 'KPI jarraipen txostena',
    deskribapena: 'Adierazle guztien egoera eta aurrerabidea.',
    ikonoa: BarChart3,
    kolorea: '#f59e0b',
    formatua: 'Markdown',
  },
  {
    id: 'aa_gida',
    izena: 'AA erabilera gida',
    deskribapena: 'Adimen artifizialaren erabilera arduratsurako dokumentu osoa.',
    ikonoa: Brain,
    kolorea: '#6366f1',
    formatua: 'Markdown',
  },
  {
    id: 'ongizate_txostena',
    izena: 'Ongizate digitaleko protokoloa',
    deskribapena: 'Ongizate digitalerako neurri eta protokoloen laburpena.',
    ikonoa: Heart,
    kolorea: '#14b8a6',
    formatua: 'Markdown',
  },
]

export default function Txostenak({ store }) {
  const { state } = store

  function sortuTxostena(txosten) {
    let content = ''
    const eskola = state.eskola

    switch (txosten.id) {
      case 'diagnostiko_laburpena': {
        if (!state.diagnostikoa.amaituta) {
          alert('Diagnostikoa oraindik bete gabe dago.')
          return
        }
        const emaitzak = kalkulatuGuztira(state.diagnostikoa.erantzunak)
        content = `# Diagnostikoaren laburpena — ${eskola.izena || 'Ikastetxea'}\n\n`
        content += `Data: ${new Date(state.diagnostikoa.data).toLocaleDateString('eu-ES')}\n\n`
        content += `## Heldutasun orokorra: ${emaitzak.orokorra}/5 (${emaitzak.mailaOrokorra?.izena})\n\n`
        content += `## Dimentsioen emaitzak\n\n`
        emaitzak.dimentsioak.forEach((d) => {
          if (d.puntuazioa !== null) {
            content += `- **${d.dimentsioa.izena}**: ${d.puntuazioa}/5 (${d.maila?.izena})\n`
          }
        })
        break
      }
      case 'ekintza_plana': {
        content = `# Ekintza plana — ${eskola.izena || 'Ikastetxea'}\n\n`
        if (state.ekintzak.length === 0) {
          content += 'Ez dago ekintzarik erregistratuta.\n'
        } else {
          state.ekintzak.forEach((e, i) => {
            content += `## ${i + 1}. ${e.izenburua}\n`
            content += `- Egoera: ${e.egoera}\n`
            content += `- Lehentasuna: ${e.lehentasuna}\n`
            if (e.ardura) content += `- Ardura: ${e.ardura}\n`
            if (e.deskribapena) content += `- Deskribapena: ${e.deskribapena}\n`
            content += '\n'
          })
        }
        break
      }
      case 'kpi_txostena': {
        const aurr = kalkulatuKPIAurrerabidea(KPI_LEHENETSIAK, state.kpiBaloak)
        content = `# KPI jarraipen txostena — ${eskola.izena || 'Ikastetxea'}\n\n`
        content += `Aurrerabide orokorra: ${aurr.ehunekoa}% (${aurr.betatuak}/${aurr.guztira})\n\n`
        KPI_LEHENETSIAK.forEach((kpi) => {
          const balioa = state.kpiBaloak[kpi.id]
          content += `- **${kpi.izena}**: ${
            balioa !== undefined
              ? kpi.mota === 'bai_ez'
                ? balioa ? 'Bai' : 'Ez'
                : balioa
              : 'Erregistratu gabe'
          } (helburua: ${
            kpi.mota === 'bai_ez' ? 'Bai' : kpi.helburua
          })\n`
        })
        break
      }
      default:
        content = `# ${txosten.izena}\n\nTxosten hau sortzeko datuak kargatzen ari dira...`
    }

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${txosten.id}_${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <PageHeader
        title="Txostenak eta esportazioak"
        description="Dokumentuak eta txostenak deskargatzeko gunea. Formatu profesionalean, partekatzeko edo inprimatzeko prest."
      />

      <div className="grid grid-cols-2 gap-4">
        {TXOSTEN_MOTAK.map((tx) => {
          const Icon = tx.ikonoa
          return (
            <Card key={tx.id} className="hover:border-slate-300">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${tx.kolorea}15` }}
                >
                  <Icon size={24} style={{ color: tx.kolorea }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {tx.izena}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {tx.deskribapena}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge color="#64748b" variant="outline">
                      {tx.formatua}
                    </Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Download}
                      onClick={() => sortuTxostena(tx)}
                    >
                      Deskargatu
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
