import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Etao Software Solutions",
  keywords:
    " software development, web development, mobile app development, programming, manipur software, imphal software",
  description:
    "Build the most elegant, modern, professional applications for your business",
};

export default Meta;
