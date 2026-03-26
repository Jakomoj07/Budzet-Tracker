import { useState } from 'react'

export default function useWaluta() {
  const [waluta, setWalutaState] = useState(() => {
    try {
      const stored = localStorage.getItem('budzet_waluta_v1')
      return stored || 'PLN'
    } catch {
      return 'PLN'
    }
  })

  const setWaluta = (nowaWaluta) => {
    setWalutaState(nowaWaluta)
    localStorage.setItem('budzet_waluta_v1', nowaWaluta)
  }

  return { waluta, setWaluta }
}
