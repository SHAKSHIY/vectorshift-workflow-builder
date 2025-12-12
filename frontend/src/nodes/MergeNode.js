import { NodeBase } from "./NodeBase";

export const MergeNode = ({ id }) => {
  const handles = [
    { id: `${id}-in1`, type: "target", position: "left", style: { top: "30%" } },
    { id: `${id}-in2`, type: "target", position: "left", style: { top: "60%" } },
    { id: `${id}-out`, type: "source", position: "right" },
  ];

  return (
    <NodeBase title="Merge" handles={handles}>
      <span>Combines two inputs.</span>
    </NodeBase>
  );
};
