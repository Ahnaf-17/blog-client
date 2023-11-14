/* eslint-disable react/prop-types */


const Comment = ({cmt}) => {
    const { userName,comment } = cmt;

    return (
        <div className="card bg-base-100 shadow-xl  lg:flex">
            <div>
                {/* <figure><img className="md:h-[300px] rounded-t-xl md:w-full" src={image} alt="Shoes" /></figure> */}
            </div>
            <div className="card-body">
                <h2 className="card-title">
                    {userName}
                </h2>
                <p>{comment}</p>
                <div className="card-actions justify-end">
                </div>
            </div>
        </div>
    );
};

export default Comment;