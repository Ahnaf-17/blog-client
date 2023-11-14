
const Photo = () => {
    return (
        <div className="carousel w-full h-[400px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/jMrfxHr/Joshua-Tree-nightskytent.jpg
" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn border-none text-white font-bold bg-transparent">❮</a>
                    <a href="#slide2" className="btn border-none text-white font-bold bg-transparent">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/mXpGbS2/depositphotos-507280084-stock-photo-warm-cozy-campfire-forest-pond.webp
" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn border-none text-white font-bold bg-transparent">❮</a>
                    <a href="#slide3" className="btn border-none text-white font-bold bg-transparent">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/fxnhh15/dogwood-jeep-tour.jpg
" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn border-none text-white font-bold bg-transparent">❮</a>
                    <a href="#slide4" className="btn border-none text-white font-bold bg-transparent">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/VT4bcfD/hiking-tips.jpg
" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn border-none text-white font-bold bg-transparent">❮</a>
                    <a href="#slide1" className="btn border-none text-white font-bold bg-transparent">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Photo;