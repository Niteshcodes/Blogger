import React from 'react';
import MInput from '../components/UI/MInput/MInput';
import MButton from '../components/UI/MButton/MButton';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { useDispatch } from 'react-redux';
import { login } from '../services/login';
import store from '../store/store';
import { Link, useNavigate } from 'react-router-dom';



export type Inputs = {
    email: string
    password: string
}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FieldValues>();


    const handleLogin = async (data: FieldValues) => {
        console.log(data)
        const response = await store.dispatch(login({ email: data.email, password: data.password }))
        if (!response) return;
        if (response.meta.requestStatus === "fulfilled") {
            localStorage.setItem("auth", response?.payload?.token)
            localStorage.setItem("profileImage", response?.payload?.profileImage)
            navigate('/')

        }
        else {
            alert(response?.payload?.message)
        }


    }
    


    const onSubmit: SubmitHandler<FieldValues> = (data) => handleLogin(data);
    return (
        <div className='flex w-[100vw] h-[100vh] justify-center items-center flex-col'>

            <div>
                <img src='/logo.png' className='w-[8vw]' alt="Logo" />
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-[30vw] max-lg:w-[70vw] my-2 flex justify-evenly flex-col gap-5 '>
                    <MInput name='email' label='Email ID' placeholder='Enter your Email' type='email' control={control} />
                    <MInput name='password' label='Password' placeholder='Enter your Password' type='password' control={control} />
                    <MButton className='text-black w-full ' label='Login' type='submit' />
                </form>
                <div>
                    <h2 className='text-sm my-7'>New here <Link to={'/user/signup'} className='text-blue-600 cursor-pointer' >Signup</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
