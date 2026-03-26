import { useState, useEffect, useRef } from 'react'
import { getSampleData } from '../utils/sampleData'
import { MIESIACE } from '../utils/polishMonths'

function pustyMiesiac() {
  return {
    przychody: [],
    rachunki: [],
    wydatki: [],
    subskrypcje: [],
    konta: [],
    oszczednosci: [],
    wydatkiDodatkowe: [],
    dlugi: []
  }
}

// Bierzemy "szkielet" kategorii (nazwa + id) z istniejących danych.
function getDaneNazwKategorii(dane) {
  return {
    przychody: dane.przychody.map(p => ({ nazwa: p.nazwa, id: p.id })),
    rachunki: dane.rachunki.map(r => ({ nazwa: r.nazwa, id: r.id })),
    wydatki: dane.wydatki.map(w => ({ nazwa: w.nazwa, id: w.id })),
    subskrypcje: dane.subskrypcje.map(s => ({ nazwa: s.nazwa, id: s.id })),
    oszczednosci: dane.oszczednosci.map(o => ({ nazwa: o.nazwa, id: o.id })),
    dlugi: dane.dlugi.map(d => ({ nazwa: d.nazwa, id: d.id }))
  }
}

// Tworzymy nowy miesiąc na podstawie list kategorii:
// - wartości liczbowe startują od 0,
// - pola tekstowe/datowe startują jako puste,
// - flagi (checkboxy) ustawiamy na domyślne wartości.
function wypelniKategoriami(puste, kategorie) {
  return {
    przychody: kategorie.przychody.map(k => ({
      id: k.id,
      nazwa: k.nazwa,
      dataWyplaty: '',
      planowane: 0,
      rzeczywiste: 0
    })),
    rachunki: kategorie.rachunki.map(k => ({
      id: k.id,
      nazwa: k.nazwa,
      data: '',
      planowane: 0,
      rzeczywiste: 0,
      opłacone: false
    })),
    wydatki: kategorie.wydatki.map(k => ({
      id: k.id,
      nazwa: k.nazwa,
      planowane: 0,
      rzeczywiste: 0,
      opłacone: false
    })),
    subskrypcje: kategorie.subskrypcje.map(k => ({
      id: k.id,
      nazwa: k.nazwa,
      data: '',
      planowane: 0,
      rzeczywiste: 0,
      opłacone: false
    })),
    konta: puste.konta,
    oszczednosci: kategorie.oszczednosci.map(k => ({
      id: k.id,
      nazwa: k.nazwa,
      data: '',
      planowane: 0,
      rzeczywiste: 0,
      opłacone: false
    })),
    wydatkiDodatkowe: puste.wydatkiDodatkowe,
    dlugi: kategorie.dlugi.map(k => ({
      id: k.id,
      nazwa: k.nazwa,
      data: '',
      planowane: 0,
      rzeczywiste: 0,
      opłacone: false
    }))
  }
}

export default function useBudgetData() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem('budzet_tracker_v1')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Błąd przy ładowaniu danych z localStorage:', e)
    }
    return { '2025': { 'Styczeń': getSampleData() } }
  })

  const [aktywnyRok, setAktywnyRok] = useState('2025')
  const [aktywnyMiesiac, setAktywnyMiesiac] = useState('Styczeń')
  const debounceTimeoutRef = useRef(null)

  const aktywnyMiesiacDane = data[aktywnyRok]?.[aktywnyMiesiac] || pustyMiesiac()

  // Auto-save z debounce
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('budzet_tracker_v1', JSON.stringify(data))
    }, 500)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [data])

  const ustawAktywny = (rok, miesiac) => {
    setAktywnyRok(String(rok))
    setAktywnyMiesiac(miesiac)
  }

  const aktualizujSekcje = (sekcjaNazwa, danasekcji) => {
    setData(prev => ({
      ...prev,
      [aktywnyRok]: {
        ...prev[aktywnyRok],
        [aktywnyMiesiac]: {
          ...prev[aktywnyRok]?.[aktywnyMiesiac],
          [sekcjaNazwa]: danasekcji
        }
      }
    }))
  }

  const nowyMiesiac = (rok, indeks, kopiujKategorie = false) => {
    const numerRoku = String(rok)
    const nazwa = MIESIACE[indeks - 1]

    if (!nazwa) return
    // Jeśli kopiujKategorie=true, to przenosimy nazwy i id (szkielet),
    // a liczby zerujemy. Dzięki temu nowe miesiące wyglądają spójnie.
    const noweDane = kopiujKategorie && data[numerRoku]?.[MIESIACE[0]]
      ? wypelniKategoriami(pustyMiesiac(), getDaneNazwKategorii(data[numerRoku][MIESIACE[0]]))
      : pustyMiesiac()

    setData(prev => ({
      ...prev,
      [numerRoku]: {
        ...prev[numerRoku],
        [nazwa]: noweDane
      }
    }))
  }

  const listaMiesiecy = () => {
    const result = []
    const lata = Object.keys(data).sort()
    
    lata.forEach(rok => {
      const miesiace = Object.keys(data[rok])
      miesiace.forEach(miesiac => {
        result.push({ rok, miesiac })
      })
    })

    return result.sort((a, b) => {
      const rokA = Number(a.rok)
      const rokB = Number(b.rok)
      if (rokA !== rokB) return rokA - rokB
      return MIESIACE.indexOf(a.miesiac) - MIESIACE.indexOf(b.miesiac)
    })
  }

  return {
    data,
    aktywnyRok,
    aktywnyMiesiac,
    aktywnyMiesiacDane,
    ustawAktywny,
    aktualizujSekcje,
    nowyMiesiac,
    listaMiesiecy,
    pustyMiesiac
  }
}
