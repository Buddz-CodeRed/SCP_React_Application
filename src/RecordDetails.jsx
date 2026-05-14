import { useEffect, useState } from 'react'// useEffect: fetching data | useState: storing data
import { supabase } from './supabase' // connects to database
import { useParams } from 'react-router' // captures dynamic value from URL in BrowserRouter

export default function RecordDetails() {

    const { id } = useParams() // extracts the 'id' value from current URL
    const [recordData, setRecordData] = useState(null) // creates a state variable 'recordData' to store fetched record, starts as null

    useEffect(
        // creates a function to call later
        () => {
            // defines async function 
            const fetchRecordDetails = async () => {
                // query db selecting all records with a matching id, and return a single object
                const { data, error } = await supabase.from('scp_data').select('*').eq('id', id).maybeSingle()
                if (error) {
                    // log error to the console
                    console.error(error)
                }
                else {
                    // save the fetched record into state; triggers component to re-render
                    setRecordData(data)
                }
            }
            // call function
            fetchRecordDetails()
        }, [id]
    )

    return (
        <div className='detail-container'>
            {
                recordData ? (
                    <div className='detail-content-wrapper'>
                        {/* header */}
                        <div className='detail-header'>
                            <div className='detail-item'>{recordData.item}</div>
                        </div>
                        <img src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${recordData.image}`} className='detail-image' alt="SCP Image" />

                        {/* meta data */}
                        <div className="detail-meta">
                            <div className="detail-meta-row">
                                <span className="detail-key">ITEM#:</span>
                                <span className="detail-value">{recordData.item}</span>
                            </div>
                            <div className="detail-meta-row">
                                <span className="detail-key">OBJECT CLASS:</span>
                                <span className="detail-value ob_class">{recordData.object_class}</span>
                            </div>

                        </div>

                        {/* description */}
                        <div className="detail-section">
                            <div className="detail-section-title">Description</div>
                            <p className="detail-section-text">
                                {recordData.description}
                            </p>
                        </div>

                        <div className="detail-section">
                            <div className="detail-section-title">Containment</div>
                            <p className="detail-section-text">
                                {recordData.containment_procedure}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="detail-actions">
                            <button className="btn-favorite">★ Favorite</button>
                            <button className="btn-view-file">⊞ View Full File</button>
                        </div>

                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )

}