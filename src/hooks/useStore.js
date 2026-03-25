/**
 * DATU-BILTEGI NAGUSIA
 * localStorage-n oinarritutako egoera kudeaketa sinplea MVP-rako.
 */

import { useState, useCallback, useEffect } from 'react'

const STORE_KEY = 'adimen_digitala_v1'

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveStore(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Ezin izan da gorde:', e)
  }
}

const DEFAULT_STATE = {
  eskola: {
    izena: '',
    herria: '',
    mota: 'Ikastetxe publikoa',
    etapak: [],
    ikasleKopurua: '',
    irakasleKopurua: '',
    kodea: '',
    zuzendaria: '',
    digitalizazioArduraduna: '',
    emaila: '',
    sortzeData: null,
  },
  diagnostikoa: {
    erantzunak: {},
    amaituta: false,
    data: null,
  },
  ekintzak: [],
  kpiBaloak: {},
  dokumentuak: {},
  ezarpenak: {
    hizkuntza: 'eu',
    modu_iluna: false,
  },
}

export function useStore() {
  const [state, setState] = useState(() => {
    const saved = loadStore()
    return saved ? { ...DEFAULT_STATE, ...saved } : DEFAULT_STATE
  })

  useEffect(() => {
    saveStore(state)
  }, [state])

  const updateEskola = useCallback((updates) => {
    setState((prev) => ({
      ...prev,
      eskola: { ...prev.eskola, ...updates },
    }))
  }, [])

  const updateDiagnostikoa = useCallback((adierazleId, balioa) => {
    setState((prev) => ({
      ...prev,
      diagnostikoa: {
        ...prev.diagnostikoa,
        erantzunak: {
          ...prev.diagnostikoa.erantzunak,
          [adierazleId]: balioa,
        },
      },
    }))
  }, [])

  const markDiagnostikoaAmaituta = useCallback(() => {
    setState((prev) => ({
      ...prev,
      diagnostikoa: {
        ...prev.diagnostikoa,
        amaituta: true,
        data: new Date().toISOString(),
      },
    }))
  }, [])

  const addEkintza = useCallback((ekintza) => {
    setState((prev) => ({
      ...prev,
      ekintzak: [
        ...prev.ekintzak,
        {
          ...ekintza,
          id: `ek_${Date.now()}`,
          sortzeData: new Date().toISOString(),
          egoera: 'pendiente',
        },
      ],
    }))
  }, [])

  const updateEkintza = useCallback((id, updates) => {
    setState((prev) => ({
      ...prev,
      ekintzak: prev.ekintzak.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }))
  }, [])

  const removeEkintza = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      ekintzak: prev.ekintzak.filter((e) => e.id !== id),
    }))
  }, [])

  const updateKPI = useCallback((kpiId, balioa) => {
    setState((prev) => ({
      ...prev,
      kpiBaloak: {
        ...prev.kpiBaloak,
        [kpiId]: balioa,
      },
    }))
  }, [])

  const updateDokumentua = useCallback((docId, atalId, edukia) => {
    setState((prev) => ({
      ...prev,
      dokumentuak: {
        ...prev.dokumentuak,
        [docId]: {
          ...(prev.dokumentuak[docId] || {}),
          [atalId]: edukia,
          _azkenAldaketa: new Date().toISOString(),
        },
      },
    }))
  }, [])

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORE_KEY)
  }, [])

  return {
    state,
    updateEskola,
    updateDiagnostikoa,
    markDiagnostikoaAmaituta,
    addEkintza,
    updateEkintza,
    removeEkintza,
    updateKPI,
    updateDokumentua,
    resetAll,
  }
}
