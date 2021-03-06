import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberBugs() {
    return (
        <div className="menu">
                            <div className="account col-lg-12 col-xl-12 col-sm-12">
                                <div className="avatar">
                                    <img src='https://i.ibb.co/6n0hLML/baby-yoda.jpg'alt />
                                </div>
                                <div className="account-info">
                                    <p className=' col-lg-12 col-xl-12 col-sm-12 col-end'>ThuyetHa</p>
                                    <p className=' col-lg-12 col-xl-12 col-sm-12'>Report bugs</p>
                                </div>
                            </div>
                            <div className="control col-lg-12 col-xl-12 col-sm-12">
                                <div>
                                    <i className="fa fa-credit-card mr-2" />
                                    <NavLink className="text-dark  col-lg-12 col-xl-12 col-sm-12" to='./cyberbugs' activeClassName='active font-weight-boid ' >Cyber Board</NavLink>

                                </div>
                                <div>
                                    <i className="fa fa-cog mr-2" />
                                    <NavLink className="text-dark  col-lg-12 col-xl-12 col-sm-12" to='./projectmanagement'activeClassName='active font-weight-boid'>Project Management</NavLink>
                                </div>
                                <div>
                                    <i className="fa fa-cog mr-2" />
                                    <NavLink className="text-dark  col-lg-12 col-xl-12 col-sm-12" to='./createproject'activeClassName='active font-weight-boid'>Create project</NavLink>
                                </div>
                                <div>
                                    <i className="fa fa-cog mr-2" />
                                    <NavLink className="text-dark  col-lg-12 col-xl-12 col-sm-12" to='./usermanagement'activeClassName='active font-weight-boid'>User Management</NavLink>
                                </div>
                            </div>
                            <div className="feature">
                                <div>
                                    <i className="fa fa-truck" />
                                    <span>Releases</span>
                                </div>
                                <div>
                                    <i className="fa fa-equals" />
                                    <span>Issues and filters</span>
                                </div>
                                <div>
                                    <i className="fa fa-paste" />
                                    <span>Pages</span>
                                </div>
                                <div>
                                    <i className="fa fa-location-arrow" />
                                    <span>Reports</span>
                                </div>
                                <div>
                                    <i className="fa fa-box" />
                                    <span>Components</span>
                                </div>
                            </div>
                        </div>
    )
}
