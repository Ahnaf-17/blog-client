/* eslint-disable no-unused-vars */
import BlogCard from "./BlogCard";
import { useQuery } from "@tanstack/react-query";
import AllBlogSkull from "./AllBlogSkull";
import { useEffect, useState } from "react";

const AllBlog = () => {
    // const blog = useLoaderData()
    // const { loading } = useContext(AuthContext)
    // const [loading,setLoading] = useState(true)
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [blog,setBlog] = useState([])
    
    const { isLoading, data: fetchedblog } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://blog-server-eight-beta.vercel.app/blogs')
            return res.json()
            // https://blog-server-eight-beta.vercel.app

        }
    })
    useEffect(()=>{
        setBlog(fetchedblog || [])
    },[fetchedblog])

    const handleFilter = (category) => {
        setFilter(category)
        onProcess(category,search)
    }
    const handleSearch = (title) => {
        setSearch(title)
        onProcess(filter,title)
    }
    const onProcess = (category,title)=>{
        const finalBlog = fetchedblog.filter(blogs => category === '' || blogs.category === category).filter(blogs => search === '' || blogs.title.toLowerCase().includes(search.toLowerCase()))
        setBlog(finalBlog)
    }


    return (
        <div >
            <div className="mb-6">
                <div className="lg:flex lg:flex-row md:flex-row flex-col-reverse  items-center  lg:justify-around">
                    <div className="flex items-center justify-center mb-3 md:mb-0">
                        <label  className="pr-2 font-semibold">Filter by Category:</label>

                        <select onChange={(e) => handleFilter(e.target.value)} className="select select-bordered w-full max-w-xs">
                        <option value="">All</option>
                            <option value="one-day-tour">One-day Tour</option>
                            <option value="backpack-tour">Backpack Tour</option>
                            <option value="camping-tour">Camping</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="search" className="pr-2 font-semibold">Search by Title:</label>
                        <div className="form-control">
                            <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-14 my-16 ">
                {/* {
                    loading && ''
                } */}

                {
                    isLoading ? <AllBlogSkull card={20}></AllBlogSkull> :
                        blog.map(blog => <BlogCard key={blog.id} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default AllBlog;



