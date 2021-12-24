import React from 'react'
import { Prompt } from 'react-router';
import { Input, Button } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined,PhoneOutlined } from '@ant-design/icons';
import { USER_SIGNIN_SAGA } from '../../redux/constants/Cyberbugs';
import { signinCyberbugsAction, signupCyberbugsAction } from '../../redux/actions/CyberBugsAction';

 function SignUp(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,

    } = props;
    return (
        <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>

            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }}>
                <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>SignUp CyberBugs</h3>
                <div className="d-flex mt-3" >
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="Email" prefix={<UserOutlined />} />

                </div>
                {touched.email ? <div className="text-danger">{errors.email}</div> : ''}
                <div className="d-flex mt-3" >
                    <Input type="password" onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="password" size="large" placeholder="PassWord" prefix={<LockOutlined />} />

                </div>
                <div className="d-flex mt-3" >
                    <Input type='text'  onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="name" size="large" placeholder="name" prefix={<UserOutlined />} />

                </div>
                <div className="d-flex mt-3" >
                    <Input type='number' onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="phoneNumber" size="large" placeholder="phoneNumber" prefix={<PhoneOutlined  />} />

                </div>
                {touched.password ? <div className="text-danger">{errors.password}</div> : ''}

                <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5 " onClick={() => {
                    let action = {
                        type: 'USER_SIGNIN_API',
                        userSignup: {
                            email: values.email,
                            password: values.password,
                            name: values.name,
                            phoneNumber: values.phoneNumber,

                        }

                    }
                 
                }}>SignUp</Button>
                <div className="social mt-3 d-flex">
                    <Button shape="circle" size={'large'} style={{ backgroundColor: 'rgb(59,89,152)' }}>
                        <span style={{ color: "#fff" }} className="font-weight-bold">F</span>
                    </Button>
                    <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={'large'}></Button>


                </div>
            </div>





        </form>
    )
}
const SignUpCyberBugsWuthFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        name:'',
        phoneNumber:'',
    }),

    // Custom sync validation
    validationSchema: Yup.object({

        // email: Yup.string()
        //     .email("Invalid email format")
        //     .required("Required!"),
        // password: Yup.string()
        //     .min(8, "Minimum 6 characters")
        //     .max(32, "Maximum 32 characters")
        //     .required("Required!"),

    }),



    handleSubmit: ({ email, password ,name,phoneNumber}, { props, setSubmitting }) => {

        setSubmitting(true)
        props.dispatch(signupCyberbugsAction(email, password,name,phoneNumber));

        // console.log(action);
        console.log(props);
      
    },


    displayName: 'SignUp CyberBugs',
})(SignUp);
export default connect()(SignUpCyberBugsWuthFormik);
