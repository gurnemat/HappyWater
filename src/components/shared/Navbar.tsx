import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";


const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 md:px-36 py-5">
        <div>
            <Link to={`/`} className="text-3xl italic font-bold tracking-wide text-blue-500">HappyWater~</Link>
        </div>
        {/* <div className="flex items-center">
            <nav>
                <ul className="flex items-center">
                    <li>
                        <Link to={`/`} className="mx-4 font-semibold text-gray-700 hover:text-blue-500">Home</Link>
                    </li>
                    <li>
                        <Link to={`/`} className="mx-4 font-semibold text-gray-700 hover:text-blue-500">About Us</Link>
                    </li>
                    <li>
                        <Link to={`/`} className="mx-4 font-semibold text-gray-700 hover:text-blue-500">Product</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <Link to={`/checkout`} className="border rounded-xl px-4 py-2 bg-blue-500 text-white tracking-wide font-bold">Order Now</Link>
        </div> */}

        <div>
            <SignedOut>
                <Link 
                    className="border rounded-xl px-4 py-2 bg-blue-500 text-white tracking-wide font-semibold" 
                    to="/sign-in">
                    Sign In
                </Link>
            </SignedOut>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </div>
    </header>
  )
}

export default Navbar