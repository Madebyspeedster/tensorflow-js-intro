import React, { useState, useEffect } from "react";

const TextModerate = ({ modelInstance }) => {
  const [inputValue, setInputValue] = useState("");
  const [delayedValue, setDelayedValue] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (modelInstance && delayedValue) {
      modelInstance.classify([delayedValue]).then((predictions) => {
        setPredictions(predictions);
      });
    }
  }, [modelInstance, delayedValue]);

  const getModerationResult = () => {
    if (predictions.length === 0) return "";

    return predictions.map((prediction) => {
      const match = prediction.results[0].match;
      const probability = prediction.results[0].probabilities[1]; // Probability of being toxic
      const label = prediction.label;

      let emoji = "";
      let text = "";

      if (match === false || probability <= 0.5) {
        emoji = "😇";
        text = `Content is safe (${label})`;
      } else {
        if (probability > 0.9) {
          emoji = "😈";
          text = `Highly toxic content detected (${label})`;
        } else if (probability > 0.7) {
          emoji = "😡";
          text = `Moderately toxic content detected (${label})`;
        } else {
          emoji = "🙁";
          text = `Slightly toxic content detected (${label})`;
        }
      }

      return (
        <p key={label}>
          {emoji} {text}
        </p>
      );
    });
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="inputText" className="form-label fs-4 text">
          Type something:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputText"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div>{getModerationResult()}</div>
    </div>
  );
};

export default TextModerate;
