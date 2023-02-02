import React from "react";
import Collections from "./Collections";

const MyCollections = () => {
  return (
    <section style={{ padding: "3rem 8rem" }}>
      <h1
        style={{
          color: "#0d6ddf",
          fontSize: "1.6rem",
          fontWeight: "600",
          paddingBottom: "1px",
          borderBottom: "2px solid #0d6ddf",
          display: "inline-block",
        }}>
        Your Collection
      </h1>

      <Collections />
    </section>
  );
};

export default MyCollections;
