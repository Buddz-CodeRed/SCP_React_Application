import { useEffect, useState } from 'react' // useEffect: fetching data | useState: storing data
import { Link } from 'react-router-dom' // navigate through links with out full page reloads
import { supabase } from './supabase' // connects to database
import SidePane from './SidePane'
import { useNavigate } from 'react-router-dom'
import './assets/CardMenu.css'
import { RingLoader } from 'react-spinners'

export default function CardMenu() {

    const [records, setRecord] = useState([])
    const [sidepane, setSidePane] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()    

    // fetches all record data from database; stores in state as an array in ascending order by item
    useEffect(
        () => {
            const fetchRecords = async () => {
                const { data, error } = await supabase.from('scp_data').select('id, item, name, rating, image, object_class, description').order('item', { ascending: true })
                if (error) {
                    console.error(error) // display error id console
                }
                else {
                    setRecord(data) // stores data in state
                    setLoading(false) // hides spinner once data is loaded
                }
            }
            fetchRecords()
        }, []
    )

    return (
        <div className='card-container'>
            {loading && ( // activate if true, deactivate if false; depending on render status
                <div className='loader'>
                    <RingLoader color="#d53535" size={80} />
                    Loading
                </div>
            )}
            <div className={`card-scroll ${sidepane ? 'pushed' : ''}`}> {/* adjusts page layout when sidepane is active */}
                <nav>
                    <div className='container-fluid p-3'>
                        <ul className='card-list'>
                            { 
                                records.map( // maps through the records array
                                    (record) => ( // render each element as a list item
                                        <li key={record.id} className='card-item'> {/* identify each element via record id */}
                                            <div className='card-link' onClick={() => { setSelectedRecord(record); setSidePane(true); }}> {/* when click side pane state is set to true */}
                                                
                                                {/* SidePane Body */}
                                                <div className='card-wrap'>
                                                    <img
                                                        src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`}
                                                        alt={record.item}
                                                        className="w-100 h-auto cursor-pointer card-image"
                                                    />
                                                </div>
                                                {/* card body */}
                                                <div className='card-body'>
                                                    <div className='card-name'>{record.name}</div>
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

