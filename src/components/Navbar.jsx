import { NAZWY_ZAKLADEK, KODY_WALUT } from '../constants/aplikacja'

export default function Navbar({
  aktywnyRok,
  aktywnyMiesiac,
  ustawAktywny,
  nowyMiesiac,
  aktywnaZakladka,
  ustawZakladke,
  listaWszystkichMiesiecy,
  onEksportCSV,
  onEksportPDF,
  waluta,
  setWaluta
}) {
  const indeksAktualny = listaWszystkichMiesiecy.findIndex(m => m.rok === aktywnyRok && m.miesiac === aktywnyMiesiac)

  const poprzedniMiesiac = () => {
    if (indeksAktualny > 0) {
      const m = listaWszystkichMiesiecy[indeksAktualny - 1]
      ustawAktywny(m.rok, m.miesiac)
    }
  }

  const nastepnyMiesiac = () => {
    if (indeksAktualny < listaWszystkichMiesiecy.length - 1) {
      const m = listaWszystkichMiesiecy[indeksAktualny + 1]
      ustawAktywny(m.rok, m.miesiac)
    }
  }

  const handleNowyMiesiac = () => {
    const rokStr = window.prompt('Rok (np. 2025):')
    if (!rokStr) return

    const miesiacIdx = parseInt(window.prompt('Miesiąc (1-12):'))
    if (!miesiacIdx || miesiacIdx < 1 || miesiacIdx > 12) return

    const kopiuj = window.confirm('Skopiować kategorię z pierwszego miesiąca roku?')
    nowyMiesiac(rokStr, miesiacIdx, kopiuj)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="h-14 bg-budzet-accentDark text-white flex items-center justify-between px-6 gap-4">
        <div className="font-bold text-lg flex-shrink-0">Tracker Budżetu</div>

        <div className="flex items-center justify-center gap-4 flex-1">
          <button
            onClick={poprzedniMiesiac}
            disabled={indeksAktualny <= 0}
            className="text-white/70 hover:text-white disabled:opacity-30"
          >
            ←
          </button>
          <div className="px-4 py-1 bg-white/20 rounded min-w-[140px] text-center text-sm font-medium">
            {aktywnyMiesiac} {aktywnyRok}
          </div>
          <button
            onClick={nastepnyMiesiac}
            disabled={indeksAktualny >= listaWszystkichMiesiecy.length - 1}
            className="text-white/70 hover:text-white disabled:opacity-30"
          >
            →
          </button>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">WALUTA:</span>
            <div className="flex gap-1">
              {KODY_WALUT.map(kod => (
                <button
                  key={kod}
                  onClick={() => setWaluta(kod)}
                  className={`przycisk-waluta ${waluta === kod ? 'przycisk-waluta-wybrany' : 'przycisk-waluta-niewybrany'}`}
                >
                  {kod}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNowyMiesiac}
            className="przycisk-glowny text-xs"
          >
            +Nowy Miesiąc
          </button>

          <div className="relative group">
            <button className="przycisk-glowny text-xs">
              Eksportuj ▾
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-budzet-border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[180px]">
              <button
                onClick={onEksportCSV}
                className="w-full text-left px-4 py-2 text-xs hover:bg-budzet-rowAlt text-budzet-textPrimary"
              >
                📊 Eksportuj CSV
              </button>
              <button
                onClick={onEksportPDF}
                className="w-full text-left px-4 py-2 text-xs hover:bg-budzet-rowAlt text-budzet-textPrimary border-t border-budzet-border"
              >
                📄 Eksportuj PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 bg-budzet-accentDark px-6 flex items-center gap-2 pb-1.5">
        {NAZWY_ZAKLADEK.map((etykietaZakladki, idx) => (
          <button
            key={etykietaZakladki}
            onClick={() => ustawZakladke(idx)}
            className={aktywnaZakladka === idx ? 'zakladka-aktywna' : 'zakladka-nieaktywna'}
          >
            {etykietaZakladki}
          </button>
        ))}
      </div>
    </div>
  )
}
