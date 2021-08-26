import { useState } from "react";
import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import About from "./screens/About";
import Home from "./screens/Home";
import Contact from "./screens/Contact"
import Services from "./screens/Services"
import Gallery from "./screens/Gallery"
import GalleryCarousel from "./components/GalleryCarousel";

import "./styles/main.css"

function App() {

  const [index, setIndex] = useState(0);
  const [galleryModal, setGalleryModal] = useState(false)

  return (
    <Layout>
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
        <Gallery setIndex={setIndex} setGalleryModal={setGalleryModal} />
      </Route>
      <GalleryCarousel
        setIndex={setIndex}
        index={index}
        setGalleryModal={setGalleryModal}
        galleryModal={galleryModal}
      />
    </Layout>
  );
}

export default App;
