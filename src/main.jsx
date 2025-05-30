import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
// import { FormWithCustomHook } from './02-useEffect/FormWithCustomHook'
// import { SimpleForm } from './02-useEffect/SimpleForm'
//import { CounterApp } from './01-useState/CounterApp'
//import { CounterWithCustomHook } from './01-useState/CounterWithCustomHook'
//import { HooksApp } from './HooksApp'
//import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks'
//import { FocusScreen } from './04-useRef/FocusScreen'
//import { Layout } from './05-useLayoutEffect/Layout'
//import { Memorize } from './06-memos/Memorize'
//import { MemoHook } from './06-memos/MemorizeHook'
//import { CallbackHook } from './06-memos/CallbackHook'

// claude
import { CounterApp } from './ejemplos-c-useReducer/CounterApp'
import FormApp from './ejemplos-c-useReducer/FormApp'
import ListaTareas from './ejemplos-c-useReducer/ListaTareas'
import CarritoCompras from './ejemplos-c-useReducer/CarritoCompras'
import MusicPlayer from './ejemplos-c-useReducer/MusicPlayer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CounterApp  />
    <FormApp />
    <ListaTareas />
    <CarritoCompras />
    <MusicPlayer />
  </StrictMode>,
)
