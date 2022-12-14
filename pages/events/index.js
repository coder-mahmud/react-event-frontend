import Layout from "../../components/Layout";
import { API_URL } from "../../config"

import EventItem from "../../components/EventItem";

export default function EventsPage({events}) {
  console.log(events);
  
  return (
    <Layout>
      <h1>Events </h1>
      {events.length === 0 && <h3>No events to show!</h3>}
      {events.data.map(event=>(
        <EventItem key={event.id} event={event} />
      ))}
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