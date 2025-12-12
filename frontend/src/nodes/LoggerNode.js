import { NodeBase } from "./NodeBase";

export const LoggerNode = ({ id }) => {
  const handles = [
    { id: `${id}-in`, type: "target", position: "left" },
  ];

  return (
    <NodeBase title="Logger" handles={handles}>
      <span>Logs data to console</span>
    </NodeBase>
  );
};
