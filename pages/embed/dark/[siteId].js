import React, { useEffect, useState } from "react";
import { getAllSites } from "@/lib/firebase/db-admin";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/lib/firebase/auth";
import { createFeedback } from "@/lib/firebase/db";
import { NextSeo } from "next-seo";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import logo from "../../../public/logo.svg";

export async function getStaticProps() {
  return {
    props: {
      feedback: [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

const title = "Embed Feedback - Get Feedback";

const SiteFeedback = ({ feedback }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, signinWithGithub, signinWithGoogle } = useAuth();
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const [displaySuccess, setDisplaySucces] = useState(false);

  const url = "http://getfb.vercel.app" + router.asPath;

  const { data: approvedFeedback } = useSWR(
    `/api/feedback/approved/${router.query.siteId}`,
    fetcher
  );
  feedback = approvedFeedback;

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleFeedbackAdd = ({ feedbackContent }) => {
    const { name, uid, provider } = user;
    const siteId = router.query.siteId;
    const ratingValue = rating;
    const date = new Date().toISOString();

    const newFeedback = {
      author: name,
      authorId: uid,
      provider: provider,
      siteId: siteId,
      text: feedbackContent,
      rating: ratingValue,
      createdAt: date,
      status: "pending",
    };

    createFeedback(newFeedback)
      .then(() => {
        setRating(0);
        reset();
      })
      .then(() => setDisplaySucces(true));
  };
  useEffect(() => {
    setTimeout(() => {
      displaySuccess && setDisplaySucces(false);
    }, 5000);
  }, [displaySuccess]);

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <section className="bg-neutral-800 w-full h-fit p-4 mx-auto my-0 text-neutral-50">
        {user ? (
          <form onSubmit={handleSubmit(handleFeedbackAdd)}>
            <div className="flex flex-col justify-center items-start">
              <label htmlFor="feedbackInput" className="font-semibold text-lg">
                Send Feedback
              </label>
              <div className="w-full relative">
                <textarea
                  {...register("feedbackContent", {
                    required: true,
                    maxLength: 660,
                  })}
                  id="feedbackInput"
                  autoComplete="off"
                  placeholder="Your Feedback..."
                  className="flex-grow w-full py-1 px-2 bg-neutral-700 rounded-md min-h-[80px] resize-y max-h-40"
                />
                <div className="absolute -bottom-6 right-0">
                  {errors.feedbackContent &&
                    errors.feedbackContent.type === "required" && (
                      <motion.span
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-red-500 font-mono mt-1 text-end"
                      >
                        This field is required
                      </motion.span>
                    )}
                  {errors.feedbackContent &&
                    errors.feedbackContent.type === "maxLength" && (
                      <motion.span
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-red-500 font-mono mt-1 text-end"
                      >
                        Max length is 660 digits
                      </motion.span>
                    )}
                </div>
              </div>
              <div className="my-4">
                <Rating
                  initialValue={rating}
                  onClick={handleRating}
                  emptyColor={"#525252"}
                  emptyStyle={{ display: "flex" }}
                  fillStyle={{ display: "-webkit-inline-box" }}
                  transition
                  showTooltip
                  tooltipArray={[
                    "Terrible",
                    "Bad",
                    "Average",
                    "Good",
                    "Awesome",
                  ]}
                  tooltipStyle={{
                    backgroundColor: "#404040",
                    fontWeight: "normal",
                    padding: 4,
                  }}
                />
              </div>
              <button
                title="Send your feedback"
                className="btn mb-4 px-8 bg-sky-600 hover:bg-sky-500"
                type="submit"
              >
                Send
              </button>
            </div>
            {displaySuccess && (
              <motion.p
                animate={{ height: "min-content", opacity: 1 }}
                initial={{ height: 0, opacity: 0 }}
                className="w-full text-center mb-4 bg-green-500 rounded-md text-white font-semibold text-lg"
              >
                Your feedback was sent! The comment will be shown as soon as it
                will be approved.
              </motion.p>
            )}
          </form>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center px-5 py-4 bg-neutral-800 rounded-lg w-full">
            <div className="flex flex-row justify-center items-center">
              <div className="w-[40px] mt-1">
                <Image alt="Logo" src={logo} />
              </div>
              <h1 className="text-neutral-200 flex tracking-tighter select-none justify-center items-center h-full px-4 font-bold text-4xl">
                Get Feedback
              </h1>
            </div>
            <div>
              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  title="Sign in with Github"
                  className="btn p-3 bg-black hover:bg-neutral-900 shadow-md"
                  onClick={() => signinWithGithub()}
                >
                  <SiGithub title="Github" size={"25px"} /> Sign In With Github
                </button>
                <button
                  title="Sign in with Google"
                  className="btn p-3 bg-white hover:bg-neutral-300 text-neutral-900 shadow-md"
                  onClick={() => signinWithGoogle()}
                >
                  <FcGoogle title="Google" size={"25px"} /> Sign In With Google
                </button>
              </div>
            </div>
          </div>
        )}
        <section className="max-h-screen bg-neutral-700 rounded-lg overflow-x-hidden overflow-y-auto">
          {!feedback ||
            (feedback.length === 0 && (
              <p className="w-full text-center py-4 text-lg font-semibold">
                There is no feedback on this website
              </p>
            ))}
          {feedback?.map((feedback) => (
            <div className="px-4 py-4 even:bg-[#353535]" key={feedback.id}>
              <div className="flex justify-start gap-4 items-center">
                <p className="font-semibold text-xl">{feedback.author}</p>
                <div className="mt-1">
                  {feedback.provider === "google.com" && (
                    <FcGoogle title="Google" size={20} />
                  )}
                  {feedback.provider === "github.com" && (
                    <SiGithub title="Github" size={20} />
                  )}
                </div>
                <div className="flex-grow flex justify-end items-center">
                  <p className="text-sm text-neutral-400">
                    {format(parseISO(feedback.createdAt), "PPpp")}
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center">
                {feedback.rating !== 0 ? (
                  <Rating
                    emptyColor={"#525252"}
                    emptyStyle={{ display: "flex" }}
                    fillStyle={{ display: "-webkit-inline-box" }}
                    initialValue={feedback.rating}
                    readonly
                    size={20}
                  />
                ) : (
                  <span />
                )}
              </div>
              <p className="text-neutral-50 font-medium p-2 mt-2 text-md bg-neutral-800 rounded-lg">
                {feedback.text}
              </p>
            </div>
          ))}
        </section>
      </section>
      <script
        src="https://raw.githubusercontent.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.contentWindow.min.js"
        defer
      />
    </>
  );
};

export default SiteFeedback;
