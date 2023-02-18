import React from "react";
import Head from "next/head";
import { getAllSites } from "@/lib/firebase/db-admin";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import RawFeedbackTable from "@/components/Feedback/RawFeedbackTable";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/firebase/auth";

export async function getStaticProps() {
  return {
    props: {
      rawFeedback: [],
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

const SiteRawFeedback = ({ rawFeedback }) => {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Raw Feedback</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-screen p-4">
        <DashboardShell>
          {!user ? (
            <motion.p
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="bg-white font-mono text-xl dark:bg-neutral-800 p-4 rounded-lg absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
            >
              You must log in to view the content of this page! ⛔
            </motion.p>
          ) : (
            <RawFeedbackTable rawFeedback={rawFeedback} />
          )}
        </DashboardShell>
      </div>
    </>
  );
};

export default SiteRawFeedback;
