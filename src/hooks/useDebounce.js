import { useEffect, useState } from 'react'

export function useDebounce(valor, ms) {
  const [valorEstable, setValorEstable] = useState(valor)

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorEstable(valor)
    }, ms)

    return () => clearTimeout(temporizador)
  }, [valor, ms])

  return valorEstable
}
