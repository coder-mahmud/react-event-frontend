import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/Event.module.css'
import Link from 'next/link';
import Image from 'next/image';
import {FaPencilAlt, FaTimes } from 'react-icons/fa'

const EventPage = ({event}) => {
    const router = useRouter();
    console.log('From event component:',event);
    const deleteEvent =() =>{
      console.log('Delete');
      
    }
    //console.log("Image Url:", event.data.attributes.Image.data.attributes.formats.medium.url);
    
  
    const imgSrc = `http://localhost:1337${event.data.attributes.Image.data.attributes.formats.large.url}`
    console.log("Image Url:", imgSrc);
    
  return (
    <Layout>
      <h1>{event.data.attributes.Name}</h1>
        
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${event.id}`}>
              <a><FaPencilAlt />Edit Event</a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes /> Delete Event</a>
          </div>
          <span>

            
            {new Date (event.data.attributes.Date).toLocaleDateString('en-US')} at {event.data.attributes.Time}
          </span>
          <h1>{event.data.attributes.name}</h1>
          {event.data.attributes.Image && (
            
            <div className={styles.image}>
              {/* <Image src={`http://localhost:1337/$`} width={960} height={600} /> */}
              <Image src= {imgSrc} width={960} height={600} />
            </div>
          )}

          <h3>Performers:</h3>
          <p>{event.data.attributes.Performers}</p>
          <h3>Description:</h3>
          <p>{event.data.attributes.Description}</p>
          <h3>Venue: {event.data.attributes.Venue}</h3>
          <p>{event.data.attributes.Address}</p>

          <Link href="/events"><a className={styles.back}>Go Back</a></Link>

        </div>

    </Layout>
  )
}

export default EventPage


export async function getStaticPaths(){
  const res = await fetch(`${API_URL}/api/events/`)
  const events = await res.json()
  //console.log("from get static paths function:", events);
  

  const paths = events.data.map(evt =>(
    {params: {slug:evt.attributes.Slug }}
  ))

  return{
    paths,
    fallback: true
  }
}

 export async function getStaticProps({params:{slug}}){

  //console.log("slug from getStaticProps:", slug);
  const res = await fetch(`${API_URL}/api/event/${slug}?populate=*`)
  const event = await res.json();
  //console.log("getStaticProps Event:", event );
  

  return {
    
    props:{
      // event: events.data[0]
      event
    },
    revalidate: 1
  }
}



// export async function getServerSideProps({query:{slug}}){

//   //console.log(slug);
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json();


//   return {
    
//     props:{
//       event: events[0]
//     }
//   }
// }
