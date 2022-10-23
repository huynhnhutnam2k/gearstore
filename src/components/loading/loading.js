import React from "react";

const Loading = (props) => {
  return (
    <div
      className={`skeleton ${props.className}`}
      style={{
        width: props.width || "100%",
        height: props.height,
        borderRadius: props.radius,
      }}
    >
      {props.children}
    </div>
  );
};

export default Loading;
