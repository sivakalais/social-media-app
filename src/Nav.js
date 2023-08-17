import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
  const {search,setSearch} = useContext(DataContext)
  return (
    <nav className='Nav'>
      <form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='input'>Search Post</label>
        <input 
           type="text"
           id="input"
           placeholder='Search Posts'
           value={search}
           onChange={(e)=>
            setSearch(e.target.value)
          }
        />
      </form>
      <ul className='nav-ul'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">Post</Link></li>
        <li><Link to="about">About</Link></li>
        <Outlet />
      </ul>
    </nav> 
  )
}

export default Nav