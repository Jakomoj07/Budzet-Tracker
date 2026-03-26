export function eksportujDoCSV(dane, miesiac, rok) {
  const rows = ['\uFEFF'] // UTF-8 BOM

  // Przychody
  rows.push('PRZYCHODY')
  rows.push(['Nazwa', 'Data Wpłaty', 'Planowane', 'Rzeczywiste'].join(';'))
  if (dane.przychody?.length) {
    dane.przychody.forEach(p => {
      rows.push([p.nazwa, p.dataWyplaty, p.planowane || 0, p.rzeczywiste || 0].join(';'))
    })
  }
  rows.push('')

  // Rachunki
  rows.push('RACHUNKI')
  rows.push(['Nazwa', 'Data', 'Planowane', 'Rzeczywiste', 'Opłacone'].join(';'))
  if (dane.rachunki?.length) {
    dane.rachunki.forEach(r => {
      rows.push([r.nazwa, r.data, r.planowane || 0, r.rzeczywiste || 0, r.opłacone ? 'Tak' : 'Nie'].join(';'))
    })
  }
  rows.push('')

  // Wydatki
  rows.push('WYDATKI')
  rows.push(['Nazwa', 'Planowane', 'Rzeczywiste', 'Opłacone'].join(';'))
  if (dane.wydatki?.length) {
    dane.wydatki.forEach(w => {
      rows.push([w.nazwa, w.planowane || 0, w.rzeczywiste || 0, w.opłacone ? 'Tak' : 'Nie'].join(';'))
    })
  }
  rows.push('')

  // Subskrypcje
  rows.push('SUBSKRYPCJE I ABONAMENTY')
  rows.push(['Nazwa', 'Data', 'Planowane', 'Rzeczywiste', 'Opłacone'].join(';'))
  if (dane.subskrypcje?.length) {
    dane.subskrypcje.forEach(s => {
      rows.push([s.nazwa, s.data, s.planowane || 0, s.rzeczywiste || 0, s.opłacone ? 'Tak' : 'Nie'].join(';'))
    })
  }
  rows.push('')

  // Konta
  rows.push('KONTA BANKOWE')
  rows.push(['Nazwa', 'Saldo', 'Wpłaty', 'Wypłaty'].join(';'))
  if (dane.konta?.length) {
    dane.konta.forEach(k => {
      rows.push([k.nazwa, k.saldo || 0, k.wplaty || 0, k.wyplaty || 0].join(';'))
    })
  }
  rows.push('')

  // Oszczędności
  rows.push('OSZCZĘDNOŚCI')
  rows.push(['Nazwa', 'Data', 'Planowane', 'Rzeczywiste', 'Opłacone'].join(';'))
  if (dane.oszczednosci?.length) {
    dane.oszczednosci.forEach(o => {
      rows.push([o.nazwa, o.data, o.planowane || 0, o.rzeczywiste || 0, o.opłacone ? 'Tak' : 'Nie'].join(';'))
    })
  }
  rows.push('')

  // Wydatki Dodatkowe
  rows.push('WYDATKI DODATKOWE')
  rows.push(['Nazwa', 'Kwota'].join(';'))
  if (dane.wydatkiDodatkowe?.length) {
    dane.wydatkiDodatkowe.forEach(wd => {
      rows.push([wd.nazwa, wd.kwota || 0].join(';'))
    })
  }
  rows.push('')

  // Dług
  rows.push('DŁUG')
  rows.push(['Nazwa', 'Data', 'Planowane', 'Rzeczywiste', 'Opłacone'].join(';'))
  if (dane.dlugi?.length) {
    dane.dlugi.forEach(d => {
      rows.push([d.nazwa, d.data, d.planowane || 0, d.rzeczywiste || 0, d.opłacone ? 'Tak' : 'Nie'].join(';'))
    })
  }

  const csv = rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `budzet_${miesiac}_${rok}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
