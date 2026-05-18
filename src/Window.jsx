import { useParams } from "react-router-dom"
import CardMenu from "./CardMeun"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"

export default function Window() {

    const { viewName, id } = useParams()

    // console.log("Window.jsx - viewName:", viewName, "| id:", id) // debugging

    //Special handling for /window/details/:id route
    if (id) {
        return (
            <div className="window-container">
                <RecordDetails id={id} />
            </div>
        )
    }

    // Normal views (cards, admin, etc.)
    const view = {
        cards: <CardMenu />,
        details: <RecordDetails id={id} />,
        admin: <AdminPanel />
    }

    return (
        <div className="window-container">
            {view[viewName] || <CardMenu />}
        </div>
    )
}