import React from "react";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; 

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {

    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }



    const translationDummyRequest = async () => {
      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/t5-small",
          {
            headers: {
              Authorization: "Bearer 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",
            },
            method: "POST",
            body: JSON.stringify({ inputs: "Dummy translation request" }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Translation API Dummy Result:", result);
      } catch (error) {
        console.error("Translation API Dummy Error:", error);
      }
    };
    const sentimentAnalysisDummyRequest = async () => {
      try {
        const result = await query({
          inputs: "Dummy sentiment analysis request",
        });
        console.log("Sentiment Analysis API Dummy Result:", result);
      } catch (error) {
        console.error("Sentiment Analysis API Dummy Error:", error);
      }
    };
    translationDummyRequest();
    sentimentAnalysisDummyRequest();
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

 return (
  <div className="Landing">
    <div className="Background"></div>
    <div className="Content">
      <h1>AI Web App</h1>
      <div className="Buttons">
        <button onClick={handleRegisterClick}>Register</button>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  </div>
);

}

export default LandingPage;
