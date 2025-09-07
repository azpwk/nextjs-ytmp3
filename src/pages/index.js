// import Navigasi from "@/component/Navigasi";
// import "../styles/Home.module.css";
import Head from "next/head";
import Form from "@/component/form/Form.jsx";
export default function Home() {
  return (
    <>
      <Head>
        <title>fastube</title>
        <meta name="description" content="fastube" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navigasi /> */}
      <Form />
    </>
  );
}
