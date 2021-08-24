import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./screens/Home";
import "./styles/main.css"

function App() {
  return (
    <Layout>
      <Route exact path="/">
        <Home />
      </Route>
    </Layout>
  );
}

export default App;
