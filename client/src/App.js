import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import About from "./screens/About";
import Home from "./screens/Home";
import Contact from "./screens/Contact"
import Services from "./screens/Services"
import Gallery from "./screens/Gallery"
import GalleryCarousel from "./components/GalleryCarousel";
import MenuModal from "./components/MenuModal";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Accounts from "./screens/Accounts";

import "./styles/main.css"
import {register, login, verify, destroyUsers, updateUsers} from './services/auth'

function App() {

  // FOR GALLERY
  const [airtablePhotos, setAirtablePhotos] = useState([])

  // FOR GALLERY MODAL
  const [index, setIndex] = useState(0);
  const [galleryModal, setGalleryModal] = useState(false)

  // FOR MOBILE MENU MODAL
  const [menuModal, setMenuModal] = useState(false)

  // FOR AUTHENTICATION
  const [user, setUser] = useState(null)
  useEffect(() => {
    const reAuthenticateUser = async () => {
      const res = await verify()
      setUser(res)
    }
    reAuthenticateUser()
  }, [])

  const routeUser = () => {
    if(user.isOwner){
      return <Accounts destroyUsers={destroyUsers} updateUsers={updateUsers}/>
    }else if(user.isAdmin){
      return <Navigate to="/about"/>
    }
  }

  return (
    <>
      <Layout setMenuModal={setMenuModal}>
      
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/services" element={<Services />}/>
          <Route 
            exact path="/gallery" 
            element={<Gallery setIndex={setIndex} setGalleryModal={setGalleryModal} airtablePhotos={airtablePhotos} setAirtablePhotos={setAirtablePhotos} />}
          />
          <Route exact path="/jamix-admin/login" element={<Login login={login} setUser={setUser}/>}/>
          <Route exact path="/jamix-admin/register" element={<Register register={register} setUser={setUser}/>}/>
          <Route exact path="/jamix-admin/accounts" element={user && routeUser()}/>
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
        />

      </Layout>
      {/* <iframe className="airtable-embed" src="https://airtable.com/embed/shrLIQhC3NM19VGtV?backgroundColor=red" frameBorder="0" width="100%" height="1000px" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe> */}
      {/* <iframe className="airtable-embed" src="https://airtable.com/embed/shrqgKj7juCAXE8kO?backgroundColor=red" frameBorder="0" width="100%" height="1000px" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe> */}
      <iframe className="airtable-embed" src="https://airtable.com/embed/shr9jRgZMKBIHOsyl?backgroundColor=red" frameBorder="0" width="100%" height="1000px" style={{background: "transparent", border: "1px solid #ccc"}} title="airtable"></iframe>
      
      </>
  );
}

export default App;
