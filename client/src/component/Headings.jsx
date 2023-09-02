import React from "react";

export default function Headings({ title, text }) {
  return (
    <div className="py-3">
      <h1 className="fw-bold fs-1 text-capitalize">{title}</h1>
      <p className="fs-6">{text}</p>
    </div>
  );
}
