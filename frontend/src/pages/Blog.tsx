
// import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/store"
import { useEffect, useState } from "react";

import '../App.css'
import getCurrentBlog from "../components/Shared/GetCurrentBlog";

const customStyle = `
 #blogDisplay ol,#blogDisplay ul,#blogDisplay menu {
        list-style: revert !important;
       margin: revert !important;
    padding: revert !important;
       }
`

export interface IBlogData {
    _id: string,
    title: string,
    subTitle:string;
    content: string,
    image: string,
    writtenBy: string
}


export default function Blog() {
    const [blogData, setBlogData] = useState<IBlogData>();
    const data = useAppSelector((state) => state.blog)
    // const getCurrentBlog = async (id: string) => {
    //     const token = localStorage.getItem('auth')
    //     if (!token) return alert("you are not authenticated")
    //     else {
    //         try {
    //             const response = await store.dispatch(fetchOneBlog({ id: id, token: token }))
    //             return response

    //         } catch (error) {
    //             return console.log(error)

    //         }
    //     }
    // }
    useEffect(() => {
        const blogId = window.location.href.split("=")[1]
        getCurrentBlog(blogId).then((data) => {
            setBlogData({ ...data?.payload?.data[0], image: data?.payload?.data[0]?.image && `http://localhost:8000/api/profile/${data?.payload?.data[0].image}` || '/logo.png' })
        })

    }, [])


    return (
        <>
            {data.isLoading && <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">blog is Loading...</p>}
            {blogData &&
                <div className="w-[80vw] h-[100vh] m-auto my-2 ">
                    <div className={`w-full  flex justify-center items-center my-5  h-[30vh] overflow-hidden relative`}   >

                        <h2 className="text-[2rem] py-3 absolute border bg-white px-3 font-sans font-bold ">
                            {blogData.title} <br />
                            <p className="text-sm text-center"> Author :-   {blogData.writtenBy || "Nitesh"}</p>
                        </h2>
                        <img src={blogData.image} width={"100%"} />
                    </div>
                    <div className=" bg-[#18181818] p-6">

                        <div id="blogDisplay">
                            <style>
                                {customStyle}
                            </style>
                            <div className="" dangerouslySetInnerHTML={{ __html: blogData.content }} >

                            </div>
                        </div>

                    </div>
                </div >

            }
        </>
    )
}
