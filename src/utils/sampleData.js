import { generujId } from './uuid'

export function getSampleData() {
  return {
    przychody: [
      { id: generujId(), nazwa: 'Wypłata #1', dataWyplaty: '15', planowane: 5000, rzeczywiste: 5500 }
    ],
    rachunki: [
      { id: generujId(), nazwa: 'Prąd', data: '30', planowane: 250, rzeczywiste: 230, opłacone: true },
      { id: generujId(), nazwa: 'Woda', data: '30', planowane: 80, rzeczywiste: 80, opłacone: true },
      { id: generujId(), nazwa: 'Internet', data: '25', planowane: 60, rzeczywiste: 60, opłacone: true },
      { id: generujId(), nazwa: 'Ubezpieczenie', data: '30', planowane: 150, rzeczywiste: 150, opłacone: true }
    ],
    wydatki: [
      { id: generujId(), nazwa: 'Zakupy spożywcze', planowane: 800, rzeczywiste: 650, opłacone: true },
      { id: generujId(), nazwa: 'Restauracje', planowane: 200, rzeczywiste: 340, opłacone: false },
      { id: generujId(), nazwa: 'Transport', planowane: 150, rzeczywiste: 180, opłacone: true },
      { id: generujId(), nazwa: 'Zakupy', planowane: 300, rzeczywiste: 120, opłacone: false }
    ],
    subskrypcje: [
      { id: generujId(), nazwa: 'Netflix', data: '15', planowane: 45, rzeczywiste: 45, opłacone: true },
      { id: generujId(), nazwa: 'Spotify', data: '15', planowane: 23, rzeczywiste: 23, opłacone: true }
    ],
    konta: [
      { id: generujId(), nazwa: 'PKO BP', saldo: 3000, wplaty: 5500, wyplaty: 800 },
      { id: generujId(), nazwa: 'Gotówka', saldo: 500, wplaty: 0, wyplaty: 150 }
    ],
    oszczednosci: [
      { id: generujId(), nazwa: 'Fundusz Awaryjny', data: '30', planowane: 500, rzeczywiste: 500, opłacone: true }
    ],
    wydatkiDodatkowe: [],
    dlugi: [
      { id: generujId(), nazwa: 'Kredyt bankowy', data: '18', planowane: 800, rzeczywiste: 800, opłacone: true }
    ]
  }
}
