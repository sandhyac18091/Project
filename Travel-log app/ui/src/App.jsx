import Signup from './pages/Signup'
import Login from './pages/Login'
import Addlog from './pages/Addlog'
import SearchLog from './pages/Searchlog'
import ContactUs from './pages/Contactus'
import Home from './pages/Home'
import EditLog from './pages/Editlog'
import ViewLogs from './pages/Viewlog'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import MyLogs from './pages/Mylog'
import Profile from './pages/Profile'
import Favorites from './pages/Favourite'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add-log' element={<Addlog />} />
        <Route path='/search-log' element={<SearchLog />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path="/editlog/:placename" element={<EditLog />} />
        <Route path="/categories" element={<Categories />} />
        <Route path='/getlog' element={<ViewLogs />} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/mylog' element={<MyLogs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/fav' element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
