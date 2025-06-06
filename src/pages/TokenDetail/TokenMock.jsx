import React from "react";

import "./TokenListing.css";
import { TokenListingSection } from "./components/ProductListingSection/TokenListingSection.jsx";
import { useData } from "../../contexts/DataProvider.js";

export const TokenListing = () => {
  const { loading } = useData();
  return (
    !loading && (
      <div className="page-container">
        <TokenListingSection className="products-container" />
      </div>
    )
  );
};
