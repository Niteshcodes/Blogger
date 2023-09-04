
// import { useSearchParams } from "react-router-dom";
import store, { useAppSelector } from "../store/store"
import { useEffect, useState } from "react";
import { fetchOneBlog } from "../services/Blogs";

interface IBlogData {
    _id: string,
    title: string,
    content: HTMLBodyElement,
    image: string,
}


export default function Blog() {
    const [blogData, setBlogData] = useState<IBlogData>();
    const data = useAppSelector((state) => state.blog)
    const getCurrentBlog = async (id: string) => {
        const token = localStorage.getItem('auth')
        if (!token) return alert("you are not authenticated")
        else {
            try {
                const response = await store.dispatch(fetchOneBlog({ id: id, token: token }))
                return response

            } catch (error) {
                return console.log(error)

            }
        }
    }
    useEffect(() => {
        const blogId = window.location.href.split("=")
        getCurrentBlog(blogId[1]).then((data) => {
            setBlogData({ ...data?.payload?.data[0], image: data?.payload?.data[0]?.image && `http://localhost:8000/api/profile/${data?.payload?.data[0].image}` || '/logo.png' })
        })

    }, [])


    return (
        <>
            {data.isLoading && <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">blog is Loading...</p>}
            {blogData &&
                <div className="w-[80vw] h-[100vh] m-auto my-2 ">
                    <div className={`w-full  flex justify-center items-center my-5 overflow-hidden `}   >
                        <img src={blogData.image} width={"30%"}  />
                    </div>
                    <div className="px-5 bg-[#18181818]">
                        <h2 className="text-[2rem] py-3 ">{blogData.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: blogData.content }}>

                        </div>
                    </div>
                </div >
            }
        </>
    )
}
