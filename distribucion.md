# Guía de trabajo en grupo --- Actividad App del Clima con Hooks

## Integrantes

-   **Persona 1:** Juan Diego
-   **Persona 2:** Joseph
-   **Persona 3:** Erika

------------------------------------------------------------------------

# 1. Objetivo de esta guía

Esta guía define cómo vamos a trabajar los tres sobre el mismo
repositorio de GitHub y sobre la rama `main`, evitando que una persona
tenga que esperar a que otra termine para poder avanzar.

La idea es:

-   Cada integrante tendrá **su propio Codespace**.
-   Los tres trabajaremos sobre el mismo repositorio y la rama `main`.
-   Cada integrante tendrá una responsabilidad principal.
-   Evitaremos modificar los mismos archivos al mismo tiempo.
-   Antes de trabajar, siempre sincronizaremos el repositorio con
    `git pull`.
-   Cada integrante hará sus propios commits.
-   Al final, las partes se conectarán en `App.jsx`.

> **Importante:** no usaremos Live Share para desarrollar todo el
> proyecto. Cada persona trabajará en su propio Codespace.

------------------------------------------------------------------------

# 2. Estructura general del trabajo

La actividad se divide en cinco pasos obligatorios:

1.  Búsqueda de ciudades.
2.  Creación del hook `useFetch`.
3.  Pronóstico del clima.
4.  Resumen de la semana con `useMemo`.
5.  Manejo del foco con `useRef`.

El paso 6, `useDebounce`, es opcional.

La distribución será:

  -----------------------------------------------------------------------
  Integrante              Responsabilidad         Pasos
                          principal               
  ----------------------- ----------------------- -----------------------
  **Juan Diego**          Búsqueda de ciudades e  Paso 1
                          integración principal   

  **Joseph**              Hook `useFetch` y       Pasos 2 y 3
                          pronóstico              

  **Erika**               Resumen y manejo del    Pasos 4 y 5
                          foco                    
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 3. REGLAS IMPORTANTES ANTES DE PROGRAMAR

## Regla 1 --- Cada uno tiene su propio Codespace

Los tres deben abrir el mismo repositorio en su propio Codespace.

Ejemplo:

``` text
GitHub
└── clima-react
    └── main
        ├── Codespace de Juan Diego
        ├── Codespace de Joseph
        └── Codespace de Erika
```

No es necesario que los tres estén dentro del mismo Codespace.

------------------------------------------------------------------------

## Regla 2 --- Todos trabajamos sobre `main`

No vamos a utilizar ramas para esta actividad.

Los tres trabajaremos directamente sobre:

``` text
main
```

Por eso debemos tener especial cuidado con `git pull` y con no modificar
archivos que otro integrante esté modificando en ese momento.

------------------------------------------------------------------------

## Regla 3 --- Antes de comenzar a trabajar

Siempre ejecutar:

``` bash
git pull
```

Esto permite traer al Codespace los cambios que otro integrante ya haya
enviado a GitHub.

------------------------------------------------------------------------

## Regla 4 --- Antes de hacer `push`

Cada persona debe asegurarse de que tiene la versión más reciente de
`main`.

Si otra persona acaba de subir cambios, ejecutar:

``` bash
git pull
```

y luego revisar que todo siga funcionando.

------------------------------------------------------------------------

## Regla 5 --- Cada integrante debe hacer commits propios

Cuando termines tu parte:

``` bash
git add .
git commit -m "Descripción de lo realizado"
git push
```

Los mensajes de commit deben explicar claramente qué se hizo.

Ejemplos:

``` bash
git commit -m "Implementar búsqueda de ciudades"
```

``` bash
git commit -m "Crear hook useFetch"
```

``` bash
git commit -m "Agregar resumen semanal con useMemo"
```

La actividad exige que en el historial aparezcan commits de todos los
integrantes.

------------------------------------------------------------------------

# 4. ESTÁNDARES QUE TODOS DEBEMOS RESPETAR

Estos acuerdos son importantes porque permiten que cada persona pueda
desarrollar su parte sin depender directamente del código que está
escribiendo otra persona.

------------------------------------------------------------------------

## Estándar 1 --- Datos de una ciudad

