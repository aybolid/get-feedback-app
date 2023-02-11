import { format, parseISO } from "date-fns";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiExternalLinkLine } from "react-icons/ri";

import AddSiteModal from "../Modals/AddSiteModal";

const SitesTable = ({ sites }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const notifySuccess = () =>
    toast.success("Site was added! 👌", {
      position: "bottom-right",
      autoClose: 5000,
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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <div className="flex-grow bg-white dark:bg-neutral-800 w-5/6 rounded-lg flex flex-col justify-center">
        <div className="p-6 flex items-center justify-start gap-x-10">
          <h3 className="font-bold text-3xl dark:text-neutral-50 text-neutral-800">
            My Sites <span>\</span>
          </h3>
          <p className="font-semibold text-lg">
            Welcome 👋 Good to see you again!
          </p>
          <div className="flex flex-grow justify-end items-center">
            {" "}
            <button
              onClick={() => setDisplayModal(!displayModal)}
              className="btn primary"
            >
              Add Site
            </button>
          </div>
        </div>
        <div className="flex-grow dark:bg-neutral-600 bg-sky-100 flex flex-col justify-start items-center rounded-b-lg p-4">
          <div className="bg-sky-50 dark:bg-neutral-700 dark:text-neutral-400 rounded-md h-8 w-full flex justify-center items-center px-2 uppercase font-mono text-neutral-500 font-bold mb-2">
            <div className="basis-2/4 px-1">Site Name</div>
            <div className="basis-3/4 px-1 flex justify-start items-center gap-2">
              Site URL <RiExternalLinkLine className="mb-[0.5px]" size={18} />
            </div>
            <div className="basis-3/6 px-1">Feedback Link</div>
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
                <div className="basis-3/6 px-1">
                  <a
                    href=""
                    target="_blank"
                    className="flex justify-start items-center max-w-max     text-sky-50 font-bold dark:bg-sky-500 dark:hover:bg-sky-400 bg-sky-400 hover:bg-sky-300 rounded-xl px-6 py-1 dark:hover:text-neutral-50 duration-150 ease-in-out"
                  >
                    View Feedback
                  </a>
                </div>
                <div className="basis-2/6 px-1 text-lg font-light">
                  <p>{format(parseISO(site.createdAt), "PPpp")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
