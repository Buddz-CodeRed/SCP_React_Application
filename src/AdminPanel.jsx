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

    
}