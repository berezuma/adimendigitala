import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { useStore } from './hooks/useStore'

import Dashboard from './pages/Dashboard'
import Diagnostikoa from './pages/Diagnostikoa'
import Heldutasuna from './pages/Heldutasuna'
import IPDSortzailea from './pages/IPDSortzailea'
import DokumentuLantegia from './pages/DokumentuLantegia'
import EkintzaPlana from './pages/EkintzaPlana'
import Jarraipena from './pages/Jarraipena'
import OngizateDigitala from './pages/OngizateDigitala'
import AAGobernantza from './pages/AAGobernantza'
import FamilienOrientazioa from './pages/FamilienOrientazioa'
import Txostenak from './pages/Txostenak'
import Ezarpenak from './pages/Ezarpenak'

export default function App() {
  const store = useStore()

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard store={store} />} />
        <Route path="/diagnostikoa" element={<Diagnostikoa store={store} />} />
        <Route path="/heldutasuna" element={<Heldutasuna store={store} />} />
        <Route path="/ipd" element={<IPDSortzailea store={store} />} />
        <Route path="/dokumentuak" element={<DokumentuLantegia store={store} />} />
        <Route path="/ekintzak" element={<EkintzaPlana store={store} />} />
        <Route path="/jarraipena" element={<Jarraipena store={store} />} />
        <Route path="/ongizatea" element={<OngizateDigitala store={store} />} />
        <Route path="/aa" element={<AAGobernantza store={store} />} />
        <Route path="/familiak" element={<FamilienOrientazioa />} />
        <Route path="/txostenak" element={<Txostenak store={store} />} />
        <Route path="/ezarpenak" element={<Ezarpenak store={store} />} />
      </Routes>
    </MainLayout>
  )
}
