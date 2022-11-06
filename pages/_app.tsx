import "@styles/globals.css";
import { ReactNode } from "react";
import type { AppProps } from "next/app";

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout ?? Noop;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
