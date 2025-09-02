
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'


function App() {
  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
