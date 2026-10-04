import { useState, useEffect } from 'react'


import './App.css'

function App() {
  const [texto, setTexto] = useState('');
  const[datos, setDatos] = useState(null);
  const[cargando, setCargando] = useState(false);
  const[error, setError] = useState(null);

  const url = texto.length >= 3 ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es` : null
  
  useEffect(() => {
    if(!url) return

    const controlador = new AbortController()
    setCargando(true)
    setError(null)
    setDatos(null)

    fetch(url, {signal: controlador.signal})
    .then((respuesta) => {
      if(!respuesta.ok){
        throw new Error('No se pudo buscar')
      }
      return respuesta.json()
    })
    .then((json) => {
      setDatos(json)
      setCargando(false)
    })
    .catch((err) => {
      if(err.name === 'AbortError') return
      setError(err.message)
      setCargando(false)
    })
    return () => controlador.abort()
  },[url])

  const ciudades = datos?.results ?? []

  return (
    <>
      <h1>Clima</h1>
      <input value={texto} onChange={(evento) => setTexto(evento.target.value)}/>
      
      {url && cargando && <p>Buscando...</p>}
      {url && error && <p>{error}</p>}
      {url && !cargando && !error && ciudades.length === 0 && (
        <p>Sin Resultados</p>
      )}
      {url && !cargando && !error && ciudades.length > 0 && (
        <ul>
        {ciudades.map((ciudad) => (
          <li key={ciudad.id}>
            {ciudad.name}, {ciudad.admin1}, {ciudad.country}
          </li>
        ))}
      </ul>
    )}
  </>
)
    
}

export default App
