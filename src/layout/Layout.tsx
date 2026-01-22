import { Outlet } from "react-router-dom";
import Navbar from "../blocks/Navbar";
import ToolBar from "../blocks/ToolBar";
import FloatingBookmark from "../components/FloatingBookmark";

const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">   
        <Navbar />
        <FloatingBookmark />
        <main className="flex-1 overflow-hidden">
            <Outlet />
        </main>
        <ToolBar isMenuOpen={false} />
    </div>
  )
}

export default Layout