import {useEffect, useState} from 'react' // useEffect: fetching data | useState: storing data
import {supabase} from './supabase' // connects to database
import NavMenu from './NavMenu'
import './assets/AdminPanel.css'
import { v4 as uuidv4 } from 'uuid';

export default function AdminPanel({ viewMode }){

    const [records, setRecords] = useState([]) // set component state to store all records fetcher from db; starts in an empty state
    const [editRecords, setEditRecords] = useState(null) // set component state to hold current record being edited; starts in an empty state
    const [imageFile, setImageFile] = useState(null)
    const [newRecord, setNewRecord] = useState( // set component state to hold values typed into the Add new record form: starts with empty strings for each field
        {
            item: '',
            name: '',
            object_class: '',
            rating: '',
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
        const newId = uuidv4();    
        let fileName = null

        if(imageFile) {
            const fileExt = imageFile.name.split('.').pop() // stores the extension of the file to a variable
            fileName = `${uuidv4()}.${fileExt}` 

            const {error: uploadError} = await supabase.storage.from('image').upload(fileName, imageFile)

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
            setNewRecord({item: '', name: '', object_class: '', rating: '', containment_procedure: '', description: '', image: ''})
            setImageFile(null) // Resets form back to empty strings
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

            <div className='header'>
                <h1 className='title'>Admin Panel</h1>
                <h3 className='sub-title'>Level 4 Clearance</h3>
            </div>
            
            
            {viewMode === 'add' && (
                <div>
                    <div className="add-record">
                        <h2 className='mode'>Add New Record</h2>
                        <input className='ar-mode' value={newRecord.item} onChange={(e)=>setNewRecord({...newRecord, item: e.target.value})} placeholder='Item'/>
                        <input className='ar-mode' value={newRecord.name} onChange={(e)=>setNewRecord({...newRecord, name: e.target.value})} placeholder='Name'/>
                        <input className='ar-mode' value={newRecord.object_class} onChange={(e)=>setNewRecord({...newRecord, object_class: e.target.value})} placeholder='Object Class'/>
                        <input className='ar-mode' value={newRecord.rating} onChange={(e)=>setNewRecord({...newRecord, rating: e.target.value})} placeholder='Rating'/>
                        <input className='ar-mode' value={newRecord.containment_procedure} onChange={(e)=>setNewRecord({...newRecord, containment_procedure: e.target.value})} placeholder='Containment Procedure'/>
                        <input className='ar-mode' value={newRecord.description} onChange={(e)=>setNewRecord({...newRecord, description: e.target.value})} placeholder='Description'/>
                        <input className='ar-mode' type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} placeholder='{value.toString("Image)'/>
                    </div>
                    <div className="btn">
                        <button className='add-btn alert-success' onClick={addRecord}>Add Record</button>
                    </div>
                </div>
            )}
            
            {viewMode === 'edit' && (
                
                <ul className='record-list-container'>
                    <div className='mode'>Edit Record Panel</div>
                    {
                        records.map((record) => (
                                <li key={record.id}>
                                    {
                                        editRecords && editRecords.id === record.id ? (
                                            <div className='edit-record'>
                                                <img src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`} alt={record.item} width="100"/>
                                                <input value={editRecords.item} onChange={(e)=>setEditRecords({...editRecords, item: e.target.value})} placeholder='Item'/>
                                                <input value={editRecords.name} onChange={(e)=>setEditRecords({...editRecords, name: e.target.value})} placeholder='Name'/>
                                                <input value={editRecords.object_class} onChange={(e)=>setEditRecords({...editRecords, object_class: e.target.value})} placeholder='Object Class'/>
                                                <input value={editRecords.rating} onChange={(e)=>setEditRecords({...editRecords, rating: e.target.value})} placeholder='Rating'/>
                                                <input value={editRecords.containment_procedure} onChange={(e)=>setEditRecords({...editRecords, containment_procedure: e.target.value})} placeholder='Containment Procedure'/>
                                                <input value={editRecords.description} onChange={(e)=>setEditRecords({...editRecords, description: e.target.value})} placeholder='Description'/>
                                                <input className='ar-mode' type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} placeholder='{value.toString("Image)'/>
                                                <div className='edit-btns'>
                                                    <span><button onClick={()=>saveEdit(record.id)} className='alert-success'>Save</button></span>
                                                    <span><button onClick={()=>setEditRecords(null)}>Cancel</button></span>
                                                </div>
                                            </div>
                                        ):(
                                            <div className='table-wrapper'>
                                                <button className='add-btn'onClick={()=>startEditing(record)}><div className="table-list"> 
                                                    {record.image && (
                                                        <img
                                                            src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`}
                                                            alt={record.item}
                                                            width="100"
                                                        />
                                                    )}
                                                    <p className='tag'>{record.item}</p>  
                                                    <p className='classLevel'>{record.object_class}</p>
                                                </div></button>
                                            </div>                                
                                        )
                                    }
                                </li>
                            )
                        )
                    }
                </ul>
            )}

            {viewMode === 'delete' && (
                
                <ul className='record-list-container'>
                    <div className='mode'>Delete Record Panel</div>
                    {
                        records.map((record) => (
                                <li key={record.id}>
                                    {
                                        deleteRecord && deleteRecord.id === record.id ? (
                                            <div className='del-record'>
                                                <img src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`} alt={record.item} width="100"/>
                                                <input value={editRecords.item} onChange={(e)=>setEditRecords({...editRecords, item: e.target.value})}/>
                                                <input value={editRecords.object_class} onChange={(e)=>setEditRecords({...editRecords, object_class: e.target.value})}/>
                                                <input value={editRecords.containment_procedure} onChange={(e)=>setEditRecords({...editRecords, containment_procedure: e.target.value})}/>
                                                <input value={editRecords.description} onChange={(e)=>setEditRecords({...editRecords, description: e.target.value})}/>
                                            </div>
                                        ):(
                                            <div className='table-wrapper'>
                                                <button className='add-btn'onClick={()=>deleteRecord(record.id)}><div className="table-list"> 
                                                    <p className='tag'>{record.item}</p>  
                                                    <p className='classLevel'>{record.name}</p>
                                                    
                                                    {record.image && (
                                                        <img
                                                            src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`}
                                                            alt={record.item}
                                                            width="100"
                                                        />
                                                    )}
                                                </div></button>
                                            </div>                                
                                        )
                                    }
                                </li>
                            )
                        )
                    }
                </ul>
            )}           
        </div>
    )
}