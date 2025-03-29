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
      setHistory((prev) => [
        ...prev,
        { prompt: "cat@portfolio:~$", command: input, output: response },
      ]);
    }

    setInput(""); // Clear input after submission
  };

  // Auto-scroll to the bottom when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div style={styles.page}>
      <div style={styles.terminal}>
        <div style={styles.terminalHeader}>React Terminal</div>
        <div style={styles.terminalBody}>
          {history.map((entry, index) => (
            <div key={index} style={styles.historyEntry}>
              <p style={styles.command}>
                <span style={styles.green}>cat@portfolio</span>
                <span style={styles.white}>:</span>
                <span style={styles.blue}>~</span>
                <span style={styles.white}>$</span> {entry.command}
              </p>
              <p style={styles.output}>{entry.output}</p>
            </div>
          ))}
          <div ref={terminalEndRef} />
          {/* Live Input Area */}
          <form onSubmit={handleSubmit} style={styles.inputContainer}>
            <span style={styles.green}>cat@portfolio</span>
            <span style={styles.white}>:</span>
            <span style={styles.blue}>~</span>
            <span style={styles.white}>$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              style={styles.input}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1a1a1a",
  },
  terminal: {
    width: "700px",
    height: "400px",
    backgroundColor: "#000",
    color: "#0f0",
    fontFamily: "monospace",
    border: "2px solid #2E3436",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  terminalHeader: {
    width: "100%",
    backgroundColor: "#300924",
    padding: "10px",
    textAlign: "center",
    borderBottom: "2px solid #2E3436",
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  terminalBody: {
    flex: 1,
    backgroundColor: "#300924",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  historyEntry: {
    display: "flex",
    flexDirection: "column",
  },
  command: {
    color: "#fff",
    fontSize: "13px",
    marginBottom: "0px",
  },
  output: {
    fontSize: "13px",
    color: "#fff",
    marginBottom: "5px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    padding: "5px 0",
  },
  input: {
    flex: 1,
    fontSize: "13px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    outline: "none",
    fontFamily: "monospace",
    paddingLeft: "5px",
  },
  green: { color: "#8AE234" },
  white: { color: "#fff" },
  blue: { color: "#729FCF" },
};

export default App;
