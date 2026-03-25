/**
 * EKINTZA PLANA — Datuak eta logika
 */

export const EKINTZA_EGOERAK = [
  { id: 'pendiente', izena: 'Hasi gabe', kolorea: '#94a3b8', ikonoa: 'Circle' },
  { id: 'martxan', izena: 'Martxan', kolorea: '#3b82f6', ikonoa: 'Play' },
  { id: 'atzeratua', izena: 'Atzeratua', kolorea: '#f59e0b', ikonoa: 'AlertTriangle' },
  { id: 'amaituta', izena: 'Amaituta', kolorea: '#22c55e', ikonoa: 'CheckCircle' },
  { id: 'bertan_behera', izena: 'Bertan behera', kolorea: '#ef4444', ikonoa: 'XCircle' },
]

export const LEHENTASUN_MAILAK = [
  { id: 'altua', izena: 'Altua', kolorea: '#ef4444' },
  { id: 'ertaina', izena: 'Ertaina', kolorea: '#f59e0b' },
  { id: 'baxua', izena: 'Baxua', kolorea: '#22c55e' },
]

export const EKINTZA_IRADOKIZUNAK = [
  {
    dimentsioa: 'gobernantza',
    izenburua: 'Digitalizazio-batzordea eratu',
    deskribapena: 'Ikastetxean digitalizazio-batzorde formala sortu, kideak izendatu eta funtzionamendu-arauak finkatu.',
    lehentasuna: 'altua',
    iraupena: '1 hilabete',
  },
  {
    dimentsioa: 'gobernantza',
    izenburua: 'IPD lehen zirriborroa idatzi',
    deskribapena: 'Diagnostikoaren emaitzetan oinarrituta, IPDaren lehen bertsio landu.',
    lehentasuna: 'altua',
    iraupena: '2 hilabete',
  },
  {
    dimentsioa: 'irakasle_konpetentzia',
    izenburua: 'Irakasleen formakuntza-plana diseinatu',
    deskribapena: 'DigCompEdu esparruan oinarritutako formakuntza-ibilbide modularra diseinatu.',
    lehentasuna: 'altua',
    iraupena: '1 hilabete',
  },
  {
    dimentsioa: 'ongizate_digitala',
    izenburua: 'Mugikor-politika onartu',
    deskribapena: 'Gailu mugikorren erabilerari buruzko arau argiak prestatu eta komunitateari komunikatu.',
    lehentasuna: 'altua',
    iraupena: '1 hilabete',
  },
  {
    dimentsioa: 'adimen_artifiziala',
    izenburua: 'AA erabilera-gida landu',
    deskribapena: 'Adimen artifizialaren erabilera arduratsurako gida prestatu irakasle, ikasle eta familientzat.',
    lehentasuna: 'ertaina',
    iraupena: '2 hilabete',
  },
  {
    dimentsioa: 'familiak',
    izenburua: 'Familientzako saioa antolatu',
    deskribapena: 'Familia digitaleko orientazio saioa antolatu, adinaren araberako gomendioekin.',
    lehentasuna: 'ertaina',
    iraupena: '1 hilabete',
  },
  {
    dimentsioa: 'zibersegurtasuna',
    izenburua: 'Pribatutasun-protokoloa dokumentatu',
    deskribapena: 'Datuen babeserako oinarrizko protokoloa dokumentatu eta indarrean jarri.',
    lehentasuna: 'altua',
    iraupena: '2 hilabete',
  },
  {
    dimentsioa: 'baliabide_irekiak',
    izenburua: 'Baliabide irekien katalogoa hasi',
    deskribapena: 'Ikastetxean erabiltzen diren baliabide irekien zerrenda osatu eta partekatu.',
    lehentasuna: 'baxua',
    iraupena: '3 hilabete',
  },
  {
    dimentsioa: 'erabilera_pedagogikoa',
    izenburua: 'Praktika onen partekatzea abiarazi',
    deskribapena: 'Irakasleen arteko barne-formakuntza saioak programatu, esperientzia digitalak partekatzeko.',
    lehentasuna: 'ertaina',
    iraupena: '2 hilabete',
  },
  {
    dimentsioa: 'ongizate_digitala',
    izenburua: 'Ziberbizikidetza protokoloa prestatu',
    deskribapena: 'Ziberbullying eta beste arrisku digitalen aurrean jardutzeko prebentzio eta esku-hartze protokoloa.',
    lehentasuna: 'altua',
    iraupena: '2 hilabete',
  },
  {
    dimentsioa: 'azpiegitura',
    izenburua: 'Ekipamendu inbentarioa eguneratu',
    deskribapena: 'Gailu eta azpiegitura digital guztien inbentarioa egin edo eguneratu.',
    lehentasuna: 'ertaina',
    iraupena: '1 hilabete',
  },
  {
    dimentsioa: 'jarraipena',
    izenburua: 'Jarraipen sistema ezarri',
    deskribapena: 'IPDaren jarraipen egiteko sistema sinplea ezarri: KPIak, ebaluazio-bilera eta txosten-txantiloia.',
    lehentasuna: 'ertaina',
    iraupena: '1 hilabete',
  },
]

export function lortuIradokizunak(diagnostikoEmaitzak) {
  if (!diagnostikoEmaitzak?.dimentsioak) return EKINTZA_IRADOKIZUNAK

  const ahulDimentsioak = diagnostikoEmaitzak.dimentsioak
    .filter((d) => d.puntuazioa !== null && d.puntuazioa < 3)
    .map((d) => d.dimentsioa.id)

  return EKINTZA_IRADOKIZUNAK.map((e) => ({
    ...e,
    iradokita: ahulDimentsioak.includes(e.dimentsioa),
  })).sort((a, b) => {
    if (a.iradokita && !b.iradokita) return -1
    if (!a.iradokita && b.iradokita) return 1
    return 0
  })
}
