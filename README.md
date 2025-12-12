# VectorShift Workflow Builder
A visual workflow builder where users drag and connect nodes to create pipelines. Includes a reusable node abstraction, styled UI, and an enhanced Text node that auto-resizes and generates dynamic handles from {{variables}}. Integrates with a FastAPI backend to validate pipelines and check DAG structure.

**Author: Shakshi Yadav**

This project implements a visual, drag-and-drop workflow builder similar to tools like Zapier, n8n, and VectorShift’s internal AI automation editor.  
It was built as part of the VectorShift Frontend Technical Assessment using **React, ReactFlow, Zustand, CSS, and FastAPI**.

---

## Features Implemented

### 1. Node Abstraction System
To eliminate repeated logic across nodes, I created a **NodeBase abstraction** that centralizes:

- layout  
- styling  
- handle structure  
- dynamic behavior  

Using this abstraction, I implemented the default nodes (Input, Output, LLM, Text) and added **five custom demo nodes** to demonstrate extensibility.

---

### 2. Complete UI Styling
The entire interface was redesigned into a clean, modern workflow builder:

- Styled nodes  
- Toolbar with draggable node components  
- Clear handles and connectors  
- Centered, styled Submit button  
- Improved spacing, alignment, typography  

---

## 3. Enhanced Text Node Logic

The Text node contains two important improvements:

### ✔ Auto-Resizing  
The node expands in width/height as the user types, improving visibility for large or multi-line expressions.

### ✔ Dynamic Variable Handles  
Whenever the user types a variable inside `{{double_curly_brackets}}`, the node:

- extracts the variable name  
- automatically creates an input Handle on the left  
- updates the handles if variables are added/removed  

Example:  
Typing:
```
Hello {{name}}, your ID is {{user_id}}
```
Creates two dynamic handles:
```
name, user_id
```

---

## 4. Backend Integration (FastAPI)

When the user clicks **Submit**, the app:

1. Collects the full pipeline (nodes + edges)  
2. Sends it to the FastAPI endpoint `/pipelines/parse`  
3. Backend calculates:  
   - number of nodes  
   - number of edges  
   - whether the pipeline forms a **DAG**  
4. Frontend displays a popup with the results:

```
Pipeline parsed!
Nodes: X
Edges: Y
Is DAG: True/False
```

---

## Tech Stack

**Frontend**
- React  
- ReactFlow  
- Zustand  
- JavaScript  
- CSS  

**Backend**
- Python  
- FastAPI  
- Uvicorn  

---

## Project Structure
```
project/
│── frontend/
│   │── src/
│   │   ├── nodes/
│   │   ├── ui.js
│   │   ├── store.js
│   │   ├── submit.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   ├── public/
│   ├── package.json
│
└── backend/
    ├── main.py
    ├── requirements.txt (optional)
```

---

## Running the Project

### **Frontend**
```sh
cd frontend
npm install
npm start
```
Runs at: **http://localhost:3000**

---

### **Backend**
```sh
cd backend
pip install fastapi uvicorn python-multipart
uvicorn main:app --reload
```
Runs at: **http://127.0.0.1:8000**

---

## How to Test

1. Drag nodes (Input, Text, LLM, Output, etc.) into the canvas  
2. Connect them  
3. Type variables like `{{input}}` into a Text node  
4. Click **Submit**  
5. A popup will show node count, edge count, and DAG status  

---


## Notes
- `node_modules`, build files, and environment files are intentionally excluded.  
- This project focuses on architecture, flexibility, dynamic node logic, and clean integration — matching VectorShift’s real product patterns.

---

## 👩‍💻 Author
**Shakshi Yadav**  
Full Stack + Systems Engineer  

Building scalable distributed systems, ML-powered workflows, and intuitive developer tools.
