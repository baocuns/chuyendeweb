import React from "react";
import PropTypes from "prop-types";

PropList.propTypes = {
  ports: PropTypes.array,
};

PropList.defaltProps = {
  ports: [],
};
function PropList(props) {
  const { ports } = props;

  return;
  <ul className="port-list">
    {ports.map((port) => (
      <li key={port.id}>{port.title}</li>
    ))}
  </ul>;
}

export default index;
