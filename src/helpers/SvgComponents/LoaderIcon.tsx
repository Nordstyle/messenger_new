import React from "react";

interface LoaderIconProps {
  size: number;
}

export const LoaderIcon: React.FC<LoaderIconProps> = (props) => {
  const { size } = props;
  return (
    <svg
      className="lds-curve-bars"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{
        background: "background:0% 0%",
        width: size,
      }}
    >
      <g transform="translate(50 50)" fill="none" strokeWidth="3">
        <circle
          r="10"
          stroke="#1f5da3"
          strokeDasharray="31.41592653589793 31.41592653589793"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;360 0 0"
            dur="1.3s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            begin="0"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          r="20"
          stroke="#0867c7"
          strokeDasharray="62.83185307179586 62.83185307179586"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;360 0 0"
            dur="1.3s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            begin="-.25"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          r="30"
          stroke="#1e88e5"
          strokeDasharray="94.24777960769379 94.24777960769379"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;360 0 0"
            dur="1.3s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            begin="-.5"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          r="40"
          stroke="#4fa8f6"
          strokeDasharray="125.66370614359172 125.66370614359172"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;360 0 0"
            dur="1.3s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            begin="-.75"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};
