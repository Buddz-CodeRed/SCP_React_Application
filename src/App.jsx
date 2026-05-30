import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import NavMenu from "./NavMenu"
import CardMenu from "./CardMenu"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"

export default function App() {

  return (
    <Router basename="/SCP_React_Application">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/window/cards" replace />} />
        <Route path="/window/cards" element={<div className="window-container"><CardMenu /></div>} />
        <Route path="/window/details/:id" element={<div className="window-container"><RecordDetails /></div>} />
        <Route path="/window/admin/:mode" element={<div className="AP-window"><AdminPanel /></div>} />
      </Routes>
    </Router>
  )
}