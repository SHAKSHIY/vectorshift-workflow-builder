import { useState } from "react";
import { NodeBase } from "./NodeBase";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace("customOutput-", "output_"));
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handles = [
    { id: `${id}-value`, type: "target", position: "left" },
  ];

  return (
    <NodeBase title="Output" handles={handles}>
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>

      <label>
        Type:
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </NodeBase>
  );
};
