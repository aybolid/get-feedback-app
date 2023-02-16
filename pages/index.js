import Head from "next/head";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/firebase/auth";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import logoDark from "../public/logo-dark.svg";
import logoLight from "../public/logo-light.svg";
import { useTheme } from "next-themes";

const Home = () => {
  const { theme } = useTheme();
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Get Feedback</title>
      </Head>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <div className="flex flex-col gap-4 justify-center items-center px-5 py-4 div-block w-80">
            <div className="flex justify-center items-center mb-10">
              <div className="w-[35px] mt-1">
                <Image
                  alt="Logo"
                  src={theme === "light" ? logoLight : logoDark}
                />
              </div>
              <h1 className="text-neutral-700 dark:text-neutral-200 flex tracking-tighter select-none justify-center items-center h-full px-4 font-bold text-4xl">
                Get Feedback
              </h1>
            </div>
            <div>
              {!auth?.user ? (
                <button
                  className="btn submit"
                  onClick={() => auth.signinWithGithub()}
                >
                  Sign In With Github <SiGithub title="Github" size={"24px"} />
                </button>
              ) : (
                <div className="flex flex-row justify-center items-center gap-8">
                  <button className="btn danger" onClick={() => auth.signout()}>
                    Sign Out
                  </button>
                  <Link href="/dashboard/sites" className="btn primary">
                    View Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
