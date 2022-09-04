import qs from 'qs';
import Layout from "../../components/Layout";
import { API_URL } from "../../config"
import EventItem from "../../components/EventItem";
import { useRouter } from 'next/router';

export default function SearchPage({events}) {
  //console.log('From search page:', events);

  const router = useRouter();
  console.log("Router", router);
  
  
  return (
    <Layout>
      <h1>Search Result for {router.query.term}</h1>
      {events.data.length === 0 && <h3>No events to show!</h3>}
      {events.data.map(event=>(
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  )
}



// Normal Query with direct url
// export async function getServerSideProps(){
//   const res= await fetch(`${API_URL}/api/events?filters[$or][0][name][$contains]=throwback&filters[$or][1][description][$contains]=looking&populate=%2A`)
//   const events = await res.json()
//   console.log(events)
//   return {
//     props:{
//       events
//     },
//   }
// }



// qs Query
export async function getServerSideProps({query:{term}}){
    //console.log('Query Term',term)

    const qsQuery = qs.stringify({
        filters: {
          $or: [
            {
              name: {
                $contains: term,
              },
            },
            {
              description: {
                $contains: term,
              },
            },
            {
              venue: {
                $contains: term,
              },
            },
            {
              performers: {
                $contains: term,
              },
            },
          ]
        },
      }, {
        encodeValuesOnly: true, // prettify URL
      });



  const res= await fetch(`${API_URL}/api/events?${qsQuery}&populate=%2A`)
  const events = await res.json()
  //console.log(events)
  return {
    props:{
      events
    },
  }
}