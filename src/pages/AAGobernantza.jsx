import { useState } from 'react'
import {
  Brain, Shield, Eye, Users, GraduationCap, Home, AlertTriangle,
  CheckSquare, FileText, ChevronDown, ChevronUp, Scale,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card, { CardHeader } from '../components/Card'
import Badge from '../components/Badge'

const AA_ARLOAK = [
  {
    id: 'manifestua',
    izena: 'Ikastetxearen AA posizioa',
    ikonoa: Scale,
    kolorea: '#6366f1',
    deskribapena: 'Ikastetxeak adimen artifizialaren aurrean duen jarrera eta printzipioak.',
    edukia: `Ikastetxe honek adimen artifiziala hezkuntza-tresna baliagarri gisa onartzen du, betiere erabilera arduratsua, gardena eta giza gainbegiratuarekin.

Gure printzipioak:
- Gardentasuna: AA erabiltzen denean, komunitateari jakinarazten zaio.
- Giza gainbegiratzea: AAk ez du inoiz erabaki pedagogikorik hartzen gizakiaren baimenik gabe.
- Ekitatea: AAren erabilerak ez du diskriminaziorik edo desberdintasunik sortu behar.
- Pribatutasuna: Ikasleen eta irakasleen datu pertsonalak babestea lehentasuna da.
- Integritate akademikoa: Ebaluazio-prozesuen zintzotasuna bermatu behar da.`,
    editagarria: true,
  },
  {
    id: 'erabilera_onartuak',
    izena: 'Onartutako erabilerak',
    ikonoa: CheckSquare,
    kolorea: '#22c55e',
    deskribapena: 'AAren erabilera egokiak hezkuntzan.',
    edukia: `- Ikaskuntza-materialen sorkuntzarako laguntzaile gisa (irakasleek)
- Testuak zuzentzeko eta hobetzeko tresna gisa (hizkuntza ikaskuntzan)
- Informazio bilaketa eta sintesia egiteko laguntza gisa
- Programazio eta pentsamendu konputazionalerako laguntza
- Irisgarritasuna hobetzeko (itzulpena, audio-deskribapena...)
- Ikerketa-proiektuetan bigarren iturri gisa (beti egiaztatuz)`,
    editagarria: true,
  },
  {
    id: 'erabilera_mugatuak',
    izena: 'Mugatutako erabilerak',
    ikonoa: AlertTriangle,
    kolorea: '#f59e0b',
    deskribapena: 'Kasu zehatzetan soilik baimendutako erabilerak, irakaslearen baimenarekin.',
    edukia: `- AA bidezko testuen sorkuntza: soilik irakaslearen orientazio eta baimen esplizituarekin
- Ebaluazio-testuinguruan: soilik irizpide argiekin eta irakasleak zehaztutako mugekin
- Datu pertsonalak inplikatzen dituzten jardueretan: irakaslearen gainbegiratzepean
- Hizkuntza-itzulpenetan: egiaztapen gizakia beharrezkoa`,
    editagarria: true,
  },
  {
    id: 'erabilera_debekatuak',
    izena: 'Debekatutako erabilerak',
    ikonoa: Shield,
    kolorea: '#ef4444',
    deskribapena: 'Inola ere onartzen ez diren erabilerak.',
    edukia: `- AAk sortutako lana norberaren lan propio gisa aurkeztea (plagioa)
- Ikasleen datu pertsonalak AA plataformetan sartzea baimenik gabe
- AA erabiltea ebaluazio ofizialetan, espresuki baimenduta ez badago
- AA erabiltea pertsonak epaitzeko, sailkatzeko edo diskriminatzeko
- Irudi edo bideo faltsuen sorkuntza (deepfake)
- AAri konfidentziala den informazioa eman`,
    editagarria: true,
  },
  {
    id: 'irakasleak',
    izena: 'Irakasleentzako orientabideak',
    ikonoa: GraduationCap,
    kolorea: '#3378ff',
    deskribapena: 'Irakasleak AA nola erabili dezaketen beren praktika pedagogikoan.',
    edukia: `- Programazioak eta materialak prestatzeko erabil dezakezu AA, beti egokituz
- Zure ikasleei azaldu zer erabiltzen duzun eta zergatik: gardentasuna da giltza
- Ebaluazio-irizpideetan argitu AAren erabilera zein kasutan den egokia
- Ebaluatu AA tresnak erabili aurretik: pribatutasuna, egokitasuna, zehaztasuna
- Partekatu esperientzia onak zure kide irakasle eta taldeekin
- Ikasi etengabe: AA eremu aldakorra da, eta eguneratuta egotea garrantzitsua da`,
    editagarria: true,
  },
  {
    id: 'ikasleak',
    izena: 'Ikasleentzako orientabideak',
    ikonoa: Users,
    kolorea: '#22c55e',
    deskribapena: 'Ikasleek AA nola erabili dezaketen ikaskuntzan.',
    edukia: `- AAk lagundu egiten dizu, baina zure burua prestatzea da helburua
- Beti egiaztatu AAk ematen dizun informazioa: akatsak egin ditzake
- Ez aurkeztu AAk sortutakoa zurea balitz: zintzotasuna da oinarria
- Galderak egin, baina ez utzi AAri pentsatzen zuretzat
- Ez eman datu pertsonalik (izena, helbidea, argazkiak) AA plataformetan
- Zalantzarik izanez gero, galdetu zure irakasleari`,
    editagarria: true,
  },
  {
    id: 'familiak',
    izena: 'Familientzako azalpena',
    ikonoa: Home,
    kolorea: '#f97316',
    deskribapena: 'Familiei komunikatzeko prestakuntza eta informazioa.',
    edukia: `Familia agurgarriak,

Ikastetxeak adimen artifiziala (AA) hezkuntza-tresna gisa erabiltzen hasi da, modu arduratsuan eta gainbegiratuan. Hona hemen jakin beharreko oinarrizko informazioa:

- Zer da AA? Sistema informatikoak dira, gizakien zenbait gaitasun simulatzen dituztenak (testua sortzea, galderak erantzutea...).
- Zertarako erabiltzen da ikastetxean? Ikaskuntza prozesuan laguntzeko, beti irakaslearen orientazioarekin.
- Zer bermak daude? Pribatutasuna, gardentasuna eta giza gainbegiratzea bermatzen ditugu.
- Zer egiten dugu etxerako? Gomendatzen dizuegu seme-alabei AAri buruz hitz egitea, beren ikaskuntza propioa indartzeko eta erabilera kritikoa sustatzeko.

Zalantzarik izanez gero, jarri harremanetan ikastetxearekin.`,
    editagarria: true,
  },
  {
    id: 'ebaluazioa',
    izena: 'Ebaluazioa eta integritate akademikoa',
    ikonoa: FileText,
    kolorea: '#8b5cf6',
    deskribapena: 'AAren eragina ebaluazio prozesuetan eta integritate akademikoaren babesa.',
    edukia: `- Ebaluazio ofizialetan AAren erabilera espresuki adierazi behar da baimenduta dagoen ala ez
- Ikasleek jakin behar dute zer ebaluatzen den: prozesua, emaitza ala biak
- Plagio digitala (AA bidez sortutako testua propio gisa aurkeztea) arau-hauste akademiko gisa tratatuko da
- Ebaluazio diseinuak AAren existentziara egokitu behar dira: galdera irekiak, ahozko defentsak, prozesu-portfolioak
- Ikastetxeak urtero berrikusi beharko ditu ebaluazio-irizpideak AAren bilakaeraren arabera`,
    editagarria: true,
  },
]

export default function AAGobernantza({ store }) {
  const [atalZabalduak, setAtalZabalduak] = useState(
    Object.fromEntries(AA_ARLOAK.map((a) => [a.id, false]))
  )
  const [editatzen, setEditatzen] = useState({})
  const [edukiak, setEdukiak] = useState(
    Object.fromEntries(AA_ARLOAK.map((a) => [a.id, a.edukia]))
  )

  function toggleAtal(id) {
    setAtalZabalduak((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <PageHeader
        title="AA eta gardentasuna"
        description="Adimen artifizialaren erabilera arduratsuaren gida eta gobernantza. Ikastetxearen posizioa, orientabideak eta komunikazio-materialak."
      />

      {/* Oharra */}
      <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 mb-6 flex gap-3">
        <Brain size={16} className="text-indigo-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-medium text-indigo-800">
            AA gobernantza: ikuspegi europar eta instituzionala
          </p>
          <p className="text-[11px] text-indigo-700 mt-1 leading-relaxed">
            Ikastetxearen AA politikak Europako AI Act-aren printzipioei jarraituz diseinatuta daude:
            gardentasuna, giza gainbegiratzea, ekitatea eta datuen babesa. Dokumentu hauek orientagarriak
            dira eta ikastetxe bakoitzak egokitu beharko ditu.
          </p>
        </div>
      </div>

      {/* Arloak */}
      <div className="space-y-3">
        {AA_ARLOAK.map((arlo) => {
          const Icon = arlo.ikonoa
          const zabalduta = atalZabalduak[arlo.id]

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
                {zabalduta ? (
                  <ChevronUp size={16} className="text-slate-400" />
                ) : (
                  <ChevronDown size={16} className="text-slate-400" />
                )}
              </button>

              {zabalduta && (
                <div className="px-6 pb-5 border-t border-slate-100 pt-4">
                  {editatzen[arlo.id] ? (
                    <div>
                      <textarea
                        className="w-full border border-slate-300 rounded-lg p-4 text-sm text-slate-800 leading-relaxed min-h-[250px] focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y font-mono"
                        value={edukiak[arlo.id]}
                        onChange={(e) =>
                          setEdukiak((prev) => ({
                            ...prev,
                            [arlo.id]: e.target.value,
                          }))
                        }
                      />
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() =>
                            setEditatzen((prev) => ({
                              ...prev,
                              [arlo.id]: false,
                            }))
                          }
                          className="text-xs text-primary-600 font-medium cursor-pointer"
                        >
                          Itxi editorea
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {edukiak[arlo.id]}
                      </div>
                      {arlo.editagarria && (
                        <div className="flex justify-end mt-3">
                          <button
                            onClick={() =>
                              setEditatzen((prev) => ({
                                ...prev,
                                [arlo.id]: true,
                              }))
                            }
                            className="text-xs text-primary-600 font-medium cursor-pointer"
                          >
                            Editatu
                          </button>
                        </div>
                      )}
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
