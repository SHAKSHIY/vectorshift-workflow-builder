import { NodeBase } from "./NodeBase";

export const LLMNode = ({ id }) => {
  const handles = [
    { id: `${id}-system`, type: "target", position: "left", style: { top: "33%" } },
    { id: `${id}-prompt`, type: "target", position: "left", style: { top: "66%" } },
    { id: `${id}-response`, type: "source", position: "right" },
  ];

  return (
    <NodeBase title="LLM" handles={handles}>
      <span>This is an LLM.</span>
    </NodeBase>
  );
};
