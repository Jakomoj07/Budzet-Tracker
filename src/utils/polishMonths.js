export const MIESIACE = ['Styczeń','Luty','Marzec','Kwiecień','Maj',
  'Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']

export const miesiacNaIndeks = n => MIESIACE.indexOf(n)

export const indeksNaMiesiac = i => MIESIACE[i] ?? 'Styczeń'

export function getDniWMiesiacu(nazwa, rok) {
  const i = miesiacNaIndeks(nazwa)
  return i === -1 ? 30 : new Date(Number(rok), i+1, 0).getDate()
}
