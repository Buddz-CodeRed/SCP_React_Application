import {useEffect, useState} from 'react' // useEffect: fetching data | useState: storing data
import {supabase} from './supabase' // connects to database

export default function AdminPanel(){

    
    const [records, setRecords] = useState([]) // set component state to store all records fetcher from db; starts in an empty state
    const [editRecords, setEditRecords] = useState(null) // set component state to hold current record being edited; starts in an empty state
    const [imageFile, setImageFile] = useState(null)
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

        // upload image to supabase bucket
        let fileName = null

        if(imageFile) {
            const fileExt = imageFile.name.split('.').pop()
            fileName = `${crypto.randomUUID()}.${fileExt}`

            const {error: uploadError} = await supabase.storage.from('image').upload(fileName, imageFile) // CHECK THIS CODE <LINE>

            if (uploadError) {
                console.error(uploadError)
                return
            }
        }
        const { id, ...cleanRecord } = newRecord;

        const { data, error } = await supabase
            .from('scp_data')
            .insert([{ ...cleanRecord, image: fileName }])
            .select();
        if (error)
        {
            console.error(error)
        }
        else
        {
            setRecords([...records, ...data])// adds new records to existing list
            setNewRecord({item: '', object_class: '', containment_procedure: '', description: '', image: ''}) // Resets form back to empty strings
            setImageFile(null)
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
        <div className='admin-container'>
            <h1>Admin Panel</h1>
            <ul>
                {
                    records.map((record) => (
                            <li key={record.id}>
                                {
                                    editRecords && editRecords.id === record.id ? (
                                        <div>
                                            <input value={editRecords.item} onChange={(e)=>setEditRecords({...editRecords, item: e.target.value})}/>
                                            <input value={editRecords.object_class} onChange={(e)=>setEditRecords({...editRecords, object_class: e.target.value})}/>
                                            <input value={editRecords.containment_procedure} onChange={(e)=>setEditRecords({...editRecords, containment_procedure: e.target.value})}/>
                                            <input value={editRecords.description} onChange={(e)=>setEditRecords({...editRecords, description: e.target.value})}/>
                                            <button onClick={()=>saveEdit(record.id)}>Save</button>
                                            <button onClick={()=>setEditRecords(null)}>Cancel</button>
                                        </div>
                                    ):(
                                        <div>
                                            <p>{record.item}</p>

                                            {/* {record.image && (
                                                <img
                                                    src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`}
                                                    alt={record.item}
                                                    width="100"
                                                />
                                            )} */}

                                            <button onClick={()=>startEditing(record)}>Edit</button>
                                            <button onClick={()=>deleteRecord(record.id)}>Delete</button>
                                        </div>
                                    )
                                }
                            </li>
                        )
                    )
                }
            </ul>

            <h2>Add New Record</h2>

            <input value={newRecord.item} onChange={(e)=>setNewRecord({...newRecord, item: e.target.value})} placeholder='Item'/>
            <input value={newRecord.object_class} onChange={(e)=>setNewRecord({...newRecord, object_class: e.target.value})} placeholder='Object Class'/>
            <input value={newRecord.containment_procedure} onChange={(e)=>setNewRecord({...newRecord, containment_procedure: e.target.value})} placeholder='Containment Procedure'/>
            <input value={newRecord.description} onChange={(e)=>setNewRecord({...newRecord, description: e.target.value})} placeholder='Description'/>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])}/>
            <button onClick={addRecord}>Add Record</button>
        </div>
    )
}