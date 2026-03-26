import jsPDF from 'jspdf'
import { formatWaluta } from './waluty'

export function eksportujDoPDF(dane, miesiac, rok, waluta = 'PLN') {
  const doc = new jsPDF()
  const pageHeight = doc.internal.pageSize.getHeight()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  const addNewPageIfNeeded = (spaceNeeded = 30) => {
    if (y + spaceNeeded > 270) {
      doc.addPage()
      y = 20
    }
  }

  // Header
  doc.setFillColor(139, 115, 85)
  doc.rect(0, 0, pageWidth, 30, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.text('Tracker Budżetu', 10, 20)

  const today = new Date()
  const dateStr = today.toLocaleDateString('pl-PL')
  doc.setFontSize(10)
  doc.text(`${miesiac} ${rok} • ${dateStr}`, 10, 27)

  y = 40
  doc.setTextColor(61, 43, 31)

  // Summary Cards
  const przychodyRzecz = dane.przychody?.reduce((s, p) => s + (p.rzeczywiste || 0), 0) || 0
  const rachunkiRzecz = dane.rachunki?.reduce((s, r) => s + (r.rzeczywiste || 0), 0) || 0
  const wydatkiRzecz = dane.wydatki?.reduce((s, w) => s + (w.rzeczywiste || 0), 0) || 0
  const subskrRzecz = dane.subskrypcje?.reduce((s, s_) => s + (s_.rzeczywiste || 0), 0) || 0
  const oszczRzecz = dane.oszczednosci?.reduce((s, o) => s + (o.rzeczywiste || 0), 0) || 0
  const dlugiRzecz = dane.dlugi?.reduce((s, d) => s + (d.rzeczywiste || 0), 0) || 0
  const laczneWydatki = rachunkiRzecz + wydatkiRzecz + subskrRzecz + dlugiRzecz
  const doWydania = przychodyRzecz - laczneWydatki - oszczRzecz

  const cardWidth = (pageWidth - 20) / 4
  const cardData = [
    { label: 'Przychody', value: przychodyRzecz },
    { label: 'Wydatki', value: laczneWydatki },
    { label: 'Oszczędności', value: oszczRzecz },
    { label: 'Do wydania', value: doWydania }
  ]

  cardData.forEach((card, idx) => {
    const x = 10 + idx * cardWidth
    doc.setDrawColor(232, 223, 208)
    doc.setFillColor(245, 240, 232)
    doc.rect(x, y, cardWidth - 2, 20, 'FD')
    doc.setFontSize(8)
    doc.setTextColor(139, 115, 85)
    doc.text(card.label, x + 2, y + 6)
    doc.setFontSize(10)
    doc.setFont(undefined, 'bold')
    doc.text(formatWaluta(card.value, waluta), x + 2, y + 15)
  })

  y += 30

  // Financial Overview Table
  addNewPageIfNeeded(40)
  doc.setFontSize(12)
  doc.setFont(undefined, 'bold')
  doc.text('Przegląd Finansowy', 10, y)
  y += 8

  doc.setFontSize(9)
  doc.setFont(undefined, 'normal')
  doc.setDrawColor(232, 223, 208)
  doc.setFillColor(212, 196, 168)
  doc.setTextColor(92, 74, 42)

  const tableHeaders = ['Kategoria', 'Planowane', 'Rzeczywiste', 'Różnica']
  const colWidth = (pageWidth - 20) / 4
  tableHeaders.forEach((h, i) => {
    doc.text(h, 10 + i * colWidth, y)
  })
  y += 6

  const tableRows = [
    { name: 'Rachunki', plan: dane.rachunki?.reduce((s, r) => s + (r.planowane || 0), 0) || 0, real: rachunkiRzecz },
    { name: 'Wydatki', plan: dane.wydatki?.reduce((s, w) => s + (w.planowane || 0), 0) || 0, real: wydatkiRzecz },
    { name: 'Subskrypcje', plan: dane.subskrypcje?.reduce((s, s_) => s + (s_.planowane || 0), 0) || 0, real: subskrRzecz },
    { name: 'Oszczędności', plan: dane.oszczednosci?.reduce((s, o) => s + (o.planowane || 0), 0) || 0, real: oszczRzecz },
    { name: 'Dług', plan: dane.dlugi?.reduce((s, d) => s + (d.planowane || 0), 0) || 0, real: dlugiRzecz },
    { name: 'Środki Pozostałe', plan: przychodyRzecz, real: doWydania }
  ]

  tableRows.forEach((row, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(253, 250, 245)
      doc.rect(10, y - 3, pageWidth - 20, 5, 'F')
    }
    const diff = row.real - row.plan
    doc.setTextColor(61, 43, 31)
    doc.text(row.name, 10, y)
    doc.text(formatWaluta(row.plan, waluta), 10 + colWidth, y)
    doc.text(formatWaluta(row.real, waluta), 10 + colWidth * 2, y)
    const colorRGB = diff > 0 ? [107, 143, 94] : [184, 92, 74]
    doc.setTextColor(colorRGB[0], colorRGB[1], colorRGB[2])
    doc.text(formatWaluta(diff, waluta), 10 + colWidth * 3, y)
    y += 6
    addNewPageIfNeeded(20)
  })

  y += 6

  // Sections
  const sections = [
    { title: 'PRZYCHODY', data: dane.przychody, cols: ['nazwa', 'dataWyplaty', 'planowane', 'rzeczywiste'] },
    { title: 'RACHUNKI', data: dane.rachunki, cols: ['nazwa', 'data', 'planowane', 'rzeczywiste'] },
    { title: 'WYDATKI', data: dane.wydatki, cols: ['nazwa', 'planowane', 'rzeczywiste'] },
    { title: 'OSZCZĘDNOŚCI', data: dane.oszczednosci, cols: ['nazwa', 'data', 'planowane', 'rzeczywiste'] },
    { title: 'DŁUG', data: dane.dlugi, cols: ['nazwa', 'data', 'planowane', 'rzeczywiste'] }
  ]

  sections.forEach(section => {
    if (section.data?.length) {
      addNewPageIfNeeded(25)
      doc.setFontSize(10)
      doc.setFont(undefined, 'bold')
      doc.text(section.title, 10, y)
      y += 6

      doc.setFontSize(8)
      doc.setFont(undefined, 'normal')
      const colWidthTable = (pageWidth - 20) / section.cols.length

      doc.setFillColor(212, 196, 168)
      section.cols.forEach((col, i) => {
        const label = col.charAt(0).toUpperCase() + col.slice(1)
        doc.text(label, 10 + i * colWidthTable, y)
      })
      y += 5

      section.data.forEach((item, idx) => {
        if (idx % 2 === 1) {
          doc.setFillColor(253, 250, 245)
          doc.rect(10, y - 3, pageWidth - 20, 4, 'F')
        }
        section.cols.forEach((col, i) => {
          const val = item[col]
          const text = typeof val === 'number' ? formatWaluta(val, waluta) : String(val || '')
          doc.text(text, 10 + i * colWidthTable, y)
        })
        y += 4
        addNewPageIfNeeded(20)
      })
      y += 3
    }
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(139, 115, 85)
    doc.text(`Tracker Budżetu — ${miesiac} ${rok}`, 10, pageHeight - 10)
    doc.text(`Strona ${i} z ${pageCount}`, pageWidth - 30, pageHeight - 10)
  }

  doc.save(`budzet_${miesiac}_${rok}.pdf`)
}
