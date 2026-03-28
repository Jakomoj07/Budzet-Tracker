import YearAccordion from './YearAccordion'

export default function HistoryView({ data, ustawAktywny, ustawZakladke, waluta }) {
  const lata = Object.keys(data).sort((a, b) => Number(b) - Number(a))

  const otworzMiesiac = (rok, miesiac) => {
    ustawAktywny(rok, miesiac)
    ustawZakladke(0)
  }

  if (lata.length === 0) {
    return (
      <div className="widok-tresc">
        <h1 className="text-5xl font-bold text-budzet-textPrimary mb-4">Historia</h1>
        <div className="karta p-6">
          <p className="text-budzet-textMuted">Brak zapisanych miesięcy. Utwórz nowy miesiąc aby rozpocząć.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="widok-tresc-waski">
      <h1 className="text-5xl font-bold text-budzet-textPrimary mb-8">Historia</h1>
      {lata.map(rok => (
        <YearAccordion
          key={rok}
          rok={rok}
          daneRoku={data[rok] || {}}
          onOtworzMiesiac={otworzMiesiac}
          waluta={waluta}
        />
      ))}
    </div>
  )
}
