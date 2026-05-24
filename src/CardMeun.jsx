import { useEffect, useState } from 'react' // useEffect: fetching data | useState: storing data
import { Link } from 'react-router-dom' // navigate through links with out full page reloads
import { supabase } from './supabase' // connects to database
import SidePane from './SidePane'
import { useNavigate } from 'react-router-dom'
import './assets/CardMenu.css'

export default function CardMenu() {

    // Store list of records starting at an empty (array) state !!!
    // Replace empty array with fetched data when function is called
    const [records, setRecord] = useState([])

    // Sidepane state
    const [sidepane, setSidePane] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)
    const navigate = useNavigate()

    useEffect(
        () => {
            // define async function
            const fetchRecords = async () => {
                // query db only selecting the id and item and store in 'data' variable
                // waits for process to complete before continuing
                const { data, error } = await supabase.from('scp_data').select('id, item, name, rating, image, object_class, description').order('item', { ascending: true })
                if (error) {
                    console.error(error) // display error
                }
                else {
                    // update records state with array of records; triggers component to re-render
                    setRecord(data)
                }
            }
            // calls async function
            fetchRecords()
        }, []
    )

    return (
        <div className='card-container'>
            <div className={`card-scroll ${sidepane ? 'pushed' : ''}`}>
                <nav>
                    <div className='container-fluid p-3'>
                        <ul className='card-list'>
                            {   // loops over the records array
                                // creates a link for each record via id
                                records.map(
                                    // stores individual record during the looping process
                                    (record) => (
                                        // identifies each record in the array 
                                        <li key={record.id} className='card-item'>
                                            {/* creates a link to side pane for each record using record item value */}
                                            <div className='card-link' onClick={() => { setSelectedRecord(record); setSidePane(true); }}>
                                                <div className='card-wrap'>
                                                    <img
                                                        src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`}
                                                        alt={record.item}
                                                        className="w-100 h-auto cursor-pointer card-image"
                                                    />
                                                </div>
                                                {/* card body */}
                                                <div className='card-body'>
                                                    <div className='card-name'>{record.item}</div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </nav>                
            </div>

            {/* render sidepane when card is clicked */}
            {sidepane && (
                <SidePane recordData={selectedRecord} 
                onOpenFull={(id) => navigate(`/window/details/${id}`)}
                onClose={() => {setSidePane(false); setSelectedRecord(null)}} 
                />
            )}
        </div>
    )
}

