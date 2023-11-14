import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error)
            })
    }

    const navLinks = <>
        <li><NavLink to='/' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>Home</NavLink></li>

        <li><NavLink to='/addBlog' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>Add Blog</NavLink></li>

        <li><NavLink to='/allBlogs' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>All Blogs</NavLink></li>

        <li><NavLink to='/featured' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>Featured Blogs</NavLink></li>

        <li><NavLink to='/wishlist' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>Wishlist</NavLink></li>

        {/* <li><NavLink to='/login' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>Login</NavLink></li>
        <li><NavLink to='/register' className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-stone-500 font-bold underline" : ""
        }>Register</NavLink></li> */}
    </>
    return (
        <div className="navbar  bg-base-100 text-neutral-content h-28 lg:mb-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn bg-base-100 border-none lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navLinks}
                    </ul>
                </div>

                <Link to='/'><img src="https://i.ibb.co/1d47m0n/logo.png" alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-black">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {/* https://i.ibb.co/fqgXySz/avater.png */}
                <div className="dropdown dropdown-end">
                    {
                        user ?
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                {
                                    user.photoURL ?
                                        <div className="w-10 rounded-full">
                                            <img src={user.photoURL} alt="https://i.ibb.co/fqgXySz/avater.png" />
                                        </div>
                                        :
                                        <div className="w-10 rounded-full">
                                            <img src='https://i.ibb.co/fqgXySz/avater.png' alt="" />
                                        </div>
                                }
                            </label>
                            :
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://i.ibb.co/ZBXgGBM/user.png" />
                                </div>
                            </label>
                    }

                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
                        <li>
                            {
                                user ?
                                    <div className="flex flex-col items-start justify-start text-left">
                                        <p>Welcome,{user.displayName}</p>
                                        <button onClick={handleLogOut} className="btn">Log out</button>
                                    </div>
                                    :
                                    <div>
                                        <Link to='/login'>
                                            <button className="btn bg-stone-400 font-bold text-black">Login</button>
                                        </Link>
                                        <Link to='/register'>
                                            <button className="btn bg-stone-400 font-bold text-black">Register</button>
                                        </Link>
                                    </div>
                            }
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default Navbar;