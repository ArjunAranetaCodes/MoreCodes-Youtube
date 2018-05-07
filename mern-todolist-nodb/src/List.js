import React from "react";

const List = props => (
  <ul className="list-group  mt-3">
    {props.items.map((item, index) => (
      <li key={index} className="list-group-item">
        {item}
      </li>
    ))}
  </ul>
);

export default List;
