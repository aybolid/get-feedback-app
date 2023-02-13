import { format, parseISO } from "date-fns";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiExternalLinkLine } from "react-icons/ri";
import { motion } from "framer-motion";

import AddSiteModal from "../../Modals/AddSiteModal";
import { useAuth } from "@/lib/firebase/auth";
import Link from "next/link";

const SitesTable = ({ sites }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const auth = useAuth();

  const notifySuccess = () =>
    toast.success("Site was added! 👌", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notifyError = () =>
    toast.error("Unexpected error... 🙅‍♂️", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 1000 }}
        className="flex-grow bg-white dark:bg-neutral-800 w-5/6 rounded-lg flex flex-col justify-center"
      >
        <div className="p-6 flex items-center justify-start gap-x-10">
          <h3 className="font-bold text-3xl dark:text-neutral-50 text-neutral-800">
            My Sites <span>\</span>
          </h3>
          <p className="font-semibold text-lg">
            {auth?.user?.name
              ? `Welcome 👋 Good to see you again, ${auth.user.name}!`
              : "Welcome 👋 Good to see you again!"}
          </p>
          <div className="flex flex-grow justify-end items-center">
            {" "}
            <button
              onClick={() => setDisplayModal(!displayModal)}
              className="btn submit"
            >
              + Add Site
            </button>
          </div>
        </div>
        <div className="flex-grow dark:bg-neutral-600 bg-sky-100 flex flex-col justify-start items-center rounded-b-lg p-4">
          <div className="bg-sky-50 dark:bg-neutral-700 dark:text-neutral-400 rounded-md h-8 w-full flex justify-center items-center px-2 uppercase font-mono text-neutral-500 font-bold mb-2">
            <div className="basis-2/4 px-1">Site Name</div>
            <div className="basis-3/4 px-1 flex justify-start items-center gap-2">
              Site URL{" "}
              <RiExternalLinkLine
                title="External Link"
                className="mb-[0.5px]"
                size={18}
              />
            </div>
            <div className="basis-3/6 px-1">Feedback Links</div>
            <div className="basis-2/6 px-1">Date Added</div>
          </div>
          <ul className="w-full">
            {sites.map((site) => (
              <li
                key={site.id}
                className="bg-white dark:bg-neutral-800 w-full h-20 flex justify-center items-center rounded-lg p-2 mt-2"
              >
                <div className="basis-2/4 px-1 font-semibold text-lg">
                  <p>{site.siteName}</p>
                </div>
                <div className="basis-3/4 px-1 text-lg">
                  <a
                    className="flex justify-start gap-3 max-w-min items-center hover:text-neutral-900 hover:bg-sky-100 rounded-xl p-2 dark:hover:text-neutral-50 dark:hover:bg-neutral-600 duration-150 ease-in-out"
                    href={site.siteURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {site.siteURL}
                  </a>
                </div>
                <div className="basis-3/6 px-1 flex justify-start items-center gap-4">
                  <Link
                    href={`/dashboard/raw-feedback/${site.id}`}
                    className="btn primary"
                  >
                    Raw
                  </Link>
                  <Link
                    href={`/dashboard/raw-feedback/${site.id}`}
                    className="btn submit"
                  >
                    Approved
                  </Link>
                </div>
                <div className="basis-2/6 px-1 text-md font-light">
                  <p>{format(parseISO(site.createdAt), "PPpp")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      {/* AddSiteModal */}
      {displayModal && (
        <AddSiteModal
          notifyError={notifyError}
          notifySuccess={notifySuccess}
          setDisplayModal={setDisplayModal}
        />
      )}
      {/* Toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default SitesTable;
