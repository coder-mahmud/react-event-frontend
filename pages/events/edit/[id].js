
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import { API_URL } from '../../../config/index'
import styles from '../../../styles/AddForm.module.css'
import moment from 'moment'
import Image from 'next/image'
import {FaImage} from 'react-icons/fa'
import Modal from '../../../components/Modal'
import ImageUpload from '../../../components/ImageUpload'


export default function EditEventPage({ event }) {
  console.log("From component:", event);
  console.log("Component Ran!");
  
  
  const [values, setValues] = useState({
    Name: event.data.attributes.Name,
    Performers: event.data.attributes.Performers,
    Venue: event.data.attributes.Venue,
    Address: event.data.attributes.Address,
    Date: event.data.attributes.Date,
    Time: event.data.attributes.Time,
    Description: event.data.attributes.Description,
  })

  let imageUrl = event.data.attributes.Image.data ? event.data.attributes.Image.data.attributes.formats.thumbnail.url : null
  //console.log("Image", imageUrl);
  
  let eventImageId = event.data.attributes.Image.data ? event.data.attributes.Image.data.id : null
  console.log("Image ID:", eventImageId);
  
  const [imagePreview, setImagePreview] = useState(imageUrl)

  const [showModal, setShowModal ] = useState(false)

  const [imageId, setImageId] = useState(eventImageId);


  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    //console.log(values);
    // console.log(API_URL);

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    // if (hasEmptyFields) {
    //   toast.error('Please fill in all fields')
    // }

    const res = await fetch(`${API_URL}/api/events/${event.data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({data:values}),
    })

    
    

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included')
        return
      }
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      console.log("From handle submit:", evt);
      
      router.push(`/events/${evt.data.attributes.Slug}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    //console.log(name, value)
    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async ()=>{
    //console.log("Uploaded");
    const newRes = await fetch(`${API_URL}/api/events/${event.data.id}?populate=*`)
    const newEvent = await newRes.json();
    console.log("From imageUploaded Event:", newEvent);
    const eventImage = `${newEvent.data.attributes.Image.data.attributes.formats.thumbnail.url}`;

    console.log("From image Uploaded imagePreview:", eventImage);
    setImagePreview(eventImage)
    
    setShowModal(false)
    //console.log("ImagePreview form imageUploaded:", imagePreview);
    
    
  }

  const deleteImage = async () =>{
    if(confirm("Are you sure to delete this image?")){
        const res = await fetch(`${API_URL}/api/upload/files/${imageId}`,{
          method:'DELETE'
        });
        console.log(res);
        setImagePreview(null)

        return setImageId(null)

      }
  }



  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='Name'
              value={values.Name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='Performers'
              id='Performers'
              value={values.Performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='Venue'
              id='Venue'
              value={values.Venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='Address'
              id='Address'
              value={values.Address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='Date'
              id='Date'
              value={moment(values.Date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='Time'
              id='Time'
              value={values.Time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='Description'
            id='Description'
            value={values.Description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Edit Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={`${API_URL}${imagePreview}`} height={100} width={170} />
      ) :
        <p>No Image for this event!</p>
      }

      <div>
        { !imagePreview && (<button className="btn-secondary" onClick={()=> setShowModal(true)}><FaImage />  Add Image</button>)}
        { imagePreview && (<button className="btn-secondary" onClick={deleteImage}><FaImage />  Delete Image</button>)}
      </div>


      <Modal show={showModal} onClose={()=> setShowModal(false)} ><ImageUpload evtId={event.id} imageUploaded={imageUploaded}/> </Modal>




    </Layout>
  )
}

export async function getServerSideProps({params:{id}}) {

    //console.log("From server:", id);
    const eventData = await fetch (`${API_URL}/api/events/${id}?populate=*`);
    const  event = await eventData.json();
    console.log("From server:", event);
    

  return {
    props: {
      event
    },
  }
}