import { useMemo } from 'react'
import { getDniWMiesiacu } from '../utils/polishMonths'

export default function useObliczenia(miesiacDane, rok, miesiac) {
  return useMemo(() => {
    const przychodyPlan = miesiacDane.przychody?.reduce((s, p) => s + (p.planowane || 0), 0) || 0
    const przychodyRzecz = miesiacDane.przychody?.reduce((s, p) => s + (p.rzeczywiste || 0), 0) || 0

    const rachunkiPlan = miesiacDane.rachunki?.reduce((s, r) => s + (r.planowane || 0), 0) || 0
    const rachunkiRzecz = miesiacDane.rachunki?.reduce((s, r) => s + (r.rzeczywiste || 0), 0) || 0

    const wydatkiPlan = miesiacDane.wydatki?.reduce((s, w) => s + (w.planowane || 0), 0) || 0
    const wydatkiRzecz = miesiacDane.wydatki?.reduce((s, w) => s + (w.rzeczywiste || 0), 0) || 0

    const subskrypcjePlan = miesiacDane.subskrypcje?.reduce((s, row) => s + (row.planowane || 0), 0) || 0
    const subskrypcjeRzecz = miesiacDane.subskrypcje?.reduce((s, row) => s + (row.rzeczywiste || 0), 0) || 0

    const oszczednosciPlan = miesiacDane.oszczednosci?.reduce((s, o) => s + (o.planowane || 0), 0) || 0
    const oszczednosciRzecz = miesiacDane.oszczednosci?.reduce((s, o) => s + (o.rzeczywiste || 0), 0) || 0

    const wydatkiDodatkoweRzecz = miesiacDane.wydatkiDodatkowe?.reduce((s, wd) => s + (wd.kwota || 0), 0) || 0

    const dlugiPlan = miesiacDane.dlugi?.reduce((s, d) => s + (d.planowane || 0), 0) || 0
    const dlugiRzecz = miesiacDane.dlugi?.reduce((s, d) => s + (d.rzeczywiste || 0), 0) || 0

    const sumaWydatkowRzecz =
      rachunkiRzecz + wydatkiRzecz + subskrypcjeRzecz + wydatkiDodatkoweRzecz + dlugiRzecz
    const doWydania = przychodyRzecz - sumaWydatkowRzecz - oszczednosciRzecz

    const dniWMiesiacu = getDniWMiesiacu(miesiac, rok)
    const sredniDzienny = dniWMiesiacu > 0 ? sumaWydatkowRzecz / dniWMiesiacu : 0

    const danePrzegladu = [
      { kategoria: 'Rachunki', planowane: rachunkiPlan, rzeczywiste: rachunkiRzecz, roznica: rachunkiRzecz - rachunkiPlan },
      { kategoria: 'Wydatki', planowane: wydatkiPlan, rzeczywiste: wydatkiRzecz, roznica: wydatkiRzecz - wydatkiPlan },
      { kategoria: 'Subskrypcje', planowane: subskrypcjePlan, rzeczywiste: subskrypcjeRzecz, roznica: subskrypcjeRzecz - subskrypcjePlan },
      { kategoria: 'Oszczędności', planowane: oszczednosciPlan, rzeczywiste: oszczednosciRzecz, roznica: oszczednosciRzecz - oszczednosciPlan },
      { kategoria: 'Dług', planowane: dlugiPlan, rzeczywiste: dlugiRzecz, roznica: dlugiRzecz - dlugiPlan },
      { kategoria: 'Środki Pozostałe', planowane: przychodyPlan, rzeczywiste: doWydania, roznica: doWydania - przychodyPlan }
    ]

    const daneWykresuSlupkowego = [
      { nazwa: 'Rachunki', planowane: rachunkiPlan, rzeczywiste: rachunkiRzecz },
      { nazwa: 'Wydatki', planowane: wydatkiPlan, rzeczywiste: wydatkiRzecz },
      { nazwa: 'Subskrypcje', planowane: subskrypcjePlan, rzeczywiste: subskrypcjeRzecz },
      { nazwa: 'Oszczędności', planowane: oszczednosciPlan, rzeczywiste: oszczednosciRzecz },
      { nazwa: 'Dług', planowane: dlugiPlan, rzeczywiste: dlugiRzecz }
    ]

    const wydatkiDoWykresuKolowego = [
      { nazwa: 'Rachunki', wartosc: rachunkiRzecz },
      { nazwa: 'Wydatki', wartosc: wydatkiRzecz },
      { nazwa: 'Subskrypcje', wartosc: subskrypcjeRzecz },
      { nazwa: 'Dług', wartosc: dlugiRzecz }
    ].filter(x => x.wartosc > 0)

    return {
      przychodyPlan,
      przychodyRzecz,
      rachunkiPlan,
      rachunkiRzecz,
      wydatkiPlan,
      wydatkiRzecz,
      subskrypcjePlan,
      subskrypcjeRzecz,
      oszczednosciPlan,
      oszczednosciRzecz,
      wydatkiDodatkoweRzecz,
      dlugiPlan,
      dlugiRzecz,
      sumaWydatkowRzecz,
      doWydania,
      sredniDzienny,
      danePrzegladu,
      daneWykresuSlupkowego,
      daneWykresuKolowego: wydatkiDoWykresuKolowego
    }
  }, [miesiacDane, rok, miesiac])
}
