import { formatWaluta } from '../../utils/waluty'

export default function SummaryCards({ obliczenia, waluta }) {
  const karty = [
    { label: 'DO WYDANIA', wartosc: obliczenia.doWydania, css: obliczenia.doWydania < 0 ? 'text-budzet-negative' : 'text-budzet-positive' },
    { label: 'ŚR. DZIENNY', wartosc: obliczenia.srDzienny, css: '' },
    { label: 'OSZCZĘDNOŚCI', wartosc: obliczenia.oszczRzecz, css: '' },
    { label: 'PRZYCHODY', wartosc: obliczenia.przychodyRzecz, css: '' },
    { label: 'WYDATKI OGÓŁEM', wartosc: obliczenia.laczneWydatkiRzecz, css: '' }
  ]

  return (
    <div className="flex gap-3 flex-wrap">
      {karty.map(karta => (
        <div key={karta.label} className="stat-card flex-1 min-w-[150px]">
          <div className="stat-card-label">{karta.label}</div>
          <div className={`stat-card-value ${karta.css}`}>
            {formatWaluta(karta.wartosc, waluta)}
          </div>
        </div>
      ))}
    </div>
  )
}
