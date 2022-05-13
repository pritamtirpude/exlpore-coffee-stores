import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="/fonts/IBMPlexSans-Bold.ttf"
            rel="preload"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/IBMPlexSans-Regular.ttf"
            rel="preload"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/IBMPlexSans-SemiBold.ttf"
            rel="preload"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
