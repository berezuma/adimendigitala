/**
 * DOKUMENTU-TXANTILOIAK
 * IPD eta bestelako dokumentu estrategikoen egitura eta edukia.
 */

export const DOKUMENTU_MOTAK = [
  {
    id: 'ipd',
    izena: 'Ikastetxeko Proiektu Digitala (IPD)',
    deskribapena: 'Ikastetxearen digitalizazio-estrategiaren dokumentu nagusia.',
    ikonoa: 'FileText',
    kategoria: 'estrategia',
    mvp: true,
    atalak: [
      { id: 'testuingurua', izena: 'Testuingurua', deskribapena: 'Ikastetxearen kokapena, ezaugarriak eta errealitate digitala.' },
      { id: 'hasierako_egoera', izena: 'Hasierako egoera', deskribapena: 'Diagnostikoaren laburpen exekutiboa.' },
      { id: 'diagnostiko_sintesia', izena: 'Diagnostikoaren sintesia', deskribapena: 'Dimentsio bakoitzaren egoera eta aurkikuntza nagusiak.' },
      { id: 'printzipioak', izena: 'Printzipio gidariak', deskribapena: 'Digitalizazioa gidatuko duten balio eta printzipioak.' },
      { id: 'helburu_estrategikoak', izena: 'Helburu estrategikoak', deskribapena: '2-4 helburu nagusi hurrengo 2-3 urterako.' },
      { id: 'ekintza_ildoak', izena: 'Ekintza-ildoak', deskribapena: 'Helburu bakoitzerako ekintza-lerro zehatzak.' },
      { id: 'arduradunak', izena: 'Arduradunak', deskribapena: 'Pertsona eta egitura arduradun bakoitza.' },
      { id: 'egutegia', izena: 'Egutegia', deskribapena: 'Kronograma orientagarria.' },
      { id: 'ebidentziak', izena: 'Ebidentziak', deskribapena: 'Jarraipen egiteko ebidentzia-iturriak.' },
      { id: 'kpiak', izena: 'KPIak', deskribapena: 'Adierazle kuantitatibo eta kualitatiboak.' },
      { id: 'berrikuspena', izena: 'Urteko berrikuspen sistema', deskribapena: 'Noiz eta nola berrikusi, ebaluatu eta doitu.' },
    ],
  },
  {
    id: 'aa_gida',
    izena: 'AA erabilera arduratsuaren gida',
    deskribapena: 'Adimen artifizialaren erabilera ikastetxean gidatzeko dokumentua.',
    ikonoa: 'Brain',
    kategoria: 'gobernantza',
    mvp: true,
    atalak: [
      { id: 'sarrera', izena: 'Sarrera eta helburua', deskribapena: 'Zergatik behar duen ikastetxeak AA gida bat.' },
      { id: 'printzipioak', izena: 'Printzipioak', deskribapena: 'Gardentasuna, giza gainbegiratzea, ekitatea, pribatutasuna.' },
      { id: 'erabilera_onartuak', izena: 'Onartutako erabilerak', deskribapena: 'AAren erabilera egokiak hezkuntzarako.' },
      { id: 'erabilera_mugatuak', izena: 'Mugatutako erabilerak', deskribapena: 'Kasu zehatzetan soilik baimendutako erabilerak.' },
      { id: 'erabilera_debekatuak', izena: 'Debekatutako erabilerak', deskribapena: 'Inola ere onartzen ez diren erabilerak.' },
      { id: 'irakasleak', izena: 'Irakasleentzako orientabideak', deskribapena: 'Nola erabili AA irakaskuntzan.' },
      { id: 'ikasleak', izena: 'Ikasleentzako orientabideak', deskribapena: 'AA ikaskuntzan: nola eta noiz.' },
      { id: 'familiak', izena: 'Familientzako azalpena', deskribapena: 'Zer, zergatik eta zer bermerekin.' },
      { id: 'ebaluazioa', izena: 'Ebaluazioa eta integritate akademikoa', deskribapena: 'Ebaluazio-prozesuen bermeak.' },
      { id: 'pribatutasuna', izena: 'Pribatutasuna eta datuak', deskribapena: 'Datuen tratamendua AA tresnetan.' },
      { id: 'berrikuspena', izena: 'Berrikuspen mekanismoa', deskribapena: 'Noiz eta nola eguneratu gida hau.' },
    ],
  },
  {
    id: 'ongizate_protokoloa',
    izena: 'Ongizate digitaleko protokoloa',
    deskribapena: 'Ikastetxeko ongizate digitalerako jarraibide eta protokoloak.',
    ikonoa: 'Heart',
    kategoria: 'ongizatea',
    mvp: true,
    atalak: [
      { id: 'markoa', izena: 'Marko kontzeptuala', deskribapena: 'Zer ulertzen dugun ongizate digitalaz.' },
      { id: 'pantaila', izena: 'Pantaila-denboraren kudeaketa', deskribapena: 'Irizpideak eta gomendio praktikoak.' },
      { id: 'atsedena', izena: 'Atseden digitalak', deskribapena: 'Deskonexio-momentuak ikastetxean.' },
      { id: 'mugikorrak', izena: 'Mugikor eta gailu adimendunen politika', deskribapena: 'Arau argiak egoera bakoitzerako.' },
      { id: 'ziberbizikidetza', izena: 'Ziberbizikidetza', deskribapena: 'Prebentzio eta esku-hartzea.' },
      { id: 'tutoretza', izena: 'Tutoretza-ekintzan txertatzea', deskribapena: 'Proposamen praktikoak adinaren arabera.' },
      { id: 'familiak', izena: 'Familien orientazioa', deskribapena: 'Etxerako gomendio koherenteak.' },
      { id: 'ebaluazioa', izena: 'Ebaluazio eta jarraipena', deskribapena: 'Nola neurtu eta berrikusi.' },
    ],
  },
  {
    id: 'mugikor_orientabideak',
    izena: 'Mugikorra eta erloju adimendunak: orientabideak',
    deskribapena: 'Gailu mugikorren erabilerari buruzko arau eta orientabide argiak.',
    ikonoa: 'Smartphone',
    kategoria: 'ongizatea',
    mvp: true,
    atalak: [
      { id: 'helburua', izena: 'Helburua', deskribapena: 'Zergatik arautu behar den.' },
      { id: 'arauak_lh', izena: 'Lehen Hezkuntzarako arauak', deskribapena: '' },
      { id: 'arauak_dbh', izena: 'DBHrako arauak', deskribapena: '' },
      { id: 'arauak_batx', izena: 'Batxilergoko arauak', deskribapena: '' },
      { id: 'salbuespenak', izena: 'Salbuespenak', deskribapena: 'Hezkuntza-helburuetarako erabilera.' },
      { id: 'komunikazioa', izena: 'Familiei jakinaraztea', deskribapena: '' },
    ],
  },
  {
    id: 'familia_gutuna',
    izena: 'Familien komunikazio gutuna',
    deskribapena: 'Familiei digitalizazio estrategiaren berri emateko gutun eredua.',
    ikonoa: 'Mail',
    kategoria: 'komunikazioa',
    mvp: true,
    atalak: [
      { id: 'agurra', izena: 'Agurra', deskribapena: '' },
      { id: 'testuingurua', izena: 'Testuingurua', deskribapena: 'Zergatik idazten dugun gutun hau.' },
      { id: 'neurri_nagusiak', izena: 'Neurri nagusiak', deskribapena: 'Zer aldaketa edo neurri berri abiatzen ditugun.' },
      { id: 'konpromisoak', izena: 'Gure konpromisoak', deskribapena: 'Zer bermatzen dugun.' },
      { id: 'parte_hartzea', izena: 'Parte-hartzeko deia', deskribapena: '' },
      { id: 'kontaktua', izena: 'Kontaktua', deskribapena: '' },
    ],
  },
  {
    id: 'batzorde_funtzionamendua',
    izena: 'Digitalizazio-batzordearen funtzionamendu dokumentua',
    deskribapena: 'Batzordearen osaera, eginkizunak eta lan-dinamika.',
    ikonoa: 'Users',
    kategoria: 'gobernantza',
    mvp: true,
    atalak: [
      { id: 'osaera', izena: 'Osaera', deskribapena: 'Nortzuk osatzen duten.' },
      { id: 'eginkizunak', izena: 'Eginkizunak', deskribapena: 'Zer da batzordearen ardura.' },
      { id: 'bilera_maiztasuna', izena: 'Bileren maiztasuna', deskribapena: '' },
      { id: 'erabaki_hartzea', izena: 'Erabaki-hartze prozesua', deskribapena: '' },
      { id: 'koordinazioa', izena: 'Zuzendaritzarekin koordinazioa', deskribapena: '' },
      { id: 'ebaluazioa', izena: 'Urteko ebaluazioa', deskribapena: '' },
    ],
  },
  {
    id: 'datu_babesa',
    izena: 'Datuen babeserako oinarrizko protokoloa',
    deskribapena: 'Datu pertsonalen tratamendurako oinarrizko jarraibideak.',
    ikonoa: 'Shield',
    kategoria: 'gobernantza',
    mvp: false,
    atalak: [
      { id: 'printzipioak', izena: 'Oinarrizko printzipioak', deskribapena: '' },
      { id: 'datu_motak', izena: 'Tratatzen diren datu motak', deskribapena: '' },
      { id: 'baimenak', izena: 'Baimen sistema', deskribapena: '' },
      { id: 'segurtasuna', izena: 'Segurtasun neurriak', deskribapena: '' },
      { id: 'eskubideak', izena: 'Pertsonen eskubideak', deskribapena: '' },
      { id: 'gorabeherak', izena: 'Segurtasun-gorabeheren kudeaketa', deskribapena: '' },
    ],
  },
  {
    id: 'urteko_txostena',
    izena: 'Urteko jarraipen txostena',
    deskribapena: 'IPDaren urteko berrikuspenaren txosten estandarrizatua.',
    ikonoa: 'ClipboardList',
    kategoria: 'jarraipena',
    mvp: false,
    atalak: [
      { id: 'laburpena', izena: 'Laburpen exekutiboa', deskribapena: '' },
      { id: 'kpi_emaitzak', izena: 'KPI emaitzak', deskribapena: '' },
      { id: 'ekintza_egoera', izena: 'Ekintzen egoera', deskribapena: '' },
      { id: 'lorpenak', izena: 'Lorpen nagusiak', deskribapena: '' },
      { id: 'zailtasunak', izena: 'Zailtasunak eta ikasgaiak', deskribapena: '' },
      { id: 'hurrengo_pausoak', izena: 'Hurrengo pausoak', deskribapena: '' },
    ],
  },
]

