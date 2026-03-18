import React from "react";

function HealthCard(props) {
  return React.createElement(
    "div",
    { className: "col-md-3 mb-3" },
    React.createElement(
      "div",
      { className: "card dashboard-card" },
      React.createElement(
        "div",
        { className: "card-body" },
        [
          React.createElement(
            "small",
            { key: 1, className: "text-muted" },
            props.title
          ),
          React.createElement(
            "h4",
            { key: 2, className: "mt-2" },
            props.value
          ),
          React.createElement(
            "span",
            { key: 3, className: "text-info" },
            props.trend
          ),
          <span className="trend positive">+5%</span>
        ]
      )
    )
  );
}

export default HealthCard;
