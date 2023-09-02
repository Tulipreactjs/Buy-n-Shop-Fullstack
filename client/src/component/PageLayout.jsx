import React from "react";

export default function PageLayout({ children }) {
  return (
    <div className="py-5 mt-3 mt-lg-0">
      <div className="layout-containerB mt-5 py-lg-4 px-3">{children}</div>
    </div>
  );
}
