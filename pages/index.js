import Head from "next/head";

import { useAuth } from "@/lib/firebase/auth";
import { Button, Code, Heading } from "@chakra-ui/react";

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Get Feedback App</title>
      </Head>
      <main>
        <Heading fontWeight="semibold">Get Feedback</Heading>
        {!auth?.user ? (
          <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
        ) : (
          <Button onClick={() => auth.signout()}>Sign Out</Button>
        )}
        <div>
          <Code marginTop={5} fontSize={18}>
            user: &#123; <br />
            name: {auth?.user?.name + ","} <br />
            email: {auth?.user?.email + ","}
            <br />
            &#125;
          </Code>
        </div>
      </main>
    </>
  );
}
