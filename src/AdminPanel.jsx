import {useEffect, useState} from 'react' // useEffect: fetching data | useState: storing data
import {supabase} from './supabase' // connects to database

export default function AdminPanel(){

    
    const [records, setRecords] = useState([]) // set component state to store all records fetcher from db; starts in an empty state
    const [editRecords, setEditRecords] = useState(null) // set component state to hold current record being edited; starts in an empty state
    const [newRecord, setNewRecord] = useState( // set component state to hold values typed into the Add new record form: starts with empty strings for each field
        {
            item: '',
            object_class: '',
            containment_procedure: '',
            description: '',
            image: ''
        }
    )

    useEffect(
        () => {
            // Define async function
            const fetchRecords = async () => {
                // Query database fetching all records
                const {data, error} = await supabase.from('scp_data').select('*')
                if(error)
                {
                    console.error(error)
                }
                else
                {   // saves fetched data to state
                    setRecords(data)
                }
            }
            // calls function
            fetchRecords()
        },[] // only allows runs useEffect once every instance the current component is mounted
    )

    // Create aysnc function to INSRET a new record into the database
    const addRecord = async () => {
        // runs insert query
        const {data, error} = await supabase.from('scp_data').insert([newRecord]).select().single()
        if (error)
        {
            console.error(error)
        }
        else
        {
            setModels([...records, data])// adds new records to existing list
            setNewRecord({item: '', object_class: '', containment_procedure: '', description: '', image: ''}) // Resets form back to empty strings
        }
    }

    // Create async function to delete from the database via id
    const deleteRecord = async (id) => {
        const {error} = await supabase.from('scp_data').delete().eq('id', id)
        if(error) 
        {
            console.error(error)
        }
        else
        {
            // filters out the deleted record from state
            setRecords(records.filter((record) => record.id !== id))
        }
    }

    // Create Edit functionality

    // Create function to prepare a record for editing when a user clicks the edit button
    const startEditing = (records) => {
        // Saves the full record into editRecord state; triggers edit inputs to display for the current record
        setEditRecords(records)
    }

    // Create async function to save updated record
    const saveEdit = async (id) => {
        const {error} = await supabase.from('scp_data').update(editRecords).eq('id', id)
        if(error)
        {
            console.error(error)
        }
        else
        {
            // update old state record with the update record
            setRecords(records.map((record) => record.id === id ? editRecords : record))
            // Clears editRecord state
            setEditRecords(null)
        }
    }

    return(
        <div>
            <h1>Admin Panel</h1>
            <ul>
                {
                    records.map(
                        (record) => {
                            <li key={record.id}>
                                {
                                    editRecords && editRecords.id == record.id ? (
                                        <div>
                                            <input value={editRecords.item} onChange={(e)=>setEditRecords({...editRecords, item: e.target.value})}/>
                                            <input value={editRecords.object_class} onChange={(e)=>setEditRecords({...editRecords, object_class: e.target.value})}/>
                                            <input value={editRecords.containment_procedure} onChange={(e)=>setEditRecords({...editRecords, containment_procedure: e.target.value})}/>
                                            <input value={editRecords.description} onChange={(e)=>setEditRecords({...editRecords, description: e.target.value})}/>
                                            <input value={editRecords.image} onChange={(e)=>setEditRecords({...editRecords, image: e.target.value})}/>
                                            <button onClick={()=>saveEdit}>Save</button>
                                            <button onClick={()=>setEditRecords(null)}>Cancel</button>
                                        </div>
                                    ):(
                                        <div>
                                            <p>{record.item}</p>
                                            <button onClick={()=>startEditing(record)}>Edit</button>
                                            <button onClick={()=>deleteRecord(record.id)}>Delete</button>
                                        </div>
                                    )
                                }
                            </li>
                        }
                    )
                }
            </ul>
        </div>
    )
}