import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux';
import { withFormik } from 'formik'
import * as Yup from 'yup'


function FormEditUsers(props) {
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
   

    const dispatch = useDispatch();

    useEffect(() => {
        // Gọi api load project category
       
        //   Load sự kiện submit lên drawar nút submit
        dispatch({
            type: 'SET_SUBMIT_EDIT_USERS',
            submitFunction: handleSubmit
        })
    }, [])



    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <div className="form=group">
                        <p className="font-weight-bold">User id</p>
                        <input value={values.userId} disabled className="form-control" name="userId"></input>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form=group">
                        <p className="font-weight-bold"> email</p>
                        <input value={values.email} className="form-control" name="email" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form=group">
                        <p className="font-weight-bold"> name</p>
                        <input value={values.name} className="form-control" name="name" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form=group">
                        <p className="font-weight-bold"> password</p>
                        <input value={values.password} className="form-control" name="password" onChange={handleChange}></input>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form=group">
                        <p className="font-weight-bold"> PhoneNumber</p>
                        <input value={values.phoneNumber} className="form-control" name="phoneNumber" onChange={handleChange}></input>
                    </div>
                </div>
               

            </div>
        </form>

    )

}





const editUsersForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log('propsvalue12134', props)
        const { UserList } = props;
        return {
            userId: UserList.userId,
            name: UserList.name,
            email: UserList.email,
            phoneNumber: UserList.phoneNumber,
            password:UserList.password

        }

    },

    // Custom sync validation
    validationSchema: Yup.object({



    }),



    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('valueww', values);
        // kHI NGƯỜI dùng bấm submit =>đưa dữ liệu về backend thông qua api
        const action = {
            type: 'UPDATE_USERS_SAGA',
            usersUpdate: values
        }
        props.dispatch(action)



    },


    displayName: 'EditUserFomik',
})(FormEditUsers);
const mapStateToProps = (rootReducer) => ({

    UserList: rootReducer.ProjectReducer.UserList

})
export default connect(mapStateToProps)(editUsersForm);


