import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const controlador = new AbortController()
    setCargando(true)
    setError(null)
    setDatos(null)

    fetch(url, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo buscar')
        }
        return respuesta.json()
      })
      .then((json) => {
        setDatos(json)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setCargando(false)
      })

    return () => controlador.abort()
  }, [url])

  return { datos, cargando, error }
}