import { useMemo } from 'react'
import { getDniWMiesiacu } from '../utils/polishMonths'

export default function useCalculations(miesiacDane, rok, miesiac) {
  return useMemo(() => {
    const przychodyPlan = miesiacDane.przychody?.reduce((s, p) => s + (p.planowane || 0), 0) || 0
    const przychodyRzecz = miesiacDane.przychody?.reduce((s, p) => s + (p.rzeczywiste || 0), 0) || 0

    const rachunkiPlan = miesiacDane.rachunki?.reduce((s, r) => s + (r.planowane || 0), 0) || 0
    const rachunkiRzecz = miesiacDane.rachunki?.reduce((s, r) => s + (r.rzeczywiste || 0), 0) || 0

    const wydatkiPlan = miesiacDane.wydatki?.reduce((s, w) => s + (w.planowane || 0), 0) || 0
    const wydatkiRzecz = miesiacDane.wydatki?.reduce((s, w) => s + (w.rzeczywiste || 0), 0) || 0

    const subskrPlan = miesiacDane.subskrypcje?.reduce((s, s_) => s + (s_.planowane || 0), 0) || 0
    const subskrRzecz = miesiacDane.subskrypcje?.reduce((s, s_) => s + (s_.rzeczywiste || 0), 0) || 0

    const oszczPlan = miesiacDane.oszczednosci?.reduce((s, o) => s + (o.planowane || 0), 0) || 0
    const oszczRzecz = miesiacDane.oszczednosci?.reduce((s, o) => s + (o.rzeczywiste || 0), 0) || 0

    const wydDodRzecz = miesiacDane.wydatkiDodatkowe?.reduce((s, wd) => s + (wd.kwota || 0), 0) || 0

    const dlugiPlan = miesiacDane.dlugi?.reduce((s, d) => s + (d.planowane || 0), 0) || 0
    const dlugiRzecz = miesiacDane.dlugi?.reduce((s, d) => s + (d.rzeczywiste || 0), 0) || 0

    const laczneWydatkiRzecz = rachunkiRzecz + wydatkiRzecz + subskrRzecz + wydDodRzecz + dlugiRzecz
    const doWydania = przychodyRzecz - laczneWydatkiRzecz - oszczRzecz

    const dniWMiesiacu = getDniWMiesiacu(miesiac, rok)
    const srDzienny = dniWMiesiacu > 0 ? laczneWydatkiRzecz / dniWMiesiacu : 0

    const danePrzegladuFinansowego = [
      { kategoria: 'Rachunki', planowane: rachunkiPlan, rzeczywiste: rachunkiRzecz, roznica: rachunkiRzecz - rachunkiPlan },
      { kategoria: 'Wydatki', planowane: wydatkiPlan, rzeczywiste: wydatkiRzecz, roznica: wydatkiRzecz - wydatkiPlan },
      { kategoria: 'Subskrypcje', planowane: subskrPlan, rzeczywiste: subskrRzecz, roznica: subskrRzecz - subskrPlan },
      { kategoria: 'Oszczędności', planowane: oszczPlan, rzeczywiste: oszczRzecz, roznica: oszczRzecz - oszczPlan },
      { kategoria: 'Dług', planowane: dlugiPlan, rzeczywiste: dlugiRzecz, roznica: dlugiRzecz - dlugiPlan },
      { kategoria: 'Środki Pozostałe', planowane: przychodyPlan, rzeczywiste: doWydania, roznica: doWydania - przychodyPlan }
    ]

    const daneWykresSlupkowego = [
      { nazwa: 'Rachunki', planowane: rachunkiPlan, rzeczywiste: rachunkiRzecz },
      { nazwa: 'Wydatki', planowane: wydatkiPlan, rzeczywiste: wydatkiRzecz },
      { nazwa: 'Subskrypcje', planowane: subskrPlan, rzeczywiste: subskrRzecz },
      { nazwa: 'Oszczędności', planowane: oszczPlan, rzeczywiste: oszczRzecz },
      { nazwa: 'Dług', planowane: dlugiPlan, rzeczywiste: dlugiRzecz }
    ]

    const wydatkiPoPodziale = [
      { nazwa: 'Rachunki', wartosc: rachunkiRzecz },
      { nazwa: 'Wydatki', wartosc: wydatkiRzecz },
      { nazwa: 'Subskrypcje', wartosc: subskrRzecz },
      { nazwa: 'Dług', wartosc: dlugiRzecz }
    ].filter(x => x.wartosc > 0)

    return {
      przychodyPlan,
      przychodyRzecz,
      rachunkiPlan,
      rachunkiRzecz,
      wydatkiPlan,
      wydatkiRzecz,
      subskrPlan,
      subskrRzecz,
      oszczPlan,
      oszczRzecz,
      wydDodRzecz,
      dlugiPlan,
      dlugiRzecz,
      laczneWydatkiRzecz,
      doWydania,
      srDzienny,
      danePrzegladuFinansowego,
      daneWykresSlupkowego,
      daneWykresuKolowego: wydatkiPoPodziale
    }
  }, [miesiacDane, rok, miesiac])
}
