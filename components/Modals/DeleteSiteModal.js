import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const DeleteSiteModal = ({
  setDisplayModal,
  handleSiteDelete,
  siteId,
  siteName,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setDisplayModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalRef]);

  return (
    <>
      <div className="bg-black w-screen h-[2000px] absolute top-0 left-0 opacity-30" />
      <motion.div
        ref={modalRef}
        animate={{ top: "50%", opacity: 1 }}
        initial={{ top: 0, opacity: 0 }}
        className="max-w-[402px] gap-8 shadow-2xl dark:shadow-neutral-900 flex justify-center items-center flex-col absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 p-4 rounded-xl dark:bg-neutral-800 bg-white opacity-100"
      >
        <div className="flex w-full justify-between items-center text-neutral-800 dark:text-neutral-50">
          <h4 className="text-2xl font-bold text-red-500">
            {`Delete "${siteName}"?`}
          </h4>
          <button
            onClick={() => setDisplayModal(false)}
            className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-50 cursor-pointer duration-200 ease-in-out"
          >
            <MdOutlineClose size={34} />
          </button>
        </div>
        <p className="text-center font-mono text-xl p-4 rounded-lg bg-sky-100 dark:bg-neutral-700">
          This action will delete <span className="text-red-500 font-bold">all</span>{" "}
          {"site's"} feedback data and you{" "}
          <span className="text-red-500 font-bold">{"can't"} restore</span> it
          in the future!
        </p>
        <div className="flex w-full justify-between items-center">
          <button
            onClick={() => setDisplayModal(false)}
            className="btn primary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSiteDelete(siteId);
            }}
            className="btn danger"
          >
            Yes, delete it
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default DeleteSiteModal;
