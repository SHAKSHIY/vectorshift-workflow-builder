// textNode.js
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeBase } from './NodeBase';

// Regex to detect {{variable}} patterns
const VAR_REGEX = /{{(.*?)}}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textRef = useRef(null);

  // Auto-detect variables whenever text updates
  useEffect(() => {
    const matches = [...currText.matchAll(VAR_REGEX)];
    const foundVars = matches.map((m) => m[1].trim());
    setVariables(foundVars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, [currText]);

  return (
    <NodeBase
      title="Text"
      handles={[
        // output handle on right
        {
          id: `${id}-output`,
          type: "source",
          position: "right",
        },
      ]}
    >
      <label>
        Text:
        <textarea
          ref={textRef}
          className="textnode-textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>

      {/* Dynamic variable input handles */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          id={`${id}-${v}`}
          type="target"
          position={Position.Left}
          className="node-handle"
          style={{
            top: `${(i + 1) * 22}%`, // evenly spaced
          }}
        />
      ))}
    </NodeBase>
  );
};
