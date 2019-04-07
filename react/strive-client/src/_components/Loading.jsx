import React from "react";

export class Loading extends React.Component {
  static defaultProps = {
    text: "Loading..."
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <svg
          width="50px"
          height="50px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          className="lds-rolling"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            ng-attr-stroke="{{config.color}}"
            ng-attr-stroke-width="{{config.width}}"
            ng-attr-r="{{config.radius}}"
            ng-attr-stroke-dasharray="{{config.dasharray}}"
            stroke="#dce4eb"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            transform="rotate(323.814 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div className="d-flex align-items-center p-2 bg-transparent text-muted">
          {this.props.text}
        </div>
      </div>
    );
  }
}
