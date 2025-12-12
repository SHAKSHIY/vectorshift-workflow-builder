import { Handle, Position } from "reactflow";

export const NodeBase = ({
    title,
    handles = [],
    style = {},
    children,
}) => {
    const baseStyle = {
        width: 220,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #d0d0d0",
        background: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        fontSize: "14px",
        ...style,
    };

    const positionMap = {
        left: Position.Left,
        right: Position.Right,
        top: Position.Top,
        bottom: Position.Bottom,
    };

    return (
        <div className="node-base">
            <div className="node-title">{title}</div>

            <div className="node-content">
                {children}
            </div>

            {handles.map((h) => (
                <Handle
                    key={h.id}
                    type={h.type}
                    id={h.id}
                    position={positionMap[h.position]}
                    style={h.style || {}}
                    className="node-handle"
                />
            ))}
        </div>
    );
};
