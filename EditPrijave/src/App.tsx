import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Administracija from './pages/Administracija.tsx'
import Predavaci from './pages/Predavaci.tsx'
import Radionice from './pages/Radionice.tsx'
import './App.css'
import { AdminProvider } from './components/Admin/AdminContext.tsx'
import AdminCheckbox from './components/Admin/AdminCheckbox.tsx'
import NavBar from './components/NavBar.tsx'
import RadionicePredavaci from './pages/RadionicePredavaci.tsx'


function App() {

  return (
    <>
      <AdminProvider>
        <NavBar></NavBar>
        <AdminCheckbox>
        </AdminCheckbox>
      <Routes>
        <Route path="/" element = {<Home></Home>}></Route>
        <Route path='/Administracija' element = {<Administracija></Administracija>}></Route>
        <Route path='/Predavaci' element = {<Predavaci></Predavaci>}></Route>
        <Route path='/Radionice' element = {<Radionice></Radionice>}></Route>
        <Route path='/RadionicePredavaci' element = {<RadionicePredavaci></RadionicePredavaci>}>
          <Route path=':predavac' element = {<RadionicePredavaci></RadionicePredavaci>}></Route>
        </Route>
        <Route></Route>
      </Routes>
      </AdminProvider>
    </>
  )
}

export default App
