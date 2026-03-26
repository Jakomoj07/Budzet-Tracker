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

  const poprzedni = () => {
    if (indeksAktualny > 0) {
      const m = listaWszystkichMiesiecy[indeksAktualny - 1]
      ustawAktywny(m.rok, m.miesiac)
    }
  }

  const nastepny = () => {
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
      {/* Górny pasek */}
      <div className="h-14 bg-budzet-accentDark text-white flex items-center justify-between px-6 gap-4">
        {/* Lewa: Logo */}
        <div className="font-bold text-lg flex-shrink-0">Tracker Budżetu</div>

        {/* Środek: Nawigacja */}
        <div className="flex items-center justify-center gap-4 flex-1">
          <button
            onClick={poprzedni}
            disabled={indeksAktualny <= 0}
            className="text-white/70 hover:text-white disabled:opacity-30"
          >
            ←
          </button>
          <div className="px-4 py-1 bg-white/20 rounded min-w-[140px] text-center text-sm font-medium">
            {aktywnyMiesiac} {aktywnyRok}
          </div>
          <button
            onClick={nastepny}
            disabled={indeksAktualny >= listaWszystkichMiesiecy.length - 1}
            className="text-white/70 hover:text-white disabled:opacity-30"
          >
            →
          </button>
        </div>

        {/* Prawa: Akcje */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Waluta */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">WALUTA:</span>
            <div className="flex gap-1">
              {['PLN', 'EUR', 'USD'].map(w => (
                <button
                  key={w}
                  onClick={() => setWaluta(w)}
                  className={`waluta-btn ${waluta === w ? 'waluta-btn-active' : 'waluta-btn-inactive'}`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Nowy Miesiąc */}
          <button
            onClick={handleNowyMiesiac}
            className="btn-primary text-xs"
          >
            +Nowy Miesiąc
          </button>

          {/* Eksport */}
          <div className="relative group">
            <button className="btn-primary text-xs">
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

      {/* Dolny pasek - Zakładki */}
      <div className="h-10 bg-budzet-accentDark px-6 flex items-center gap-2 pb-1.5">
        {['Widok Miesięczny', 'Analiza Ogólna', 'Historia'].map((zakladka, idx) => (
          <button
            key={zakladka}
            onClick={() => ustawZakladke(idx)}
            className={aktywnaZakladka === idx ? 'tab-active' : 'tab-inactive'}
          >
            {zakladka}
          </button>
        ))}
      </div>
    </div>
  )
}
