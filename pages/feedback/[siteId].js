import React, { useRef, useState } from "react";
import Head from "next/head";
import { getAllSites } from "@/lib/firebase/db-admin";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/lib/firebase/auth";
import { createFeedback } from "@/lib/firebase/db";

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

const SiteRawFeedback = ({ feedback }) => {
  const { user } = useAuth();

  const feedbackInputRef = useRef(null);
  const ratingRef = useRef(null);

  const router = useRouter();
  const { data: approvedFeedback } = useSWR(
    `/api/feedback/approved/${router.query.siteId}`,
    fetcher
  );
  feedback = approvedFeedback;

  // Add Feedback
  const handleFeedbackAdd = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      provider: user.provider,
      siteId: router.query.siteId,
      text: feedbackInputRef.current.value,
      rating: ratingRef.current.value,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    createFeedback(newFeedback).then(
      () => (feedbackInputRef.current.value = "")
    );
  };

  return (
    <>
      <Head>
        <title>GF Feedback</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-full p-4">
        <div className="bg-white rounded-lg w-4/6 p-4 mx-auto my-0 text-neutral-700">
          <form className="pb-4">
            <div className="flex flex-col justify-center items-start">
              <label className="font-semibold text-lg">Send Feedback</label>
              <div className="flex justify-start items-center gap-4 w-full">
                <input
                  ref={feedbackInputRef}
                  placeholder="Your Feedback..."
                  className="flex-grow px-2 bg-neutral-100 rounded-md h-8 border border-neutral-300"
                />
                <select
                  ref={ratingRef}
                  className="bg-neutral-100 h-8 px-2 rounded-md border cursor-pointer border-neutral-300"
                >
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
                <button onClick={handleFeedbackAdd} className="btn px-8 submit">
                  Send
                </button>
              </div>
            </div>
          </form>
          <div>
            {feedback?.map((feedback) => (
              <div key={feedback.id}>
                <div className="w-line my-2" />
                <div className="flex justify-start gap-4 items-center">
                  <p className="font-semibold text-xl">{feedback.author}</p>
                  <p>provider: {feedback.provider}</p>
                </div>
                <p className="text-neutral-900 font-medium p-2 my-2 text-md bg-neutral-100 rounded-lg">
                  {feedback.text}
                </p>
                <div className="flex justify-between items-center">
                  <p>
                    Rating: {feedback.rating ? feedback.rating : "not provided"}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {format(parseISO(feedback.createdAt), "PPpp")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteRawFeedback;
