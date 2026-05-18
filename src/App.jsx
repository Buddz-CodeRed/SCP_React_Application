import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavMenu from "./NavMenu"
import CardMenu from "./CardMeun"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"
import Window from "./Window"

export default function App() {
  return(
    <Router>
      <NavMenu/>      
      <Routes>
        <Route path="/window/:viewName" element={<Window/>} />
        <Route path="/window/details/:id" element={<Window/>} />
      </Routes>
    </Router>
  )
}