Cuando seleccionemos una ciudad, debemos trabajar con un objeto que
tenga esta información:

``` js
{
    id,
    name,
    admin1,
    country,
    latitude,
    longitude
}
```

Ejemplo:

``` js
{
    id: 123,
    name: "Cúcuta",
    admin1: "Norte de Santander",
    country: "Colombia",
    latitude: 7.89,
    longitude: -72.50
}
```

### ¿Por qué?

Juan Diego será responsable de encontrar las ciudades.

Joseph necesitará `latitude` y `longitude` para consultar el pronóstico.

Por eso todos debemos utilizar los mismos nombres.

**No cambiar nombres como `latitude` por `latitud`, ni `longitude` por
`longitud` sin avisar al grupo.**

------------------------------------------------------------------------

# 5. Estándar del hook `useFetch`

Joseph será responsable de crear el hook.

El hook debe utilizarse así:

``` js
const resultado = useFetch(url);
```

Y debe devolver siempre:

``` js
{
    datos,
    cargando,
    error
}
```

Ejemplo:

``` js
const { datos, cargando, error } = useFetch(url);
```

Estos nombres se mantienen iguales en todo el proyecto.

------------------------------------------------------------------------

# 6. ARCHIVOS Y RESPONSABILIDADES

La estructura inicial que vamos a utilizar será aproximadamente:

``` text
src/
├── App.jsx
├── App.css
├── main.jsx
├── hooks/
│   └── useFetch.js
└── clima.js
```

No vamos a crear una gran cantidad de componentes innecesariamente.
Primero cumpliremos la actividad y mantendremos la estructura sencilla.

------------------------------------------------------------------------

# ==================================================

# PERSONA 1 --- JUAN DIEGO

# ==================================================

## Responsabilidad

Juan Diego se encarga del **Paso 1: búsqueda de ciudades**.

También será la persona que inicialmente tendrá la responsabilidad
principal sobre `App.jsx`, porque el Paso 1 comienza construyendo allí
la lógica de búsqueda.

------------------------------------------------------------------------

## 1. Crear el buscador

Debe existir un campo donde el usuario pueda escribir el nombre de una
ciudad.

Ejemplo:

``` text
[ Cúcuta                         ] [Limpiar]
```

------------------------------------------------------------------------

## 2. Estado del texto

Debe existir un estado para guardar lo que el usuario escribe.

Por ejemplo:

``` js
const [texto, setTexto] = useState("");
```

El nombre puede ser diferente si se acuerda con el grupo, pero una vez
elegido debemos mantenerlo.

------------------------------------------------------------------------

## 3. Buscar únicamente desde 3 caracteres

La búsqueda de ciudades debe comenzar cuando el texto tenga al menos 3
caracteres.

La URL de búsqueda utiliza la API de geocodificación de Open-Meteo.

La idea es:

``` js
const url =
    texto.length >= 3
        ? `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(texto)}&count=5&language=es`
        : null;
```

------------------------------------------------------------------------

## 4. Manejar los estados de búsqueda

Juan debe implementar:

### Mientras busca

Mostrar:

``` text
Buscando...
```

### Si ocurre un error

Mostrar un mensaje de error.

### Si no hay resultados

Mostrar:

``` text
Sin resultados
```

### Si existen resultados

Mostrar la lista de ciudades.

Ejemplo:

``` text
Cúcuta, Norte de Santander, Colombia
Cucuta, Alba, Rumanía
Cucuta, Estado Anzoátegui, Venezuela
```

------------------------------------------------------------------------

## 5. Seleccionar una ciudad

Cuando el usuario haga clic sobre una ciudad:

-   se debe guardar la ciudad seleccionada;
-   debe desaparecer o cambiar la lista según corresponda;
-   se debe preparar la información para que Joseph pueda utilizar sus
    coordenadas.

La ciudad seleccionada debe conservar:

``` js
{
    id,
    name,
    admin1,
    country,
    latitude,
    longitude
}
```

------------------------------------------------------------------------

## 6. AbortController

La búsqueda debe cancelar una petición anterior cuando se realiza una
nueva búsqueda.

Esto evita dejar solicitudes anteriores activas innecesariamente.

------------------------------------------------------------------------

## 7. Archivos que Juan puede modificar

