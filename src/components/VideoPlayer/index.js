import React from "react";
import ReactPlayer from "react-player";

const ReactPlayerComp = ({ url }) => {
  return (
    <div>
      <ReactPlayer url={url} />
    </div>
  );
};

export default ReactPlayerComp;
