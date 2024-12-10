import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from './services/authService'
import * as perfumeService from './services/perfumeService'
import PerfumeDetails from './components/PerfumeDetails/PerfumeDetails';
import PerfumeForm from './components/PerfumeForm/PerfumeForm.jsx'

import PerfumeList from './components/PerfumeList/PerfumeList';

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [perfumes, setPerfumes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
  const fetchAllPerfumes = async () => {
    const perfumesData = await perfumeService.index()
    setPerfumes(perfumesData)
  }
  if(user) fetchAllPerfumes()
}, [user])

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const handleAddPerfume = async (perfumeFormData) => {
    const newPerfume = await perfumeService.create(perfumeFormData)
    setPerfumes([newPerfume, ...perfumes])
    navigate('/perfumes')
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        { user ? (
          <>
          <Route path='/' element={<Dashboard user={user}/>}/>
          <Route path='/perfumes' element={<PerfumeList perfumes={perfumes}/>} />
          <Route path='/perfumes/:perfumeId' element={<PerfumeDetails />} />
          <Route path='/perfumes/new' element={<PerfumeForm handleAddPerfume={handleAddPerfume}/>} />
          </>
        ) : (
          <Route path='/' element={<Landing />}/>
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser}/>} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
