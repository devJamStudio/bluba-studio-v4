import * as React from "react";
import Layout from "../components/layout";
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

const ThanksPage = () => {
  return (
    <Layout>
      <main style={pageStyles}>
        <h1 style={headingStyles}>Dzięki mordo</h1>
        <p style={paragraphStyles}>Thank You for your order!</p>
      </main>
    </Layout>
  );
};

export default ThanksPage;

export const Head = () => <title>Thanks</title>;
