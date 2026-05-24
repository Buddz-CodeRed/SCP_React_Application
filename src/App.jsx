import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavMenu from "./NavMenu"
import CardMenu from "./CardMeun"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"
import Window from "./Window"

export default function App() {
  return(
    <Router>
      <div className="base-container">
        <NavMenu/>   
          <div className="window-container">
            <Routes>
              {/* <Route path="/window/:viewName" element={<Window/>} />
              <Route path="/window/details/:id" element={<Window/>} /> */}
              <Route path="/window" element={<Window />}>
                <Route path="cards" element={<CardMenu/>} />
                <Route path="details/:id" element={<RecordDetails/>} />
                <Route path="admin" element={<AdminPanel/>} />
              </Route>
            </Routes>
          </div>
      </div>
    </Router>
  )
}