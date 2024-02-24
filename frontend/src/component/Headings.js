import React from "react";
import { useContexter } from "../Contexter";

function Headings(data) {
    const {click} = useContexter()
  return (
    <div>
      <h2>{data.heading}</h2>
      <p className={`m-4 text-sm capitalize ${click ? "" : "text-gray-800"}`}>
        {data.para}
      </p>
    </div>
  );
}

export default Headings;
