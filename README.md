# 📊 Tracker Budżetu Miesięcznego

Aplikacja do śledzenia miesięcznego budżetu osobistego zbudowana w React 18 + Vite.
Cały interfejs w języku polskim. Dane przechowywane lokalnie w przeglądarce (localStorage) — bez backendu, bez rejestracji.


## ✨ Funkcjonalności

### 3 Zakładki główne

| Zakładka | Opis |
|----------|------|
| Widok Miesięczny | Edytowalne tabele, wykresy, karty podsumowania dla aktywnego miesiąca |
| Analiza Ogólna | Trendy i statystyki ze wszystkich zapisanych miesięcy |
| Historia | Przeglądanie archiwalnych miesięcy pogrupowanych według lat |

---

### Widok Miesięczny

Główny widok podzielony na cztery strefy:

**Karty podsumowania (5 kart):**
- DO WYDANIA — przychody minus wydatki minus oszczędności (czerwona gdy ujemna)
- ŚR. DZIENNY — łączne wydatki podzielone przez liczbę dni w miesiącu
- OSZCZĘDNOŚCI — suma kolumny rzeczywiste w sekcji Oszczędności
- PRZYCHODY — suma kolumny rzeczywiste w sekcji Przychody
- WYDATKI OGÓŁEM — suma rachunki + wydatki + wydatki dodatkowe + subskrypcje + dług

**Przegląd Finansowy (tabela):**
Porównuje planowane vs rzeczywiste dla 6 kategorii z automatyczną różnicą.
Ostatni wiersz "Środki Pozostałe" czerwienieje gdy wartość ujemna.

**Wykresy:**
- Grupowany wykres słupkowy: Planowane vs Rzeczywiste dla każdej kategorii
- Wykres pierścieniowy: Podział wydatków z własną legendą

**8 edytowalnych paneli tabelarycznych** — szczegóły poniżej.

---

### 8 Paneli Szczegółowych

| Panel | Checkbox | Specjalne kolumny |
|-------|----------|-------------------|
| Przychody | — | Data wypłaty |
| Rachunki | ✓ Opłacony | Termin |
| Wydatki | ✓ Wykonany | — |
| Subskrypcje i Abonamenty | ✓ Aktywny | Termin |
| Konta Bankowe | — | Saldo bieżące (auto: saldo + wpłaty - wypłaty) |
| Oszczędności | ✓ Wykonany | Termin |
| Wydatki Dodatkowe | ✓ Wykonany | — |
| Dług | ✓ Opłacony | Termin |

Każdy panel obsługuje:
- Edycję inline (kliknij komórkę → pojawia się input, Enter lub kliknięcie poza zapisuje)
- Dodawanie wierszy przyciskiem "+ Dodaj wiersz"
- Usuwanie wierszy ikoną × z potwierdzeniem
- Automatyczne obliczanie kolumny RÓŻNICA (rzeczywiste − planowane)
- Zaznaczenie checkboxa powoduje wizualne przekreślenie wiersza

---

### Analiza Ogólna

Widok statystyczny oparty na danych ze wszystkich zapisanych miesięcy.

**8 kart globalnych:**
- Łączne przychody, Łączne wydatki, Łączne oszczędności, Liczba miesięcy
- Średnie przychody/mc, Średnie wydatki/mc, Średnie oszczędności/mc, Średnia stopa oszczędności

**Wykresy i tabele:**
- Wykres obszarowy trendu przychodów / wydatków / oszczędności w czasie
- Wykres słupkowy miesięcznego salda (zielony gdy dodatni, czerwony gdy ujemny)
- Tabela porównawcza wszystkich miesięcy z kolumną Stopa oszczędności %
- Poziomy wykres słupkowy największych kategorii wydatków
- Panel wskaźników: najlepszy miesiąc przychodów, miesiąc najwyższych wydatków, trend (rosnący/malejący/stabilny), realizacja budżetu %

---

### Historia

- Wszystkie zapisane miesiące pogrupowane według lat
- Każdy rok to zwijany akordeon (domyślnie rozwinięty)
- Karta każdego miesiąca pokazuje: nazwę, rok, Przychody / Wydatki / Oszczędności
- Przycisk "Otwórz →" przełącza na Widok Miesięczny dla wybranego miesiąca
- Rok z 12 miesiącami (styczeń–grudzień) otrzymuje badge "Rok Kompletny ✓"
- Lata posortowane malejąco (najnowszy na górze)

---

### Obsługa Walut

Przełącznik walut w pasku nawigacji — trzy opcje:

| Waluta | Symbol | Kurs orientacyjny |
|--------|--------|-------------------|
| PLN | zł | domyślna |
| EUR | € | 1 PLN ≈ 0.23 EUR |
| USD | $ | 1 PLN ≈ 0.25 USD |

