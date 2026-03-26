import { formatWaluta } from '../../utils/waluty'

export default function FinancialOverview({ obliczenia, waluta }) {
  return (
    <div className="panel">
      <div className="panel-header">PRZEGLĄD FINANSOWY</div>
      <table className="table-base">
        <thead>
          <tr>
            <th>KATEGORIA</th>
            <th style={{ width: '110px' }}>PLANOWANE</th>
            <th style={{ width: '110px' }}>RZECZYWISTE</th>
            <th style={{ width: '100px' }}>RÓŻNICA</th>
          </tr>
        </thead>
        <tbody>
          {obliczenia.danePrzegladuFinansowego.map((row, idx) => (
            <tr key={idx}>
              <td>{row.kategoria}</td>
              <td>{formatWaluta(row.planowane, waluta)}</td>
              <td>{formatWaluta(row.rzeczywiste, waluta)}</td>
              <td className={row.roznica >= 0 ? 'positive' : 'negative'}>
                {row.roznica >= 0 ? '+' : ''}{formatWaluta(row.roznica, waluta)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={{ textAlign: 'right' }}>Środki Pozostałe:</td>
            <td className={obliczenia.doWydania >= 0 ? 'positive' : 'negative'}>
              {obliczenia.doWydania >= 0 ? '+' : ''}{formatWaluta(obliczenia.doWydania, waluta)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
