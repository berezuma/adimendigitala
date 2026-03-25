/**
 * KPI ETA ADIERAZLE SISTEMA
 * Ikastetxearen digitalizazio prozesuaren jarraipenerako adierazleak.
 */

export const KPI_KATEGORIAK = [
  { id: 'gobernantza', izena: 'Gobernantza', kolorea: '#3378ff' },
  { id: 'gaitasunak', izena: 'Gaitasunak', kolorea: '#f59e0b' },
  { id: 'ongizatea', izena: 'Ongizatea', kolorea: '#14b8a6' },
  { id: 'berrikuntza', izena: 'Berrikuntza', kolorea: '#ec4899' },
  { id: 'familiak', izena: 'Familiak', kolorea: '#f97316' },
]

export const KPI_LEHENETSIAK = [
  {
    id: 'kpi_01',
    izena: 'IPD eguneratuta',
    deskribapena: 'Ikastetxeko Proiektu Digitala azken urtean berrikusita eta eguneratuta dago.',
    kategoria: 'gobernantza',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'FileCheck',
  },
  {
    id: 'kpi_02',
    izena: 'Urteko IPD berrikuspena egina',
    deskribapena: 'IPDaren urteko berrikuspen formala burutu da.',
    kategoria: 'gobernantza',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'CheckCircle',
  },
  {
    id: 'kpi_03',
    izena: 'Zuzendaritzaren formakuntza digitala',
    deskribapena: 'Zuzendaritza taldeko kideek formakuntza digitala jaso dute.',
    kategoria: 'gaitasunak',
    mota: 'ehunekoa',
    helburua: 80,
    ikonoa: 'GraduationCap',
  },
  {
    id: 'kpi_04',
    izena: 'Irakasleen formakuntza digitala',
    deskribapena: 'Irakasleen % formakuntza digitalaren bat jaso duena urtean.',
    kategoria: 'gaitasunak',
    mota: 'ehunekoa',
    helburua: 60,
    ikonoa: 'Users',
  },
  {
    id: 'kpi_05',
    izena: 'Ongizate digitaleko ekintzak',
    deskribapena: 'Ongizate digitalerako ekintza kopurua inplementatuta.',
    kategoria: 'ongizatea',
    mota: 'zenbakia',
    helburua: 3,
    ikonoa: 'Heart',
  },
  {
    id: 'kpi_06',
    izena: 'Ziberbizikidetza prebentzioa',
    deskribapena: 'Ziberbizikidetzarako prebentzio-mekanismoak aktibo daude.',
    kategoria: 'ongizatea',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'Shield',
  },
  {
    id: 'kpi_07',
    izena: 'AA gida argitaratua',
    deskribapena: 'Adimen artifizialaren erabilerari buruzko gida argitaratu da.',
    kategoria: 'berrikuntza',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'Brain',
  },
  {
    id: 'kpi_08',
    izena: 'Baliabide irekiak sortuak',
    deskribapena: 'Sortutako edo partekatutako baliabide ireki kopurua.',
    kategoria: 'berrikuntza',
    mota: 'zenbakia',
    helburua: 5,
    ikonoa: 'Globe',
  },
  {
    id: 'kpi_09',
    izena: 'Familien parte-hartzea',
    deskribapena: 'Familien % hezkuntza digitaleko jardueraren batean parte hartu duena.',
    kategoria: 'familiak',
    mota: 'ehunekoa',
    helburua: 30,
    ikonoa: 'Home',
  },
  {
    id: 'kpi_10',
    izena: 'Pribatutasun protokoloa ezarrita',
    deskribapena: 'Datuen babeserako protokoloa indarrean dago.',
    kategoria: 'gobernantza',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'Lock',
  },
  {
    id: 'kpi_11',
    izena: 'Azpiegitura inbentarioa eguneratuta',
    deskribapena: 'Ekipamendu digitalaren inbentarioa eguneratuta dago.',
    kategoria: 'gobernantza',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'Monitor',
  },
  {
    id: 'kpi_12',
    izena: 'Mugikor politika ezarrita',
    deskribapena: 'Mugikor eta gailu adimendunen erabilerari buruzko arauak ezarrita daude.',
    kategoria: 'ongizatea',
    mota: 'bai_ez',
    helburua: true,
    ikonoa: 'Smartphone',
  },
]

export function kalkulatuKPIAurrerabidea(kpiak, balioak) {
  const guztira = kpiak.length
  const betatuak = kpiak.filter((kpi) => {
    const balioa = balioak[kpi.id]
    if (balioa === undefined || balioa === null) return false
    if (kpi.mota === 'bai_ez') return balioa === true
    if (kpi.mota === 'ehunekoa') return balioa >= kpi.helburua
    if (kpi.mota === 'zenbakia') return balioa >= kpi.helburua
    return false
  }).length

  return {
    betatuak,
    guztira,
    ehunekoa: guztira > 0 ? Math.round((betatuak / guztira) * 100) : 0,
  }
}
