import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Products from "../components/products/Products";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "../utils/getstripe";
const stripePromise = getStripe();

const AdvancedExamplePage = () => (
  <Elements stripe={stripePromise}>
    <Layout>
      <SEO title="Advanced Example" />
      <h1>This is the advanced example</h1>
      <Products />
    </Layout>
  </Elements>
);

export default AdvancedExamplePage;
