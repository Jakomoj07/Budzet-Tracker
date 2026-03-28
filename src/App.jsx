import { useState } from 'react'
import Navbar from './components/Navbar'
import MonthlyView from './components/monthly/MonthlyView'
import AnalysisView from './components/analysis/AnalysisView'
import HistoryView from './components/history/HistoryView'
import useDaneBudzetu from './hooks/useDaneBudzetu'
import useObliczenia from './hooks/useObliczenia'
import useWaluta from './hooks/useWaluta'
import { eksportujDoCSV } from './utils/csvExport'
import { eksportujDoPDF } from './utils/pdfExport'

export default function App() {
  const [aktywnaZakladka, setAktywnaZakladka] = useState(0)

  const budzetData = useDaneBudzetu()
  const { waluta, setWaluta } = useWaluta()

  const obliczenia = useObliczenia(
    budzetData.aktywnyMiesiacDane,
    budzetData.aktywnyRok,
    budzetData.aktywnyMiesiac
  )

  const handleEksportCSV = () => {
    eksportujDoCSV(
      budzetData.aktywnyMiesiacDane,
      budzetData.aktywnyMiesiac,
      budzetData.aktywnyRok
    )
  }

  const handleEksportPDF = () => {
    eksportujDoPDF(
      budzetData.aktywnyMiesiacDane,
      budzetData.aktywnyMiesiac,
      budzetData.aktywnyRok,
      waluta
    )
  }

  return (
    <div className="min-h-screen bg-budzet-page">
      <Navbar
        aktywnyRok={budzetData.aktywnyRok}
        aktywnyMiesiac={budzetData.aktywnyMiesiac}
        ustawAktywny={budzetData.ustawAktywny}
        nowyMiesiac={budzetData.nowyMiesiac}
        aktywnaZakladka={aktywnaZakladka}
        ustawZakladke={setAktywnaZakladka}
        listaWszystkichMiesiecy={budzetData.listaMiesiecy()}
        onEksportCSV={handleEksportCSV}
        onEksportPDF={handleEksportPDF}
        waluta={waluta}
        setWaluta={setWaluta}
      />

      {/* Zawartość */}
      {aktywnaZakladka === 0 && (
        <MonthlyView
          budzetData={budzetData.aktywnyMiesiacDane}
          aktywnyMiesiac={budzetData.aktywnyMiesiac}
          aktywnyRok={budzetData.aktywnyRok}
          aktualizujSekcje={budzetData.aktualizujSekcje}
          obliczenia={obliczenia}
          waluta={waluta}
        />
      )}

      {aktywnaZakladka === 1 && (
        <AnalysisView
          data={budzetData.data}
          waluta={waluta}
        />
      )}

      {aktywnaZakladka === 2 && (
        <HistoryView
          data={budzetData.data}
          ustawAktywny={budzetData.ustawAktywny}
          ustawZakladke={setAktywnaZakladka}
          waluta={waluta}
        />
      )}
    </div>
  )
}
