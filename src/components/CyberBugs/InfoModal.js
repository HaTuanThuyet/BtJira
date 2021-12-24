import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { GET_ALL_STATUS_SAGA } from '../../redux/constants/StatusConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../redux/constants/PriorityConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../redux/constants/TaskTypeConstants';
import { Editor } from '@tinymce/tinymce-react';

export default function InfoModal(props) {
    const { taskDetailModel } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const { memberDetail } = props;
    console.log('projectDetail123', projectDetail);

    const [visibleEditor, setvisibleEditor] = useState(false);
    const [historyContent, setHistoryContent] = useState(taskDetailModel.description);
    const [content, setContent] = useState(taskDetailModel.description)



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });


    }, [])

    console.log('taskDetailModal', taskDetailModel);
    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModel.description);
        return <div>
            {visibleEditor ? <div>   <Editor
                name="description"

                initialValue={taskDetailModel.description}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={(content, editor) => {
                    setContent(content);
                }}
            />
                <button className='btn btn-primary m-2' onClick={() => {
                    dispatch({
                        type: 'HANDLE_CHANGE_POST_API',
                        actionType: 'CHANGE_TASK_DETAIL',
                        name: 'description',
                        value: content
                    })
                    setvisibleEditor(false)
                }}>Save</button>
                <button className='btn btn-primary m-2' onClick={() => {
                    dispatch({
                        type: 'HANDLE_CHANGE_POST_API',
                        actionType: 'CHANGE_TASK_DETAIL',
                        name: 'description',
                        value: historyContent
                    })
                    setvisibleEditor(false)
                }}>Close</button>

            </div> : <div onClick={() => {
                setHistoryContent(taskDetailModel.description)
                setvisibleEditor(!visibleEditor);
            }}>{jsxDescription}</div>}


        </div>
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'HANDLE_CHANGE_POST_API',
            actionType: 'CHANGE_TASK_DETAIL',
            name,
            value
        })
    }
    const renderTimeTracking = () => {
        const { timeTrackingRemaining, timeTrackingSpent } = taskDetailModel;
        const max = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100);
        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: percent }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>

            </div>
            <div className='row'>

                <div className="col-6">
                    <input className='form-control' name='timeTrackingSpent' onChange={(e) => {
                        handleChange(e)
                    }} />
                </div>
                <div className='col-6'>
                    <input className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                        handleChange(e)
                    }} />
                </div>
            </div>
        </div>
    }
    return (
        <div>
            {/* Info Modal */}
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name='typeId' value={taskDetailModel.typeId} onChange={handleChange}>
                                    {arrTaskType?.map((tp, index) => {
                                        return <option value={tp.id}>{tp.taskType}</option>
                                    })}
                                </select>
                                <span>{taskDetailModel.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <p>Description</p>
                                            {renderDescription()}

                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            <div className="block-comment" style={{ display: 'flex' }}>



                                                <div className="avatar">
                                                    <img src="https://i.ibb.co/7JM1P2r/picke-rick.jpg" alt />
                                                </div>
                                                <div className="input-comment">
                                                    <input type="text" placeholder="Add a comment ..." />
                                                    <p>
                                                        <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                        <span>press
                                                            <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                            to comment</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="lastest-comment">
                                                <div className="comment-item">
                                                    <div className="display-comment" style={{ display: 'flex' }}>
                                                        <div className="avatar">
                                                            <img src="https://i.ibb.co/7JM1P2r/picke-rick.jpg" alt />
                                                        </div>
                                                        <div>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lord Gaben <span>a month ago</span>
                                                            </p>
                                                            <p style={{ marginBottom: 5 }}>
                                                                Lorem ipsum dolor sit amet, consectetur
                                                                adipisicing elit. Repellendus tempora ex
                                                                voluptatum saepe ab officiis alias totam ad
                                                                accusamus molestiae?
                                                            </p>
                                                            <div>
                                                                <span style={{ color: '#929398' }}>Edit</span>
                                                                •
                                                                <span style={{ color: '#929398' }}>Delete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name='statusId' className="custom-select" value={taskDetailModel.statusId} onChange={(e) => {
                                                handleChange(e);
                                                const action = {
                                                    type: 'UPDATE_TASK_STATUS_SAGA',
                                                    taskStatusUpdate: {
                                                        taskId: taskDetailModel.taskId,
                                                        statusId: e.target.value,
                                                        projectId: taskDetailModel.projectId
                                                    }

                                                }
                                                dispatch(action)

                                            }
                                            }>
                                                {arrStatus.map((status, index) => {
                                                    return <option key={index} value={status.statusId}>{status.statusName}</option>
                                                }


                                                )}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className='row'>
                                                {
                                                    taskDetailModel.assigness?.map((user, index) => {
                                                        return <div className='col-6 mt-2 mb-2'>
                                                            <div style={{ display: 'flex' }} className="item">

                                                                <div className="avatar">
                                                                    <img src={user?.avatar} alt />
                                                                </div>
                                                                <p className="name mt-1 ml-1">
                                                                    {user?.name}

                                                                    <span className='ml-1' style={{ cursor: 'pointer' }} onClick={() => {
                                                                        dispatch({
                                                                            type:'HANDLE_CHANGE_POST_API',
                                                                            actionType: 'REMOVE_USER_ASSIGNESS',
                                                                         
                                                                            userId: user?.id
                                                                        })
                                                                    }}>X</span>

                                                                </p>
                                                            </div>
                                                        </div>
                                                    })
                                                }

                                                <div className='col-6 mt-2 mb-2'>
                                                    <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                                                    <select name='lstUser' className='form-control' onChange={(e) => {
                                                        const value = e.target.value;
                                                        let userSelect = projectDetail.members.find(mem => mem.userId == value);
                                                        console.log('userSelect', userSelect);
                                                        userSelect = { ...userSelect, id: userSelect?.userId }
                                                        dispatch({
                                                            type:'HANDLE_CHANGE_POST_API',
                                                            actionType: 'CHANGE_ASSIGNNESS',
                                                           
                                                            userSelect
                                                        })
                                                    }}><option value={0}>Select User Assigness</option>
                                                        {projectDetail.members?.filter(mem => {
                                                            let index = taskDetailModel.assigness?.findIndex(us => us?.id === mem.userId);
                                                            if (index !== -1) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }).map((mem, index) => {
                                                            return <option key={index} value={mem.userId}>{mem.name}</option>
                                                        })}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name='priorityId' className='form-control'
                                                value={taskDetailModel.priorityId} onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                            >

                                                {arrPriority.map((item, index) => {
                                                    return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                })}
                                            </select>


                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name='originalEstimate' type="text" className="estimate-hours" value={taskDetailModel.originalEstimate} onChange={(e) => {
                                                handleChange(e)
                                            }} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {
                                                renderTimeTracking()
                                            }

                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
