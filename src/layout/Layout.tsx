import { Outlet } from "react-router-dom";
import Navbar from "../blocks/Navbar";
import ToolBar from "../components/ToolBar";

const Layout = () => {
  return (
    <div>   
        <Navbar />
        <main>
            <Outlet />
        </main>
        <ToolBar isMenuOpen={false} />
    </div>
  )
}

export default Layout