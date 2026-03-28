import { formatWaluta } from '../../utils/waluty'

export default function FinancialOverview({ obliczenia, waluta }) {
  return (
    <div className="karta">
      <div className="karta-naglowek">PRZEGLĄD FINANSOWY</div>
      <table className="tabela">
        <thead>
          <tr>
            <th>KATEGORIA</th>
            <th style={{ width: '110px' }}>PLANOWANE</th>
            <th style={{ width: '110px' }}>RZECZYWISTE</th>
            <th style={{ width: '100px' }}>RÓŻNICA</th>
          </tr>
        </thead>
        <tbody>
          {obliczenia.danePrzegladu.map((wiersz, idx) => (
            <tr key={idx}>
              <td>{wiersz.kategoria}</td>
              <td>{formatWaluta(wiersz.planowane, waluta)}</td>
              <td>{formatWaluta(wiersz.rzeczywiste, waluta)}</td>
              <td className={wiersz.roznica >= 0 ? 'dodatnie' : 'ujemne'}>
                {wiersz.roznica >= 0 ? '+' : ''}{formatWaluta(wiersz.roznica, waluta)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={{ textAlign: 'right' }}>Środki Pozostałe:</td>
            <td className={obliczenia.doWydania >= 0 ? 'dodatnie' : 'ujemne'}>
              {obliczenia.doWydania >= 0 ? '+' : ''}{formatWaluta(obliczenia.doWydania, waluta)}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
