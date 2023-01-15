import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  return (
    <div className="app-layout">
      <Header
        setMenuModal={props.setMenuModal}
        user={props.user}
        logout={props.logout}
      />
      {props.children}
      <Footer/>
    </div>
  )
}
