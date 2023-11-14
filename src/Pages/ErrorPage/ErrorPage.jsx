import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="items-center flex justify-center flex-col">
            <img className="" src="https://i.ibb.co/RvTddkR/404-page-n3.png" alt="" />
            <Link to='/'>
            <button className="bg-gray-400 btn text-white">Back to Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;