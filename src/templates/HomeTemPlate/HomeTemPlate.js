import React, { Fragment, useEffect, useState } from "react";
import { Route } from 'react-router-dom'
import Header from "../../components/Header/Header";



export default function HomeTemPlace(props) {
    const [state, setState] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    // console.log("state", state)
    //path , component,homemoble
    useEffect(() => {
        // Khi browser load lên đăng ký 1 event 
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })

        }
        // Khi người dùng thay đổi kích thước
        window.onresize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })

        }
        return ()=>{
            window.removeEventListener('on load');
            window.removeEventListener('onresize')
        }
    },[])
    let Component = props.component;
    if(state.width <= 768 && props.mobileComponent){
        Component = props.mobileComponent;

    }
    return <>
        <Route exact path={props.path} render={
            (propsRoute) => {
                return <Fragment>
                  <Header/>
                    <props.Component {...propsRoute} />
                </Fragment>
            }
        } />
    </>
}