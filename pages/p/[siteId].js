import React from "react";

import { getAllFeedback, getAllSites } from "@/lib/firebase/db-admin";
import { format, parseISO } from "date-fns";
import Head from "next/head";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const feedback = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
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
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  return (
    <>
      <Head>
        <title>My Feedback</title>
      </Head>
      <form
        // onSubmit={handleCommentAdd}
        className="flex-col pt-4 px-4 flex justify-center items-center"
      >
        <label className="w-2/3 text-lg font-semibold">Comment</label>
        <input
          type="text"
          className="rounded-md bg-neutral-200 text-neutral-900 w-2/3 px-2 mb-4 h-10"
        />
        <btn type="submit" className="btn submit cursor-pointer">
          + Add Comment
        </btn>
      </form>
      {initialFeedback.length === 0 ? (
        <p className="text-3xl font-mono text-center mt-20">
          This place is so empty... 🕸️👻
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min-content,32%))] grid-rows-none gap-4 justify-center items-start p-4">
          {initialFeedback.map((feedback) => (
            <div
              className="bg-neutral-600 flex flex-col justify-center items-start px-4 py-2 rounded-md h-80"
              key={feedback.id}
            >
              <div className="flex justify-start items-center gap-4">
                <p className="font-bold text-xl">{feedback.author}</p>
                <p className="text-sm">Provider: {feedback.provider}</p>
              </div>
              <p className="font-thin text-sm">
                {format(parseISO(feedback.createdAt), "PPpp")}
              </p>
              <div className="bg-neutral-500 px-2 rounded-md flex-grow w-full my-2 overflow-x-hidden overflow-y-auto">
                <p className="font-semibold text-lg my-4">{feedback.text}</p>
              </div>
              <p>Rating: {feedback.rating}</p>
              <p>Status: {feedback.status}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SiteFeedback;
