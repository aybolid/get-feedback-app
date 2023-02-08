import { ProvideAuth } from "@/lib/firebase/auth";

export default function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
