import React from "react";

function StatCard(props) {
  return React.createElement(
    "div",
    { className: "col-md-3 mb-4" },
    React.createElement(
      "div",
      {
        className: "card dashboard-card h-100",
        onClick: props.onClick
      },
      React.createElement(
        "div",
        { className: "card-body" },
        [
          React.createElement("h6", { key: 1 }, props.title),
          React.createElement(
            "p",
            { key: 2, className: "text-muted small" },
            props.subtitle
          ),
          React.createElement(
            "div",
            { key: 3, className: "d-flex flex-wrap gap-2" },
            props.stats.map(function (item, index) {
              return React.createElement(
                "span",
                { key: index, className: "badge bg-dark" },
                item
              );
            })
          )
        ]
      )
    )
  );
}

export default StatCard;