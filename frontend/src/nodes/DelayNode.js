import { NodeBase } from "./NodeBase";

export const DelayNode = ({ id }) => {
  const handles = [
    { id: `${id}-in`, type: "target", position: "left" },
    { id: `${id}-out`, type: "source", position: "right" },
  ];

  return (
    <NodeBase title="Delay" handles={handles}>
      <span>Delays output by 1s</span>
    </NodeBase>
  );
};