- Wybrana waluta zapisywana w localStorage i stosowana do wszystkich wartości w całej aplikacji
- Przeliczenie następuje natychmiast po kliknięciu
- Dane wewnętrznie zawsze przechowywane w PLN

> ⚠️ Kursy są orientacyjne i statyczne. Aby zaktualizować kurs
> edytuj plik `src/utils/waluty.js` — zmień pole `kurs` przy EUR lub USD.

---

### Eksport Danych

**CSV:**
- Separator: średnik (kompatybilny z polskim Microsoft Excel)
- Kodowanie: UTF-8 z BOM
- 8 sekcji z polskimi nagłówkami oddzielone pustymi wierszami
- Nazwa pliku: `budzet_{Miesiąc}_{Rok}.csv`

**PDF:**
- Generowany programatycznie przez jsPDF (bez html2canvas)
- Nagłówek dokumentu z nazwą miesiąca, rokiem i datą generowania
- 4 karty podsumowania (Przychody, Wydatki, Oszczędności, Do wydania)
- Tabela Przegląd Finansowy (6 kategorii + Środki Pozostałe)
- Sekcje szczegółowe: Przychody, Rachunki, Wydatki, Oszczędności, Dług
- Naprzemienne cieniowanie wierszy
- Automatyczna paginacja (nowa strona gdy potrzeba)
- Numeracja stron: "Strona X z Y"
- Stopka z nazwą miesiąca i rokiem na każdej stronie
- Wartości w aktualnie wybranej walucie
- Nazwa pliku: `budzet_{Miesiąc}_{Rok}.pdf`

---

### Pozostałe funkcje

- **Edycja inline** — stały rozmiar komórek podczas edycji, brak skakania układu
- **Auto-zapis** — dane zapisywane do localStorage z opóźnieniem 500ms (debounce)
- **Nowy miesiąc** — opcja skopiowania nazw kategorii z bieżącego miesiąca (wartości zerowane)
- **Nawigacja strzałkami** ← → między istniejącymi miesiącami w pasku nawigacji

---

## 🛠️ Technologie

| Technologia | Wersja | Rola w projekcie |
|-------------|--------|-----------------|
| React | 18 | Biblioteka UI, zarządzanie stanem (useState, useMemo, useCallback, useEffect, useRef) |
| Vite | 5 | Bundler i dev server, szybki HMR |
| Tailwind CSS | 3 | Stylowanie utility-first, własna paleta kolorów budzet-* |
| Recharts | 2 | Wykresy (słupkowe, kołowe, obszarowe, liniowe, radarowe) |
| date-fns | 3 | Obliczanie liczby dni w miesiącu |
| jsPDF | 2 | Programatyczne generowanie plików PDF |

---

## 🚀 Instalacja i Uruchomienie
```bash
cd "C:\Users\jakom\Documents\AI projects\budzet-tracker"
npm install
npm run dev
```

Aplikacja uruchamia się na: **http://localhost:5173**

Przy pierwszym uruchomieniu automatycznie ładowane są przykładowe dane dla Stycznia 2025.

### Budowanie wersji produkcyjnej
```bash
npm run build
npm run preview
```

---

## 📁 Struktura Projektu
```
budzet-tracker/
├── index.html                        # HTML z linkiem do fontu Inter i tytułem
├── tailwind.config.js                # Konfiguracja Tailwind + paleta budzet-*
├── postcss.config.js                 # Konfiguracja PostCSS
├── vite.config.js                    # Konfiguracja Vite
├── package.json                      # Zależności projektu
├── README.md                         # Ta dokumentacja
└── src/
    ├── main.jsx                      # Punkt wejścia React (StrictMode + createRoot)
    ├── App.jsx                       # Root — routing zakładek, przekazywanie danych
    ├── index.css                     # Dyrektywy Tailwind + klasy komponentów (@layer)
    ├── constants/
    │   └── aplikacja.js              # Wspólne stałe UI (np. nazwy zakładek, kody walut)
    ├── utils/
    │   ├── uuid.js                   # generujId() — unikalne ID dla wierszy
    │   ├── polishMonths.js           # MIESIACE[], konwersje, getDniWMiesiacu()
    │   ├── waluty.js                 # WALUTY{}, formatWaluta() — kursy i formatowanie
    │   ├── sampleData.js             # getSampleData() — dane przykładowe Styczeń 2025
    │   ├── csvExport.js              # eksportujDoCSV() — generowanie i pobieranie CSV
    │   └── pdfExport.js              # eksportujDoPDF() — generowanie PDF przez jsPDF
    ├── hooks/
    │   ├── useWaluta.js              # Stan wybranej waluty + zapis w localStorage
    │   ├── useDaneBudzetu.js         # Główny stan aplikacji, CRUD, localStorage
    │   └── useObliczenia.js          # Obliczenia finansowe, dane do wykresów (useMemo)
    └── components/
        ├── Navbar.jsx                # Nawigacja górna: 2 paski, waluty, eksport, zakładki
        ├── monthly/
        │   ├── kolumnySekcji.js        # Definicje kolumn tabel (8 sekcji)
        │   ├── MonthlyView.jsx       # Główny układ widoku miesięcznego
        │   ├── SummaryCards.jsx      # 5 kart z kluczowymi wartościami
        │   ├── FinancialOverview.jsx # Tabela przeglądu + Środki Pozostałe
        │   ├── SectionPanel.jsx      # Wielokrotny użytek: edytowalne tabele (8 paneli)
        │   └── ChartsRow.jsx         # Wykres słupkowy + pierścieniowy
        ├── analysis/
        │   └── AnalysisView.jsx      # Analiza ogólna: trendy, statystyki, wskaźniki
        └── history/
            ├── HistoryView.jsx       # Widok historii: lista lat z akordeonami
            ├── YearAccordion.jsx     # Zwijany rok + siatka kart miesięcy
            └── MonthCard.jsx         # Karta pojedynczego miesiąca z mini-statystykami
```

