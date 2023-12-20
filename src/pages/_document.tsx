import { Html, Head, Main, NextScript } from 'next/document'
import style from "@/styles/Home.module.css";
import HeadPage from "@/pages/HeaderPanel";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
      </Head>
      <title>Социальная сеть Connect</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
