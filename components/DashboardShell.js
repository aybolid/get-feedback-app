import { useAuth } from "@/lib/firebase/auth";
import Image from "next/image";
import React from "react";

import { MdOutlineAccountCircle } from "react-icons/md";

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <div className="flex flex-col h-full">
      <nav className=" bg-white dark:bg-neutral-800 dark:text-neutral-200 text-neutral-700 rounded-xl h-20 w-full flex justify-start items-center px-8 py-4">
        <h1 className="text-neutral-900 dark:text-neutral-50 flex tracking-tighter select-none justify-center items-center h-full px-4 font-bold text-4xl">
          GF
        </h1>
        <div className="h-line" />
        <ul className="flex gap-x-5 justify-center items-center h-full mx-20 px-4 text-2xl font-semibold">
          <li>
            <a
              className="hover:text-neutral-900 hover:bg-sky-100 rounded-xl p-2 dark:hover:text-neutral-50 dark:hover:bg-neutral-600 duration-150 ease-in-out"
              href="https://google.com"
              rel="noreferrer"
              target="_blank"
            >
              Sites
            </a>
          </li>
          <li>
            <a
              className="hover:text-neutral-900 hover:bg-sky-100 rounded-xl p-2 dark:hover:text-neutral-50 dark:hover:bg-neutral-600 duration-150 ease-in-out"
              href="https://google.com"
              rel="noreferrer"
              target="_blank"
            >
              Feedback
            </a>
          </li>
        </ul>
        <div className="flex-grow gap-4 flex justify-end items-center h-full">
          <div className="h-line" />
          <a
            className="text-xl"
            href="https://google.com"
            rel="noreferrer"
            target="_blank"
          >
            {auth?.user ? auth?.user?.name : "User Name"}
          </a>
          <div className="rounded-full flex justify-center items-center overflow-hidden w-12 h-12 bg-sky-500 dark:bg-neutral-600 text-neutral-50">
            {auth?.user ? (
              <Image alt="User Photo" />
            ) : (
              <MdOutlineAccountCircle title="User Icon" size={50} />
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
