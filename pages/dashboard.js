import Head from "next/head";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import SitesEmptyState from "@/components/Dashboard/SitesEmptyState";
import { GridLoader } from "react-spinners";
import SitesTable from "@/components/Dashboard/SitesTable";

import useSWR from "swr";
import fetcher from "@/helpers/fetcher";

const Dashboard = () => {
  const { data } = useSWR("/api/sites", fetcher);

  if (!data)
    return (
      <GridLoader
        className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
        color="#ffffff"
        loading={true}
        size={30}
      />
    );

  return (
    <>
      <Head>
        <title>GF Dashboard</title>
      </Head>
      <div className="w-full h-screen p-4">
        <DashboardShell>
          {data.length === 0 ? (
            <SitesEmptyState />
          ) : (
            <SitesTable sites={data} />
          )}
        </DashboardShell>
      </div>
    </>
  );
};

export default Dashboard;
