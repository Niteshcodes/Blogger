import React, { useState } from 'react';
import MInput from '../components/UI/MInput/MInput';
import MButton from '../components/UI/MButton/MButton';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { Link, useNavigate } from 'react-router-dom';
import MUpload from '../components/UI/MUpload/MUpload';
import store from '../store/store';
import { SignUp } from '../services/signup';
import { Link } from 'react-router-dom';

export type Inputs = {
    userName: string,
    email: string,
    password: string,
    reEnterPassword: string,
    image?: string
}

const Signup: React.FC = () => {
    const [file, setFile] = useState<File>()
    const { handleSubmit, control } = useForm<FieldValues>();

    const handleSignup = async (data: FieldValues) => {

        try {
            const response = await store.dispatch(SignUp({ userName: data.userName, email: data.email, password: data.password, image: file }))
            console.log(response)
        } catch (error) {
            return error
        }
    }

    const handleFileSelect = (file: File) => {
        console.log("Selected File:", file);
        setFile(file)

    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => handleSignup(data);

    return (
        <div className='flex w-[100vw] h-[100vh] justify-center items-center flex-col'>
            <div>
                <img src='/logo.png' className='w-[8vw]' alt="Logo" />
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-9 '>
                    <MInput name='userName' label='User Name' placeholder='Enter your name' control={control} />
                    <MInput name='email' label='Email ID' placeholder='Enter your Email' type='email' control={control} />
                    <MInput name='password' label='Password' placeholder='Enter your Password' type='password' control={control} />
                    <MInput name='reEnterPassword' label='Re Enter Password' placeholder='Re Enter your Password' type='password' control={control} />
                    <MUpload name='image' label='Upload Profile' className='w-full col-span-2' control={control} onFileSelect={handleFileSelect} />
                    <MButton className='text-black w-full col-span-2 ' label='Signup' type='submit' />
                </form>
                <div>
                    <h2 className='text-sm my-7'>Already have an Account? <Link to={'/user/login'} className='text-blue-600 cursor-pointer' >login</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Signup;
