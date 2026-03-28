/** Definicje kolumn tabel — trzymane razem, żeby MonthlyView nie rozrastał się na 200+ linii. */

export const KOLUMNY_PRZYCHODY = [
  { klucz: 'nazwa', naglowek: 'ŹRÓDŁO PRZYCHODU', typ: 'tekst' },
  { klucz: 'dataWyplaty', naglowek: 'DATA', typ: 'tekst', szerokosc: '70px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', tylkoOdczyt: true }
]

export const KOLUMNY_RACHUNKI = [
  { klucz: 'nazwa', naglowek: 'RACHUNEK', typ: 'tekst' },
  { klucz: 'data', naglowek: 'TERMIN', typ: 'tekst', szerokosc: '55px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', tylkoOdczyt: true }
]

export const KOLUMNY_WYDATKI = [
  { klucz: 'nazwa', naglowek: 'TYP WYDATKU', typ: 'tekst' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', tylkoOdczyt: true }
]

export const KOLUMNY_SUBSKRYPCJE = [
  { klucz: 'nazwa', naglowek: 'ABONAMENT', typ: 'tekst' },
  { klucz: 'data', naglowek: 'TERMIN', typ: 'tekst', szerokosc: '55px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', tylkoOdczyt: true }
]

export const KOLUMNY_KONTA = [
  { klucz: 'nazwa', naglowek: 'BANK', typ: 'tekst' },
  { klucz: 'saldo', naglowek: 'SALDO', typ: 'liczba' },
  { klucz: 'wplaty', naglowek: 'WPŁATY', typ: 'liczba' },
  { klucz: 'wyplaty', naglowek: 'WYPŁATY', typ: 'liczba' },
  { klucz: 'saldoBiezace', naglowek: 'SALDO BIEŻĄCE', typ: 'liczba', tylkoOdczyt: true }
]

export const KOLUMNY_OSZCZEDNOSCI_I_DLUG = [
  { klucz: 'nazwa', naglowek: 'POZYCJA', typ: 'tekst' },
  { klucz: 'data', naglowek: 'TERMIN', typ: 'tekst', szerokosc: '55px' },
  { klucz: 'planowane', naglowek: 'PLANOWANE', typ: 'liczba' },
  { klucz: 'rzeczywiste', naglowek: 'RZECZYWISTE', typ: 'liczba' },
  { klucz: 'roznica', naglowek: 'RÓŻNICA', typ: 'liczba', tylkoOdczyt: true }
]

export const KOLUMNY_WYDATKI_DODATKOWE = [
  { klucz: 'nazwa', naglowek: 'TYP', typ: 'tekst' },
  { klucz: 'kwota', naglowek: 'KWOTA', typ: 'liczba' }
]
