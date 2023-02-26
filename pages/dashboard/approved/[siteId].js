import React from "react";
import { getAllSites } from "@/lib/firebase/db-admin";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetchers";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import ApprovedFeedbackTable from "@/components/Feedback/ApprovedFeedbackTable";

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

const title = "My Site Feedback - Get Feedback";

const SiteFeedback = ({ feedback }) => {
  const router = useRouter();

  const url = "http://getfb.vercel.app" + router.asPath;

  const { data: approvedFeedback } = useSWR(
    `/api/feedback/approved/${router.query.siteId}`,
    fetcher
  );
  feedback = approvedFeedback;

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
      <div className="w-full h-screen p-4">
        <DashboardShell>
          <ApprovedFeedbackTable feedback={feedback} />
        </DashboardShell>
      </div>
    </>
  );
};

export default SiteFeedback;
