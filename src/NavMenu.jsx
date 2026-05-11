import {useEffect, useState} from 'react' // useEffect: fetching data | useState: storing data
import {Link} from 'react-router-dom' // navigate through links with out full page reloads
import {supabase} from './supabase' // connects to database

export default function NavMenu() {

    // Store list of records starting at an empty (array) state !!!
    // Replace empty array with fetched data when function is called
    const [records, setRecord] = useState([])

    useEffect(
        () => {
            // define async function
            const fetchRecords = async () => {
                // query db only selecting the id and item and store in 'data' variable
                // waits for process to complete before continuing
                const {data, error} = await supabase.from('scp_data').select('id', 'item') 
                if (error)
                {
                    console.error(error) // display error
                }
                else
                {
                    // update records state with array of records; triggers re-render
                    setRecord(data)
                }
            }
            fetchRecords()
        }, []
    )

}