Principalmente:

``` text
App.jsx
App.css
```

Puede crear archivos adicionales si son necesarios, pero debe avisar al
grupo antes de cambiar la estructura acordada.

------------------------------------------------------------------------

## 8. Lo que Juan NO debe modificar mientras los demás trabajan

Joseph está trabajando en:

``` text
src/hooks/useFetch.js
src/clima.js
```

Erika está trabajando en la lógica de:

``` text
useMemo
useRef
```

Juan no debe modificar esos archivos mientras ellos están trabajando.

------------------------------------------------------------------------

## 9. ¿Cuándo termina Juan?

Juan termina su responsabilidad cuando:

-   se puede escribir una ciudad;
-   la búsqueda ocurre desde 3 caracteres;
-   aparece `Buscando...`;
-   se muestran errores;
-   se muestra `Sin resultados` cuando corresponde;
-   aparecen las ciudades encontradas;
-   se puede seleccionar una ciudad;
-   la ciudad seleccionada contiene las coordenadas;
-   funciona correctamente el `AbortController`.

Después:

``` bash
git add .
git commit -m "Implementar búsqueda de ciudades"
git push
```

------------------------------------------------------------------------

# ==================================================

# PERSONA 2 --- JOSEPH

# ==================================================

## Responsabilidad

Joseph se encarga de:

-   **Paso 2: crear `useFetch`**
-   **Paso 3: obtener y mostrar el pronóstico**

------------------------------------------------------------------------

# PARTE A --- Paso 2: useFetch

## 1. Crear la carpeta

Crear:

``` text
src/hooks/
```

Y dentro:

``` text
src/hooks/useFetch.js
```

------------------------------------------------------------------------

## 2. Crear el hook

El hook debe tener esta forma conceptual:

``` js
export function useFetch(url) {
    // estado de datos
    // estado de cargando
    // estado de error
    // useEffect
}
```

------------------------------------------------------------------------

## 3. Contrato del hook

El resto del proyecto debe poder hacer:

``` js
const { datos, cargando, error } = useFetch(url);
```

El hook debe devolver exactamente:

``` js
{
    datos,
    cargando,
    error
}
```

------------------------------------------------------------------------

## 4. Si la URL es null

Si recibe:

``` js
useFetch(null)
```

no debe realizar ninguna petición.

Esto permite utilizar el mismo hook aunque todavía no exista una ciudad
seleccionada.

------------------------------------------------------------------------

## 5. Dependencia del efecto

El `useEffect` del hook debe depender de:

``` js
[url]
```

La petición cambia cuando cambia la URL.

------------------------------------------------------------------------

# PARTE B --- Paso 3: pronóstico

Después de terminar `useFetch`, Joseph implementa el pronóstico.

------------------------------------------------------------------------

## 1. Utilizar el mismo hook

No crear otro `fetch` manual.

La actividad exige reutilizar:

``` js
useFetch(url)
```

para la segunda petición.

El proyecto debe terminar utilizando dos llamadas a `useFetch`, pero un
solo `fetch` dentro del hook.

------------------------------------------------------------------------

## 2. URL del pronóstico

La URL utiliza:

``` text
https://api.open-meteo.com/v1/forecast
```

y necesita:

-   latitude
-   longitude
-   clima actual
-   temperatura máxima
-   temperatura mínima
-   código meteorológico
-   zona horaria automática

La URL debe construirse utilizando la ciudad seleccionada.

------------------------------------------------------------------------

## 3. Si no hay ciudad seleccionada

La URL del pronóstico debe ser:

``` js
null
```

para que `useFetch` no realice ninguna petición.

------------------------------------------------------------------------

## 4. Crear `clima.js`

Crear:

``` text
src/clima.js
```

Y allí:

``` js
export function describirClima(codigo) {
    if (codigo === 0) return "☀️ Despejado";
    if (codigo <= 3) return "⛅ Parcialmente nublado";
    if (codigo <= 48) return "🌫️ Niebla";
    if (codigo <= 57) return "🌦️ Llovizna";
    if (codigo <= 67) return "🌧️ Lluvia";
    if (codigo <= 77) return "❄️ Nieve";
    if (codigo <= 82) return "🌧️ Chubascos";
    return "⛈️ Tormenta";
}
```

