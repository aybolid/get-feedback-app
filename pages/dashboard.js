import Head from "next/head";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import EmptyState from "@/components/Dashboard/EmptyState";
import { motion } from "framer-motion";
import { GridLoader } from "react-spinners";
import SitesTable from "@/components/Dashboard/SitesTable";

import { useAuth } from "@/lib/firebase/auth";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const Dashboard = () => {
  // const auth = useAuth();
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
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="w-full h-screen p-4"
      >
        <DashboardShell>
          {data.length === 0 ? <EmptyState /> : <SitesTable sites={data} />}
        </DashboardShell>
      </motion.div>
    </>
  );
};

export default Dashboard;
