import React, { useEffect } from 'react';
import Card from '../components/Shared/Card';
import store, { useAppSelector } from '../store/store';
import { deleteBlog, fetchBlogs, fetchOneBlog } from '../services/Blogs';
import { useNavigate } from 'react-router-dom';
import MPaginator from '../components/UI/MPaginator/MPaginator';

interface Blog {
    _id: string
    title: string
    content: string
    image: string
}

export interface IPagePayload {
    currentPage: number, limit: number
}

export interface IPaginator { first: number, rows: number, page: number, pageCount: number }

const Home: React.FC = () => {
    const blogs = useAppSelector((state) => state.blog);
    const paginator = useAppSelector((state) => state.pagination)
    const navigate = useNavigate()

    const handleBlogData = async (pagination: IPagePayload) => {
        const token = localStorage.getItem('auth');
        if (token) {
            const data = await store.dispatch(fetchBlogs({ token: token, pagination: pagination }));

            return data;
        }
    }

    useEffect(() => {
        handleBlogData({ currentPage: 0, limit: 10 });
    }, []);

    const handleCardClick = async (itemId: string) => {
        const token = localStorage.getItem('auth')
        if (!token) return alert("you are not authenticated")
        else {
            try {
                const payload = { id: itemId, token: token }
                const response = await store.dispatch(fetchOneBlog(payload))

                if (response) {
                    // setSearchParams( { id: response.payload.data[0]._id });
                    navigate('/blog/id?=' + response.payload.data[0]._id)
                }
            } catch (error) {
                console.log(error)

            }
        }


    }
    const handlePageChange = ({ page, rows }: IPaginator) => {

        handleBlogData({ currentPage: page, limit: rows });


    }

    const handleEdit = (id: string) => {
        console.log(id)
    }
    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('auth')
        if (!token) return
        else {
            try {
                const response = await store.dispatch(deleteBlog({ id, token }))
                if (response) {
                    handleBlogData({ currentPage: paginator.pagination.page, limit: paginator.pagination.rows })
                }
                return response
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <>
            {/* {console.log(blogs.data.data)} */}
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-10 p-5">
                {blogs.data.data && blogs?.data?.data.map((item: Blog) => (
                    <div id={item._id} key={item._id}>
                        <Card description={item.content} image={item.image} title={item?.title} id={item._id} onClick={handleCardClick} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </div>
                ))}

            </div>
            {/* {console.log(blogs)} */}
            {blogs.data.data && <div>
                <MPaginator perPage={10} rows={5} totalRecords={blogs.data.totalRecords} callback={handlePageChange} />
            </div>}
        </>
    );
};

export default Home;