Esta función convierte el `weather_code` numérico de Open-Meteo en una
descripción legible.

------------------------------------------------------------------------

## 5. Mostrar el clima actual

Al seleccionar una ciudad debe aparecer:

-   nombre de la ciudad;
-   temperatura actual;
-   descripción;
-   viento.

------------------------------------------------------------------------

## 6. Mostrar los siete días

Debe aparecer un resumen de los siguientes siete días con:

-   fecha;
-   temperatura mínima;
-   temperatura máxima;
-   descripción del clima.

Los arrays de `daily` son paralelos:

``` text
daily.time[0]
daily.temperature_2m_max[0]
daily.temperature_2m_min[0]
daily.weather_code[0]
```

corresponden al mismo día.

------------------------------------------------------------------------

## 7. Archivos que Joseph debe modificar

Principalmente:

``` text
src/hooks/useFetch.js
src/clima.js
```

También puede trabajar en su parte de la interfaz del pronóstico.

------------------------------------------------------------------------

## 8. Lo que Joseph debe evitar

Mientras Juan está desarrollando el buscador:

-   no reescribir toda la lógica de `App.jsx`;
-   no cambiar los nombres acordados de los datos de ciudad;
-   no crear otro sistema de `fetch`.

Mientras Erika trabaja:

-   no modificar su lógica de `useMemo`;
-   no modificar su lógica de `useRef`.

------------------------------------------------------------------------

## 9. ¿Cuándo termina Joseph?

Cuando:

-   `useFetch(url)` funciona;
-   devuelve `datos`, `cargando` y `error`;
-   no realiza petición cuando `url` es `null`;
-   funciona la búsqueda utilizando el hook;
-   se puede seleccionar una ciudad;
-   aparece el clima actual;
-   aparecen los siete días;
-   `describirClima()` convierte los códigos correctamente;
-   al cambiar de ciudad cambia el pronóstico;
-   existe un solo `fetch` en todo el proyecto, dentro de `useFetch`.

Después:

``` bash
git add .
git commit -m "Crear useFetch y agregar pronostico"
git push
```

------------------------------------------------------------------------

# ==================================================

# PERSONA 3 --- ERIKA

# ==================================================

## Responsabilidad

Erika se encarga de:

-   **Paso 4: resumen semanal con `useMemo`**
-   **Paso 5: foco y botón Limpiar con `useRef`**

Erika puede desarrollar estas partes utilizando datos de prueba mientras
Juan y Joseph terminan sus partes.

------------------------------------------------------------------------

# PARTE A --- Paso 4: useMemo

## 1. Crear el resumen de la semana

Encima de los siete días debe aparecer una línea con:

-   máxima de la semana;
-   mínima de la semana;
-   día más caluroso.

Ejemplo:

``` text
Esta semana: máxima 35.9 °C, mínima 23.3 °C.
El día más caluroso es el 2026-10-03.
```

------------------------------------------------------------------------

## 2. Utilizar useMemo

El cálculo debe realizarse dentro de:

``` js
useMemo(...)
```

y debe utilizar los datos del pronóstico como dependencia.

------------------------------------------------------------------------

## 3. Calcular máxima

Utilizar:

``` js
Math.max(...array)
```

para encontrar la máxima.

------------------------------------------------------------------------

## 4. Calcular mínima

Utilizar:

``` js
Math.min(...array)
```

para encontrar la mínima.

------------------------------------------------------------------------

## 5. Encontrar el día más caluroso

Primero encontrar la posición de la máxima:

``` js
const indice = temperaturasMaximas.indexOf(maxima);
```

Después utilizar esa misma posición en:

``` js
daily.time[indice]
```

------------------------------------------------------------------------

## 6. console.log obligatorio

Dentro del `useMemo` debe existir:

``` js
console.log("calculando resumen");
```

La comprobación consiste en que escribir en el buscador no vuelva a
calcular el resumen cuando la ciudad no ha cambiado.

------------------------------------------------------------------------

# PARTE B --- Paso 5: useRef

## 1. Crear la referencia del input

Utilizar:

``` js
const entrada = useRef(null);
```

------------------------------------------------------------------------

