
import { contentStore } from '../../store/store';
import { useState } from 'react'
import React from 'react';
const DeleteContentPage = () => {
    const [id, setID] = useState('');
    const {deleteContent} = contentStore();


    const handleClick = async () =>{
        const {message, success} = await deleteContent(id);
        if(success){
            console.log("Content Deleted Successfully: ", message)
        }else{
            console.log("Failed to delete ", message)
        }

        setID('');

    };

  return ( 
    <>
        <form>
            <input 
            type='text'
            placeholder='Enter Content ID to delete'
            value = {id}
            onChange={(e) => setID(e.target.value)}
            ></input>

            <button
            type='button'
            onClick={handleClick}

            > 
                Submit
            </button>
        </form>
        
    </>
  )
}

export default DeleteContentPage