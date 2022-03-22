import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
// Local
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";

interface iCallback {
  apiKey: string;
}

const renderProfile = (profile) => {
  const user = profile?.oauth?.userInfo ?? null;
  return (
    <div>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

const Callback: NextPage<iCallback> = ({ apiKey }) => {
  let magic: InstanceWithExtensions<SDKBase, OAuthExtension[]> | null = null;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function doLogin() {
      const result = await magic?.oauth.getRedirectResult();
      console.log("result :>> ", result);
      setProfile(result);
    }
    if (!magic) {
      magic = new Magic(apiKey, {
        extensions: [new OAuthExtension()],
      });
    }

    if (!profile) {
      console.log("logging in");
      doLogin();
    }
  }, [magic, profile]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Magic Oauth Prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Magic Oauth Prototype</h3>
        <br />
        {profile ? renderProfile(profile) : "Loading profile..."}
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

export default Callback;
