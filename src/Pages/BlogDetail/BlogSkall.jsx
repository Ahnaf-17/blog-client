import Skeleton from "react-loading-skeleton";

const BlogSkull = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <div className="flex gap-2 ">
                <div>
                    <h1 className="font-bold">{<Skeleton width={600} height={300} count={1}></Skeleton>}</h1>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">{<Skeleton width={500} height={40} count={1}></Skeleton>}</h1>
                    <h1 className="">{<Skeleton width={400} height={20} count={1}></Skeleton>}</h1>
                </div>
            </div>
            <div>
                <p className="py-6"><Skeleton count={10}></Skeleton></p>

            </div>
        </div>
    );
};

export default BlogSkull;