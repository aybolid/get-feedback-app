import { useAuth } from "@/lib/firebase/auth";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Auth = () => {
  const {
    authError,
    signinWithRedirectGithub,
    signinWithRedirectGoogle,
    signout,
    user,
  } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="flex flex-col gap-4 justify-center items-center px-5 py-4 bg-white dark:bg-neutral-800 rounded-lg w-80">
          <div className="flex flex-col justify-center items-center mb-10">
            <div className="w-[80px] mt-1">
              <Image alt="Logo" src={logo} />
            </div>
            <h1 className="text-neutral-700 dark:text-neutral-200 flex tracking-tighter select-none justify-center items-center h-full px-4 font-bold text-4xl">
              Get Feedback
            </h1>
          </div>
          <div>
            {!user ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  title="Sign in with Github"
                  className="btn p-3 bg-black dark:hover:bg-neutral-900 hover:bg-neutral-700 shadow-md"
                  onClick={() => {
                    signinWithRedirectGithub();
                  }}
                >
                  <SiGithub title="Github" size={"25px"} /> Sign In With Github
                </button>
                <button
                  title="Sign in with Google"
                  className="btn p-3 bg-neutral-100 dark:bg-white dark:hover:bg-neutral-300 hover:bg-neutral-200 text-neutral-900 shadow-md"
                  onClick={() => signinWithRedirectGoogle()}
                >
                  <FcGoogle title="Google" size={"25px"} /> Sign In With Google
                </button>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-8">
                <button
                  title="Sign out"
                  className="btn danger"
                  onClick={() => signout()}
                >
                  Sign Out
                </button>
                <Link
                  title="Vies dashboard page"
                  href="/dashboard/sites"
                  className="btn primary"
                >
                  View Dashboard
                </Link>
              </div>
            )}
          </div>
          {authError && (
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              initial={{ height: 0, opacity: 0 }}
              className="dark:bg-neutral-700 bg-neutral-100 rounded-lg"
            >
              <p className="p-4 text-red-400 dark:text-red-500 font-mono">
                {authError.message.replace("Firebase:", "")}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
