import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { createFromIconfontCN,PlusSquareOutlined,SearchOutlined } from '@ant-design/icons';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarsOutlined
} from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import FormCreateTask from '../Forms/FormCreateTask/FormCreateTask';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default function SideBar() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        collapsed: false,
    });
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    return (
        <div>

            <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: "100%" }}>
                <div className="text-right pr-2" onClick={toggle}><BarsOutlined style={{cursor:'pointer',color:'#fff',fontSize:'25px'}} /></div>
        
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PlusSquareOutlined style={{fontSize:25}}/>}onClick={() => {
                        dispatch({
                            type:'OPEN_FORM_CREATE_TASK',
                            ComponentContentDrawer:<FormCreateTask/>,
                            title:'Create Task'
                        })
                    }}>
                      Create Task
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined style={{fontSize:25}}/>}>
                      Search
                    </Menu.Item>
                   
                </Menu>
            </Sider>

        </div>
    )
}
