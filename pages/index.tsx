import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
// Local
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";

interface iHome {
  apiKey: string;
}

const Home: NextPage<iHome> = ({ apiKey }) => {
  let magic: InstanceWithExtensions<SDKBase, OAuthExtension[]> | null = null;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!magic) {
      magic = new Magic(apiKey, {
        extensions: [new OAuthExtension()],
      });
    }
  }, [magic]);

  const handleLogin = async () => {
    setIsLoading(true);
    await magic?.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: `${window.location.origin}/callback`,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Magic Oauth Prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Magic Oauth Prototype</h3>
        <br />
        {isLoading ? (
          "Loading..."
        ) : (
          <button onClick={() => handleLogin()}>Sign in with Google</button>
        )}
      </main>

      <footer className={styles.footer}>AE Studio 2022</footer>
    </div>
  );
};

export async function getStaticProps() {
  const apiKey = process.env.GOOGLE_API_KEY ?? "";

  return {
    props: {
      apiKey,
    },
  };
}

export default Home;
