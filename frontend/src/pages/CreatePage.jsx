import {useState} from 'react'

import React from 'react';
import { contentStore } from '../../store/store'

const CreatePage = () => {
    const [contentValue, setContentValue] = useState({
        title: "",
        character: "",
        image: "",
        category: ""
    })
    const {createContent} = contentStore();
    const handleClick = async () =>{
        const {success, message} = await createContent(contentValue);
        if(success){
            window.history.back();
            console.log("Product Posted: ", message)
        }else{
            console.log("Product not Posted: ", message)
        }
        setContentValue({
            title: "",
            character: "",
            image: "",
            category: ""
        });
    };
    

  return (
    <>
        <div>CreatePage</div>
        <form>
            <input 
                type='text' 
                placeholder='Title'
                value = {contentValue.title}
                onChange={(e) => setContentValue({
                    ...contentValue, title: e.target.value
                })}

            />
            <input 
                type='text' 
                placeholder='Character'
                value = {contentValue.character}
                onChange={(e) => setContentValue({
                    ...contentValue, character: e.target.value
                })}

            />
            <input 
                type='text' 
                placeholder='Catergory'
                value = {contentValue.category}
                onChange={(e) => setContentValue({
                    ...contentValue, category: e.target.value
                })}

            />
            <input 
                type='url' 
                placeholder='Image Link'
                value = {contentValue.image}
                onChange={(e) => setContentValue({
                    ...contentValue, image: e.target.value
                })}

            />
            <button type='button' onClick={handleClick}>Submit</button>
        </form>
    </>

  )
}

export default CreatePage