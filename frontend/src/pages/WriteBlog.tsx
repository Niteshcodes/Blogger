import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MButton from '../components/UI/MButton/MButton';
import MEditor from '../components/UI/MEditor/MEditor';
import MInput from '../components/UI/MInput/MInput';
import MUpload from '../components/UI/MUpload/MUpload';
import { createBlog, updateBlog } from '../services/Blogs';
import store from '../store/store';
// import { Blog } from './Home';
import { IBlogData } from './Blog';
import { useNavigate } from 'react-router-dom';

interface IWriteBlog {
    mode?: "Edit" | "Write";
    initialValues?: IBlogData

}

export default function WriteBlog(props: IWriteBlog) {
    const [file, setFile] = useState<File>();
    const [content, setContent] = useState<string>();
    const { handleSubmit, control } = useForm<FieldValues>();
    const navigate = useNavigate()


    const submitPost = async (data: FieldValues) => {
        const token = localStorage.getItem('auth')
        if (!token) return alert("you are not authenticated ")
        const blogContent = content || props?.initialValues?.content

        if (!blogContent) return alert(props.initialValues?.content.length)

        else {
            try {

                const payload = { title: data.title, subTitle: data.description, content: blogContent, image: file, token: token }
                if (props.mode !== "Edit") {
                    const response = await store.dispatch(createBlog(payload))
                    if (response) {
                        console.log(response)
                        navigate("/blog/id?=" +response?.payload.data._id)
                        alert(response?.payload?.message)

                    }
                }
                else {
                    if (!props.initialValues?._id) return alert("No blog Found, Please refresh you page")
                    const response = await store.dispatch(updateBlog({ ...payload, id: props.initialValues._id }))
                    if (response) {
                        navigate("/blog/id?=" + props?.initialValues?._id)
                        alert(response?.payload?.message)

                    }
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
            <h2 className='text-[5vh] font-sans font-bold text-center my-4'>{props.mode || "write"} Here</h2>
            <div className='w-[80vw] m-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'  >
                    <MInput label='Title' name='title' control={control} defaultValue={props?.initialValues?.title} />
                    <MInput label='Description' name='description' control={control} className='my-3' defaultValue={props?.initialValues?.subTitle} />
                    <MUpload name='image' label='Upload Cover' className='w-full col-span-2 my-3' onFileSelect={handleFileSelect} />
                    <MEditor getValue={handleContent} defaultValue={props.initialValues?.content} />
                    <MButton label='save' type='submit' className='bg-red-500 border-none my-3' />
                </form>
            </div>
        </div>
    )
}
