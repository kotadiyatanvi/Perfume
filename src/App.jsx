import './App.css'
import { Navbar } from "./compoantet/Navbar"
import CreatePost from './compoantet/CreatePost'
import Logo from "./assets/moon.png"
import Card from "./compoantet/Card"
import { FaMoon } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa6";
import { TiHtml5 } from "react-icons/ti";
import {NewPost} from './pages/NewPost'
import { IoLogoJavascript } from "react-icons/io"
import { FaReact } from "react-icons/fa"
import { IoLogoHtml5 } from "react-icons/io5"
import { FaCss3 } from "react-icons/fa6"
import { RouterProvider } from 'react-router-dom'
import { router } from './compoantet/Route'

function App() {
  return (
    
    <>
    <RouterProvider router={router}/>
          </>
  )
}


export default App
