import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const FeaturedBlogs = () => {
    const [featuredPost,setFeaturedPost] = useState([])
    const {isLoading, data: blog } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://blog-server-eight-beta.vercel.app/blogs')
            return res.json()
            
        }
        
    })
    useEffect(()=>{
        if(blog){
            const count = blog.map(item => ({...item,count: item.long_description.split(' ').length}))
        const topBlog = count.sort((a,b)=> b.count - a.count).slice(0,10);
        const PostSerial = topBlog.map((value,index) =>({...value, serial: index+1} ))
        // console.log(PostSerial);
        // setFeaturedPost(topBlog)
        setFeaturedPost(PostSerial)
        }
    },[blog])
    const columns = [
        {
          name: 'Serial Number',
          selector: (row) => row.serial,
        //   sortable: true,
        },
        {
          name: 'Blog Title',
          selector: row => row.title,
        //   sortable: true,
        },
        {
          name: 'Blog Owner',
          selector: row=> row.name,
        //   sortable: true,
        },
        {
          name: 'Owner Profile',
          cell: (row) => <img className="w-14 h-14 rounded-full my-1"  src={row.profile} alt="Profile" />,
        },
        {
          name: 'Cover image',
          cell: (row) => <img className="w-20 h-20  my-1"  src={row.image} alt="place" />,
        },
      ];

    
    return (
        <div>
            <h1>Top 10 Posts</h1>
      <DataTable
        columns={columns}
        data={featuredPost}
        progressPending={isLoading}
      />
        </div>
    );
};

export default FeaturedBlogs;