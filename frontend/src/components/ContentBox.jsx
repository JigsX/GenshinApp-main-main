import {useState} from 'react';
import PropTypes from 'prop-types';
import { contentStore } from '../../store/store'
import React from 'react';

const ContentBox = ({ content }) => {
  
  const [update, setUpdate] = useState(false);
  const [contentValue, setContentValue] = useState({
    title: content ? content.title  : '',
    character: content ? content.character :   '',
    image:content ? content.image : '',
    category:content ? content.category :   ''
  });
  

  if (!content) {
    return <div>No data</div>;
  }
  


  
   
  const modifyButtonClick = () =>{
    if(update){
      setUpdate(false);
    }else{
      setUpdate(true)
    }
  }

  const {updateContent,deleteContent} = contentStore();
  const handleClick = async (id,conts) =>{

    const {success, message} = await updateContent(id, conts);
    if(success){
      setUpdate(false)
      
        console.log("Product Updated: ", message)
    }else{
        console.log("Product not Updated: ", message)
    }
  };

  const deleteButtonClick = async (id) => {
    const {success, message} = await deleteContent(id);
    if(success){
        
        console.log("Product Deleted: ", message)
    }else{
        console.log("Product not Deleted: ", message)
    }
  }

  return (
    <>
      {update && (
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
            <button type='button' onClick={() => handleClick(content._id, contentValue)}>Submit</button>
            
          </form>
       )}
      <div style={{display: 'flex',justifyContent: 'center', alignContent: 'center'}}>
        <div style={{ border: '3px solid black', padding: '10px', display: 'flex',justifyContent: 'center',  flexDirection: 'column', width: '60%' }}>
          <div style={{display: 'flex',justifyContent: 'center'}}>
            <img src={content.image} alt="Content" height={200}/>
          </div>
          <h1> {content.title} </h1>
          <h3> {content.category} </h3>

          <div>
            
            <button onClick={modifyButtonClick} >Modify</button>

            
            <button onClick={() => deleteButtonClick(content._id)}>Delete</button>
          </div>
        </div>

        
      </div>
    </>
    
    
    
  );
};

ContentBox.propTypes = {
  content: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

export default ContentBox;
