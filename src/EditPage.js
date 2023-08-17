import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const EditPage = () => {
  const {posts,editBody,editTitle,setEditTitle,setEditBody,handleEdit} =useContext(DataContext)

  const {id}  = useParams();
  const post = posts.find((post)=>(post.id).toString()===id)

  useEffect(()=>{
    if(post){
      setEditBody(post.body)
      setEditTitle(post.title)
    }
  },[post,setEditTitle,setEditBody])
  return (
    <main className="EditPage">
      {editTitle &&
         <> 
            <h2>Edit Post</h2>
            <form className='editPostForm' onSubmit={(e)=>e.preventDefault()}>
                <label htmlFor='edit-title'>Title:</label>
                <input 
                  id="edit-title"
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e)=>setEditTitle(e.target.value)}
                /> 
                <label htmlFor='editpost'>Post:</label>
                <textarea 
                  id='editpost'
                  type="text"
                  required
                  value={editBody}
                  onChange={(e)=>setEditBody(e.target.value)}
                />
                <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
            </form>
        </>
      }
      {!editTitle &&
         <div className='pg-not-found'>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
         </div>
      }    
    </main>
  )
}

export default EditPage