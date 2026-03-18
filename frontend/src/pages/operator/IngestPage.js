import React from "react";

function IngestPage() {
  return React.createElement(
    "div",
    { className: "container p-4 text-white" },
    [
      React.createElement("h4", { key: 1 }, "Ingest & Transcode"),
      React.createElement(
        "p",
        { key: 2 },
        "Detailed ingest pipeline monitoring"
      )
    ]
  );
}

export default IngestPage;