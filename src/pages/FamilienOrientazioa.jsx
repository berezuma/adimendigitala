import {
  Home, Download, BookOpen, MessageCircle, Shield,
  Brain, Heart, Smartphone, ChevronDown, ChevronUp, Users,
} from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader } from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

const ETAPAK = ['Lehen Hezkuntza', 'DBH', 'Batxilergoa']

const BALIABIDEAK = [
  {
    id: 'orientabide_orokorrak',
    izena: 'Orientabide orokorrak familientzat',
    ikonoa: BookOpen,
    kolorea: '#3378ff',
    etapa: 'guztiak',
    edukia: `Familia agurgarriak,

Seme-alaben hezkuntza digitala elkarlanean egin beharreko bidea da. Hona hemen oinarrizko gomendioak:

1. Komunikazioa: Hitz egin zure seme-alabekin teknologiari buruz, beren esperientziak, zalantzak eta arriskuak partekatuz.
2. Eredua izan: Helduon erabilera ere garrantzitsua da. Saia zaitez mugikorraren erabilera kontzientea egiten.
3. Arauak adostu: Etxean pantaila-denborari, aplikazioei eta gune digitalei buruzko arau argiak ezarri, adinaren arabera.
4. Interesa erakutsi: Jakin zer egiten duten sare digitaletan. Ez da kontrolatzea, ulertzen saiatzea baizik.
5. Laguntza eskatu: Zalantzarik badaukazu, jo ikastetxera edo hezkuntza-baliabideetara.`,
  },
  {
    id: 'lh_gomendioak',
    izena: 'Lehen Hezkuntzarako gomendioak',
    ikonoa: Users,
    kolorea: '#22c55e',
    etapa: 'Lehen Hezkuntza',
    edukia: `6-12 urte bitarteko seme-alabentzat:

- Mugikorra: Orokorrean ez da gomendagarria mugikor propioa izatea adin honetan. Behar izanez gero, funtzio mugatuak.
- Pantaila-denbora: Gehienez 1-2 ordu egunean, eduki kalitatezkoekin.
- Sare sozialak: Ez daude adin honetarako diseinatuta. Saihestu.
- Jokoak: Banaka jokatzeko denbora mugatu; familian jokatzea hobetsi.
- Pribatutasuna: Irakatsi zure argazkiak eta datuak ez partekatzera interneten.
- Komunikazioa: Sarean beldurra edo deserosotasuna sentitzen badute, helduren bati esatea garrantzitsua dela azpimarratu.`,
  },
  {
    id: 'dbh_gomendioak',
    izena: 'DBHrako gomendioak',
    ikonoa: Users,
    kolorea: '#f59e0b',
    etapa: 'DBH',
    edukia: `12-16 urte bitarteko seme-alabentzat:

- Mugikorra: Erabilera arauduna eta negoziatua, familiartekoaren araberako irizpideekin.
- Sare sozialak: Erregistroa adinaren araudiarekin bat etorri behar da (>13-14, plataformaren arabera). Pribatutasun-ezarpenak berrikusi elkarrekin.
- Pantaila-denbora: Atseden digitalak sartu, lotarako ordua errespetatu.
- Edukiak: Informazio kritikorako gaitasuna landu: fake news, clickbait, publizitate ezkutua.
- Ziberbizikidetza: Sexting, cyberbullying eta grooming arriskuak azaldu, epaitu gabe, konfiantza sortuz.
- AA: ChatGPT eta antzekoak nola erabiltzen dituzten jakin. Ez debekatu, erabilera kritikoa sustatu.`,
  },
  {
    id: 'batx_gomendioak',
    izena: 'Batxilergoko gomendioak',
    ikonoa: Users,
    kolorea: '#8b5cf6',
    etapa: 'Batxilergoa',
    edukia: `16-18 urte bitarteko seme-alabentzat:

- Autonomia: Adin honetan autonomia digitala handitu behar da, baina familia erreferente izaten jarraitzen du.
- AA eta integritate akademikoa: AAren erabilera arduratsua landu, plagio digitalaren arriskuak azalduz.
- Identitate digitala: Etorkizun profesionalerako sare-presentzia nola kudeatzen den eztabaidatu.
- Ongizatea: Selektibitate estresa eta teknologiaren arteko erlazioa kudeatu.
- Pribatutasuna: Datu pertsonalen balioa ulertu (CV, argazkiak, profil sozialak).
- Pentsamendu kritikoa: Informazio iturrien ebaluazioa, algoritmo-burbulak ulertzea.`,
  },
  {
    id: 'aa_familientzat',
    izena: 'Adimen artifiziala: galdera ohikoenak',
    ikonoa: Brain,
    kolorea: '#6366f1',
    etapa: 'guztiak',
    edukia: `Zer da AA?
Sistema informatikoak dira giza gaitasun batzuk simulatzen dituztenak: testua sortzea, irudiak ulertzea, galderak erantzutea...

Nire seme-alabak erabiltzen al du?
Baliteke. ChatGPT, Copilot, Gemini eta antzeko tresnak zabaldu egin dira gazteen artean.

Arriskutsua al da?
Ez derrigorrez, baina erabilera kritikoa behar du: informazio okerra eman dezake, pribatutasun-arriskuak izan ditzake, eta ikaskuntzan "atalapea" har dezake.

Zer egin dezaket etxean?
- Galdetu zure seme-alabei zer dakiten AAri buruz
- Saiatu elkarrekin erabilera bat egiten, konparatuz
- Azaldu ezin dela erabili lana propio gisa aurkezteko
- Pribatutasuna zaintzea gogoratu: ez eman datu pertsonalik

Ikastetxean zer egiten da?
Ikastetxeak AA gida propioa du. Orientabideak, baimendutako erabilerak eta debekatutako praktikak jasotzen ditu.`,
  },
  {
    id: 'ziberbizikidetza_familiak',
    izena: 'Ziberbizikidetza eta segurtasuna',
    ikonoa: Shield,
    kolorea: '#ef4444',
    etapa: 'guztiak',
    edukia: `Zer egin ziberbullying kasuan:
1. Entzun seme-alaba epaitu gabe
2. Ebidentziak gorde (pantaila-argazkiak)
3. Ikastetxeari jakinarazi berehala
4. Behar izanez gero, poliziari ere jakinarazi
5. Laguntza profesionala bilatu behar izanez gero

Prebentziorako gomendioak:
- Konfiantza giroa sortu etxean gai digitalei buruz hitz egiteko
- Arazoak izanez gero, helduren bati kontatzeko kultura indartu
- Sare sozialetako pribatutasun-ezarpenak elkarrekin berrikusi
- Argazki eta bideo pertsonalak partekatzeko arriskuak azaldu
- Sareko jokabide errespetuzkoaren garrantzia eztabaidatu`,
  },
  {
    id: 'ongizate_familiak',
    izena: 'Ongizate digitala etxean',
    ikonoa: Heart,
    kolorea: '#14b8a6',
    etapa: 'guztiak',
    edukia: `Pantaila-denbora kudeatzeko gomendioak:

- Logelatan gauezkero gailu digitalik ez
- Bazkal/afal orduan pantailarik ez (familia osoa)
- Asteburu eta oporraldietan ere mugak jarri
- Kirol eta aire libreko jarduerak sartu errutinean
- Lo-ordua errespetatu: pantailak gutxienez 30 minutu lehenago utzi

Seinale arriskutsuak:
- Gailu gabeko uneetan antsietatea edo suminkortasuna
- Lo arazoak
- Errendimendu akademikoaren jaitsiera
- Gizarte-harremanen murrizketa
- Gorputz-jarrera txarrak (begietan mina, bizkarreko mina)

Zer egin:
- Hitz egin lasai, epaitu gabe
- Arauak gogoratu, malgutasunarekin
- Laguntza profesionala bilatu behar izanez gero
- Ikastetxearekin koordinatu`,
  },
]

