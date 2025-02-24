
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import React from 'react';
import ContentBox from '../components/ContentBox';
import { contentStore } from '../../store/store'

const HomePage = () => {
  const {fetchContents, contents} = contentStore();

  useEffect(() => {
    fetchContents();
    
  }, [fetchContents]);



  return (
    <>
        <div>HomePage</div>
        <Link to ={"/createContent"}>
            <button>Post a Content</button>
        </Link>
        <Link to = {"/deleteContent"}>
            <button>Delete a Content</button>
        </Link>



        {contents.slice().reverse().map((contentD) => (
  <ContentBox key={contentD._id} content={contentD} />
))}


    </>
    
  )
}

export default HomePage