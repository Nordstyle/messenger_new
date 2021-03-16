import React from "react";

interface SvgComponentProps {
  src: string;
  alt: string;
  size?: number;
}

export const SvgComponent: React.FC<SvgComponentProps> = (props) => {
  const { src, alt, size } = props;

  return <img style={{ width: size }} src={src} alt={alt} />;
};
