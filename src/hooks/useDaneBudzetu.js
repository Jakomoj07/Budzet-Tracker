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

function szkieletKategorii(dane) {
  return {
    przychody: dane.przychody.map(p => ({ nazwa: p.nazwa, id: p.id })),
    rachunki: dane.rachunki.map(r => ({ nazwa: r.nazwa, id: r.id })),
    wydatki: dane.wydatki.map(w => ({ nazwa: w.nazwa, id: w.id })),
    subskrypcje: dane.subskrypcje.map(s => ({ nazwa: s.nazwa, id: s.id })),
    oszczednosci: dane.oszczednosci.map(o => ({ nazwa: o.nazwa, id: o.id })),
    dlugi: dane.dlugi.map(d => ({ nazwa: d.nazwa, id: d.id }))
  }
}

function wypelnijKategoriami(puste, kategorie) {
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

export default function useDaneBudzetu() {
  const [data, setData] = useState(() => {
    try {
      const zapisane = localStorage.getItem('budzet_tracker_v1')
      if (zapisane) {
        return JSON.parse(zapisane)
      }
    } catch (blad) {
      console.error('Błąd przy ładowaniu danych z localStorage:', blad)
    }
    return { '2025': { 'Styczeń': getSampleData() } }
  })

  const [aktywnyRok, setAktywnyRok] = useState('2025')
  const [aktywnyMiesiac, setAktywnyMiesiac] = useState('Styczeń')
  const timeoutZapisuRef = useRef(null)

  const aktywnyMiesiacDane = data[aktywnyRok]?.[aktywnyMiesiac] || pustyMiesiac()

  useEffect(() => {
    if (timeoutZapisuRef.current) {
      clearTimeout(timeoutZapisuRef.current)
    }

    timeoutZapisuRef.current = setTimeout(() => {
      localStorage.setItem('budzet_tracker_v1', JSON.stringify(data))
    }, 500)

    return () => {
      if (timeoutZapisuRef.current) {
        clearTimeout(timeoutZapisuRef.current)
      }
    }
  }, [data])

  const ustawAktywny = (rok, miesiac) => {
    setAktywnyRok(String(rok))
    setAktywnyMiesiac(miesiac)
  }

  const aktualizujSekcje = (nazwaSekcji, daneSekcji) => {
    setData(prev => ({
      ...prev,
      [aktywnyRok]: {
        ...prev[aktywnyRok],
        [aktywnyMiesiac]: {
          ...prev[aktywnyRok]?.[aktywnyMiesiac],
          [nazwaSekcji]: daneSekcji
        }
      }
    }))
  }

  const nowyMiesiac = (rok, indeks, kopiujKategorie = false) => {
    const numerRoku = String(rok)
    const nazwa = MIESIACE[indeks - 1]

    if (!nazwa) return

    const noweDane = kopiujKategorie && data[numerRoku]?.[MIESIACE[0]]
      ? wypelnijKategoriami(pustyMiesiac(), szkieletKategorii(data[numerRoku][MIESIACE[0]]))
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
    const wynik = []
    const lata = Object.keys(data).sort()

    lata.forEach(rok => {
      const miesiace = Object.keys(data[rok])
      miesiace.forEach(miesiac => {
        wynik.push({ rok, miesiac })
      })
    })

    return wynik.sort((a, b) => {
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
