import Skeleton from "react-loading-skeleton";

const WishListSkull = ({card}) => {
    return (
        Array(card).fill(0).map((item,i) => 
        <div className="card bg-base-100 shadow-xl  lg:flex" key={i}>
            <div className="card-body">
                <p>
                    <Skeleton height={300}></Skeleton>
                </p>
            </div>
            <div className="card-body">
                <h2>
                    <Skeleton></Skeleton>
                </h2>
                <p><Skeleton></Skeleton></p>
                <p className="font-semibold"><Skeleton></Skeleton></p>
                <div className="card-actions justify-end">
                    <button className="badge badge-outline"><Skeleton width={40}></Skeleton></button>
                    <button className="badge badge-outline"><Skeleton width={40}></Skeleton></button>
                </div>
            </div>
        </div>)
        


    );
};

export default WishListSkull;