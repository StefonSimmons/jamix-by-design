import { useState } from "react";
import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import About from "./screens/About";
import Home from "./screens/Home";
import Contact from "./screens/Contact"
import Services from "./screens/Services"
import Gallery from "./screens/Gallery"
import GalleryCarousel from "./components/GalleryCarousel";
import MenuModal from "./components/MenuModal";

import Login from "./screens/Login";

import "./styles/main.css"

function App() {

  // FOR GALLERY
  const [airtablePhotos, setAirtablePhotos] = useState([])

  // FOR GALLERY MODAL
  const [index, setIndex] = useState(0);
  const [galleryModal, setGalleryModal] = useState(false)

  // FOR MOBILE MENU MODAL
  const [menuModal, setMenuModal] = useState(false)

  return (
    <>
      <Layout setMenuModal={setMenuModal}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/services">
          <Services />
        </Route>
        <Route exact path="/gallery">
          <Gallery setIndex={setIndex} setGalleryModal={setGalleryModal} airtablePhotos={airtablePhotos} setAirtablePhotos={setAirtablePhotos} />
        </Route>
        <Route exact path="/jamix-admin-login">
          <Login/>
        </Route>
        
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
