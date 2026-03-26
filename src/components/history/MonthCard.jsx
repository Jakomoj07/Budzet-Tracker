import { formatWaluta } from '../../utils/waluty'

export default function MonthCard({ rok, miesiac, dane, onSelect, waluta }) {
  const przychodyRzecz = (dane?.przychody || []).reduce((s, p) => s + (p.rzeczywiste || 0), 0)
  const wydatkiRzecz = (dane?.rachunki || []).reduce((s, r) => s + (r.rzeczywiste || 0), 0)
    + (dane?.wydatki || []).reduce((s, w) => s + (w.rzeczywiste || 0), 0)
    + (dane?.subskrypcje || []).reduce((s, s_) => s + (s_.rzeczywiste || 0), 0)
    + (dane?.dlugi || []).reduce((s, d) => s + (d.rzeczywiste || 0), 0)
  const oszczRzecz = (dane?.oszczednosci || []).reduce((s, o) => s + (o.rzeczywiste || 0), 0)

  return (
    <div className="panel p-4 flex flex-col gap-3">
      <div className="font-bold text-budzet-textHeader">{miesiac} {rok}</div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-budzet-textMuted">Przychody:</span>
          <span className="positive">{formatWaluta(przychodyRzecz, waluta)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-budzet-textMuted">Wydatki:</span>
          <span className="negative">{formatWaluta(wydatkiRzecz, waluta)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-budzet-textMuted">Oszczędności:</span>
          <span>{formatWaluta(oszczRzecz, waluta)}</span>
        </div>
        <div className="border-t border-budzet-border pt-2 flex justify-between font-bold">
          <span>Saldo:</span>
          <span className={przychodyRzecz - wydatkiRzecz - oszczRzecz >= 0 ? 'positive' : 'negative'}>
            {formatWaluta(przychodyRzecz - wydatkiRzecz - oszczRzecz, waluta)}
          </span>
        </div>
      </div>
      <button
        onClick={onSelect}
        className="btn-primary w-full text-xs mt-2"
      >
        Otwórz →
      </button>
    </div>
  )
}
