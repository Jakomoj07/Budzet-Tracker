export const WALUTY = {
  PLN: { symbol:'zł', kod:'PLN', kurs:1     },
  EUR: { symbol:'€',  kod:'EUR', kurs:0.23  },
  USD: { symbol:'$',  kod:'USD', kurs:0.25  },
}

export function formatWaluta(wartoscPLN, kod='PLN') {
  const w = WALUTY[kod] ?? WALUTY.PLN
  return new Intl.NumberFormat('pl-PL',{
    style:'currency', currency:w.kod, minimumFractionDigits:2
  }).format((wartoscPLN ?? 0) * w.kurs)
}
