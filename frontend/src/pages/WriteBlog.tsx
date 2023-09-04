import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MButton from '../components/UI/MButton/MButton';
import MEditor from '../components/UI/MEditor/MEditor';
import MInput from '../components/UI/MInput/MInput';
import MUpload from '../components/UI/MUpload/MUpload';
import { createBlog } from '../services/Blogs';
import store from '../store/store';



export default function WriteBlog() {
    const [file, setFile] = useState<File>()
    const [content, setContent] = useState<string>()
    const { handleSubmit, control } = useForm<FieldValues>();

    const submitPost = async (data: FieldValues) => {
        const token = localStorage.getItem('auth')
        if (!token || !content?.length) return alert("you are not authenticated")
        else {
            try {
                const response = await store.dispatch(createBlog({ title: data.title, subTitle: data.description, content: content, image: file, token: token }))
                if (response.type === "createBlog/fulfilled") {
                    alert(response.payload.message)
                }

            } catch (error) {
                console.log(error)
            }
        }

    }
    const handleFileSelect = (file: File) => {

        console.log("Selected File:", file);
        setFile(file)

    }
    const handleContent = (data: string) => {
        setContent(data);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => submitPost(data);


    return (

        <div>
            <h2 className='text-[5vh] font-sans font-bold text-center my-4'>Write Here</h2>
            <div className='w-[80vw] m-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'  >
                    <MInput label='Title' name='title' control={control} />
                    <MInput label='Description' name='description' control={control} className='my-3' />
                    <MUpload name='image' label='Upload Cover' className='w-full col-span-2 my-3' control={control} onFileSelect={handleFileSelect} />
                    <MEditor getValue={handleContent} />
                    <MButton label='Save' type='submit' className='bg-red-500 border-none my-3' />
                </form>
            </div>
        </div>
    )
}
