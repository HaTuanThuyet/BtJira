import React, { Fragment, useEffect, useState } from "react";
import { Route } from 'react-router-dom'
import SearchModal from "../../components/CyberBugs/SearchModal";
import Header from "../../components/Header/Header";
import SideBar from "../../components/CyberBugs/SideBar"
import MenuCyberBugs from "../../components/CyberBugs/MenuCyberBugs";
// import MainBoardCyberBugs from "../../components/CyberBugs/MainBoardCyberBugs";
import InfoModal from '../../components/CyberBugs/InfoModal'
import Headermain from "../../components/CyberBugs/Main/Headermain";
import InfoMain from "../../components/CyberBugs/Main/InfoMain";
import Contantmain from "../../components/CyberBugs/Main/Contantmain";



export const CyberBugsTemplate = (props) => {
    let { Component, ...restRoute } = props;
    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <div className="jira">
                        {/* Sider Bar  */}
                        <SideBar />
                        <MenuCyberBugs />
                        <Component {...propsRoute}/>
                    
                        <SearchModal/>
                        <InfoModal/>


                    </div>
        </>

    }} />

}