## 2. Conectar la referencia

El input debe tener:

``` jsx
<input ref={entrada} />
```

------------------------------------------------------------------------

## 3. Foco inicial

Al abrir o recargar la aplicación, el cursor debe aparecer
automáticamente en el campo de búsqueda.

Para esto se utilizará un efecto con dependencia vacía:

``` js
useEffect(() => {
    entrada.current.focus();
}, []);
```

------------------------------------------------------------------------

## 4. Botón Limpiar

Debe existir:

``` text
[Limpiar]
```

Al presionarlo debe:

1.  borrar el texto de búsqueda;
2.  quitar la ciudad seleccionada;
3.  volver a enfocar el input.

La idea es utilizar:

``` js
entrada.current.focus();
```

------------------------------------------------------------------------

## 5. Archivos que Erika debe modificar

Principalmente la lógica relacionada con:

``` text
useMemo
useRef
```

Puede trabajar en `App.jsx` si es necesario, pero debe coordinarse con
Juan porque Juan es el responsable principal de ese archivo.

Si la parte puede aislarse en un componente propio, es preferible
hacerlo para evitar conflictos.

------------------------------------------------------------------------

## 6. ¿Cuándo termina Erika?

Cuando:

-   aparece el resumen semanal;
-   máxima y mínima son correctas;
-   se identifica correctamente el día más caluroso;
-   el cálculo está dentro de `useMemo`;
-   existe el `console.log("calculando resumen")`;
-   escribir en el buscador no recalcula el resumen si la ciudad no
    cambia;
-   el input recibe foco automáticamente;
-   el botón Limpiar borra el texto;
-   Limpiar quita la ciudad seleccionada;
-   Limpiar vuelve a enfocar el input.

Después:

``` bash
git add .
git commit -m "Agregar resumen semanal y manejo del foco"
git push
```

------------------------------------------------------------------------

# 7. ¿CÓMO TRABAJAMOS SIN ESPERARNOS?

La idea es que cada persona pueda avanzar aunque los demás todavía no
hayan terminado.

## Juan

Puede desarrollar la búsqueda usando datos reales de la API.

## Joseph

Puede desarrollar `useFetch` de manera independiente.

Para probar el pronóstico puede utilizar temporalmente una ciudad
conocida:

``` js
const ciudadPrueba = {
    name: "Cúcuta",
    latitude: 7.89,
    longitude: -72.50
};
```

No necesita esperar a que Juan termine el buscador para probar su hook.

## Erika

Puede desarrollar `useMemo` utilizando temporalmente un objeto de
pronóstico de prueba.

Por ejemplo, conceptualmente:

``` js
const pronosticoPrueba = {
    daily: {
        time: [
            "2026-10-02",
            "2026-10-03",
            "2026-10-04"
        ],
        temperature_2m_max: [34, 36, 35],
        temperature_2m_min: [25, 26, 24]
    }
};
```

Después, cuando Joseph conecte el pronóstico real, Erika utilizará esos
datos reales.

------------------------------------------------------------------------

# 8. ORDEN DE INTEGRACIÓN

Aunque todos trabajamos en paralelo, la integración general será:

``` text
JUAN
Búsqueda de ciudades
       ↓
ciudad seleccionada
       ↓
JOSEPH
useFetch + pronóstico
       ↓
datos del pronóstico
       ↓
ERIKA
useMemo + useRef
       ↓
Aplicación completa
```

Pero esto **no significa que Erika tenga que esperar a Joseph para
programar**.

Puede desarrollar la lógica con datos de prueba.

------------------------------------------------------------------------

# 9. REGLA ESPECIAL PARA App.jsx

`App.jsx` es el archivo que más posibilidades tiene de generar
conflictos.

Por eso:

> **Juan será el responsable principal de App.jsx durante el desarrollo
> inicial.**

Joseph y Erika deben evitar reescribir `App.jsx` completo.

Si necesitan agregar algo a `App.jsx`, primero avisan al grupo.

Una vez que Juan haya terminado la estructura principal, los tres pueden
coordinar una integración final.

------------------------------------------------------------------------

# 10. FLUJO DE GIT PARA CADA INTEGRANTE

## Antes de trabajar

``` bash
git pull
```

