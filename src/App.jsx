import { useEffect, useMemo, useRef, useState } from 'react'
import { useFetch } from './hooks/useFetch'
import { useDebounce } from './hooks/useDebounce'
import { describirClima } from './clima'


import './App.css'

function App() {
  const [texto, setTexto] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null)
  const entrada = useRef(null)
  const textoBusqueda = useDebounce(texto, 400)

  const url = textoBusqueda.length >= 3 ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(textoBusqueda)}&count=5&language=es` : null

  const ciudades = useFetch(url)
  const resultados = ciudades.datos?.results ?? []

  // Paso 3: url del pronostico (si no hay ciudad es null y no se hace la peticion)
  const urlPronostico = ciudadSeleccionada
    ? `https://api.open-meteo.com/v1/forecast?latitude=${ciudadSeleccionada.latitude}&longitude=${ciudadSeleccionada.longitude}&current=temperature_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
    : null

  const pronostico = useFetch(urlPronostico)

  // Paso 4: resumen de la semana
  const resumen = useMemo(() => {
    console.log("calculando resumen")

    if (!pronostico.datos) return null

    const maximas = pronostico.datos.daily.temperature_2m_max
    const minimas = pronostico.datos.daily.temperature_2m_min

    const maxima = Math.max(...maximas)
    const minima = Math.min(...minimas)
    const indice = maximas.indexOf(maxima)
    const diaCaluroso = pronostico.datos.daily.time[indice]

    return { maxima, minima, diaCaluroso }
  }, [pronostico.datos])

  useEffect(() => {
    entrada.current.focus()
  }, [])

  function seleccionarCiudad(ciudad) {
    setCiudadSeleccionada(ciudad)
    setTexto('')
  }

  function limpiar() {
    setTexto('')
    setCiudadSeleccionada(null)
    entrada.current.focus()
  }

  return (
    <>
      <h1>Clima</h1>
      <input
        ref={entrada}
        placeholder="Escribe una ciudad..."
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      <button type="button" onClick={limpiar}>Limpiar</button>
      
      {url && ciudades.cargando && <p>Buscando...</p>}
      {url && ciudades.error && <p>{ciudades.error}</p>}
      {url && !ciudades.cargando && !ciudades.error && resultados.length === 0 && (
        <p>Sin Resultados</p>
      )}
      {url && !ciudades.cargando && !ciudades.error && resultados.length > 0 && (
        <ul>
          {resultados.map((ciudad) => (
            <li key={ciudad.id} onClick={() => seleccionarCiudad(ciudad)}>
              {ciudad.name}, {ciudad.admin1}, {ciudad.country}
            </li>
        ))}
    </ul>
  )}

      {ciudadSeleccionada && pronostico.cargando && <p>Cargando pronóstico...</p>}
      {ciudadSeleccionada && pronostico.error && <p>{pronostico.error}</p>}

      {ciudadSeleccionada && pronostico.datos && (
        <div>
          <h2>{ciudadSeleccionada.name}</h2>
          <p>Temperatura: {pronostico.datos.current.temperature_2m} °C</p>
          <p>{describirClima(pronostico.datos.current.weather_code)}</p>
          <p>Viento: {pronostico.datos.current.wind_speed_10m} km/h</p>

          {resumen && (
            <p>
              Esta semana: máxima {resumen.maxima} °C, mínima {resumen.minima} °C.
              El día más caluroso es el {resumen.diaCaluroso}.
            </p>
          )}

          <h3>Próximos 7 días</h3>
          <ul>
            {pronostico.datos.daily.time.map((fecha, i) => (
              <li key={fecha}>
                {fecha}: {pronostico.datos.daily.temperature_2m_min[i]} °C / {pronostico.datos.daily.temperature_2m_max[i]} °C - {describirClima(pronostico.datos.daily.weather_code[i])}
              </li>
            ))}
          </ul>
        </div>
      )}
  </>
)
    
}

export default App
