import React, { Component, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik'
import * as Yup from 'yup';
// import { connect, useSelector } from 'react-redux'
import { useSelector, useDispatch, connect } from 'react-redux'


function CreateProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    // console.log('key qua',)
    const dispatch = useDispatch();


    // console.log(arrProjectCategory);
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

    useEffect(() => {
        // Gọi Api
        dispatch({ 
            type: 'GET_ALL_PROJECT_CATEGORY_SAGA'
         })

    }, []);
    const handleEdittorChange = (content, editor) => {
        // console.log('Content was UpDate', content);
        setFieldValue('description', content)
    }
    return (
        <div className="container m-5">
            <h3>CreateProject</h3>
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <p>Description</p>

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
                            onEditorChange={handleEdittorChange}
                        />

                    </>
                </div>
                <div className="form-group">
                    <select name="categoryId" className="form-control" onChange={handleChange} >
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}

                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">Create Project</button>
            </form>
        </div>
    )
}



const createCyberBugsWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log('propsvalue', props)
        return {
            "projectName": '',
            "description": '',
            "categoryId": props.arrProjectCategory[0]?.id,
            // "alias": ""
        }

    },

    // Custom sync validation
    validationSchema: Yup.object({



    }),



    handleSubmit: (values, { props, setSubmitting }) => {
        //    props.dispatch([])
        console.log('props', values);
        props.dispatch({
            type:'CREATE_PROJECT_SAGA',
            newProject:values
        })


    },


    displayName: 'CreateProjectFomik',
})(CreateProject);
const mapStateToProps = (rootReducer) => ({

    arrProjectCategory: rootReducer.ProjectCategoryReducer.arrProjectCategory

})
export default connect(mapStateToProps)(createCyberBugsWithFormik);

