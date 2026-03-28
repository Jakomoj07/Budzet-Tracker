import { formatWaluta } from '../../utils/waluty'

export default function SummaryCards({ obliczenia, waluta }) {
  const karty = [
    { etykieta: 'DO WYDANIA', wartosc: obliczenia.doWydania, klasa: obliczenia.doWydania < 0 ? 'ujemne' : 'dodatnie' },
    { etykieta: 'ŚR. DZIENNY', wartosc: obliczenia.sredniDzienny, klasa: 'text-budzet-textPrimary' },
    { etykieta: 'OSZCZĘDNOŚCI', wartosc: obliczenia.oszczednosciRzecz, klasa: 'text-budzet-textPrimary' },
    { etykieta: 'PRZYCHODY', wartosc: obliczenia.przychodyRzecz, klasa: 'text-budzet-textPrimary' },
    { etykieta: 'WYDATKI OGÓŁEM', wartosc: obliczenia.sumaWydatkowRzecz, klasa: 'text-budzet-textPrimary' }
  ]

  return (
    <div className="flex gap-3 flex-wrap">
      {karty.map(pozycja => (
        <div key={pozycja.etykieta} className="karta-stat flex-1 min-w-[150px]">
          <div className="karta-stat-etykieta">{pozycja.etykieta}</div>
          <div className={`karta-stat-wartosc ${pozycja.klasa}`}>
            {formatWaluta(pozycja.wartosc, waluta)}
          </div>
        </div>
      ))}
    </div>
  )
}
