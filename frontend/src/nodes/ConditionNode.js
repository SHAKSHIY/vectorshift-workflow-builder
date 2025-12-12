import { NodeBase } from "./NodeBase";

export const ConditionNode = ({ id }) => {
  const handles = [
    { id: `${id}-input`, type: "target", position: "left" },
    { id: `${id}-true`, type: "source", position: "right", style: { top: "33%" } },
    { id: `${id}-false`, type: "source", position: "right", style: { top: "66%" } },
  ];

  return (
    <NodeBase title="Condition" handles={handles}>
      <span>If input is true → top output</span>
    </NodeBase>
  );
};
