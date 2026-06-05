import { useEffect, useState } from 'react'// useEffect: fetching data | useState: storing data
import { supabase } from './supabase' // connects to database
import { useParams } from 'react-router-dom' // captures dynamic value from URL in BrowserRouter
import './assets/RecordDetails.css'
import { useNavigate } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'

export default function RecordDetails() {

    const { id } = useParams() // extracts the 'id' value from current URL
    const [recordData, setRecordData] = useState(null) // (HooK) stores the currently selected scp record
    const navigate = useNavigate(); // navigates between records via navigation buttons
    const [totalItems, setTotalItems] = useState([]) // stores record IDs to support navigation buttons
    const [loading, setLoading] = useState(true); // loading spinner is active untill data is fetched

    // after inital render from root -> useEffect triggers side affect that runs the function -> data is stored in the useState -> state change triggers a re-render
    
    useEffect(() => {
        const getCount = async () => { // (side affect)
            const { data } = await supabase.from('scp_data').select('id').order('item', { ascending: true }) // query db to select id matching all items the are in ascending order
            setTotalItems(data || []) // passes data to update useState, if data is missing pass empty array
        }
        getCount() // calls function
    }, [id]) // tracks current id when changed

    useEffect(
        () => {
            const fetchRecordDetails = async () => {                
                const { data, error } = await supabase.from('scp_data').select('*').eq('id', id).maybeSingle() // query db selecting all records with a matching id, and return a single object
                if (error) {
                    console.error(error) // log error to the console
                }
                else {                    
                    setRecordData(data) // pass data to update useState
                }
            }
            fetchRecordDetails()// call function
        }, [id] // tracks current id when changed
    )

    const currentIdx = totalItems.findIndex(r => String(r.id) === String(id)) // finds index position of id's in the ordered list (maps the list to find the start and end; assisting with the navigation buttons)

    return (

        // main section

        <div className='detail-container'>
            {
                recordData ? ( // if...else (ternary operator)
                    <div className='detail-content-wrapper'>

                        <div className="header">
                            <div className='heading'>{recordData.item}</div>
                            <div className='sub-header'>{recordData.name}</div>
                        </div>

                        <div className='detail-header'>
                            <div className="detail-section">
                                <div className="detail-section-title">Description</div>
                                <p className="detail-section-text">
                                    {recordData.description}
                                </p>
                            </div>
                            <div className="detail-image">
                                <img className="item-img" src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${recordData.image}`} className='detail-image' alt="SCP Image" />
                            </div>
                            {/* meta data */}
                            <div className="detail-meta">
                                <div className="detail-meta-row">
                                    <span className="detail-key">ITEM#:</span>
                                    <span className="detail-value">{recordData.item}</span>
                                </div>
                                <div className="detail-meta-row">
                                    <span className="detail-key">NAME:</span>
                                    <span className="detail-value">{recordData.name}</span>
                                </div>
                                <div className="detail-meta-row">
                                    <span className="detail-key">OBJECT CLASS:</span>
                                    <span className="detail-value ob_class">{recordData.object_class}</span>
                                </div>
                                <div className="detail-meta-row">
                                    <span className="detail-key">RATING:</span>
                                    <span className="detail-value rating">+{recordData.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-contain">
                            <div className="detail-section-title">Containment</div>
                            <p className="detail-section-text">
                                {recordData.containment_procedure}
                            </p>
                        </div>

                        {/* Navigation buttons */}

                        <div className='skip-btn'>
                            <span>
                                <button onClick={() => navigate(`/window/details/${totalItems[currentIdx - 1].id}`)}
                                    className='skip-btn-check'
                                    disabled={currentIdx <= 0}>Back</button> {/* disables when the start is reached */}
                            </span>
                            <span>
                                <button onClick={() => navigate(`/window/details/${totalItems[currentIdx + 1].id}`)}
                                    className='skip-btn-check'
                                    disabled={currentIdx >= totalItems.length - 1 || currentIdx === -1}>Next</button> {/* disables when the end is reached */}
                            </span>
                        </div>
                    </div>
                ) : (

                    // loading spinner

                    <div className='loader'>
                        <RingLoader color="#d53535" cssOverride={{display: "block"}} size={80}/>
                        Loading...
                    </div>
                )
            }
        </div>
    )

}