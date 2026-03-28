import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { formatWaluta } from '../../utils/waluty'

const PALETA_KOLOROW = ['#C4A882', '#8B7355', '#B85C4A', '#6B8F5E', '#D4C4A8']

function PodpowiedzSlupkowa({ active, payload, waluta }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-budzet-border rounded p-2 text-xs">
        {payload.map((wpis, i) => (
          <div key={i} style={{ color: wpis.color }}>
            {wpis.name}: {formatWaluta(wpis.value, waluta)}
          </div>
        ))}
      </div>
    )
  }
  return null
}

function PodpowiedzKolowa({ active, payload, waluta }) {
  if (active && payload) {
    return (
      <div className="bg-white border border-budzet-border rounded p-2 text-xs">
        <div>{payload[0].name}: {formatWaluta(payload[0].value, waluta)}</div>
      </div>
    )
  }
  return null
}

export default function ChartsRow({ obliczenia, waluta }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="karta">
        <div className="karta-naglowek">PLANOWANE VS RZECZYWISTE</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={obliczenia.daneWykresuSlupkowego} margin={{ top: 20, right: 10, left: 0, bottom: 40 }}>
            <XAxis
              dataKey="nazwa"
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<PodpowiedzSlupkowa waluta={waluta} />} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="planowane" fill="#C4A882" name="Planowane" />
            <Bar dataKey="rzeczywiste" fill="#8B7355" name="Rzeczywiste" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="karta flex flex-col">
        <div className="karta-naglowek">PODZIAŁ WYDATKÓW</div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={obliczenia.daneWykresuKolowego}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="wartosc"
              >
                {obliczenia.daneWykresuKolowego.map((wpis, indeks) => (
                  <Cell key={`komorka-${indeks}`} fill={PALETA_KOLOROW[indeks % PALETA_KOLOROW.length]} />
                ))}
              </Pie>
              <Tooltip content={<PodpowiedzKolowa waluta={waluta} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="px-3 py-2 border-t border-budzet-border flex flex-col gap-1 text-xs">
          {obliczenia.daneWykresuKolowego.map((wpis, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: PALETA_KOLOROW[i % PALETA_KOLOROW.length] }}
              ></div>
              <span className="text-budzet-textPrimary">{wpis.nazwa}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
