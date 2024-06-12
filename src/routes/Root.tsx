import Navbar from "@/components/shared/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function Root() {
  const navigate = useNavigate();

    return (
      <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}>
        <>
        <Navbar />
        <div>
            <Outlet />
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        </>
      </ClerkProvider>
    );
  }
  