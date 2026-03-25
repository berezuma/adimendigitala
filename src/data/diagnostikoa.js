/**
 * DIAGNOSTIKO EREDUA
 * Adimen Digitala 2025-2029 planean oinarritutako dimentsio eta adierazleen egitura.
 *
 * Dimentsio bakoitzak adierazle multzoa du, eta adierazle bakoitza Likert eskala batean
 * neurtzen da (1-5). Emaitzek heldutasun digitalaren mapa osatzen dute.
 */

export const DIMENTSIO_KOLOREAK = {
  gobernantza: '#3378ff',
  azpiegitura: '#8b5cf6',
  burujabetza: '#06b6d4',
  irakasle_konpetentzia: '#f59e0b',
  ikasle_konpetentzia: '#22c55e',
  erabilera_pedagogikoa: '#ec4899',
  adimen_artifiziala: '#6366f1',
  zibersegurtasuna: '#ef4444',
  ongizate_digitala: '#14b8a6',
  familiak: '#f97316',
  baliabide_irekiak: '#84cc16',
  jarraipena: '#64748b',
}

export const HELDUTASUN_MAILAK = [
  {
    maila: 1,
    izena: 'Hasierakoa',
    deskribapena: 'Ikastetxeak oraindik ez du digitalizazio-estrategia definiturik. Ekimenak bakanak eta koordinatu gabeak dira.',
    kolorea: '#ef4444',
  },
  {
    maila: 2,
    izena: 'Garapenean',
    deskribapena: 'Zenbait ekimen martxan daude, baina ez dago plan egituraturik. Pertsonak banan-banan aritzen dira.',
    kolorea: '#f59e0b',
  },
  {
    maila: 3,
    izena: 'Finkatuta',
    deskribapena: 'Ikastetxeak plan digitala du eta zuzendaritzak lidertza hartzen du. Oinarrizko prozesuak sistematizatuta daude.',
    kolorea: '#3b82f6',
  },
  {
    maila: 4,
    izena: 'Aurreratua',
    deskribapena: 'Digitalizazioa hezkuntza-proiektuaren parte integrala da. Jarraipen eta ebaluazio sistemak aktibo daude.',
    kolorea: '#22c55e',
  },
  {
    maila: 5,
    izena: 'Eredugarria',
    deskribapena: 'Ikastetxea erreferente da. Berrikuntza eta ezagutza partekatzen ditu. Gobernantza digitala bikaina du.',
    kolorea: '#8b5cf6',
  },
]

