import React, { useEffect, useRef } from "react";
import { useAuth } from "@/lib/firebase/auth";
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/firebase/db";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { mutate } from "swr";

const AddSiteModal = ({ notifyError, notifySuccess, setDisplayModal }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlAddSite = ({ siteName, siteURL }) => {
    const { uid } = user;
    const date = new Date().toISOString();

    const newSite = {
      authorId: uid,
      createdAt: date,
      siteName,
      siteURL,
    };

    createSite(newSite)
      .then(() => mutate(["/api/sites", user.token], false))
      .then(() => setDisplayModal(false))
      .then(() => notifySuccess("Site was added! 👌"))
      .catch(() => {
        notifyError("An unexpected error has occurred... 🤦‍♂️");
      });
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
      <div className="bg-black w-screen h-[2000px] absolute top-0 left-0 opacity-30" />
      <motion.div
        ref={modalRef}
        animate={{ top: "50%", opacity: 1 }}
        initial={{ top: 0, opacity: 0 }}
        className="shadow-2xl z-50 dark:shadow-neutral-900 flex justify-center items-center flex-col absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 p-4 rounded-xl dark:bg-neutral-800 bg-white opacity-100"
      >
        <div className="flex gap-48 justify-between items-center text-neutral-800 dark:text-neutral-50">
          <h4 className="text-2xl font-bold">Add Website</h4>
          <button
            onClick={() => setDisplayModal(false)}
            className="text-neutral-400 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-50 cursor-pointer duration-200 ease-in-out"
          >
            <MdOutlineClose title="Close" size={34} />
          </button>
        </div>
        <form onSubmit={handleSubmit(handlAddSite)} className="pt-4 w-full">
          <div className="flex flex-col mb-4">
            <label htmlFor="siteNameInput" className="font-semibold text-md">
              Site Name
            </label>
            <input
              {...register("siteName", { required: true, maxLength: 25 })}
              id="siteNameInput"
              autoComplete="off"
              className="bg-sky-100 dark:bg-neutral-600 rounded-md h-8 px-2 text-lg"
              placeholder="My Site"
              type="text"
            />
            {errors.siteName && errors.siteName.type === "required" && (
              <motion.span
                animate={{ height: "auto", width: "auto", opacity: 1 }}
                initial={{ height: 0, width: 0, opacity: 0 }}
                className="text-red-500 font-mono mt-1 w-full text-end"
              >
                This field is required
              </motion.span>
            )}
            {errors.siteName && errors.siteName.type === "maxLength" && (
              <motion.span
                animate={{ height: "auto", width: "auto", opacity: 1 }}
                initial={{ height: 0, width: 0, opacity: 0 }}
                className="text-red-500 font-mono mt-1 w-full text-end"
              >
                Max length is 25 digits
              </motion.span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="siteURLInput" className="font-semibold text-md">
              Site URL
            </label>
            <input
              {...register("siteURL", {
                required: true,
                pattern:
                  "[Hh][Tt][Tt][Pp][Ss]?://(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::d{2,5})?(?:/[^s]*)?",
              })}
              type="url"
              id="siteURLInput"
              autoComplete="off"
              className="bg-sky-100 dark:bg-neutral-600 rounded-md h-8 px-2 text-lg"
              placeholder="https://website.com"
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
          <div className="flex justify-between items-center w-full mt-8">
            <button
              onClick={() => setDisplayModal(false)}
              className="btn danger"
            >
              Cancel
            </button>
            <input
              value="Add"
              type="submit"
              className="btn submit cursor-pointer"
            />
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default AddSiteModal;
