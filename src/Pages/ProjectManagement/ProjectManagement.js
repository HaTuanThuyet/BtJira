import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Tag, Avatar, AutoComplete, Popover } from 'antd';
import ReactHtmlParser from 'react-html-parser'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { Popconfirm, message } from 'antd';





export default function ProjectManagement(props) {
    const projectList = useSelector(state => state.ProjectCyberBugReducer.projectList);
    const  userSearch  = useSelector(state => state.UserLoginCyberReducer.userSearch);
    // console.log('userSearch',userSearch);
    const [value, setvalue] = useState('');

    // console.log('stateproject', projectList)
    // Sử dụng ddisspatch gọi action 
    const dispatch = useDispatch();



    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({
            type: 'GET_ALL_PROJECT_SAGE',
        
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
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],



        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return -1;
            },





        },
        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return -1;
            },

        },

        {
            title: 'creator',
            // dataIndex: 'categoryName',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>

            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return -1;
            },

        },
        {
            title: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Avatar src={member.avatar} key={index} />
                    })}
                    {record.member?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="rightTop" title={'Add User'} content={() => {
                        return <AutoComplete
                            options={userSearch?.map((user, index) => {
                                return { label:user.name, value:user.userId.toString()}
                            })}
                            value={value}

                            onChange={(text) => {
                                setvalue(text);
                            }}
                            onSelect={(valueSelect, option) => {
                             

                                //    Set giá trị của hộp thoại = option.label
                                setvalue(option.label);
                                // Gọi api Gữi về 
                                dispatch({
                                    type: 'ADD_USER_PROJECT_API',
                                    userProject: {
                                        'projectId': record.id,
                                        'userId': valueSelect
                                    }

                                })
                            }}
                            style={{ width: '100%' }} onSearch={(value) => {
                                dispatch({
                                    type:'GET_USER_API',
                                    keyWord:value
                                })
                                console.log('value', value);
                            }} />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            }
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
                                Component: <FormEditProject />
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
                                type: 'DELETE_PROJECT_SAGA',
                                idProject: record.id
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
            <h3>Project Management </h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={'id'} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
