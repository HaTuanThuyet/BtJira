import { useSelector } from 'react-redux'
import React from 'react'

export default function Headermain() {
    const userLogin=useSelector(state=>state.UserLoginCyberReducer.userLogin)

    return (
        <div className="header">
           
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">Singularity 1.0</li>
                    <li className="breadcrumb-item active" aria-current="page">
                    {userLogin?.email}
                    </li>
                </ol>
            </nav>
            <h3> {userLogin?.name}</h3>
        </div>
    )
}
