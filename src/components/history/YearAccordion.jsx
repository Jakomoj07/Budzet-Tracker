import { useState } from 'react'
import MonthCard from './MonthCard'
import { MIESIACE } from '../../utils/polishMonths'

export default function YearAccordion({ rok, daneRoku, onOtworzMiesiac, waluta }) {
  const [rozwiniety, setRozwiniety] = useState(true)

  const miesiaceOrdered = MIESIACE.filter(m => daneRoku[m]).sort((a, b) => MIESIACE.indexOf(a) - MIESIACE.indexOf(b))
  const ileMiesiecy = miesiaceOrdered.length
  const rokKompletny = ileMiesiecy === 12

  return (
    <div className="mb-4">
      <button
        onClick={() => setRozwiniety(!rozwiniety)}
        className="w-full bg-budzet-accentDark text-white px-4 py-3 rounded font-bold text-left flex justify-between items-center hover:bg-budzet-accent transition-colors"
      >
        <div className="flex items-center gap-4">
          <span>{rozwiniety ? '▼' : '▶'} Rok {rok}</span>
          <span className="text-xs opacity-75">{ileMiesiecy} miesięcy</span>
          {rokKompletny && <span className="text-xs bg-budzet-positive px-2 py-1 rounded text-white">Rok Kompletny ✓</span>}
        </div>
      </button>
      {rozwiniety && (
        <div className="grid grid-cols-3 gap-3 p-3 bg-budzet-page">
          {miesiaceOrdered.map(miesiac => (
            <MonthCard
              key={`${rok}-${miesiac}`}
              rok={rok}
              miesiac={miesiac}
              dane={daneRoku[miesiac]}
              onSelect={() => onOtworzMiesiac(rok, miesiac)}
              waluta={waluta}
            />
          ))}
        </div>
      )}
    </div>
  )
}
