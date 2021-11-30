import React from 'react'
import { NavLink } from'react-router-dom'

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">CyberSoft</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/home" activeClassName="bg-white text-dark" activeStyle={{border:'1px solid red'}}>Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about"activeClassName="bg-white text-dark"activeStyle={{border:'1px solid red'}}>About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact"activeClassName="bg-white text-dark"activeStyle={{border:'1px solid red'}}>Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login"activeClassName="bg-white text-dark"activeStyle={{border:'1px solid red'}}>Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile"activeClassName="bg-white text-dark"activeStyle={{border:'1px solid red'}}>ProFile</NavLink>
                    </li>
              
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">baiTap</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to="/todolist">TodoList</NavLink>
                            <NavLink className="dropdown-item" to="/todolistrfc">TodoListRFC </NavLink>
                            {/* <NavLink className="dropdown-item" to="/hookredux">HookRedux </NavLink>
                            <NavLink className="dropdown-item" to="/formreact">HookForm </NavLink> */}



                        
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Api</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            {/* <NavLink className="dropdown-item" to="/classapi">Clas API</NavLink>
                            <NavLink className="dropdown-item" to="/funcapi">Function API </NavLink>
                            <NavLink className="dropdown-item" to="/reduxmiddleware">Redux Middle Ware  </NavLink> */}


                        
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}

