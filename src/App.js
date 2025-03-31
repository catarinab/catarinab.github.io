import React, { useState, useEffect, useRef } from "react";

function App() {
  const commands = {
    help: "Available commands: help, whoami, clear, echo [text], ls",
    whoami: "You are a React user!",
    clear: "",
    ls: "Desktop Documents Downloads Music Pictures Videos",
    echo: (args) => args,
  };

  const [input, setInput] = useState("");
const [history, setHistory] = useState([]);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (input.trim() === "") return;

    const inputParts = input.trim().split(' ');
    const command = inputParts[0];
    const args = inputParts.slice(1).join(' ');
    
    let response;
    
    if (command === "clear") {
      setHistory([]);
    } else {
      if (typeof commands[command] === 'function') {
        response = commands[command](args);
      } else {
        response = commands[command] || `Command not found: ${command}`;
      }
      
      setHistory((prev) => [
        ...prev,
        { prompt: "cat@portfolio:~$", command: input, output: response },
      ]);
    }

    setInput(""); // Clear input after submission
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Handle clicks on terminal to focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Auto-scroll to the bottom when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Maintain focus on input when terminal is clicked
  useEffect(() => {
    document.addEventListener("click", handleTerminalClick);
    return () => {
      document.removeEventListener("click", handleTerminalClick);
    };
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.terminal}>
        <div style={styles.terminalHeader}>
          <div style={styles.trafficLights}>
            <div style={styles.closeButton}></div>
            <div style={styles.minimizeButton}></div>
            <div style={styles.maximizeButton}></div>
          </div>
          <div style={styles.title}>catarinab — myzsh — 80×24</div>
        </div>
        <div style={styles.terminalBody} onClick={handleTerminalClick}>
          {history.map((entry, index) => (
            <div key={index} style={styles.historyEntry}>
              <div style={styles.commandLine}>
                <span style={styles.prompt}>
                  <span style={styles.green}>cat@portfolio</span>
                  <span style={styles.white}>:</span>
                  <span style={styles.blue}>~</span>
                  <span style={styles.white}>$&nbsp;</span>
                </span>{" "}
                <span>{entry.command}</span>
              </div>
              {entry.output && (
                <div style={styles.output}>
                  {entry.output.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Current input line */}
          <form onSubmit={handleSubmit} style={styles.inputLine}>
            <span style={styles.prompt}>
              <span style={styles.green}>cat@portfolio</span>
              <span style={styles.white}>:</span>
              <span style={styles.blue}>~</span>
              <span style={styles.white}>$&nbsp;</span>
            </span>{" "}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              style={styles.input}
            />
          </form>
          <div ref={terminalEndRef} style={styles.terminalEnd} />
        </div>
      </div>
    </div>
  );
}

const FONT_SIZE = "16px";

const styles = {
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1a1a1a",
  },
  terminal: {
    width: "900px",
    height: "600px",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "JetBrains Mono, Monaco, Menlo, Consolas, monospace",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
  },
  terminalHeader: {
    width: "100%",
    backgroundColor: "#28292b",
    padding: "8px 10px",
    position: "relative",
    boxSizing: "border-box",
    height: "32px",
    display: "flex",
    alignItems: "center",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
  },
  trafficLights: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    left: "12px",
    top: "10px",
  },
  closeButton: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ff5f57",
    marginRight: "8px",
  },
  minimizeButton: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ffbd2e",
    marginRight: "8px",
  },
  maximizeButton: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#28ca41",
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: "#b8b8b8",
    fontSize: "13px",
    fontWeight: "normal",
  },
  terminalBody: {
    flex: 1,
    backgroundColor: "#000",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  historyEntry: {
    marginBottom: "4px",
  },
  commandLine: {
    color: "#fff",
    fontSize: FONT_SIZE,
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  output: {
    fontSize: FONT_SIZE,
    color: '#fff',
    marginTop: "2px",
    marginBottom: "6px",
    paddingLeft: "10px",
    whiteSpace: "pre", // Changed from pre-wrap to preserve exact spacing
    fontFamily: "monospace", // Make sure to use monospace for ASCII art
  },
  inputLine: {
    display: "flex",
    fontSize: FONT_SIZE,
    alignItems: "center",
    color: "#fff",
    marginTop: "auto",
    width: "100%",
    margin: 0,
    padding: 0,
  },
  prompt: {
    display: "inline-flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE,
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    outline: "none",
    fontFamily: "JetBrains Mono, Monaco, Menlo, Consolas, monospace",
    padding: "0",
    margin: "0",
    width: "calc(100% - 15px)",
  },
  terminalEnd: {
    float: "left",
    clear: "both",
  },
  green: { color: "#8AE234" },
  white: { color: "#fff" },
  blue: { color: "#729FCF" },
};

export default App;