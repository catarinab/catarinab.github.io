import React, { useState, useEffect, useRef } from "react";

function App() {
  const commands = {
    help: "Available commands: help, whoami, clear",
    whoami: "You are a React user!",
    clear: "",
  };

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const terminalEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    let response = commands[input] || `Command not found: ${input}`;

    if (input === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command: input, output: response }]);
    }

    setInput(""); // Clear input after submission
  };

  // Scroll to the bottom when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div style={styles.container}>
      <div style={styles.terminal}>
        {history.map((entry, index) => (
          <div key={index}>
            <p style={styles.command}> {entry.command}</p>
            <p style={styles.output}>{entry.output}</p>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          style={styles.input}
        />
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#000",
    color: "#0f0",
    fontFamily: "monospace",
  },
  terminal: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  command: { color: "#0f0", marginBottom: "2px" },
  output: { color: "#ccc", marginBottom: "10px" },
  inputContainer: {
    padding: "10px",
    borderTop: "1px solid #0f0",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#0f0",
    border: "none",
    outline: "none",
    fontFamily: "monospace",
  },
};

export default App;
