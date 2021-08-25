import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import About from "./screens/About";
import Home from "./screens/Home";
import Contact from "./screens/Contact"
import Services from "./screens/Services"
import Gallery from "./screens/Gallery"

import "./styles/main.css"

function App() {
  return (
    <Layout>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
      <Route exact path="/contact">
        <Contact/>
      </Route>
      <Route exact path="/services">
        <Services/>
      </Route>
      <Route exact path="/gallery">
        <Gallery/>
      </Route>
    </Layout>
  );
}

export default App;
