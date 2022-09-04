import React from 'react'
import { useRouter } from 'next/router'
//import styles from '../styles/SearchForm.module.css'
import { useRef } from 'react'




const SearchFrom = () => {
    const router = useRouter();
    const searchInputRef = useRef();


    
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        const searchTerm = searchInputRef.current.value;
        //console.log(searchTerm);
        router.push(`/events/search?term=${searchTerm}`)

        searchInputRef.current.value="";

    }


  return (
    <div>
        <form onSubmit={searchSubmitHandler}>
            <input type="text" ref={searchInputRef} />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default SearchFrom