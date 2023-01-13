import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Layout from "./layout/Layout";
import About from "./screens/About";
import Home from "./screens/Home";
import Contact from "./screens/Contact"
import Services from "./screens/Services"
import Gallery from "./screens/Gallery"
import GalleryCarousel from "./components/GalleryCarousel";
import MenuModal from "./components/MenuModal";
import Packages from "./components/Packages";

// Auth Screens
import Login from "./screens/auth-screens/Login";
import Register from "./screens/auth-screens/Register";
import Accounts from "./screens/auth-screens/Accounts";

import "./styles/main.css"
import {register, login, verify, destroyUsers, updateUsers} from './services/auth'

function App() {
  const navigate = useNavigate()

  const [refresh, setRefresh] = useState(false)

  // FOR GALLERY
  const [airtablePhotos, setAirtablePhotos] = useState([])

  // FOR GALLERY MODAL
  const [index, setIndex] = useState(0);
  const [galleryModal, setGalleryModal] = useState(false)

  // FOR MOBILE MENU MODAL
  const [menuModal, setMenuModal] = useState(false)

  // FOR AUTHENTICATION
  const [user, setUser] = useState(null)
  
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    setRefresh(prev => !prev)
  } 

  useEffect(() => {
    const reAuthenticateUser = async () => {
      const res = await verify()
      setUser(res)
    }
    reAuthenticateUser()
  }, [refresh])


  return (
    <>
      <Layout setMenuModal={setMenuModal} user={user} logout={logout}>
      
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/services" element={<Services><Packages/></Services>}/>
          <Route 
            exact path="/gallery" 
            element={<Gallery setIndex={setIndex} setGalleryModal={setGalleryModal} airtablePhotos={airtablePhotos} setAirtablePhotos={setAirtablePhotos} />}
          />

          {/* Auth Routes */}
          <Route exact path="/jamix-admin/login" element={<Login login={login} setUser={setUser}/>}/>
          <Route exact path="/jamix-admin/register" element={<Register register={register} setUser={setUser}/>}/>
          <Route exact path="/jamix-admin/accounts" element={<Accounts destroyUsers={destroyUsers} updateUsers={updateUsers} user={user} restricted={true}/>}/>
          <Route exact path="/jamix-admin/services" element={<Services restricted={true} user={user}><Packages restricted={true}/></Services>}/>
          <Route exact path="/jamix-admin/gallery" element={<Gallery restricted={true} setIndex={setIndex} user={user} setGalleryModal={setGalleryModal} airtablePhotos={airtablePhotos} setAirtablePhotos={setAirtablePhotos}/>}/>
          <Route exact path="/jamix-admin/home" element={<Home restricted={true} user={user}/>}/>     
        </Routes>
          
        {/* Non-routes */}
        <GalleryCarousel
          setIndex={setIndex}
          index={index}
          setGalleryModal={setGalleryModal}
          galleryModal={galleryModal}
          airtablePhotos={airtablePhotos} 
        />
        <MenuModal
          menuModal={menuModal}
          setMenuModal={setMenuModal}
          user={user}
          logout={logout}
        />

      </Layout>
      {/* About */}
      {/* <iframe className="airtable-embed" src="https://airtable.com/embed/shrLIQhC3NM19VGtV?backgroundColor=red" frameBorder="0" width="100%" height="1000px" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe> */}

      </>
  );
}

export default App;
