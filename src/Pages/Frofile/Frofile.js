import React from 'react'
import { Redirect } from 'react-router';

export default function Frofile(props) {

    if(localStorage.getItem('userlogin')){
    return (
        <div>
            frofile
        </div>
    )}else{
        alert("Vui Lòng Đăng Nhập để vào trang ");
        return <Redirect to="/login"/>
    }
}
