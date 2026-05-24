import { useParams } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function Window() {
    return (
        <div className="window-container">
            {/* This is where child routes will render */}
            <Outlet />
        </div>
    )
}