---

## 💾 Model Danych

Wszystkie dane budżetowe przechowywane w localStorage pod kluczem `budzet_tracker_v1`.
Wybrana waluta przechowywana pod kluczem `budzet_waluta_v1`.

### Schemat JSON
```json
{
  "2025": {
    "Styczeń": {
      "przychody": [
        {
          "id": "uuid-string",
          "nazwa": "Wypłata #1",
          "dataWyplaty": "15",
          "planowane": 5000,
          "rzeczywiste": 5500
        }
      ],
      "rachunki": [
        {
          "id": "uuid-string",
          "nazwa": "Prąd",
          "termin": "30",
          "planowane": 250,
          "rzeczywiste": 230,
          "oplacony": true
        }
      ],
      "wydatki": [
        {
          "id": "uuid-string",
          "nazwa": "Zakupy spożywcze",
          "planowane": 800,
          "rzeczywiste": 650,
          "wykonany": true
        }
      ],
      "subskrypcje": [
        {
          "id": "uuid-string",
          "nazwa": "Netflix",
          "termin": "15",
          "planowane": 45,
          "rzeczywiste": 45,
          "aktywny": true
        }
      ],
      "konta": [
        {
          "id": "uuid-string",
          "bank": "PKO BP",
          "saldo": 3000,
          "wplaty": 5500,
          "wyplaty": 800
        }
      ],
      "oszczednosci": [
        {
          "id": "uuid-string",
          "nazwa": "Fundusz Awaryjny",
          "termin": "30",
          "planowane": 500,
          "rzeczywiste": 500,
          "wykonany": true
        }
      ],
      "wydatkiDodatkowe": [],
      "dlugi": [
        {
          "id": "uuid-string",
          "nazwa": "Kredyt bankowy",
          "termin": "18",
          "planowane": 800,
          "rzeczywiste": 800,
          "oplacony": true
        }
      ]
    },
    "Luty": { "...": "..." }
  },
  "2026": { "...": "..." }
}
```

### Pola automatycznie obliczane (nie zapisywane w localStorage)

| Pole | Sekcja | Wzór |
|------|--------|------|
| roznica | wszystkie | rzeczywiste − planowane |
| saldoBiezace | konta | saldo + wplaty − wyplaty |
| doWydania | karty | przychody − wydatki − oszczędności |
| srDzienny | karty | wydatki łączne / dni w miesiącu |

---

## 📖 Jak Używać

### Pierwsze uruchomienie
Po wpisaniu `npm run dev` aplikacja automatycznie ładuje przykładowe dane dla Stycznia 2025. Możesz je edytować lub usunąć i zacząć od zera.

### Wprowadzanie danych
1. Kliknij dowolną wartość w tabeli — komórka przejdzie w tryb edycji
2. Wpisz nową wartość
3. Naciśnij **Enter** lub kliknij poza komórką aby zapisać
4. Naciśnij **Escape** aby anulować edycję
5. Dane zapisują się automatycznie po 500ms

### Dodawanie i usuwanie wierszy
- Kliknij **"+ Dodaj wiersz"** pod tabelą aby dodać nowy pusty wiersz
- Kliknij **×** po prawej stronie wiersza aby go usunąć (wymagane potwierdzenie)

### Zaznaczanie jako opłacone / wykonane
Kliknij checkbox w pierwszej kolumnie wiersza — wiersz zostanie wizualnie przekreślony. Dane pozostają w systemie i nadal są uwzględniane w obliczeniach.

