import Layout from "../components/Layout"
import { API_URL } from "../config"

import EventItem from "../components/EventItem";
import Link from "next/link";

export default function HomePage({events}) {
  console.log(events.data);
  
  return (
    <Layout>
      <h1>Upcoming Events </h1>
      {events.data.length === 0 && <h3>No events to show!</h3>}
      {events.data.map(event=>(
        <EventItem key={event.id} event={event} />
      ))}

      { events.data.length > 0 && <Link href='/events'><a className="btn-secondary">All Events</a></Link>} 
    </Layout>
  )
}



//export async function getServerSideProps(){
export async function getStaticProps(){
  const res= await fetch(`${API_URL}/api/events?populate=%2A`)
  const events = await res.json()
  //console.log(events)
  return {
    props:{
      events
    },
    revalidate:1
  }
}