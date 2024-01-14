import React, { useState } from "react";
import Header from "../Header/header";
import { useNavigate } from "react-router-dom";



function TranslationComponent() {
  const [inputText, setInputText] = useState("Hello, How are you?");
  const [translationResult, setTranslationResult] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const query = async () => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/t5-small",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      const translationText = result[0]["translation_text"];
      setTranslationResult(JSON.stringify(translationText));
      setError(null);
    } catch (error) {
      setError("Error translating text. Please try again.");
      setTranslationResult("");
    }
  };

  return (
    <div className="Basecontainer">
      <div>
        <h1>Language Translation using T5 models from Hugging Face</h1>
        <label>
          Enter text:
          <input
            type="text"
            value={inputText}
            placeholder="Enter text"
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button onClick={query}>Translate</button>
        <div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <strong>Translation Result:</strong>
          <div>{translationResult}</div>
        </div>
        <button onClick={() => navigate("/menu")}>Go Back</button>
      </div>
      
    </div>
  );
}

export default TranslationComponent;
