import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

import NavMenu from "./NavMenu"
import CardMenu from "./CardMenu"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"

export default function App() {

  return (
    <Router basename="/SCP_React_Application"> {/* sets the base URL path for the entire application, helps with deployment */}
      <NavMenu />  {/*dispalys the navigation side bar on all pages*/}
      <Routes>
        <Route path="/" element={<Navigate to="/window/cards" replace />} /> {/* redirects to CardMenu instead of root on entry*/}
        <Route path="/window/cards" element={<div className="window-container"><CardMenu /></div>} />  {/* loads CardMenu */}
        <Route path="/window/details/:id" element={<div className="window-container"><RecordDetails /></div>} /> {/* loads RecordDetails */}
        <Route path="/window/admin/:mode" element={<div className="AP-window"><AdminPanel /></div>} /> {/* loads AdminPanyl */}
      </Routes>
    </Router>
  )
}