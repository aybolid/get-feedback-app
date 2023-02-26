import React from "react";
import { getAllSites } from "@/lib/firebase/db-admin";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import RawFeedbackTable from "@/components/Feedback/RawFeedbackTable";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

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

const title = "Raw Feedback - Get Feedback";

const SiteRawFeedback = ({ rawFeedback }) => {
  const router = useRouter();
  const url = "http://getfb.vercel.app" + router.asPath;
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
          <RawFeedbackTable rawFeedback={rawFeedback} />
        </DashboardShell>
      </div>
    </>
  );
};

export default SiteRawFeedback;
