import React from 'react'

export default function PageNotFound(props) {
    return (
        <div>
            Không Tìm Thấy Trang : {props.match.url}
        </div>
    )
}
