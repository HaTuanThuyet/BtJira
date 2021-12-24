import React, { useState } from 'react'
import { Prompt } from 'react-router';
import { Input, Button } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { USER_SIGNIN_SAGA } from '../../redux/constants/Cyberbugs';
import { signinCyberbugsAction } from '../../redux/actions/CyberBugsAction';
import { NavLink } from 'react-router-dom';


function Login(props) {

    // const [userlogin, setUserLogin] = useState({ userName: '', password: '' ,status:false});
    // console.log(userlogin);
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     const newUserLogin ={
    //         ...userlogin,
    //         [name]: value
    //     }
    //     let valid = true ;

    //     for (let key in newUserLogin){
    //         if(key !=='status'){
    //             if(newUserLogin[key].trim()===''){
    //                 valid= false;
    //             }
    //         }
    //     }
    //     if(!valid){
    //         newUserLogin.status=true;
    //     }else{
    //         newUserLogin.status=false;

    //     }
    //     setUserLogin(newUserLogin);
    // }
    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     if (userlogin.userName === 'cyberlearn' && userlogin.password === 'cyberlearn') {
    //         //    Thành công thì chuyển về trang truocs đó
    //         // props.history.goBack();
    //         // Chuyển đến trang chỉ đínhao khi xử lý
    //         props.history.push('/home');
    //         localStorage.setItem('userLogin',JSON.stringify(userlogin));
    //         // replate thay đổi nội dung / Push chuyển hướng tương ứng
    //     } else {
    //         alert('login fail');
    //         return;
    //     }
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,

    } = props;

    // const  dispatch = useDispatch()

    return (
        <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>

            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }}>
                <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Login CyberBugs</h3>
                <div className="d-flex mt-3" >
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="Email" prefix={<UserOutlined />} />

                </div>
                {touched.email ? <div className="text-danger">{errors.email}</div> : ''}
                <div className="d-flex mt-3" >
                    <Input type="password" onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="password" size="large" placeholder="PassWord" prefix={<LockOutlined />} />

                </div>
                {touched.password ? <div className="text-danger">{errors.password}</div> : ''}

                <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5 " onClick={() => {
                    let action = {
                        type: 'USER_SIGNIN_API',
                        userLogin: {
                            email: values.email,
                            password: values.password
                        }

                    }
                }}>Login</Button>
                <div className="social mt-3 d-flex py-3">
                    <Button shape="circle" size={'large'} style={{ backgroundColor: 'rgb(59,89,152)' }}>
                        <span style={{ color: "#fff" }} className="font-weight-bold">F</span>
                    </Button>
                    <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={'large'}></Button>


                </div>
                <div>
                    
                    <NavLink className="text-dark" to='./signup' activeClassName='active font-weight-boid'>
                    <Button type="primary " size={'large'}  style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}>Sign Up</Button>
                    </NavLink>
                </div>
            </div>





        </form>
    )
}


{/* <Prompt when={userlogin.status} message={(location) => {
    return 'Bạn Có chắc muồn rời Khỏi trang Này'
}} /> */}

const LoginCyberBugsWuthFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    // Custom sync validation
    validationSchema: Yup.object({

        email: Yup.string()
            .email("Invalid email format")
            .required("Required!"),
        password: Yup.string()
            .min(8, "Minimum 6 characters")
            .max(32, "Maximum 32 characters")
            .required("Required!"),

    }),



    handleSubmit: ({ email, password }, { props, setSubmitting }) => {

        setSubmitting(true)
        props.dispatch(signinCyberbugsAction(email, password));

        // console.log(action);
        console.log(props);

    },


    displayName: 'Login CyberBugs',
})(Login);
export default connect()(LoginCyberBugsWuthFormik);
