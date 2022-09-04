import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { API_URL } from '../config'

import styles from '../styles/EventItem.module.css'

const EventItem = ({event}) => {
    const eventImage = event.attributes.Image.data.attributes.formats.thumbnail.url
    //console.log("Event: ", event);
    //console.log("Event Image: ", eventImage);
    
  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image src={eventImage ? `${API_URL}${eventImage}` : '/images/event-default.png' } width={170} height={100}  />
        </div>

        <div className={styles.info}>
            <span>{new Date (event.attributes.Date).toLocaleDateString('en-US')} at {event.attributes.Time}</span>
            <h3>{event.attributes.Name}</h3>
        </div>

        <div className={styles.link}>
            <Link href={`/events/${event.attributes.Slug}`}>
                <a className='btn'>Show Details</a>
            </Link>
        </div>


    </div>
  )
}

export default EventItem