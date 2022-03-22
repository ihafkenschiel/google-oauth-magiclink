import type { NextPage } from "next";
import Head from "next/head";
// Local
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Privacy Policy</h2>
        <br />
        <p>Legal lorem ipsum</p>
      </main>

      <footer className={styles.footer}>AE Studio 2022</footer>
    </div>
  );
};

export default Home;
