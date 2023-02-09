import React, { useEffect, useRef } from "react";

import { useForm } from "react-hook-form";
import { createSite } from "@/lib/firebase/firestore";

import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const AddSiteModal = ({ notifyError, notifySuccess, setDisplayModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlAddSite = (data) => {
    createSite(data)
      .then(() => setDisplayModal(false))
      .then(() => notifySuccess())
      .catch(() => notifyError());
  };

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
      <div className="bg-black w-screen h-full absolute top-0 left-0 opacity-30" />
      <motion.div
        ref={modalRef}
        animate={{ top: "50%", opacity: 1 }}
        initial={{ top: 0, opacity: 0 }}
        className="shadow-lg dark:shadow-black flex justify-center items-center flex-col absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 p-4 rounded-xl dark:bg-neutral-800 bg-white opacity-100"
      >
        <div className="flex gap-48 justify-between items-center text-neutral-800 dark:text-neutral-50">
          <h4 className="text-2xl font-semibold">Add Website</h4>
          <div
            onClick={() => setDisplayModal(false)}
            className="text-neutral-700 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-50 cursor-pointer duration-200 ease-in-out"
          >
            <MdOutlineClose size={34} />
          </div>
        </div>
        <div className="w-line mt-2" />
        <form onSubmit={handleSubmit(handlAddSite)} className="pt-4 w-full">
          <div className="flex flex-col mb-4">
            <label htmlFor="siteNameInput" className="font-semibold text-lg">
              Site Name
            </label>
            <input
              {...register("siteName", { required: true })}
              id="siteNameInput"
              autoComplete="off"
              className="bg-sky-100 dark:bg-neutral-600 rounded-md h-8 px-2 text-lg"
              placeholder="My Site"
              type="text"
            />
            {errors.siteName && (
              <motion.span
                animate={{ height: "auto", width: "auto", opacity: 1 }}
                initial={{ height: 0, width: 0, opacity: 0 }}
                className="text-red-500 font-mono mt-1 w-full text-end"
              >
                This field is required
              </motion.span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="siteURLInput" className="font-semibold text-lg">
              Site URL
            </label>
            <input
              {...register("siteURL", { required: true })}
              id="siteURLInput"
              autoComplete="off"
              className="bg-sky-100 dark:bg-neutral-600 rounded-md h-8 px-2 text-lg"
              placeholder="https://website.com"
              type="text"
            />
            {errors.siteURL && (
              <motion.span
                animate={{ height: "auto", width: "auto", opacity: 1 }}
                initial={{ height: 0, width: 0, opacity: 0 }}
                className="text-red-500 font-mono mt-1 w-full text-end"
              >
                This field is required
              </motion.span>
            )}
          </div>
          <div className="w-line mt-8" />
          <div className="flex justify-between items-center w-full mt-2">
            <button
              onClick={() => setDisplayModal(false)}
              className="btn danger"
            >
              Cancel
            </button>
            <button type="submit" className="btn submit">
              Add
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default AddSiteModal;
