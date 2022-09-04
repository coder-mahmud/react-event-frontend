import qs from 'qs'
import { API_URL } from '../config'
import React from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/SearchForm.module.css'
import { useRef, useState } from 'react'
import Link from 'next/link'




const SearchFrom = () => {
    const router = useRouter();
    const searchInputRef = useRef();
    const [events, setEvents] = useState([]);


    
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        const searchTerm = searchInputRef.current.value;
        //console.log(searchTerm);
        router.push(`/events/search?term=${searchTerm}`)

        searchInputRef.current.value="";

    }

    const searchInputChanged = (e)=>{
			//console.log(e.target.value);
			setEvents([]);
			const searchTerm = e.target.value;

			const callSearch = async() => {

				const qsQuery = qs.stringify({
						filters: {
							$or: [
								{
									name: {
										$contains: searchTerm,
									},
								},
								{
									description: {
										$contains: searchTerm,
									},
								},
								{
									venue: {
										$contains: searchTerm,
									},
								},
								{
									performers: {
										$contains: searchTerm,
									},
								},
							]
						},
					}, {
						encodeValuesOnly: true, // prettify URL
				});
	
    
    
				const res= await fetch(`${API_URL}/api/events?${qsQuery}&populate=%2A`)
				const events = await res.json();
				console.log("from input change ", events);
				setEvents(events);


      }

			searchTerm.length > 0 ? callSearch() : '';

			

    }
		// console.log("From main component", events);
		// if(events.data){
		// 	events.data.map(event => (
		// 		console.log(event.id)
				
		// 	))
		// }

		const linkClickHandler = ()=>{
			searchInputRef.current.value='';
			setEvents([])
		}
		
		

  return (
    <div>
        <form className={styles.form} onSubmit={searchSubmitHandler}>
            <input type="text" onChange={searchInputChanged} ref={searchInputRef}/>
						{events.data && 
            <div id='sugg_div' className={styles.suggestion_holder}>
							{
								events.data &&
									events.data.map(event => (
										//console.log(event.id)
										<h1 key={event.id} onClick={linkClickHandler}>{<Link href={`/events/${event.attributes.Slug}`}><a>{event.attributes.Name}</a></Link>}</h1>
										
									))
								

							}
							{/* <h1>Hello!</h1>
							<h1>Hello!</h1>
							<h1>Hello!</h1>
							<h1>Hello!</h1> */}
						</div>}
            <button>Submit</button>
        </form>
    </div>
  )
}

export default SearchFrom