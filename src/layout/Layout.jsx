import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div className="app-layout">
      <Header
        setMenuModal={props.setMenuModal}
      />
      {props.children}
      <Footer/>
    </div>
  )
}
