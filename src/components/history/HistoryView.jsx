import YearAccordion from './YearAccordion'

export default function HistoryView({ data, ustawAktywny, ustawZakladke, waluta }) {
  const lata = Object.keys(data).sort((a, b) => Number(b) - Number(a))

  const handleOtworzMiesiac = (rok, miesiac) => {
    ustawAktywny(rok, miesiac)
    ustawZakladke(0)
  }

  if (lata.length === 0) {
    return (
      <div className="pt-24 pb-8 px-6">
        <h1 className="text-5xl font-bold text-budzet-textPrimary mb-4">Historia</h1>
        <div className="panel p-6">
          <p className="text-budzet-textMuted">Brak zapisanych miesięcy. Utwórz nowy miesiąc aby rozpocząć.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-8 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-budzet-textPrimary mb-8">Historia</h1>
      {lata.map(rok => (
        <YearAccordion
          key={rok}
          rok={rok}
          daneRoku={data[rok] || {}}
          onOtworzMiesiac={handleOtworzMiesiac}
          waluta={waluta}
        />
      ))}
    </div>
  )
}
