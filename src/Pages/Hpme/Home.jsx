import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/Banner/Banner";
import RecentBlog from "./RecentBlog";
import NewsLetter from "./NewsLetter";
import BlogerOfTheMonth from "./BlogerOfTheMonth";
import Photo from "./Photo";
import { motion, useScroll } from "framer-motion";

const Home = () => {
    const { scrollYProgress } = useScroll()
    const { isLoading, data: recentBlog } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch('https://blog-server-eight-beta.vercel.app/blogs')
            return res.json()

        }
    })
    console.log(recentBlog)
    // if(recentBlog){
    //     const latestData = recentBlog.slice(-6);
    // }



    return (
        <>
            <motion.div
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    right: 0,
                    left: 0,
                    background: "red",
                    height: 10,
                    transformOrigin: "0%"
                }}
            >
            </motion.div>

            <Banner></Banner>
            <section
                className="mb-10 mt-20 20 p-3 lg:p-0">
                <h3 className="text-stone-500 my-20 font-bold text-4xl text-center">Recent Blogs</h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

                    {
                        isLoading ? <p>loading...</p> :
                            recentBlog.slice(-6).map(blog => (
                                <RecentBlog key={blog._id} blog={blog}></RecentBlog>
                            ))
                    }
                </div>
            </section>
            {/* news letter  */}
            <section className="my-20">
                <NewsLetter></NewsLetter>
            </section>
            {/* blogger of the month  */}
            <section className="my-20 ">
                <BlogerOfTheMonth></BlogerOfTheMonth>
            </section>
            {/* photo  */}
            <section className="my-20 p-3 lg:p-0">
                <h3 className="text-stone-500 my-20 font-bold text-4xl text-center">Best Instagram Photos</h3>
                <Photo></Photo>
            </section>
        </>
    );
};

export default Home;



