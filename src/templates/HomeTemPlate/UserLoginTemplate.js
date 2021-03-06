import React,{useState,useEffect} from "react";
import { Route } from "react-router";
import { Button, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;




export const UserLoginTemplate = (props) => {
    const [size,setSize]= useState({width:window.innerWidth,height:window.innerHeight});
    useEffect(() => {
        window.onresize=()=>{
            setSize({
                width:Math.round(window.innerWidth),
                height:Math.round(window.innerHeight)
            })
        }
      
    }, [])


    let { Component, ...restRoute } = props;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider  width={size.width/2} style={{ height: size.height, backgroundImage: `url(https://picsum.photos/${Math.round(size.width/2)}/${size.height})`, backgroundSize: "100%" }}>

                </Sider>
                <Content>
                    <Component {...propsRoute}/>

                </Content>
            </Layout>
        </>

    }} />

}