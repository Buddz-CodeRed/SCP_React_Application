import {useEffect, useState} from 'react' // useEffect: fetching data | useState: storing data
import {Link} from 'react-router-dom' // navigate through links with out full page reloads
import {supabase} from './supabase' // connects to database

export default function CardMenu() {

    // Store list of records starting at an empty (array) state !!!
    // Replace empty array with fetched data when function is called
    const [records, setRecord] = useState([])

    useEffect(
        () => {
            // define async function
            const fetchRecords = async () => {
                // query db only selecting the id and item and store in 'data' variable
                // waits for process to complete before continuing
                const {data, error} = await supabase.from('scp_data').select('id, item, image') 
                if (error)
                {
                    console.error(error) // display error
                }
                else
                {
                    // update records state with array of records; triggers component to re-render
                    setRecord(data)
                }
            }
            // calls async function
            fetchRecords()
        }, []
    )

    return(
        <div className='card-container'>
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
                                        {/* creates a link to each record using record item value */}
                                        <Link to={`/window/details/${record.id}`} className='card-link'>
                                            <div className='card-wrap'>
                                                <img
                                                    src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${record.image}`}
                                                    alt={record.item}
                                                    className="w-100 h-auto cursor-pointer card-image"
                                                />
                                            </div>
                                            {/* card name */}
                                            <div className='card-body'>
                                                <div className='card-name'>{record.item}</div>
                                            </div>
                                        </Link>                                        
                                    </li>                                    
                                )
                            )
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