export const DIAGNOSTIKO_DIMENTSIOAK = [
  {
    id: 'gobernantza',
    izena: 'Gobernantza digitala',
    deskribapena: 'Ikastetxearen egitura, antolaketa eta erabaki-hartzea digitalizazioaren inguruan.',
    ikonoa: 'Building2',
    kolorea: DIMENTSIO_KOLOREAK.gobernantza,
    adierazleak: [
      {
        id: 'gob_01',
        testua: 'Ikastetxeak digitalizazio-arduradunik edo -batzorderik ba al du formalki izendatuta?',
        laguntza: 'Adibidez: digitalizazio batzordea, TDE koordinatzailea, edo antzekoa.',
      },
      {
        id: 'gob_02',
        testua: 'Zuzendaritza taldeak digitalizazioa bere helburu estrategikoetan jasotzen al du?',
        laguntza: 'Urteko plangintzan edo ikastetxearen proiektuan islatuta.',
      },
      {
        id: 'gob_03',
        testua: 'Ikastetxeko Proiektu Digitala (IPD) eguneratuta al dago?',
        laguntza: 'IPD azken 2 urteetan berrikusita eta onartuta.',
      },
      {
        id: 'gob_04',
        testua: 'Digitalizazioaren inguruko erabakiak modu kolektiboan eta gardentasunez hartzen al dira?',
        laguntza: 'Irakasle-klaustroari, familiei eta ikasleei informazioa ematen zaie.',
      },
      {
        id: 'gob_05',
        testua: 'Aurrekontu-partida espezifikoa al dago baliabide digitaletarako?',
        laguntza: 'Softwarerako, formakuntzarako eta azpiegiturarako.',
      },
    ],
  },
  {
    id: 'azpiegitura',
    izena: 'Azpiegitura eta konektibitatea',
    deskribapena: 'Ekipamendu, konexio eta baliabide teknikoen egoera.',
    ikonoa: 'Wifi',
    kolorea: DIMENTSIO_KOLOREAK.azpiegitura,
    adierazleak: [
      {
        id: 'azp_01',
        testua: 'Interneteko konexioaren kalitatea ikastetxe osoan egokia al da hezkuntza jardueretarako?',
        laguntza: 'Gela, bulego eta gune guztietan.',
      },
      {
        id: 'azp_02',
        testua: 'Ikasleek gailu digitaletarako sarbide ekitatiboa al dute?',
        laguntza: 'Gailu pertsonalak edo ikastetxekoak, eskuragarritasun baldintza egokietan.',
      },
      {
        id: 'azp_03',
        testua: 'Ekipamendu digitalen inbentarioa eguneratuta al dago?',
        laguntza: 'Ordenagailuak, tabletak, arbel digitalak, eta abar.',
      },
      {
        id: 'azp_04',
        testua: 'Mantentze-lan teknologikoak modu sistematikoan kudeatzen al dira?',
        laguntza: 'Intzidentzien kudeaketa, eguneraketak, eta abar.',
      },
    ],
  },
  {
    id: 'burujabetza',
    izena: 'Burujabetza digitala eta datuak',
    deskribapena: 'Datuen kudeaketa, pribatutasuna, eta burujabetza teknologikoaren maila.',
    ikonoa: 'Shield',
    kolorea: DIMENTSIO_KOLOREAK.burujabetza,
    adierazleak: [
      {
        id: 'bur_01',
        testua: 'Ikastetxeak datuen babeserako protokoloa al du indarrean?',
        laguntza: 'DBLO/RGPD betetzeko neurri dokumentatuak.',
      },
      {
        id: 'bur_02',
        testua: 'Erabiltzen diren plataforma digitalak pribatutasun eta segurtasun irizpideekin hautatuak al dira?',
        laguntza: 'Kode irekia, datu-kokapen europarra, baimenak kontrolatuak.',
      },
      {
        id: 'bur_03',
        testua: 'Komunitateak (irakasleek, ikasleek, familiek) beren datuen tratamenduari buruzko informazio argia jasotzen al du?',
        laguntza: 'Pribatutasun-politika argiak eta ulergarriak.',
      },
      {
        id: 'bur_04',
        testua: 'Ikastetxeak software librearen edo kode irekiaren erabilerarako sentsibilitatea al du?',
        laguntza: 'Alternatiba libreak aztertu eta erabiltzen dira.',
      },
    ],
  },
  {
    id: 'irakasle_konpetentzia',
    izena: 'Irakasleen konpetentzia digitala',
    deskribapena: 'Irakasleriaren gaitasun digitalaren maila eta formakuntza-egoera.',
    ikonoa: 'GraduationCap',
    kolorea: DIMENTSIO_KOLOREAK.irakasle_konpetentzia,
    adierazleak: [
      {
        id: 'ira_01',
        testua: 'Irakasleriak formakuntza-plan digitala al du ikastetxe mailan?',
        laguntza: 'DigCompEdu-n oinarritutako formakuntza-ibilbidea.',
      },
      {
        id: 'ira_02',
        testua: 'Irakasle gehienek oinarrizko tresna digitalak modu autonomoan erabiltzen al dituzte?',
        laguntza: 'Posta, plataformak, dokumentuak, aurkezpenak...',
      },
      {
        id: 'ira_03',
        testua: 'Irakasleen artean praktika onen partekatzea sustatzen al da?',
        laguntza: 'Barne-formakuntza saioak, elkarlaneko esperientziak.',
      },
      {
        id: 'ira_04',
        testua: 'Zuzendaritzak irakasleriaren behar digitalak ezagutzen al ditu?',
        laguntza: 'Inkesta, elkarrizketa edo behaketa bidezkoa.',
      },
    ],
  },
  {
    id: 'ikasle_konpetentzia',
    izena: 'Ikasleen konpetentzia digitala',
    deskribapena: 'Ikasleen gaitasun digitala eta haren garapena curriculumean.',
    ikonoa: 'Users',
    kolorea: DIMENTSIO_KOLOREAK.ikasle_konpetentzia,
    adierazleak: [
      {
        id: 'ika_01',
        testua: 'Ikasleen konpetentzia digitala curriculumean txertatuta al dago modu sistematikoan?',
        laguntza: 'Etapa eta maila desberdinetan zehar.',
      },
      {
        id: 'ika_02',
        testua: 'Ikasleek informazioaren bilaketa kritikoa, sorkuntza digitala eta komunikazio arduratsua lantzen al dituzte?',
        laguntza: 'DigComp esparruko arlo nagusiak.',
      },
      {
        id: 'ika_03',
        testua: 'Ikasleek beren adin-tarterako egokitutako prestakuntza jasotzen al dute segurtasun eta pribatutasun digitalean?',
        laguntza: 'Pasahitzak, datuak, argazkiak, sarean jokatzea...',
      },
    ],
  },
  {
    id: 'erabilera_pedagogikoa',
    izena: 'Erabilera pedagogikoa',
    deskribapena: 'Teknologiaren erabilera hezkuntzaren ikuspegitik.',
    ikonoa: 'BookOpen',
    kolorea: DIMENTSIO_KOLOREAK.erabilera_pedagogikoa,
    adierazleak: [
      {
        id: 'ped_01',
        testua: 'Teknologia metodologia aktiboen zerbitzura erabiltzen al da (eta ez soilik eduki digitalak kontsumitzeko)?',
        laguntza: 'Proiektuak, ikerketa, sorkuntza, lankidetza...',
      },
      {
        id: 'ped_02',
        testua: 'Ebaluazioan tresna digitalak modu esanguratsuan integratzen al dira?',
        laguntza: 'Autoebaluazioa, feedbacka, portfolio digitalak...',
      },
      {
        id: 'ped_03',
        testua: 'Baliabide Hezitzaile Irekiak (BHI/OER) erabiltzen eta sortzen al dira ikastetxean?',
        laguntza: 'Lizentzia irekiko materialak, euskaraz ere bai.',
      },
    ],
  },
  {
    id: 'adimen_artifiziala',
    izena: 'Adimen artifizialaren erabilera',
    deskribapena: 'AAren ezagutza, erabilera eta gobernantza ikastetxean.',
    ikonoa: 'Brain',
    kolorea: DIMENTSIO_KOLOREAK.adimen_artifiziala,
    adierazleak: [
      {
        id: 'aa_01',
        testua: 'Ikastetxeak AAren erabilerari buruzko jarrera edo posizio argia al du?',
        laguntza: 'Adierazpen formala edo irizpide partekatuak.',
      },
      {
        id: 'aa_02',
        testua: 'Irakasleriak AAri buruzko oinarrizko formakuntza jaso al du?',
        laguntza: 'Zer den, nola funtzionatzen duen, zer arriskuk dauzkan.',
      },
      {
        id: 'aa_03',
        testua: 'Ikasleei AAren erabilera kritikoa eta arduratsua irakasten al zaie?',
        laguntza: 'Egiazkotasuna, plagismoa, pribatutasuna, mugak...',
      },
      {
        id: 'aa_04',
        testua: 'Familiei AAri buruzko informazio argia eman al zaie?',
        laguntza: 'Zer erabiltzen den, zergatik, zer bermerekin.',
      },
    ],
  },
  {
    id: 'zibersegurtasuna',
    izena: 'Zibersegurtasuna eta pribatutasuna',
    deskribapena: 'Segurtasun neurriak eta pribatutasunaren babesa.',
    ikonoa: 'Lock',
    kolorea: DIMENTSIO_KOLOREAK.zibersegurtasuna,
    adierazleak: [
      {
        id: 'zib_01',
        testua: 'Ikastetxeak zibersegurtasun-protokoloa al du (pasahitz-politika, sarbide-kontrola, gorabeheren kudeaketa)?',
        laguntza: 'Gutxieneko segurtasun neurriak dokumentatuta.',
      },
      {
        id: 'zib_02',
        testua: 'Komunitateko kideek (irakasleak, ikasleak) zibersegurtasunari buruzko prestakuntza jasotzen al dute?',
        laguntza: 'Phishing, pasahitzak, WiFi segurua, eta abar.',
      },
      {
        id: 'zib_03',
        testua: 'Datu pertsonalen tratamendua araututa eta gainbegiratuta al dago?',
        laguntza: 'Erregistro, baimen eta segurtasun neurriak.',
      },
    ],
  },
  {
    id: 'ongizate_digitala',
    izena: 'Ongizate digitala',
    deskribapena: 'Pertsonen ongizatea teknologiaren erabilera arduratsutik.',
    ikonoa: 'Heart',
    kolorea: DIMENTSIO_KOLOREAK.ongizate_digitala,
    adierazleak: [
      {
        id: 'ong_01',
        testua: 'Ikastetxeak ongizate digitalerako neurriak hartuta al ditu (pantaila-denbora, atseden digitalak...)?',
        laguntza: 'Protokoloak, arauak, orientabideak.',
      },
      {
        id: 'ong_02',
        testua: 'Mugikor eta gailu adimendunen erabilerari buruzko arau argiak al daude?',
        laguntza: 'Mugikorra ikasgelan, jolas-orduan, eta abar.',
      },
      {
        id: 'ong_03',
        testua: 'Ziberbizikidetzarako prebentzio eta esku-hartze protokoloak al daude?',
        laguntza: 'Ziberbullyinga, sexting, grooming... aurre egiteko.',
      },
      {
        id: 'ong_04',
        testua: 'Tutoretza-ekintzan dimentsio digitala txertatzen al da?',
        laguntza: 'Saioak, jarduerak, gogoeta-espazioak.',
      },
    ],
  },
  {
    id: 'familiak',
    izena: 'Familien parte-hartzea',
    deskribapena: 'Familien inplikazioa eta ahalduntzea arlo digitalean.',
    ikonoa: 'Home',
    kolorea: DIMENTSIO_KOLOREAK.familiak,
    adierazleak: [
      {
        id: 'fam_01',
        testua: 'Familiei hezkuntza digitalerako orientabideak eskaintzen al zaizkie?',
        laguntza: 'Saioak, materialak, komunikazioak.',
      },
      {
        id: 'fam_02',
        testua: 'Familien parte-hartzea bermatzen al da IPDaren garapenean edo berrikuspenean?',
        laguntza: 'Kontsulta, bilera edo inkesta bidezkoa.',
      },
      {
        id: 'fam_03',
        testua: 'Familiei haien seme-alaben etapa digitalerako egokitutako informazioa ematen al zaie?',
        laguntza: 'LH, DBH eta Batxilergoko beharrizanak desberdinak dira.',
      },
    ],
  },
  {
    id: 'baliabide_irekiak',
    izena: 'Baliabide irekiak eta euskara',
    deskribapena: 'Baliabide irekien sustapena eta euskararen presentzia digitalean.',
    ikonoa: 'Globe',
    kolorea: DIMENTSIO_KOLOREAK.baliabide_irekiak,
    adierazleak: [
      {
        id: 'bal_01',
        testua: 'Ikastetxeak baliabide hezitzaile irekiak sortzen edo partekatzen al ditu?',
        laguntza: 'Creative Commons, biltegi irekiak...',
      },
      {
        id: 'bal_02',
        testua: 'Euskarazko baliabide digitalen sorkuntza edo erabilera sustatzen al da?',
        laguntza: 'Euskararen presentzia gune digitaletan.',
      },
      {
        id: 'bal_03',
        testua: 'Ikastetxeak ezagutza partekatzen al du beste ikastetxe batzuekin?',
        laguntza: 'Sareak, proiektu elkartuak, esperientzien trukea.',
      },
    ],
  },
  {
    id: 'jarraipena',
    izena: 'Jarraipena eta ebaluazioa',
    deskribapena: 'Digitalizazio prozesuaren monitorizazioa eta hobekuntza jarraitua.',
    ikonoa: 'BarChart3',
    kolorea: DIMENTSIO_KOLOREAK.jarraipena,
    adierazleak: [
      {
        id: 'jar_01',
        testua: 'Digitalizazioaren jarraipen sistematikorik egiten al da urtero?',
        laguntza: 'Bilera, txosten edo ebaluazio prozesu formalak.',
      },
      {
        id: 'jar_02',
        testua: 'Adierazle kuantitatibo edo kualitatiborik erabiltzen al da digitalizazioa neurtzeko?',
        laguntza: 'KPIak, ebidentziak, datu bilketa.',
      },
      {
        id: 'jar_03',
        testua: 'Ebaluazioaren emaitzak hobekuntza ekintzetara bideratzen al dira?',
        laguntza: 'Hobetze-plana, berrikuspena, doikuntzak.',
      },
    ],
  },
]

