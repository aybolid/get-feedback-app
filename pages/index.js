import Head from "next/head";
import { useAuth } from "@/lib/firebase/auth";
import { SiGithub } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import { motion } from "framer-motion";

const Home = () => {
  const { authError, signinWithGithub, signinWithGoogle, signout, user } =
    useAuth();

  return (
    <>
      <Head>
        <title>Get Feedback</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
              <div className="flex flex-row justify-center items-center gap-4">
                <button
                  className="btn p-3 bg-black dark:hover:bg-neutral-900 hover:bg-neutral-700"
                  onClick={() => signinWithGithub()}
                >
                  <SiGithub title="Github" size={"25px"} />
                </button>
                <button
                  className="btn p-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
                  onClick={() => signinWithGoogle()}
                >
                  <FcGoogle title="Google" size={"25px"} />
                </button>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-8">
                <button className="btn danger" onClick={() => signout()}>
                  Sign Out
                </button>
                <Link href="/dashboard/sites" className="btn primary">
                  View Dashboard
                </Link>
              </div>
            )}
          </div>
          {authError && (
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              initial={{ height: 0, opacity: 0 }}
              className="dark:bg-neutral-700 bg-sky-100 rounded-lg"
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

export default Home;
