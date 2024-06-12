import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="w-full lg:w-1/2 mx-auto flex flex-col items-center my-20 md:my-14">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
        <h1 className="text-4xl lg:text-5xl text-center font-bold text-blue-900">Stay Balanced, <span className="underline decoration-wavy">Stay Hydrated</span></h1>
        <p className="text-lg my-10 text-center text-blue-950 px-6 md:px-24">Our advanced filtration technology provides clean, crisp, and alkaline water that promotes optimal health and hydration. Elevate your water to the next level.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-3 md:space-y-0 space-x-0 md:space-x-3">
            <Link 
              to={`/checkout?type=Alkaline Water`} 
              className="flex flex-col items-center border rounded-xl px-6 py-3 bg-white text-blue-900 border-blue-900 hover:scale-105 tracking-wide font-bold shadow-lg transition duration-200 space-y-2">
                <img src="https://images.ctfassets.net/x1vbd41hpla5/7dbmzoVnvHFpU3S3vo7r6n/84d946b00ce04e698559375ef43c5e70/18500505.png?w=286&fm=webp" alt="" className="h-56" />
                <h5>Alkaline Water</h5>
                <button className="w-full rounded-xl px-6 py-2 bg-blue-500 text-white border-blue-900 hover:border hover:text-blue-900 hover:bg-white tracking-wide font-bold">Buy Now</button>
              </Link>
            <Link 
              to={`/checkout?type=Filtered Water`} 
              className="flex flex-col items-center border rounded-xl px-6 py-3 bg-white text-blue-900 border-blue-900 hover:scale-105 tracking-wide font-bold mr-4 shadow-lg transition-all duration-200 space-y-2">
                <img src="https://images.ctfassets.net/x1vbd41hpla5/7dbmzoVnvHFpU3S3vo7r6n/84d946b00ce04e698559375ef43c5e70/18500505.png?w=286&fm=webp" alt="" className="h-56" />
                <h5>Filtered Water</h5>
                <button className="w-full rounded-xl px-6 py-2 bg-blue-500 text-white border-blue-900 hover:border hover:text-blue-900 hover:bg-white tracking-wide font-bold">Buy Now</button>
              </Link>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 space-y-3 md:space-y-0 space-x-0 md:space-x-3 -translate-y-0">
          <Link 
            to={`/checkout?type=Alkaline Water`} 
            className="flex flex-col items-center  transition duration-200 space-y-2 group">
            <img src="https://images.ctfassets.net/x1vbd41hpla5/7dbmzoVnvHFpU3S3vo7r6n/84d946b00ce04e698559375ef43c5e70/18500505.png?w=286&fm=webp" alt="" className="h-50 translate-y-28 group-hover:translate-y-24 transition duration-300" />
            <div className="w-full h-48 rounded-xl bg-blue-200 flex flex-col items-center justify-end tracking-wide font-bold mr-4 p-3">
              <h5 className="mb-2">Alkaline Water</h5>
              <button className="w-full rounded-xl px-6 py-2 bg-blue-500 text-white border hover:border-blue-900 hover:text-blue-900 hover:bg-white tracking-wide font-bold transition duration-300">Buy Now</button>
            </div>
          </Link>
          <Link 
            to={`/checkout?type=Filtered Water`} 
            className="flex flex-col items-center  transition duration-200 space-y-2 group">
            <img src="https://images.ctfassets.net/x1vbd41hpla5/7dbmzoVnvHFpU3S3vo7r6n/84d946b00ce04e698559375ef43c5e70/18500505.png?w=286&fm=webp" alt="" className="h-50 translate-y-28 group-hover:translate-y-24 transition duration-300" />
            <div className="w-full h-48 rounded-xl bg-green-200 flex flex-col items-center justify-end tracking-wide font-bold mr-4 p-3">
              <h5 className="mb-2">Filtered Water</h5>
              <button className="w-full rounded-xl px-6 py-2 bg-green-500 text-white border hover:border-blue-900 hover:text-blue-900 hover:bg-white tracking-wide font-bold transition duration-300">Buy Now</button>
            </div>
          </Link>
        </div> */}
        
    </div>
  )
}

export default Hero


