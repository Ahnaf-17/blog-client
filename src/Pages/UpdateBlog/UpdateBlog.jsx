import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

const UpdateBlog = () => {
    const {user} = useContext(AuthContext)

    // const { isLoading, data: AllBlog } = useQuery({
    //     queryKey: ['blogs'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://blog-server-eight-beta.vercel.app/blogs/${params.id}}`)
    //         return res.json()
    //     }
    // })
    // if(isLoading){
    //     return <p>Loading...</p>
    // }
    const blogs = useLoaderData()

    const {_id, title, image, short_description, long_description,category,datetime } = blogs || {}
    const handleUpdateBlog = e =>{
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const image = form.image.value;
        const short_description = form.short_description.value;
        const long_description = form.long_description.value;
        const datetime = form.datetime.value;
        const name = user.displayName
        const profile = user.photoURL
        const userEmail = user.email

        const updatedBlog = {title,category,image,short_description,long_description,datetime,name,profile,userEmail
        };
        console.log(updatedBlog)

        fetch(`https://blog-server-eight-beta.vercel.app/blogs/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json" 
            },
            body: JSON.stringify(updatedBlog)
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                Swal.fire({
                    title: 'Success!',
                    text: 'blog updated',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })

    }
    
    return (
        <div>
        <div className="bg-base-100 p-24">
        <h2 className="text-2xl text-black text-center font-bold">Update a blog</h2>
        <form onSubmit={handleUpdateBlog
}>
            <div className="md:flex">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text text-white">Title</span>
                    </label>
                    <label className="input-group">
                        <input type="text" defaultValue={title} placeholder="Blog title"
                            name="title" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 md:ml-3">
                    <label className="label">
                        <span className="label-text text-white">Category</span>
                    </label>
                    <select defaultValue={category} className="h-[46px]" name="category" id="category">
                        <option value="one-day-tour">One-day Tour</option>
                        <option value="backpack-tour">Backpack Tour</option>
                        <option value="camping-tour">Camping</option>
                    </select>
                </div>
            </div>
            <div className="md:flex">


                <div className="form-control md:w-1/2 ">
                <label className="label">
                        <span className="label-text text-white"> Photo URL</span>
                    </label>
                    <label className="input-group">
                        <input type="text" defaultValue={image} name="image" placeholder="photo url" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 md:ml-3">
                    <label className="label">
                        <span className="label-text  text-white">Short  Details</span>
                    </label>
                    <label className="input-group">
                        <input type="text" defaultValue={short_description} name="short_description" placeholder="Short details" className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 md:ml-3">
                    <label className="label">
                        <span className="label-text text-white">Date</span>
                    </label>
                    <label className="input-group">
                        <input type="datetime-local" defaultValue={datetime} name="datetime" id="" />
                    </label>
                </div>

            </div>
            <div className="">

                <div className="form-control md:w-full mt-5">
                    <textarea className="rounded-md" name="long_description" defaultValue={long_description} id="" cols="30" rows="10" placeholder="write details here"></textarea>
                </div>
            </div>

            <input type="submit" value="Update Blog" className="btn btn-block bg-gray-700 text-white mt-5 " />

        </form>
    </div>
    </div>
    );
};

export default UpdateBlog;