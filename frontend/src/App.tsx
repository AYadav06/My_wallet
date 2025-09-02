
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signin' element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
