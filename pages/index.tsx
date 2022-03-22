import type { NextPage } from "next";
import Head from "next/head";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
// Local
import styles from "../styles/Home.module.css";

interface iHome {
  apiKey: string;
  redirectURI: string;
}

const Home: NextPage<iHome> = ({ apiKey, redirectURI }) => {
  const handleLogin = async () => {
    const magic = new Magic(apiKey, {
      extensions: [new OAuthExtension()],
    });

    await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: redirectURI,
      scope: ["user:email"] /* optional */,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Magic Oauth Prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Magic Oauth Prototype</h2>
        <br />
        <button onClick={() => handleLogin()}>Sign in with Google</button>
      </main>

      <footer className={styles.footer}>AE Studio 2022</footer>
    </div>
  );
};

export async function getStaticProps() {
  const apiKey = process.env.GOOGLE_API_KEY ?? "";
  const redirectURI = process.env.GOOGLE_REDIRECT_URI ?? "";

  return {
    props: {
      apiKey,
      redirectURI,
    },
  };
}

export default Home;
