import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="lorem ipsum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="main-bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
