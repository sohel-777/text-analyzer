import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

const WordTab = () => {
  const [word, setWord] = useState("");
  const [wordDetails, setWordDetails] = useState(null); //from api
  const [paraDetails, setParaDetails] = useState({
    characters: 0,
    words: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY; //getting api keyfrom env file

  const analyzeText = () => {
    const characters = word.length;
    const words = word.split(/\s+/).filter((word) => word.length > 0).length;

    setParaDetails({
      characters,
      words,
    });
  };

  const fetchWordDetails = async (word) => {
    try {
      setLoading(true);
      setError(null);

      //Setting limit to the API call
      const requestCount =
        parseInt(localStorage.getItem("wordApiRequestCount")) || 0;
      console.log("request count", requestCount);
      const lastRequestDate = localStorage.getItem("lastWordApiRequestDate");

      // Check if the user has made requests today
      const today = new Date().toDateString();
      if (lastRequestDate !== today) {
        // If it's a new day, reset the request count
        localStorage.setItem("wordApiRequestCount", "1");
        localStorage.setItem("lastWordApiRequestDate", today);
      } else {
        // If it's the same day, check if the request count is within the limit
        if (requestCount >= 2000) {
          console.log(
            "Exceeded daily request limit of 2000/day Please try again tomorrow"
          );
          setError(
            "Exceeded daily request limit of 2000/day Please try again tomorrow"
          );
          return;
        }

        // Increment the request count
        localStorage.setItem(
          "wordApiRequestCount",
          (requestCount + 1).toString()
        );
      }
//Calling the API
      const response = await axios.get(
        `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        {
          headers: {
            "x-rapidapi-key": rapidApiKey,
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          },
        }
      );
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setWordDetails(response.data.results[0]);
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching word details:", error);
      setError(
        "An error occurred while fetching word details. Please check your spelling and try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeText();
  }, [word]);

  return (
    <div className="wordTab">
      <div className="wordSearch">
        <input
          type="text"
          value={word}
          placeholder="Type a Note..."
          onChange={(e) => {
            setWord(e.target.value);
            analyzeText();
            if (e.target.value.trim() === "") {
              setWordDetails(null);
              setError(null);
            }
          }}
        />
        <button
          onClick={() => {
            if (word.trim() !== "") {
              const lastWord = word.trim().split(/\s+/).pop();
              fetchWordDetails(lastWord);
            } else {
              setWordDetails(null);
            }
          }}
        >
          {loading ? "Loading..." : "Process Word"}
        </button>
      </div>
      <Table isWordTab={true} paraDetails={paraDetails} />

      {wordDetails ? (
        <div className="wordDetailsDiv">
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Definition: </p>
                </td>
                <td>
                  <p className="boldResults">{wordDetails.definition}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Part of Speech:</p>
                </td>
                <td>
                  <p className="boldResults">{wordDetails.partOfSpeech}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Synonyms: </p>
                </td>
                <td>
                  <p className="boldResults">
                    {wordDetails.synonyms?.join(", ") || "N/A"}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Type Of: </p>
                </td>
                <td>
                  <p className="boldResults">
                    {wordDetails.typeOf?.join(", ") || "N/A"}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="wordDetailsDiv" style={{ height: "10rem" }}>
          {error ? (
            <p className="errorText">`Error: ${error}`</p>
          ) : (
            `Type the word you're curious about and hit the 'Process Word' button
          to uncover fascinating details about it. 📚 Don't forget to explore
          the world of words!`
          )}
        </div>
      )}
    </div>
  );
};

export default WordTab;
