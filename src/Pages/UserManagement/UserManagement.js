import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Tag, Avatar, AutoComplete, Popover } from 'antd';
import ReactHtmlParser from 'react-html-parser'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { Popconfirm, message } from 'antd';
import { NavLink } from 'react-router-dom';
import FormEditUser from '../../components/Forms/FormEditUsers/FormEditUser';





export default function UsersManagement(props) {
    const UserList = useSelector(state => state.ProjectCyberBugReducer.UserList);
    const userSearch = useSelector(state => state.UserLoginCyberReducer.userSearch);
    // console.log('userSearch',userSearch);
    const [value, setvalue] = useState('');
    const searchRef = useRef(null);

    // console.log('stateproject', projectList)
    // Sử dụng ddisspatch gọi action 
    const dispatch = useDispatch();



    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({
            type: 'GET_ALL_USERS_SAGE',

        })

    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };
    const clearFilters = () => {
        setState({ filteredInfo: null });
    };
    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };
    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };
    let { sortedInfo, filteredInfo } = state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'STT',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                return item2.userId - item1.userId;
            },
            sortDirections: ['descend'],



        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render:(text,record,index) => {
                return <NavLink key={index} to={`/email/${record.id}`}>{text}</NavLink>
            },
         





        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
      

        },

        {
            title: 'phoneNumber',
            // dataIndex: 'categoryName',
            key: 'phoneNumber',
            render: (text, record, index) => {
                return <Tag color="green">{record.phoneNumber}</Tag>

            },
         

        },
      
        {
            title: 'Action',
            // dataIndex: 'categoryName',
            key: '',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary"
                        onClick={() => {
                            const action = {
                                type: 'OPEN_FORM_PROJECT',
                                title:'Edit Project',
                                Component: <FormEditUser />
                            }
                            dispatch(action);
                            // dispatch dữ liệu hiện tại lên reducer
                            const actionEditProject = {
                                type: 'EDIT_PROJECT',
                                projectEditModel: record
                            }
                            dispatch(actionEditProject);
                        }}>
                        <EditOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this Project?"
                        onConfirm={() => {
                            dispatch({
                                type: 'DELETE_USERS_SAGA',
                                id: record.userId
                            });
                        }}

                        okText="Yes"
                        cancelText="No"
                    >

                        <button className="btn mr-2 btn-danger" >

                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>,

                </div>

            }

        },

    ];
    return (

        <div className="container-fluid mt-5">
            <h3>Users Management </h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={'userId'} dataSource={UserList} onChange={handleChange} />
        </div>
    )
}
