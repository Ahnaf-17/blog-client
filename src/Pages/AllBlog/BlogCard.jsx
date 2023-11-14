/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const BlogCard = ({ blog }) => {
    const { _id, title, image, short_description, long_description, category } = blog;
    const { user } = useContext(AuthContext)

    const handleWishlist = () => {
        const wishlistBlog = { user, title, category, image, short_description, long_description,productId:_id };

        // const isExist = 

        fetch('https://blog-server-eight-beta.vercel.app/wishlist', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(wishlistBlog)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'blog added to wishlist',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })


    }


    return (

        <div className="card bg-base-100 shadow-xl  lg:flex">
            <div>
                <figure><img className="md:h-[300px] rounded-t-xl md:w-full" src={image} alt="Shoes" /></figure>
            </div>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                </h2>
                <p>{short_description}</p>
                <p className="font-semibold">{category}</p>
                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}>
                        <button className="badge badge-outline">View details</button>
                    </Link>
                    <button onClick={handleWishlist} className="badge badge-outline mt-0.5">Wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
// lg:h-64