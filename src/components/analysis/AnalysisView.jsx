import { useMemo } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { formatWaluta } from '../../utils/waluty'

export default function AnalysisView({ data, waluta }) {
  const obliczenia = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return { daneTrend: [], daneGlobalne: {}, kategorie: [] }
    }

    const daneTrend = []
    let lacznePrzychody = 0, laczneWydatki = 0, laczneOszczednosci = 0
    const kategorieMapa = {}
    // Agregujemy wartości po sekcjach (np. "Rachunki", "Wydatki"), żeby zasilić wykres kategorii.
    const dodajDoMapy = (nazwa, wartosc) => {
      kategorieMapa[nazwa] = (kategorieMapa[nazwa] ?? 0) + (wartosc || 0)
    }

    Object.keys(data).sort().forEach(rok => {
      Object.keys(data[rok]).forEach(miesiac => {
        const dane = data[rok][miesiac]
        const przychodyRzecz = (dane.przychody || []).reduce((s, p) => s + (p.rzeczywiste || 0), 0)
        const wydatkiRzecz = (dane.rachunki || []).reduce((s, r) => s + (r.rzeczywiste || 0), 0)
          + (dane.wydatki || []).reduce((s, w) => s + (w.rzeczywiste || 0), 0)
          + (dane.subskrypcje || []).reduce((s, s_) => s + (s_.rzeczywiste || 0), 0)
          + (dane.dlugi || []).reduce((s, d) => s + (d.rzeczywiste || 0), 0)
        const oszczRzecz = (dane.oszczednosci || []).reduce((s, o) => s + (o.rzeczywiste || 0), 0)
        const doWydania = przychodyRzecz - wydatkiRzecz - oszczRzecz

        daneTrend.push({
          miesiac: `${miesiac} ${rok}`,
          przychody: przychodyRzecz,
          wydatki: wydatkiRzecz,
          oszczednosci: oszczRzecz,
          doWydania
        })

        lacznePrzychody += przychodyRzecz
        laczneWydatki += wydatkiRzecz
        laczneOszczednosci += oszczRzecz

        const rachunki = dane.rachunki || []
        const wydatki = dane.wydatki || []
        const subskrypcje = dane.subskrypcje || []
        const dlugi = dane.dlugi || []

        rachunki.forEach(r => dodajDoMapy('Rachunki', r.rzeczywiste))
        wydatki.forEach(w => dodajDoMapy('Wydatki', w.rzeczywiste))
        subskrypcje.forEach(s => dodajDoMapy('Subskrypcje', s.rzeczywiste))
        dlugi.forEach(d => dodajDoMapy('Dług', d.rzeczywiste))
      })
    })

    const liczbaMiesiecy = daneTrend.length
    const sredniaPrzychody = liczbaMiesiecy > 0 ? lacznePrzychody / liczbaMiesiecy : 0
    const srednieWydatki = liczbaMiesiecy > 0 ? laczneWydatki / liczbaMiesiecy : 0
    const sredniaOszczednosci = liczbaMiesiecy > 0 ? laczneOszczednosci / liczbaMiesiecy : 0
    const sredniaStopaOszczednosci = liczbaMiesiecy > 0 && lacznePrzychody > 0
      ? (laczneOszczednosci / lacznePrzychody * 100) : 0

    const najlepszMiesiacPrzychody = daneTrend.reduce((max, m) => m.przychody > max.przychody ? m : max, daneTrend[0])?.miesiac || 'N/A'
    const najgorszyMiesiacWydatki = daneTrend.reduce((max, m) => m.wydatki > max.wydatki ? m : max, daneTrend[0])?.miesiac || 'N/A'

    const kategorieArr = Object.entries(kategorieMapa)
      .map(([nazwa, wartosc]) => ({ nazwa, wartosc }))
      .sort((a, b) => b.wartosc - a.wartosc)

    // Trend salda: opieramy się na średniej z ostatnich 3 miesięcy (próg 500).
    let trend = 'N/A'
    if (liczbaMiesiecy >= 3) {
      const ostatnie3 = daneTrend.slice(-3)
      const sredSredniosci = ostatnie3.reduce((s, m) => s + m.doWydania, 0) / 3
      trend =
        sredSredniosci > 500 ? 'rosnący' : sredSredniosci < -500 ? 'malejący' : 'stabilny'
    }

    const realizacja = liczbaMiesiecy > 0 && lacznePrzychody > 0
      ? ((lacznePrzychody - laczneWydatki) / lacznePrzychody * 100) : 0

    return {
      daneTrend,
      daneGlobalne: {
        lacznePrzychody, laczneWydatki, laczneOszczednosci, liczbaMiesiecy,
        sredniaPrzychody, srednieWydatki, sredniaOszczednosci, sredniaStopaOszczednosci,
        najlepszMiesiacPrzychody, najgorszyMiesiacWydatki, trend, realizacja
      },
      kategorie: kategorieArr
    }
  }, [data])

  if (obliczenia.daneGlobalne.liczbaMiesiecy === 0) {
    return (
      <div className="pt-24 pb-8 px-6">
        <h1 className="text-5xl font-bold text-budzet-textPrimary mb-4">Analiza Ogólna</h1>
        <div className="panel p-6">
          <p className="text-budzet-textMuted">Brak danych do analizy. Utwórz nowy miesiąc aby rozpocząć.</p>
        </div>
      </div>
    )
  }

  const g = obliczenia.daneGlobalne

  return (
    <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold text-budzet-textPrimary mb-2">Analiza Ogólna</h1>
      <p className="text-budzet-textMuted mb-8">Statystyki ze wszystkich zapisanych miesięcy</p>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="stat-card"><div className="stat-card-label">ŁĄCZNE PRZYCHODY</div><div className="stat-card-value positive">{formatWaluta(g.lacznePrzychody, waluta)}</div></div>
        <div className="stat-card"><div className="stat-card-label">ŁĄCZNE WYDATKI</div><div className="stat-card-value negative">{formatWaluta(g.laczneWydatki, waluta)}</div></div>
        <div className="stat-card"><div className="stat-card-label">ŁĄCZNE OSZCZĘDNOŚCI</div><div className="stat-card-value">{formatWaluta(g.laczneOszczednosci, waluta)}</div></div>
        <div className="stat-card"><div className="stat-card-label">LICZBA MIESIĘCY</div><div className="stat-card-value">{g.liczbaMiesiecy}</div></div>
        <div className="stat-card"><div className="stat-card-label">ŚR. PRZYCHODY/MC</div><div className="stat-card-value positive">{formatWaluta(g.sredniaPrzychody, waluta)}</div></div>
        <div className="stat-card"><div className="stat-card-label">ŚR. WYDATKI/MC</div><div className="stat-card-value negative">{formatWaluta(g.srednieWydatki, waluta)}</div></div>
        <div className="stat-card"><div className="stat-card-label">ŚR. OSZCZĘDNOŚCI/MC</div><div className="stat-card-value">{formatWaluta(g.sredniaOszczednosci, waluta)}</div></div>
        <div className={`stat-card ${g.sredniaStopaOszczednosci > 10 ? 'positive' : g.sredniaStopaOszczednosci < 0 ? 'negative' : ''}`}><div className="stat-card-label">ŚR. STOPA OSZCZĘDNOŚCI</div><div className="stat-card-value">{g.sredniaStopaOszczednosci.toFixed(1)}%</div></div>
      </div>

      <div className="panel mb-6">
        <div className="panel-header">TREND PRZYCHODÓW VS WYDATKÓW</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={obliczenia.daneTrend} margin={{ top: 10, right: 10, left: 0, bottom: 50 }}>
            <CartesianGrid stroke="#E8DFD0" /><XAxis dataKey="miesiac" angle={-30} textAnchor="end" height={50} tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} /><Tooltip formatter={(v) => formatWaluta(v, waluta)} /><Legend />
            <Area type="monotone" dataKey="przychody" stroke="#6B8F5E" fill="#6B8F5E" fillOpacity={0.15} name="Przychody" />
            <Area type="monotone" dataKey="wydatki" stroke="#B85C4A" fill="#B85C4A" fillOpacity={0.15} name="Wydatki" />
            <Area type="monotone" dataKey="oszczednosci" stroke="#C4A882" fill="#C4A882" fillOpacity={0.15} name="Oszczędności" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="panel">
          <div className="panel-header">MIESIĘCZNE SALDO</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={obliczenia.daneTrend} margin={{ top: 10, right: 10, left: 0, bottom: 50 }}>
              <CartesianGrid stroke="#E8DFD0" /><XAxis dataKey="miesiac" angle={-30} textAnchor="end" height={50} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} /><Tooltip formatter={(v) => formatWaluta(v, waluta)} />
              <Bar dataKey="doWydania" fill="#8B7355">{obliczenia.daneTrend.map((e, i) => <Cell key={i} fill={e.doWydania >= 0 ? '#6B8F5E' : '#B85C4A'} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="panel"><div className="panel-header">PORÓWNANIE MIESIĘCY</div>
          <table className="table-base text-[11px]"><thead><tr><th>MIESIĄC</th><th>PRZYCHODY</th><th>WYDATKI</th><th>OSZCZĘDNOŚCI</th><th>DO WYDANIA</th><th>STOPA %</th></tr></thead>
            <tbody>{obliczenia.daneTrend.map((m, i) => {const stopa = m.przychody > 0 ? (m.oszczednosci / m.przychody * 100) : 0; return <tr key={i}><td className="text-[9px]">{m.miesiac}</td><td>{formatWaluta(m.przychody, waluta)}</td><td>{formatWaluta(m.wydatki, waluta)}</td><td>{formatWaluta(m.oszczednosci, waluta)}</td><td className={m.doWydania >= 0 ? 'positive' : 'negative'}>{formatWaluta(m.doWydania, waluta)}</td><td>{stopa.toFixed(1)}%</td></tr>})}</tbody>
            <tfoot><tr><td className="font-bold">ŚREDNIA</td><td>{formatWaluta(g.sredniaPrzychody, waluta)}</td><td>{formatWaluta(g.srednieWydatki, waluta)}</td><td>{formatWaluta(g.sredniaOszczednosci, waluta)}</td><td>{formatWaluta(g.sredniaPrzychody - g.srednieWydatki - g.sredniaOszczednosci, waluta)}</td><td>{g.sredniaStopaOszczednosci.toFixed(1)}%</td></tr></tfoot>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="panel"><div className="panel-header">KATEGORIE WYDATKÓW</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={obliczenia.kategorie} layout="vertical" margin={{ top: 10, right: 10, left: 120, bottom: 10 }}>
              <CartesianGrid stroke="#E8DFD0" /><XAxis type="number" tick={{ fontSize: 10 }} /><YAxis dataKey="nazwa" type="category" width={115} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => formatWaluta(v, waluta)} /><Bar dataKey="wartosc" fill="#C4A882" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="stat-card"><div className="stat-card-label">NAJLEPSZY MIESIĄC</div><div className="stat-card-value positive text-sm">{g.najlepszMiesiacPrzychody}</div></div>
          <div className="stat-card"><div className="stat-card-label">NAJWYŻSZE WYDATKI</div><div className="stat-card-value negative text-sm">{g.najgorszyMiesiacWydatki}</div></div>
          <div className="stat-card"><div className="stat-card-label">TREND SALDA</div><div className={`stat-card-value text-sm ${g.trend === 'rosnący' ? 'positive' : g.trend === 'malejący' ? 'negative' : ''}`}>{g.trend === 'rosnący' ? '📈 Rosnący' : g.trend === 'malejący' ? '📉 Malejący' : '➡️ Stabilny'}</div></div>
          <div className="stat-card"><div className="stat-card-label">ŁĄCZNE OSZCZĘDZENIA</div><div className="stat-card-value positive">{formatWaluta(g.laczneOszczednosci, waluta)}</div></div>
          <div className="stat-card"><div className="stat-card-label">REALIZACJA BUDŻETU</div><div className={`stat-card-value ${g.realizacja > 0 ? 'positive' : 'negative'}`}>{g.realizacja.toFixed(1)}%</div></div>
        </div>
      </div>
    </div>
  )
}
