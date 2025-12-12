# backend/main.py
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: str = Form(...)):
    """
    Expects pipeline as a JSON string in form field named "pipeline".
    Returns: { num_nodes: int, num_edges: int, is_dag: bool }
    """
    try:
        data = json.loads(pipeline)
    except Exception as e:
        return {"error": "invalid_json", "message": str(e)}

    nodes: List[Dict] = data.get("nodes", [])
    edges: List[Dict] = data.get("edges", [])

    # Build adjacency list from edges (source -> target)
    graph = {node["id"]: [] for node in nodes}
    for e in edges:
        # reactflow edges typically have source and target fields
        s = e.get("source")
        t = e.get("target")
        if s in graph:
            graph[s].append(t)

    # DFS cycle detection
    visited = set()
    visiting = set()
    is_dag = True

    def dfs(u):
        nonlocal is_dag
        if u in visiting:
            is_dag = False
            return
        if u in visited:
            return
        visiting.add(u)
        for v in graph.get(u, []):
            dfs(v)
            if not is_dag:
                return
        visiting.remove(u)
        visited.add(u)

    for node_id in graph:
        if node_id not in visited:
            dfs(node_id)
        if not is_dag:
            break

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag,
    }
