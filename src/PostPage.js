import React, { useContext } from 'react'
import {Link, useParams} from 'react-router-dom'
import DataContext from './context/DataContext';

const PostPage = () => {
   const {id}= useParams();
   const {posts,handleDelete} = useContext(DataContext)
   const post = posts.find(post=>(post.id).toString() === id)
  return (
    <main className="PostPage">
      <article className="post">
        {post && 
           <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <Link to={`/edit/${post.id}`}><button className='editbutton'>Edit Post</button></Link>
              <button className="deletebutton" onClick={()=>handleDelete(post.id)}>Delete Post</button>
           </>
        }
        {!post &&
          <div className='pg-not-found'>
              <h2>Page Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                 <Link to="/">Visit Our Homepage</Link>
              </p>
          </div>
        }
      </article>
    </main>
  )
}

export default PostPage