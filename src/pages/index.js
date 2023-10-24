import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "../utils/getstripe";
import ProductsGrid from "../components/products/ProductsGridFront";
const stripePromise = getStripe();

const AdvancedExamplePage = () => (
  <Elements stripe={stripePromise}>
    <Layout>
      <Seo title="Bluba Studio" />
      <ProductsGrid />
    </Layout>
  </Elements>
);

export default AdvancedExamplePage;