export const IPD_TXANTILOIA = {
  testuingurua: `[IKASTETXEAREN_IZENA] [HERRIA]n kokatutako [IKASTETXE_MOTA] da, [IKASLE_KOPURUA] ikasle eta [IRAKASLE_KOPURUA] irakasle ingururekin. [ETAPAK] eskaintzen ditu.

Ikastetxeak digitalizazio prozesu bat abiatzen du Eusko Jaurlaritzaren Adimen Digitala 2025-2029 plan estrategikoaren esparruan, hezkuntza komunitatearen ongizatea, ekitatea eta kalitatea bermatzeko konpromisoarekin.`,

  printzipio_gidariak: `Proiektu digital honek printzipio hauek gidatzen du:

- **Pertsonak erdigunean**: Teknologia pertsonentzat, eta ez alderantziz.
- **Ekitatea**: Aukera digitalak guztientzat bermatzea, baliabide eta aniztasun egoera guztiak kontuan hartuz.
- **Burujabetza digitala**: Ikastetxearen autonomia eta kontrola bere datu eta tresnen gainean.
- **Segurtasuna eta pribatutasuna**: Datuen babesa eta zibersegurtasuna lehentasun gisa.
- **Ongizate digitala**: Teknologiaren erabilera osasungarria, orekatua eta kontzientea.
- **Gardentasuna**: Erabaki digitalak argiak eta arrazonagarriak izatea.
- **Euskara**: Hizkuntza normalkuntzaren alde arlo digitalean ere lan egitea.`,
}

