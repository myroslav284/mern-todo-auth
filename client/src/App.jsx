import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element />
        <Route path='/login' element />
        <Route path='/signup' element />
      </Routes>
    </>
  )
}

export default App
