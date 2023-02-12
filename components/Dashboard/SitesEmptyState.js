import { motion } from "framer-motion";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddSiteModal from "../Modals/AddSiteModal";

const SitesEmptyState = () => {
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
            Welcome 👋 Let&apos;s get started!
          </p>
        </div>
        <div className="flex-grow dark:bg-neutral-600 bg-sky-100 flex justify-center items-center rounded-b-lg p-4">
          <div className="bg-white dark:bg-neutral-800 w-2/3 h-2/3 p-4 rounded-xl flex flex-col justify-center items-center">
            <p className="text-3xl font-mono mb-4 text-center">
              You haven&apos;t added any sites... 😢
            </p>
            <button
              onClick={() => setDisplayModal(!displayModal)}
              className="btn primary"
            >
              Add your first website!
            </button>
          </div>
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

export default SitesEmptyState;
