import { useAuth } from "@/lib/firebase/auth";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.svg";
import { motion } from "framer-motion";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { useRouter } from "next/router";

const DashboardShell = ({ children }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const auth = useAuth();

  return (
    <div className="flex flex-col h-full">
      <nav className=" bg-white dark:bg-neutral-800 dark:text-neutral-200 text-neutral-700 rounded-xl h-20 w-full flex justify-start items-center px-8 py-4">
        <motion.div
          transition={{ duration: 0.3 }}
          whileTap={{ rotate: 360, scale: 1.3 }}
          title="Logo"
          className="w-[60px] cursor-pointer"
        >
          <Image alt="Logo" src={logo} />
        </motion.div>
        <ul className="flex gap-x-5 justify-center items-center h-full mx-20 px-4 text-2xl font-semibold">
          <li>
            <Link
              title="View sites page"
              className={`${
                router.pathname === "/dashboard/sites" &&
                "dark:bg-neutral-700 bg-sky-100"
              } hover:text-neutral-900 hover:bg-sky-200 rounded-xl p-2 dark:hover:text-neutral-50 dark:hover:bg-neutral-600`}
              href="/dashboard/sites"
            >
              Sites
            </Link>
          </li>
          <li>
            <Link
              title="View docs"
              className="hover:text-neutral-900 hover:bg-sky-200 rounded-xl p-2 dark:hover:text-neutral-50 dark:hover:bg-neutral-600"
              href="/dashboard/sites"
            >
              Use Feedback
            </Link>
          </li>
        </ul>
        <div className="flex-grow gap-4 flex justify-end items-center h-full">
          <motion.div
            className="flex justify-center items-center"
            whileTap={{ rotate: 360 }}
          >
            {theme === "light" ? (
              <button
                onClick={() => setTheme("dark")}
                className="opacity-40 active:scale-95 hover:opacity-100 ease-in-out duration-100"
              >
                <MdOutlineDarkMode title="Dark Mode" size={28} />
              </button>
            ) : (
              <button
                onClick={() => setTheme("light")}
                className="opacity-40 active:scale-95 hover:opacity-100 ease-in-out duration-100"
              >
                <MdOutlineLightMode title="Light Mode" size={28} />
              </button>
            )}
          </motion.div>
          {auth?.user ? (
            <button
              title="Log out"
              onClick={() => auth?.signout()}
              className="btn danger"
            >
              Log Out
            </button>
          ) : (
            <Link title="Log in" href="/" className="btn submit">
              Log In
            </Link>
          )}
          <div className="rounded-full flex justify-center items-center overflow-hidden w-12 h-12 bg-sky-500 dark:bg-neutral-600 text-neutral-50">
            {auth?.user?.photoURL ? (
              <Image
                title="User profile photo"
                width={200}
                height={200}
                src={auth.user.photoURL}
                alt="User Photo"
                unoptimized
              />
            ) : (
              <MdOutlineAccountCircle title="User Icon" size={48} />
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow flex flex-col justify-center items-center pt-8 pb-4 text-neutral-600 dark:text-neutral-200">
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;
