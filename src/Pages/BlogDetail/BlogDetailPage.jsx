/* eslint-disable react/prop-types */
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
// import { useQuery } from '@tanstack/react-query';
// import Comment from './Comment';

const BlogDetailPage = ({ selectedBlog }) => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const { _id, title, image, short_description, long_description, userEmail } = selectedBlog || {}

    const BlogOwner = user.email == userEmail;

    const handleComment = e => {
        e.preventDefault();
        const form = e.target;
        const commentTxt = form.comment.value
        const userEmail = user.email
        const userName = user.displayName
        const profile = user.photoURL

        const newComment = { comment: commentTxt, userEmail, userName, profile, cmtID: _id }
        console.log(newComment);

        fetch('https://blog-server-eight-beta.vercel.app/comment', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'comment added',
                        icon: 'success',
                        confirmButtonText: 'Cool'

                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                            
                        }
                    });
                }
            })
    }

    const { isLoading, data: comment } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch('https://blog-server-eight-beta.vercel.app/comment')
            return res.json()
            // https://blog-server-eight-beta.vercel.app

        }
    })
    useEffect(() => {
        if(comment !== undefined){
            const filteredCmt = comment.filter(item => item.cmtID === _id);
        setComments(filteredCmt)
        // setComments(comment)
        }
    }, [_id, comment])




    return (
        <PhotoProvider>
            <div>
                <div className="hero md:min-h-16 bg-base-100">

                    <div className="hero-content flex-col lg:flex-row">
                        <div className="foo">
                            <PhotoView key={_id} src={image}>
                                <img className="md:max-w-xl max-w-sm rounded-lg shadow-2xl" src={image || <Skeleton></Skeleton>} alt="" />
                            </PhotoView>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold">{title}</h1>
                            <p className="py-6">{short_description}</p>
                            {/* {
                                BlogOwner ? <button classNameName='btn bg-stone-400 text-white'>Update Blog</button> : ''
                            } */}
                            {
                                BlogOwner ? <Link to={`/UpdateBlog/${_id}`}>
                                    <button className='btn bg-stone-400 text-white'>Update Blog</button>
                                </Link> : ''
                            }
                            {/* <Link to={`/UpdateBlog/${_id}`}>
                                    <button classNameName='btn bg-stone-400 text-white'>Update Blog</button>
                                </Link> */}

                        </div>
                    </div>
                </div>
                <div className="mg:px-20 md:py-16 p-5">
                    <p>{long_description}</p>
                </div>
                {
                    !BlogOwner ?
                        <form onSubmit={handleComment} className='my-10 flex-col ml-4'>
                            <div>
                                <h3 className='text-xl font-semibold text-black mb-2'>Comment : </h3>
                                <textarea name='comment' placeholder="Write Your Comment" className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>
                            </div>
                            <div>
                                <input type="submit" value="Post" className="btn  bg-gray-700 text-white h-10 " />
                            </div>

                        </form> : 'Can not comment on own blog'
                }
                {
                    isLoading ? <p>loading..</p> :
                        comments.map(cmt =>


                            <div key={cmt.id} className=" border-t-2  border-stone-400 relative my-6 flex w-full max-w-[26rem] flex-col rounded-xl   text-gray-700 shadow-none">
                                <div className="relative flex items-center gap-4 pt-0 pb-4 pl-3 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                                    <img
                                        src={cmt.profile}
                                        alt="tania andrew"
                                        className="relative inline-block h-[38px] w-[38px] !rounded-full object-cover object-center"
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                {cmt.userName}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-0 mb-6 pl-3">
                                    <p className="block border-black font-sans text-xl antialiased font-light leading-relaxed text-inherit">
                                        {cmt.comment}
                                    </p>
                                </div>
                            </div>



                        )

                }



            </div>
        </PhotoProvider>
    );
};

export default BlogDetailPage;