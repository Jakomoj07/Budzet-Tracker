import SummaryCards from './SummaryCards'
import FinancialOverview from './FinancialOverview'
import ChartsRow from './ChartsRow'
import SectionPanel from './SectionPanel'

// Stałe definicje kolumn
const KOLUMNY_PRZYCHODY = [
  { klucz: 'nazwa', naglowek: 'ŹRÓDŁO PRZYCHODU', typ: 'tekst' },
  { klucz: 'dataWyplaty', naglowek: 'DATA', typ: 'tekst', szerokosc: '70px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', readOnly: true }
]

const KOLUMNY_RACHUNKI = [
  { klucz: 'nazwa', naglowek: 'RACHUNEK', typ: 'tekst' },
  { klucz: 'data', naglowek: 'TERMIN', typ: 'tekst', szerokosc: '55px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', readOnly: true }
]

const KOLUMNY_WYDATKI = [
  { klucz: 'nazwa', naglowek: 'TYP WYDATKU', typ: 'tekst' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', readOnly: true }
]

const KOLUMNY_SUBSKRYPCJE = [
  { klucz: 'nazwa', naglowek: 'ABONAMENT', typ: 'tekst' },
  { klucz: 'data', naglowek: 'TERMIN', typ: 'tekst', szerokosc: '55px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', readOnly: true }
]

const KOLUMNY_KONTA = [
  { klucz: 'nazwa', naglowek: 'BANK', typ: 'tekst' },
  { klucz: 'saldo', naglowek: 'SALDO', typ: 'liczba' },
  { klucz: 'wplaty', naglowek: 'WPŁATY', typ: 'liczba' },
  { klucz: 'wyplaty', naglowek: 'WYPŁATY', typ: 'liczba' },
  { klucz: 'saldoBiezace', naglowek: 'SALDO BIEŻĄCE', typ: 'liczba', readOnly: true }
]

const KOLUMNY_OSZCZEDNOSCI_DLUGI = [
  { klucz: 'nazwa', naglowek: 'POZYCJA', typ: 'tekst' },
  { klucz: 'data', naglowek: 'TERMIN', typ: 'tekst', szerokosc: '55px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', readOnly: true }
]

export default function MonthlyView({
  budzetData,
  aktywnyMiesiac,
  aktualizujSekcje,
  obliczenia,
  waluta
}) {
  return (
    <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto">
      {/* Nagłówek */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-budzet-textPrimary">
          {aktywnyMiesiac}
        </h1>
        <p className="text-budzet-textMuted mt-2">— BUDŻET MIESIĘCZNY —</p>
      </div>

      {/* Karty podsumowania */}
      <div className="mb-8">
        <SummaryCards obliczenia={obliczenia} waluta={waluta} />
      </div>

      {/* Przegląd + Wykresy */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-1">
          <FinancialOverview obliczenia={obliczenia} waluta={waluta} />
        </div>
        <div className="col-span-2">
          <ChartsRow obliczenia={obliczenia} waluta={waluta} />
        </div>
      </div>

      {/* Przychody, Rachunki, Wydatki, Subskrypcje */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <SectionPanel
          tytul="PRZYCHODY"
          wiersze={budzetData.przychody || []}
          kolumny={KOLUMNY_PRZYCHODY}
          onZmiana={w => aktualizujSekcje('przychody', w)}
          waluta={waluta}
        />
        <SectionPanel
          tytul="RACHUNKI"
          wiersze={budzetData.rachunki || []}
          kolumny={KOLUMNY_RACHUNKI}
          onZmiana={w => aktualizujSekcje('rachunki', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
        <SectionPanel
          tytul="WYDATKI"
          wiersze={budzetData.wydatki || []}
          kolumny={KOLUMNY_WYDATKI}
          onZmiana={w => aktualizujSekcje('wydatki', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
        <SectionPanel
          tytul="SUBSKRYPCJE"
          wiersze={budzetData.subskrypcje || []}
          kolumny={KOLUMNY_SUBSKRYPCJE}
          onZmiana={w => aktualizujSekcje('subskrypcje', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
      </div>

      {/* Konta, Oszczędności, Wydatki Dodatkowe, Dług */}
      <div className="grid grid-cols-4 gap-4">
        <SectionPanel
          tytul="KONTA BANKOWE"
          wiersze={budzetData.konta || []}
          kolumny={KOLUMNY_KONTA}
          onZmiana={w => aktualizujSekcje('konta', w)}
          kluczeDoSumy={['saldo', 'wplaty', 'wyplaty']}
          waluta={waluta}
        />
        <SectionPanel
          tytul="OSZCZĘDNOŚCI"
          wiersze={budzetData.oszczednosci || []}
          kolumny={KOLUMNY_OSZCZEDNOSCI_DLUGI}
          onZmiana={w => aktualizujSekcje('oszczednosci', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
        <SectionPanel
          tytul="WYDATKI DODATKOWE"
          wiersze={budzetData.wydatkiDodatkowe || []}
          kolumny={[
            { klucz: 'nazwa', naglowek: 'TYP', typ: 'tekst' },
            { klucz: 'kwota', naglowek: 'KWOTA', typ: 'liczba' }
          ]}
          onZmiana={w => aktualizujSekcje('wydatkiDodatkowe', w)}
          waluta={waluta}
        />
        <SectionPanel
          tytul="DŁUG"
          wiersze={budzetData.dlugi || []}
          kolumny={KOLUMNY_OSZCZEDNOSCI_DLUGI}
          onZmiana={w => aktualizujSekcje('dlugi', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
      </div>
    </div>
  )
}
