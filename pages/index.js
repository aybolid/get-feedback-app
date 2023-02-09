import Head from "next/head";
import { motion } from "framer-motion";

import { useAuth } from "@/lib/firebase/auth";

import { SiGithub } from "react-icons/si";

const Home = () => {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Get Feedback</title>
      </Head>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <div className="flex flex-col gap-4 justify-center items-center px-5 py-4 div-block w-80">
            <h1 className="text-neutral-700 dark:text-neutral-200 flex tracking-tighter select-none justify-center items-center h-full px-4 font-bold text-4xl">
              Get Feedback
            </h1>
            <div className="w-line" />
            <div>
              {!auth?.user ? (
                <button
                  className="btn submit"
                  onClick={() => auth.signinWithGithub()}
                >
                  Sign In With Github <SiGithub title="Github" size={"24px"} />
                </button>
              ) : (
                <button className="btn danger" onClick={() => auth.signout()}>
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
