import {useEffect, useState} from 'react'// useEffect: fetching data | useState: storing data
import {supabase} from './supabase' // connects to database
import {useParams} from 'react-router' // captures dynamic value from URL in BrowserRouter

export default function RecordDetails() {

    const{id} = useParams() // extracts the 'id' value from current URL
    const {recordData, setRecordData} = useState(null) // creates a state variable 'recordData' to store fetched record, starts as null

    useEffect(
        // creates a function to call later
        () => {
            // defines async function 
            const fetchRecordDetails = async () =>
            {
                // query db selecting all records with a matching id, and return a single object
                const {data, error} = await supabase.from('scp_data').select('*').eq('id', id).single()
                if(error)
                {
                    // log error to the console
                    console.error(error)
                }
                else
                {   
                    // save the fetched record into state; triggers component to re-render
                    setRecordData(data)
                }
            }
            // call function
            fetchRecordDetails()
        }, [id]
    )

    return(
        <div>
            {
                recordData ? (
                    <div>
                        <h1>Item</h1>
                        <h2>{recordData.item}</h2>
                        <h1>Object Class</h1>
                        <h2>{recordData.object_class}</h2>
                        <h3>Description</h3>
                        <p>{recordData.description}</p>
                        <h3>Contain Procedure</h3>
                        <p>{recordData.containment_procedure}</p>
                        <img src={recordData.image} alt="SCP Image" />                        
                    </div>
                ):(
                    <p>Loading...</p>
                )
            }
        </div>
    )

}