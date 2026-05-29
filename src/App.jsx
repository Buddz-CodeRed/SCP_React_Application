import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import NavMenu from "./NavMenu"
import Window from "./Window"
import { useState } from "react"


export default function App() {

  const [viewMode, setViewMode] = useState('add') // set viewMode state to add as default

  return(
    <Router>
      <NavMenu setViewMode={setViewMode}/>      
      <Routes>        
        <Route path="/window/details/:id" element={<Window />} />        
        <Route path="/window/admin/" element={<Window viewMode={viewMode}/>} />
        <Route path="/window/admin/:id" element={<Window />} />
        <Route path="/" element={<Navigate to="/window/cards" replace />} />
        <Route path="/window/:viewName/" element={<Window />} />        
      </Routes>
    </Router>
  )
}