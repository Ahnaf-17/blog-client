/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useParams } from "react-router-dom";
import WishListSkull from "./WishListSkull";
import Swal from "sweetalert2";

const WishList = () => {
    const { user } = useContext(AuthContext)
    const [blogs, setWishlistBlogs] = useState([])



    const { isLoading, data: wishlistBlog } =
        useQuery({
            queryKey: ['wishlist', user.email],
            queryFn: async () => {
                const res = await fetch(`https://blog-server-eight-beta.vercel.app/wishlist/${user.email}`)
                // setWishlistBlogs(res.json())
                // console.log('xxxx:',res);
                return res.json()


            }

        })
        // setWishlistBlogs(wishlistBlog)

    // useEffect(()=>{
    //     fetch(`https://blog-server-eight-beta.vercel.app/wishlist/${user.email}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("this is data",data)
    //         setWishlistBlog(data)
    //     })

    // },[user.email])
    // setRemainBlogs(wishlistBlog)


    const handleDeleteWishlist = (id) => {
        fetch(`https://blog-server-eight-beta.vercel.app/wishlist/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your product has been removed.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                        
                    })
                    
                        .then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                                
                            }
                        });
                        
                        const remainingBlog = wishlistBlog?.filter((item) => item._id !== id);
                        console.log(remainingBlog);
                        setWishlistBlogs(remainingBlog);
                }
            });
    };



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            {
                isLoading ? <WishListSkull card={20}></WishListSkull> :
                wishlistBlog.map(item =>
                        <div key={item._id} className="card bg-base-100 shadow-xl  lg:flex">
                            <div>
                                <figure><img className="md:h-[300px] rounded-t-xl md:w-full" src={item.image} alt="Shoes" /></figure>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {item.title}
                                </h2>
                                <p>{item.short_description}</p>
                                <p className="font-semibold">{item.category}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/details/${item.productId}`}>
                                        <button className="badge badge-outline">View details</button>
                                    </Link>
                                    <button onClick={() => handleDeleteWishlist(item._id)} className="badge badge-outline mt-0.5">Remove</button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default WishList;