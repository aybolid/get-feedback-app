import { AuthProvider } from "@/lib/firebase/auth";

import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