export default function FamilienOrientazioa() {
  const [atalZabalduak, setAtalZabalduak] = useState({})
  const [etapaIragazkia, setEtapaIragazkia] = useState('guztiak')

  function toggleAtal(id) {
    setAtalZabalduak((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const iragazitako =
    etapaIragazkia === 'guztiak'
      ? BALIABIDEAK
      : BALIABIDEAK.filter(
          (b) => b.etapa === 'guztiak' || b.etapa === etapaIragazkia
        )

  function deskargatuBaliabidea(bal) {
    const blob = new Blob([`# ${bal.izena}\n\n${bal.edukia}`], {
      type: 'text/markdown',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${bal.id}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <PageHeader
        title="Familien orientazioa"
        description="Familientzako baliabideak, gomendioak eta komunikazio-materialak. Adinaren eta etaparen arabera egokitutako edukiak."
      />

      {/* Etapa iragazkia */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs text-slate-500 font-medium">Etapa:</span>
        <button
          onClick={() => setEtapaIragazkia('guztiak')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
            etapaIragazkia === 'guztiak'
              ? 'bg-primary-100 text-primary-700'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Guztiak
        </button>
        {ETAPAK.map((etapa) => (
          <button
            key={etapa}
            onClick={() => setEtapaIragazkia(etapa)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
              etapaIragazkia === etapa
                ? 'bg-primary-100 text-primary-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {etapa}
          </button>
        ))}
      </div>

      {/* Baliabideak */}
      <div className="space-y-3">
        {iragazitako.map((bal) => {
          const Icon = bal.ikonoa
          const zabalduta = atalZabalduak[bal.id]

          return (
            <Card key={bal.id} padding={false}>
              <button
                onClick={() => toggleAtal(bal.id)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left cursor-pointer hover:bg-slate-50"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${bal.kolorea}15` }}
                >
                  <Icon size={20} style={{ color: bal.kolorea }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {bal.izena}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    color={bal.kolorea}
                    variant="outline"
                  >
                    {bal.etapa === 'guztiak' ? 'Orokorra' : bal.etapa}
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
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {bal.edukia}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Download}
                      onClick={() => deskargatuBaliabidea(bal)}
                    >
                      Deskargatu
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
