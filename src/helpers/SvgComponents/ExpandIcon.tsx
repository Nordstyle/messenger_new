import React from "react";

interface ExpandIconProps {
  open: boolean;
}

export const ExpandIcon: React.FC<ExpandIconProps> = (props) => {
  const { open } = props;
  return open ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7966 12.2447L12.4696 12.327L12.3872 17.654L10.7491 17.6776L10.8493 10.7067L17.8201 10.6065L17.7966 12.2447Z"
        fill="#A7A8B6"
      />
      <path
        d="M2.83085 7.23971L8.15784 7.15733L8.24022 1.83034L9.87837 1.80679L9.77817 8.77766L2.8073 8.87786L2.83085 7.23971Z"
        fill="#A7A8B6"
      />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M9.14433 14.4113L14.4713 14.329L14.5537 9.00197L16.1918 8.97842L16.0917 15.9493L9.12078 16.0495L9.14433 14.4113Z"
          fill="#A7A8B6"
        />
        <path
          d="M11.4826 5.07304L6.15564 5.15541L6.07326 10.4824L4.4351 10.506L4.5353 3.53508L11.5062 3.43488L11.4826 5.07304Z"
          fill="#A7A8B6"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