## Trabajar

Modificar únicamente los archivos de la responsabilidad propia.

## Revisar

Probar la aplicación.

## Guardar cambios

``` bash
git add .
```

## Crear commit

``` bash
git commit -m "Descripción clara del cambio"
```

## Subir a GitHub

``` bash
git push
```

------------------------------------------------------------------------

# 11. MUY IMPORTANTE: ¿QUÉ HACER SI ALGUIEN YA HIZO PUSH?

Si alguien dice:

> "Ya hice push."

Los demás deben ejecutar:

``` bash
git pull
```

antes de continuar.

Si Git informa que hay conflictos:

**NO seguir haciendo commits a ciegas.**

Avisar al grupo y resolver el conflicto entre los tres.

------------------------------------------------------------------------

# 12. CHECKLIST FINAL

Antes de entregar, comprobar:

## Juan Diego

-   [ ] Búsqueda desde 3 caracteres.
-   [ ] API de ciudades funcionando.
-   [ ] `Buscando...`.
-   [ ] Manejo de errores.
-   [ ] `Sin resultados`.
-   [ ] Lista de ciudades.
-   [ ] Selección de ciudad.
-   [ ] `AbortController`.

## Joseph

-   [ ] Existe `src/hooks/useFetch.js`.
-   [ ] `useFetch(url)` funciona.
-   [ ] Devuelve `datos`.
-   [ ] Devuelve `cargando`.
-   [ ] Devuelve `error`.
-   [ ] No hace petición cuando `url` es `null`.
-   [ ] Pronóstico actual funcionando.
-   [ ] Siete días funcionando.
-   [ ] `src/clima.js`.
-   [ ] `describirClima(codigo)`.
-   [ ] Solo existe un `fetch` en el proyecto.

## Erika

-   [ ] Resumen semanal.
-   [ ] Máxima.
-   [ ] Mínima.
-   [ ] Día más caluroso.
-   [ ] `useMemo`.
-   [ ] `console.log("calculando resumen")`.
-   [ ] Foco inicial.
-   [ ] `useRef`.
-   [ ] Botón Limpiar.
-   [ ] Limpiar borra la ciudad.
-   [ ] Limpiar vuelve a enfocar el input.

## Grupo

-   [ ] Los tres tienen commits en GitHub.
-   [ ] La aplicación funciona desde cero.
-   [ ] `npm install` funciona.
-   [ ] `npm run dev` funciona.
-   [ ] No hay errores en consola.
-   [ ] Los tres probaron la aplicación.
-   [ ] La funcionalidad obligatoria de los pasos 1 a 5 está completa.

------------------------------------------------------------------------

# 13. PASO 6 --- OPCIONAL

El `useDebounce` es opcional.

Si los pasos 1 a 5 ya están terminados y funcionan correctamente, el
grupo puede implementar:

``` js
useDebounce(valor, ms)
```

con:

``` text
useEffect
setTimeout
clearTimeout
```

y un retraso de:

``` text
400 ms
```

No empezar este paso antes de tener correctamente terminados los pasos
obligatorios.

------------------------------------------------------------------------

# 14. RESUMEN PARA EL GRUPO

``` text
JUAN DIEGO
→ Paso 1
→ búsqueda de ciudades
→ selección de ciudad
→ responsable principal de App.jsx


JOSEPH
→ Paso 2
→ useFetch
→ Paso 3
→ pronóstico
→ clima.js


ERIKA
→ Paso 4
→ useMemo
→ resumen semanal
→ Paso 5
→ useRef
→ foco + Limpiar
```

### Los tres:

``` text
1. Tener su propio Codespace
2. Trabajar sobre main
3. Hacer git pull antes de comenzar
4. No modificar archivos que otro está trabajando
5. Hacer su propio commit
6. Hacer git push
7. Hacer git pull cuando otro integrante termine
```

### Objetivo final

No buscamos que los tres programen exactamente al mismo tiempo sobre el
mismo archivo.

Buscamos que:

``` text
cada uno pueda avanzar
       ↓
cada uno termina su parte
       ↓
cada uno hace commit
       ↓
todos los cambios llegan a main
       ↓
se conectan las partes
       ↓
aplicación completa
```
