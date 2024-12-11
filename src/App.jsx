import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from './services/authService'
import * as perfumeService from './services/perfumeService'
import PerfumeDetails from './components/PerfumeDetails/PerfumeDetails'
import PerfumeForm from './components/PerfumeForm/PerfumeForm'
import PerfumeList from './components/PerfumeList/PerfumeList'

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [perfumes, setPerfumes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllPerfumes = async () => {
      const perfumesData = await perfumeService.index()
      setPerfumes(perfumesData);
    };
    if (user) fetchAllPerfumes()
  }, [user]);

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  };

  const handleAddPerfume = async (perfumeFormData) => {
    const newPerfume = await perfumeService.create(perfumeFormData);
    setPerfumes([newPerfume, ...perfumes]);
    navigate('/perfumes')
  };

  const handleDeletePerfume = async (perfumeId) => {
    const deletedPerfume = await perfumeService.deletePerfume(perfumeId);
    setPerfumes(perfumes.filter((perfume) => perfume._id !== deletedPerfume._id))
    navigate('/perfumes');
  };

  const handleUpdatePerfume = async (perfumeId, perfumeFormData) => {
    console.log('perfumeId:', perfumeId, 'perfumeFormData:', perfumeFormData)
    const updatedPerfume = await perfumeService.update(perfumeId, perfumeFormData)
    setPerfumes(perfumes.map((perfume) => (perfumeId === perfume._id ? updatedPerfume : perfume)))
    navigate(`/perfumes/${perfumeId}`)
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path='/' element={<Dashboard user={user} />} />
              <Route path='/perfumes' element={<PerfumeList perfumes={perfumes} />} />
              <Route path='/perfumes/:perfumeId' element={<PerfumeDetails handleDeletePerfume={handleDeletePerfume} />} />
              <Route path='/perfumes/new' element={<PerfumeForm handleAddPerfume={handleAddPerfume} />} />
              <Route path='/perfumes/:perfumeId/edit' element={<PerfumeForm handleUpdatePerfume={handleUpdatePerfume} />} />
            </>
          ) : (
            <Route path='/' element={<Landing />} />
          )}
          <Route path='/signup' element={<SignupForm setUser={setUser} />} />
          <Route path='/signin' element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App;

