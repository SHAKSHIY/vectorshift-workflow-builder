// src/submit.js
import { useCallback } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

export const SubmitButton = () => {
  // pull nodes and edges from your zustand store
  const { nodes, edges } = useStore(
    (s) => ({ nodes: s.nodes, edges: s.edges }),
    shallow
  );

  const handleSubmit = useCallback(async () => {
    try {
      // Build the pipeline object exactly as expected
      const pipeline = {
        nodes: nodes || [],
        edges: edges || [],
      };

      // Backend expects form data with field name "pipeline"
      const form = new FormData();
      form.append("pipeline", JSON.stringify(pipeline));

      // Use absolute URL to backend. If backend is on a different host, change accordingly.
      const backendUrl = "http://127.0.0.1:8000/pipelines/parse";

      const resp = await fetch(backendUrl, {
        method: "POST",
        body: form,
      });

      if (!resp.ok) {
        const text = await resp.text();
        alert(`Server error: ${resp.status}\n${text}`);
        return;
      }

      const result = await resp.json();

      if (result.error) {
        alert(`Error: ${result.error}\n${result.message || ""}`);
        return;
      }

      // Friendly user alert with returned values
      alert(
        `Pipeline parsed!\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag ? "Yes" : "No"}`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to submit pipeline: " + (err.message || err));
    }
  }, [nodes, edges]);

  return (
    <div className="submit-container">
      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
