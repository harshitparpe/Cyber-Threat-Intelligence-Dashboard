import React from "react";
import "./MitreMatrix.css";

const mitreData = [
  {
    tactic: "Initial Access",
    techniques: ["Phishing", "Drive-by Compromise", "Supply Chain Compromise"],
  },
  {
    tactic: "Execution",
    techniques: ["Command and Scripting Interpreter", "Malicious File"],
  },
  {
    tactic: "Persistence",
    techniques: ["Registry Run Keys", "Scheduled Task/Job"],
  },
  {
    tactic: "Privilege Escalation",
    techniques: ["Exploitation for Privilege Escalation", "Bypass UAC"],
  },
  {
    tactic: "Defense Evasion",
    techniques: ["Obfuscated Files or Information", "Impair Defenses"],
  },
  {
    tactic: "Credential Access",
    techniques: ["Brute Force", "Credential Dumping"],
  },
];

const MitreMatrix = () => {
  return (
    <div className="mitre-container">
      <h2>🛡 MITRE ATT&CK Matrix</h2>
      <div className="matrix">
        {mitreData.map((item, index) => (
          <div key={index} className="tactic-box">
            <h4>{item.tactic}</h4>
            <ul>
              {item.techniques.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MitreMatrix;
