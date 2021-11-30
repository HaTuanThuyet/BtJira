import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { withFormik } from 'formik'
import * as Yup from 'yup'


function FormEditProject(props) {
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
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        // Gọi api load project category
        dispatch({
            type: 'GET_ALL_PROJECT_CATEGORY_SAGA',

        })

        //   Load sự kiện submit lên drawar nút submit
        dispatch({
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit
        })
    }, [])



    const handleEdittorChange = (content, editor) => {
        // console.log('Content was UpDate', content);
        setFieldValue('description', content)
    }
    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form=group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id"></input>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form=group">
                        <p className="font-weight-bold">Project name</p>
                        <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form=group">
                        <p className="font-weight-bold">Project Category</p>
                        <select name="categoryId" value={values.categoryId}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                            })}

                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form=group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name="description1"
                            initialValue={values.description}
                            Value={values.description}
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
                    </div>

                </div>

            </div>
        </form>

    )

}





const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        // console.log('propsvalue', props)
        const { projectEdit } = props;
        return {
            id: projectEdit.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId

        }

    },

    // Custom sync validation
    validationSchema: Yup.object({



    }),



    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('valueww', values);
        // kHI NGƯỜI dùng bấm submit =>đưa dữ liệu về backend thông qua api
        const action = {
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate: values
        }
        props.dispatch(action)



    },


    displayName: 'CreateProjectFomik',
})(FormEditProject);
const mapStateToProps = (rootReducer) => ({

    projectEdit: rootReducer.ProjectReducer.projectEdit

})
export default connect(mapStateToProps)(editProjectForm);


