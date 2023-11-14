import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetailPage from "./BlogDetailPage";

import 'react-loading-skeleton/dist/skeleton.css'
import BlogSkull from "./BlogSkall";

const BlogDetail = () => {
    const [selectedBlog, setSelectedBlog] = useState();
    const { _id } = useParams()

    const { isPending, data: AllBlog } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://blog-server-eight-beta.vercel.app/blogs')
            return res.json()
        }
    })


    useEffect(() => {
        const findDetails = AllBlog?.find(selectedBlog => selectedBlog._id == _id);
        setSelectedBlog(findDetails)
    }, [AllBlog, _id])

    if (isPending) {
        return <BlogSkull></BlogSkull>
        // <span className="loading loading-spinner loading-lg"></span>

    }

    return (
        <div>
            <BlogDetailPage selectedBlog={selectedBlog}></BlogDetailPage>
        </div>
    );
};

export default BlogDetail;