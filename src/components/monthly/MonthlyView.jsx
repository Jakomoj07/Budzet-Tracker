import SummaryCards from './SummaryCards'
import FinancialOverview from './FinancialOverview'
import ChartsRow from './ChartsRow'
import SectionPanel from './SectionPanel'
import {
  KOLUMNY_PRZYCHODY,
  KOLUMNY_RACHUNKI,
  KOLUMNY_WYDATKI,
  KOLUMNY_SUBSKRYPCJE,
  KOLUMNY_KONTA,
  KOLUMNY_OSZCZEDNOSCI_I_DLUG,
  KOLUMNY_WYDATKI_DODATKOWE
} from './kolumnySekcji'

export default function MonthlyView({
  budzetData,
  aktywnyMiesiac,
  aktualizujSekcje,
  obliczenia,
  waluta
}) {
  return (
    <div className="widok-tresc-szeroki">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-budzet-textPrimary">
          {aktywnyMiesiac}
        </h1>
        <p className="text-budzet-textMuted mt-2">— BUDŻET MIESIĘCZNY —</p>
      </div>

      <div className="mb-8">
        <SummaryCards obliczenia={obliczenia} waluta={waluta} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-1">
          <FinancialOverview obliczenia={obliczenia} waluta={waluta} />
        </div>
        <div className="col-span-2">
          <ChartsRow obliczenia={obliczenia} waluta={waluta} />
        </div>
      </div>

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
          kolumny={KOLUMNY_OSZCZEDNOSCI_I_DLUG}
          onZmiana={w => aktualizujSekcje('oszczednosci', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
        <SectionPanel
          tytul="WYDATKI DODATKOWE"
          wiersze={budzetData.wydatkiDodatkowe || []}
          kolumny={KOLUMNY_WYDATKI_DODATKOWE}
          onZmiana={w => aktualizujSekcje('wydatkiDodatkowe', w)}
          waluta={waluta}
        />
        <SectionPanel
          tytul="DŁUG"
          wiersze={budzetData.dlugi || []}
          kolumny={KOLUMNY_OSZCZEDNOSCI_I_DLUG}
          onZmiana={w => aktualizujSekcje('dlugi', w)}
          pokazCheckbox={true}
          waluta={waluta}
        />
      </div>
    </div>
  )
}