/**
 * Diagnostikoaren erantzunak prozesatzeko eta puntuazioak kalkulatzeko funtzioak.
 */
export function kalkulatuDimentsioMaila(erantzunak, dimentsioa) {
  const dimAdierazleak = dimentsioa.adierazleak
  const balioak = dimAdierazleak
    .map((a) => erantzunak[a.id])
    .filter((v) => v !== undefined && v !== null)

  if (balioak.length === 0) return null

  const batezbestekoa = balioak.reduce((a, b) => a + b, 0) / balioak.length
  return Math.round(batezbestekoa * 10) / 10
}

export function kalkulatuHeldutasunMaila(puntuazioa) {
  if (puntuazioa === null) return null
  if (puntuazioa <= 1.5) return HELDUTASUN_MAILAK[0]
  if (puntuazioa <= 2.5) return HELDUTASUN_MAILAK[1]
  if (puntuazioa <= 3.5) return HELDUTASUN_MAILAK[2]
  if (puntuazioa <= 4.5) return HELDUTASUN_MAILAK[3]
  return HELDUTASUN_MAILAK[4]
}

export function kalkulatuGuztira(erantzunak) {
  const emaitzak = DIAGNOSTIKO_DIMENTSIOAK.map((dim) => {
    const puntuazioa = kalkulatuDimentsioMaila(erantzunak, dim)
    const maila = kalkulatuHeldutasunMaila(puntuazioa)
    return {
      dimentsioa: dim,
      puntuazioa,
      maila,
    }
  })

  const balioak = emaitzak
    .map((e) => e.puntuazioa)
    .filter((v) => v !== null)

  const orokorra =
    balioak.length > 0
      ? Math.round((balioak.reduce((a, b) => a + b, 0) / balioak.length) * 10) / 10
      : null

  return {
    dimentsioak: emaitzak,
    orokorra,
    mailaOrokorra: kalkulatuHeldutasunMaila(orokorra),
  }
}
