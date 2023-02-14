import React from "react";

import Head from "next/head";

import { getAllSites } from "@/lib/firebase/db-admin";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import RawFeedbackTable from "@/components/Feedback/RawFeedbackTable";

export async function getStaticProps() {
  return {
    props: {
      rawFeedback: [],
    },
     revalidate: 10,
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

const SiteFeedback = ({ rawFeedback }) => {
  return (
    <>
      <Head>
        <title>Raw Feedback</title>
      </Head>
      <div className="w-full h-screen p-4">
        <DashboardShell>
          <RawFeedbackTable rawFeedback={rawFeedback} />
        </DashboardShell>
      </div>
    </>
  );
};

export default SiteFeedback;
