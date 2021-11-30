import React from 'react'

export default function InfoMain() {
    return (
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src="https://i.ibb.co/7JM1P2r/picke-rick.jpg" alt />
                </div>
                <div className="avatar">
                    <img src="https://i.ibb.co/6n0hLML/baby-yoda.jpg" alt />
                </div>
                <div className="avatar">
                    <img src="https://i.ibb.co/6RJ5hq6/gaben.jpg" alt />
                </div>
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}
