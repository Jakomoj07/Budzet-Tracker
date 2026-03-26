import { useState, useEffect } from 'react'
import { generateId } from '../../utils/uuid'
import { formatWaluta } from '../../utils/waluty'

export default function SectionPanel({
  tytul,
  wiersze = [],
  kolumny = [],
  onZmiana,
  pokazCheckbox = false,
  kluczeDoSumy = ['planowane', 'rzeczywiste'],
  waluta = 'PLN'
}) {
  const [edytujKomorke, setEdytujKomorke] = useState(null)
  const [tempValue, setTempValue] = useState('')

  const startEdit = (wierszeId, klucz, wartosc) => {
    setEdytujKomorke({ wierszeId, klucz })
    setTempValue(String(wartosc || ''))
  }

  const saveEdit = (wierszeId, klucz) => {
    const noweWiersze = wiersze.map(w => {
      if (w.id === wierszeId) {
        const kolumna = kolumny.find(k => k.klucz === klucz)
        let nowa = { ...w }
        if (kolumna?.typ === 'liczba') {
          nowa[klucz] = parseFloat(tempValue) || 0
        } else {
          nowa[klucz] = tempValue
        }
        return nowa
      }
      return w
    })
    onZmiana(noweWiersze)
    setEdytujKomorke(null)
  }

  const cancelEdit = () => {
    setEdytujKomorke(null)
    setTempValue('')
  }

  const handleKeyDown = (e, wierszeId, klucz) => {
    if (e.key === 'Enter') {
      saveEdit(wierszeId, klucz)
    } else if (e.key === 'Escape') {
      cancelEdit()
    } else if (e.key === 'Tab') {
      // TAB służy do przechodzenia między kolejnymi edytowalnymi komórkami.
      e.preventDefault()
      saveEdit(wierszeId, klucz)
      const edytowalne = kolumny.filter(k => !k.readOnly)
      const idx = edytowalne.findIndex(k => k.klucz === klucz)
      const kierunek = e.shiftKey ? -1 : 1
      const nastepnaKol = edytowalne[idx + kierunek]
      if (nastepnaKol) {
        setEdytujKomorke({ wierszeId, klucz: nastepnaKol.klucz })
      } else if (!e.shiftKey) {
        const idxWiersza = wiersze.findIndex(w => w.id === wierszeId)
        const nastepnyWiersz = wiersze[idxWiersza + 1]
        if (nastepnyWiersz) {
          setEdytujKomorke({
            wierszeId: nastepnyWiersz.id,
            klucz: edytowalne[0].klucz
          })
        }
      }
    }
  }

  const addRow = () => {
    const nowyWiersz = {
      id: generateId(),
      ...kolumny.reduce((acc, k) => {
        if (k.typ === 'liczba') acc[k.klucz] = 0
        else acc[k.klucz] = ''
        return acc
      }, {})
    }
    if (pokazCheckbox) nowyWiersz.opłacone = false
    onZmiana([...wiersze, nowyWiersz])
  }

  const deleteRow = (id) => {
    if (window.confirm('Usunąć wiersz')) {
      onZmiana(wiersze.filter(w => w.id !== id))
    }
  }

  const toggleCheckbox = (id) => {
    const noweWiersze = wiersze.map(w => {
      if (w.id === id) {
        return { ...w, opłacone: !w.opłacone }
      }
      return w
    })
    onZmiana(noweWiersze)
  }

  const calculateSuma = (klucz) => {
    return wiersze.reduce((sum, w) => sum + (Number(w[klucz]) || 0), 0)
  }

  const getSzerokoscTH = (klucz) => {
    switch(klucz) {
      case 'nazwa':
      case 'bank':
        return 'w-[35%] min-w-[80px]'
      case 'planowane':
      case 'rzeczywiste':
      case 'saldo':
      case 'wplaty':
      case 'wyplaty':
      case 'saldoBiezace':
        return 'w-[22%] min-w-[75px]'
      case 'roznica':
        return 'w-[18%] min-w-[65px]'
      case 'termin':
      case 'dataWyplaty':
        return 'w-[12%] min-w-[40px]'
      default:
        return 'w-auto'
    }
  }

  useEffect(() => {
    if (!edytujKomorke) return
    // Fokusujemy konkretną komórkę po zmianie stanu edycji,
    // żeby użytkownik mógł od razu wpisać nową wartość.
    const input = document.querySelector(
      `input[data-cell-id="${edytujKomorke.wierszeId}-${edytujKomorke.klucz}"]`
    )
    if (input) { input.focus(); input.select() }
  }, [edytujKomorke])

  const renderCell = (wiersz, kolumna) => {
    const key = `${wiersz.id}-${kolumna.klucz}`
    const isEditing = edytujKomorke?.wierszeId === wiersz.id && edytujKomorke?.klucz === kolumna.klucz
    const wartosc = wiersz[kolumna.klucz]

    // Pola obliczane (readOnly)
    if (kolumna.klucz === 'roznica') {
      const roznica = (wiersz.rzeczywiste || 0) - (wiersz.planowane || 0)
      return (
        <td key={key} className={`border border-budzet-border px-0 py-0 align-middle h-[32px] cursor-default bg-budzet-rowAlt/50 ${roznica >= 0 ? 'positive' : 'negative'}`}>
          <span className="block w-full text-right whitespace-nowrap px-1.5 py-1.5 cursor-default text-xs rounded">
            {formatWaluta(roznica, waluta)}
          </span>
        </td>
      )
    }

    if (kolumna.klucz === 'saldoBiezace') {
      const saldo = (wiersz.saldo || 0) + (wiersz.wplaty || 0) - (wiersz.wyplaty || 0)
      return (
        <td key={key} className="border border-budzet-border px-0 py-0 align-middle h-[32px] cursor-default bg-budzet-rowAlt/50">
          <span className="block w-full text-right whitespace-nowrap px-1.5 py-1.5 cursor-default text-xs rounded">
            {formatWaluta(saldo, waluta)}
          </span>
        </td>
      )
    }

    if (kolumna.readOnly) {
      return (
        <td key={key} className="border border-budzet-border px-0 py-0 align-middle h-[32px] cursor-default bg-budzet-rowAlt/50">
          <span className="block w-full text-right whitespace-nowrap px-1.5 py-1.5 cursor-default text-xs rounded">
            {formatWaluta(wartosc, waluta)}
          </span>
        </td>
      )
    }

    // Pola edytowalne
    if (isEditing) {
      return (
        <td key={key} className="border border-budzet-border px-0 py-0 align-middle ring-1 ring-budzet-accent ring-inset h-[32px]">
          <input
            type={kolumna.typ === 'liczba' ? 'number' : 'text'}
            value={tempValue}
            onChange={e => setTempValue(e.target.value)}
            onBlur={() => saveEdit(wiersz.id, kolumna.klucz)}
            onKeyDown={e => handleKeyDown(e, wiersz.id, kolumna.klucz)}
            className={kolumna.typ === 'liczba' ? 'td-input text-right' : 'td-input'}
            placeholder={kolumna.typ === 'liczba' ? '0' : '—'}
            data-cell-id={`${wiersz.id}-${kolumna.klucz}`}
            style={{ minWidth: 0 }}
          />
        </td>
      )
    }

    return (
      <td
        key={key}
        onClick={() => startEdit(wiersz.id, kolumna.klucz, wartosc)}
        className="border border-budzet-border px-0 py-0 align-middle h-[32px]"
      >
        <span className={kolumna.typ === 'liczba' ? 'block w-full text-right whitespace-nowrap px-1.5 py-1.5 cursor-pointer text-xs hover:bg-budzet-accent/10 rounded' : 'block w-full truncate px-1.5 py-1.5 cursor-pointer text-xs hover:bg-budzet-accent/10 rounded'}>
          {kolumna.typ === 'liczba' ? formatWaluta(wartosc, waluta) : wartosc}
        </span>
      </td>
    )
  }

  return (
    <div className="panel">
      <div className="panel-header flex justify-between items-center">
        <span>{tytul}</span>
        <button
          onClick={addRow}
          className="text-white bg-budzet-accent hover:bg-budzet-accentDark px-2 py-0.5 rounded text-xs font-bold"
        >
          +
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-xs border-collapse" style={{ minWidth: '280px' }}>
          <thead>
            <tr>
              {pokazCheckbox && <th className="w-[32px] min-w-[32px] px-1.5 py-1.5 text-left font-semibold uppercase tracking-wider text-[10px] border border-budzet-border whitespace-nowrap">✓</th>}
              {kolumny.map(k => (
                <th key={k.klucz} className={`${getSzerokoscTH(k.klucz)} px-1.5 py-1.5 text-left font-semibold uppercase tracking-wider text-[10px] border border-budzet-border whitespace-nowrap`}>
                  {k.naglowek}
                </th>
              ))}
              <th className="w-[28px] min-w-[28px] px-1.5 py-1.5 text-left font-semibold uppercase tracking-wider text-[10px] border border-budzet-border whitespace-nowrap"></th>
            </tr>
          </thead>
        <tbody>
          {wiersze.map((wiersz) => (
            <tr
              key={wiersz.id}
              className={`h-[32px] ${wiersz.opłacone ? 'strikethrough' : ''}`}
            >
              {pokazCheckbox && (
                <td className="text-center align-middle border border-budzet-border px-0 py-0 w-[32px] min-w-[32px]">
                  <input
                    type="checkbox"
                    checked={wiersz.opłacone || false}
                    onChange={() => toggleCheckbox(wiersz.id)}
                  />
                </td>
              )}
              {kolumny.map(kolumna => renderCell(wiersz, kolumna))}
              <td className="text-center align-middle border border-budzet-border px-0 py-0 cursor-pointer text-budzet-negative hover:font-bold w-[28px] min-w-[28px]" onClick={() => deleteRow(wiersz.id)}>
                ×
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="h-[36px]">
            {pokazCheckbox && <td className="px-1.5 py-2 border border-budzet-border text-budzet-textHeader font-bold text-xs bg-budzet-tableHeader w-[32px] min-w-[32px]"></td>}
            {kolumny.map((kol, i) => (
              <td key={kol.klucz}
                  className={`px-1.5 py-2 border border-budzet-border text-budzet-textHeader font-bold text-xs bg-budzet-tableHeader ${getSzerokoscTH(kol.klucz)}`}>
                {i === 0
                  ? 'SUMA'
                  : kluczeDoSumy.includes(kol.klucz)
                    ? formatWaluta(calculateSuma(kol.klucz), waluta)
                    : ''
                }
              </td>
            ))}
            <td className="bg-budzet-tableHeader border border-budzet-border w-[28px] min-w-[28px]"></td>
          </tr>
        </tfoot>
      </table>
      </div>
    </div>
  )
}
