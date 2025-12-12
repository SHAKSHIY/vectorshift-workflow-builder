import { NodeBase } from "./NodeBase";

export const MathNode = ({ id }) => {
  const handles = [
    { id: `${id}-a`, type: "target", position: "left", style: { top: "33%" } },
    { id: `${id}-b`, type: "target", position: "left", style: { top: "66%" } },
    { id: `${id}-result`, type: "source", position: "right" },
  ];

  return (
    <NodeBase title="Math" handles={handles}>
      <span>Outputs A + B</span>
    </NodeBase>
  );
};