export function sortutIPDZirriborroa(eskola, diagnostikoEmaitzak) {
  const orain = new Date().toLocaleDateString('eu-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const ahulak = diagnostikoEmaitzak.dimentsioak
    .filter((d) => d.puntuazioa !== null && d.puntuazioa < 3)
    .sort((a, b) => a.puntuazioa - b.puntuazioa)

  const sendoak = diagnostikoEmaitzak.dimentsioak
    .filter((d) => d.puntuazioa !== null && d.puntuazioa >= 3)
    .sort((a, b) => b.puntuazioa - a.puntuazioa)

  return {
    titulua: `${eskola.izena} — Ikastetxeko Proiektu Digitala`,
    data: orain,
    testuingurua: IPD_TXANTILOIA.testuingurua
      .replace('[IKASTETXEAREN_IZENA]', eskola.izena || '[Ikastetxearen izena]')
      .replace('[HERRIA]', eskola.herria || '[Herria]')
      .replace('[IKASTETXE_MOTA]', eskola.mota || 'ikastetxe publikoa')
      .replace('[IKASLE_KOPURUA]', eskola.ikasleKopurua || '[kopurua]')
      .replace('[IRAKASLE_KOPURUA]', eskola.irakasleKopurua || '[kopurua]')
      .replace('[ETAPAK]', eskola.etapak?.join(', ') || '[etapak]'),
    printzipioak: IPD_TXANTILOIA.printzipio_gidariak,
    diagnostiko_sintesia: diagnostikoEmaitzak,
    hobetzeko_arloak: ahulak.map((d) => ({
      dimentsioa: d.dimentsioa.izena,
      puntuazioa: d.puntuazioa,
      maila: d.maila?.izena,
    })),
    indarguneak: sendoak.map((d) => ({
      dimentsioa: d.dimentsioa.izena,
      puntuazioa: d.puntuazioa,
      maila: d.maila?.izena,
    })),
  }
}
