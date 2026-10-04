import { useState } from 'react'
import { useFetch } from './hooks/useFetch'


import './App.css'

function App() {
  const [texto, setTexto] = useState('');

  const url = texto.length >= 3 ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es` : null

  const ciudades = useFetch(url)
  const resultados = ciudades.datos?.results ?? []

  return (
    <>
      <h1>Clima</h1>
      <input value={texto} onChange={(evento) => setTexto(evento.target.value)}/>
      
      {url && ciudades.cargando && <p>Buscando...</p>}
      {url && ciudades.error && <p>{ciudades.error}</p>}
      {url && !ciudades.cargando && !ciudades.error && resultados.length === 0 && (
        <p>Sin Resultados</p>
      )}
      {url && !ciudades.cargando && !ciudades.error && resultados.length > 0 && (
        <ul>
          {resultados.map((ciudad) => (
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
