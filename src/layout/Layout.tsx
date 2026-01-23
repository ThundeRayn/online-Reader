import { Outlet } from "react-router-dom";
import Navbar from "../blocks/Navbar";
import ToolBar from "../blocks/ToolBar";
import FloatingBookmark from "../components/FloatingBookmark";

const Layout = () => {
  return (
    <div>   
        <Navbar />
        <FloatingBookmark />
        <main>
            <Outlet />
        </main>
        <ToolBar isMenuOpen={false} />
    </div>
  )
}

export default Layout