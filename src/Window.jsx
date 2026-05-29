import { useParams } from "react-router-dom"
import CardMenu from "./CardMenu"
import RecordDetails from "./RecordDetails"
import AdminPanel from "./AdminPanel"
import SidePane from "./SidePane"
import { supabase } from "./supabase"
import NavMenu from "./NavMenu"
import { useState } from "react"

export default function Window({viewMode}) {
    console.log("Window viewMode:", viewMode)

    const { viewName, id } = useParams()

    //Special handling for /window/details/:id route
    if (id) {
        return (
            <div className="window-container">
                <RecordDetails id={id} />
            </div>
        )
    }

    if (viewMode){
        return(
            <div className="AP-window">
                <AdminPanel viewMode={viewMode}/>
            </div>
        )
    }

    // Normal views (cards, admin, etc.)
    const view = {
        cards: <CardMenu />,
        details: <RecordDetails id={id} />
    }

    return (
        <div>
            <div className="window-container">
                {view[viewName] || <CardMenu />}
            </div>
        </div>
    )
}