### Tworzenie nowego miesiąca
1. Kliknij **"Nowy Miesiąc"** w pasku nawigacji
2. Podaj rok (np. `2025`)
3. Podaj numer miesiąca (`1`–`12`)
4. Zdecyduj czy skopiować nazwy kategorii z bieżącego miesiąca — wartości zostaną wyzerowane, nazwy zachowane

### Nawigacja między miesiącami
Używaj strzałek **←** i **→** w pasku nawigacji aby przechodzić między istniejącymi miesiącami chronologicznie.

### Zmiana waluty
Kliknij **PLN**, **€ EUR** lub **$ USD** w pasku nawigacji. Wszystkie wartości w całej aplikacji przeliczą się natychmiast według orientacyjnych kursów.

### Eksport do CSV
1. Kliknij **"Eksportuj ▾"** w pasku nawigacji
2. Wybierz **"📊 Eksportuj CSV"**
3. Plik pobierze się automatycznie jako `budzet_{Miesiąc}_{Rok}.csv`
4. Otwórz w Microsoft Excel — separatorem jest średnik

### Eksport do PDF
1. Kliknij **"Eksportuj ▾"** w pasku nawigacji
2. Wybierz **"📄 Eksportuj PDF"**
3. Plik pobierze się automatycznie jako `budzet_{Miesiąc}_{Rok}.pdf`
4. PDF zawiera podsumowanie aktywnego miesiąca z wartościami w wybranej walucie

### Przeglądanie historii
1. Kliknij zakładkę **"Historia"** w pasku nawigacji
2. Rozwiń wybrany rok klikając na jego nagłówek
3. Kliknij **"Otwórz →"** na karcie miesiąca aby przejść do jego widoku

### Analiza ogólna
Kliknij zakładkę **"Analiza Ogólna"** — widok jest dostępny od razu po dodaniu pierwszego miesiąca i automatycznie uwzględnia wszystkie zapisane dane.

### Aktualizacja kursów walut
Otwórz plik `src/utils/waluty.js` i zmień wartość pola `kurs`:
```js
export const WALUTY = {
  PLN: { symbol: 'zł', kod: 'PLN', kurs: 1     },
  EUR: { symbol: '€',  kod: 'EUR', kurs: 0.23  }, // ← zmień tutaj
  USD: { symbol: '$',  kod: 'USD', kurs: 0.25  }, // ← zmień tutaj
}
```

---

## 🎨 Paleta Kolorów

Aplikacja używa własnej palety `budzet-*` zdefiniowanej w `tailwind.config.js`:

| Zmienna | Kolor | Użycie |
|---------|-------|--------|
| budzet-page | `#F5F0E8` | Tło strony |
| budzet-card | `#FFFFFF` | Tło kart i paneli |
| budzet-tableHeader | `#D4C4A8` | Nagłówki tabel |
| budzet-rowAlt | `#FDFAF5` | Naprzemienne wiersze |
| budzet-accent | `#C4A882` | Akcenty, hover |
| budzet-accentDark | `#8B7355` | Navbar, przyciski primary |
| budzet-textPrimary | `#3D2B1F` | Główny tekst |
| budzet-textMuted | `#8B7355` | Podpisy, etykiety |
| budzet-border | `#E8DFD0` | Obramowania |
| budzet-positive | `#6B8F5E` | Wartości dodatnie |
| budzet-negative | `#B85C4A` | Wartości ujemne |

---

## 🧩 Jak powstawał ten projekt
Ten budżet-tracker rozwijałem iteracyjnie: najpierw struktura danych i podstawowe widoki, potem edycja w tabelach, a na końcu wykresy i eksporty (CSV/PDF).

---

## 🔧 Znane Ograniczenia

- Kursy walut są statyczne — wymagają ręcznej aktualizacji w pliku `waluty.js`
- Dane przechowywane tylko w localStorage danej przeglądarki — nie synchronizują się między urządzeniami
- Eksport PDF nie zawiera wykresów — tylko tabele i liczby
- Brak importu danych z zewnętrznych plików (np. CSV z banku)

---

## 🗺️ Możliwe Rozszerzenia

- [ ] Import transakcji z pliku CSV
- [ ] Synchronizacja danych przez chmurę (np. Firebase)
- [ ] Automatyczne kursy walut z API (np. NBP API)
- [ ] Wykresy w eksporcie PDF
- [ ] Powiadomienia o zbliżających się terminach płatności
- [ ] Tryb ciemny (dark mode)
- [ ] Wersja mobilna (PWA)

---

## 👤 Autor

Stworzone przez: **Jakub**

Podziękowania dla społeczności open source.

---

## 📜 Licencja

**MIT License** — używaj swobodnie, zarówno komercyjnie jak i prywatnie.
```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

*Ostatnia aktualizacja: Marzec 2026*