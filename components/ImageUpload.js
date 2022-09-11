import React from 'react'
import { useState } from 'react'
import { API_URL } from '../config/index'
import styles from '../styles/Form.module.css'






const ImageUpload = ({evtId, imageUploaded}) => {
  //const [image, setImage] = useState(null);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'post',
      body: new FormData(e.target)
    });

    const data = await res.json();

    if(res.ok){
      console.log("Uploaded");
      
      imageUploaded()
    }
    if(!res.ok){
      console.log(res);
      
    }




  }
  
  const handleFileChange = (e) =>{
    //setImage(e.target.files[0]);
    
  }


  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="files" />
        <input type="hidden" name="ref" value="api::event.event" />
        <input type="hidden" name="refId" value="18" />
        <input type="hidden" name="field" value="Image" />
        <input type="submit" value="Submit" />
     
      </form>
    </div>
  )
}

export default ImageUpload