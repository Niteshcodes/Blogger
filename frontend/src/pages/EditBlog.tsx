import React, { useEffect, useState } from 'react'
import WriteBlog from './WriteBlog'
import getCurrentBlog from '../components/Shared/GetCurrentBlog'
import { IBlogData } from './Blog';

export default function EditBlog() {
  const [blogData, setBlogData] = useState<IBlogData>();

  useEffect(() => {
    const blogId = window.location.href.split("=")[1]
    getCurrentBlog(blogId).then((data) => {
      setBlogData({ ...data?.payload?.data[0], image: data?.payload?.data[0]?.image && `http://localhost:8000/api/profile/${data?.payload?.data[0].image}` || '/logo.png' })
    })

  }, [])
  return (
    <>
      {blogData && <div>
        <WriteBlog mode="Edit" initialValues={blogData} />
      </div>}
    </>
  )
}
