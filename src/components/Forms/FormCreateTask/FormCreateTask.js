import { Editor } from '@tinymce/tinymce-react'

import React, { useEffect, useState } from 'react'
import { Select, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/ProjectConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/PriorityConstants';
import { useRef } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/StatusConstants';


const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


function FormCreateTask(props) {
    const searchRef = useRef(null);


    // Lấy dữ liệu từ redux về
    const { arrrProject } = useSelector(state => state.ProjectCyberBugReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrUser } = useSelector(state => state.UserLoginCyberReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);


    const userOptions = arrUser?.map((item, index) => {
        // console.log(userSearch);
        return { value: item.userId, label: item.name }
    })
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues

    } = props;

    // console.log('arrPriority', arrPriority);

    const dispatch = useDispatch();
    const [size, setSize] = React.useState('default');
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0

    })
    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: 'SET_SUBMIT_CREATE_TASK',
        submitFunction:handleSubmit});





    }, [])

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Project</p>
                <select name='projectId' className='form-control' onChange={(e) => {
                    let {value} = e.target;
                    dispatch({
                        type:'GET_USER_BY_PROJECT_ID_SAGA',
                        idProject:value
                    })
                    setFieldValue('projectId',e.target.value);
                }} >
                    {arrrProject?.map((project, index) => {
                        return <option key={index} value={Number(project.id)}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>TaskName</p>
                <input name='taskName' className='form-control' onChange={handleChange} />
            </div>
            <div className='form-group'>
                <p>Status</p>
                <select name='statusId' className='form-control' onChange={handleChange} >
                    {arrStatus?.map((status, index) => {
                        return <option key={index} value={Number(status.statusId)}>{status.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div class="row">
                    <div className='col-6'>
                        <p>priority</p>
                        <select name='priorityId' className='form-control' onChange={handleChange}>
                            {arrPriority?.map((priority, index) => {
                                return <option key={index} value={Number(priority.priorityId)} >{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task Type</p>
                        <select className='form-control' name='typeId' onChange={handleChange}>
                            {arrTaskType?.map((taskType, index) => {

                                return <option key={index} value={Number(taskType.id = +taskType.id)} >{taskType.taskType}</option>
                            })}

                        </select>

                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div class="row">
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userOptions}
                            placeholder="Please select"

                            optionFilterProp='label'
                            onChange={(values) => {

                                // xét lại giá trị lo lstUserAssignees
                                // Dispatch làm thay đỗi dự liệu arrUser
                                setFieldValue('listUserAsign', values)
                            }}
                            onSelect={(value) => {
                                console.log(value)
                            }}
                            onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: 'GET_USER_API',
                                        keyWord: value
                                    })
                                }, 300)


                                // console.log('value', value);
                            }}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <p>originalEstimate</p>
                                <input type='number' defaultValue={0} min={0} className='form-control' name='originalEstimate' onChange={handleChange} />
                            </div>

                        </div>

                    </div>

                    <div className='col-6'>
                        <p>Time Tracking</p>
                        <Slider defaultValue={30} value={Number(timeTracking.timeTrackingSpent)} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className='row'>
                            <div className='col-6 text-left font-weight-bold'>{timeTracking.timeTrackingSpent}h logged</div>
                            <div className='col-6 text-right  font-weight-bold'>{timeTracking.timeTrackingRemaining}h remaining</div>

                        </div>
                        <div className='row' style={{ marginTop: 5 }}>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input type='number' defaultValue={Number(0)} min={Number(0)} className='form-control' name='timeTrackingSpent' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: Number(e.target.value)
                                    });
                                    setFieldValue('timeTrackingSpent', Number(e.target.value));
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input type='number' defaultValue={0} min={0} className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: Number(e.target.value)
                                    });
                                    setFieldValue('timeTrackingRemaining', Number(e.target.value));

                                }} />
                            </div>


                        </div>


                    </div>

                </div>
            </div>

            <form className='form-group'>
                <p>Descriptiom</p>
                <>
                    <Editor
                        name="description"
                        // onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>.</p>"
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
                            setFieldValue('description', content)
                        }}
                    />

                </>
            </form>
            {/* <button type='submit' value={+''} >{ }submit</button> */}





        </form>
    )
}



const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log('propsvalue', props)
        const { arrrProject,arrTaskType,arrPriority,arrStatus} = + props;
        console.log(arrrProject,arrTaskType,arrPriority,arrStatus);
      
      
        return {
            taskName: '',
            description: '',
            statusId: '',
            originalEstimate: 1639812057,
            timeTrackingSpent: 1639812057,
            timeTrackingRemaining: 1639812057,
            projectId: 0,
            typeId: 0,
            priorityId: 0,
            listUserAsign: [0]



        }

    },

    // Custom sync validation
    validationSchema: Yup.object({



    }),



    handleSubmit: (values, { props, setSubmitting }) => {
        // console.log('values', values) 
            values.priorityId = +values.priorityId
            values.projectId = +values.projectId
            values.typeId = +values.typeId
         
        props.dispatch({
            type: 'CREATE_TASK_SAGA',
            taskObject:  values 
        })
        console.log('taskObject', values)


    },


    displayName: 'CreateTaskForm',
})(FormCreateTask);

const mapStateToProps = (state)=>{
    return {
        arrrProject:state.ProjectCyberBugReducer.arrrProject,
        arrTaskType:state.TaskTypeReducer.arrTaskType,
        arrPriority:state.PriorityReducer.arrPriority,
        arrStatus:state.StatusReducer.arrStatus
    }
}
export default connect(mapStateToProps)(frmCreateTask);
