import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import About from "./screens/About";
import Home from "./screens/Home";
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
    </Layout>
  );
}

export default App;
