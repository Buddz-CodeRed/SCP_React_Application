import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import NavMenu from "./NavMenu"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"

export default function App() {
  return(
    <Router>
      <AdminPanel/>
      <NavMenu/>
      
      <Routes>
        <Route path='/' element=
        {
          // Design Main App Dashboard
          <div>
            <h1>Testing React Application</h1>
          </div>
        }/>
        <Route path='/records/:id' element={<RecordDetails/>}></Route>
        {/* <Route path='/admin/' element={<AdminPanel/>}></Route> */}
      </Routes>
    </Router>
  )
}