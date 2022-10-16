import React from "react";
import "./loading.scss";
const Loading = () => {
  return (
    <div className="bg">
      <div className="night">
        {new Array(20).fill(0).map(() => (
          <div className="shooting_star"></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
