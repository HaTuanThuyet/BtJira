import { useSelector } from 'react-redux'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

export default function Headermain(props) {
    const {projectDetail}= props;
    const userLogin=useSelector(state=>state.UserLoginCyberReducer.userLogin)

    return (
        <div className="header">
           
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item"> {userLogin?.name}</li>
                    <li className="breadcrumb-item active" aria-current="page">
                    {userLogin?.email}
                    </li>
                </ol>
            </nav>
            <h3> {projectDetail.projectName}</h3>
            <section className="my-2">
                {ReactHtmlParser(projectDetail.description)}
            </section>
        </div>
    )
}
