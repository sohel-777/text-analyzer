//Module imports
import React, { useState } from "react";
import WordTab from "./WordTab";
import ParagraphTab from "./ParagraphTab";

const TextAnalyzer = () => {
  const [isWordTab, setIsWordTab] = useState(true);

  const toggleTabs = () => {
    setIsWordTab(!isWordTab);
  };

  return (
    <div className="container">
      <h1>Text Analyzer</h1>
      <p>
        Text Analyzer is a simple free online tool for SEO web content analysis
        that helps you find most frequent phrases and words, number of
        characters, words, sentences and paragraphs, and estimated read and
        speak time of your content.
      </p>
      <div className="tabs-container">
        <div className={isWordTab?  "backgroundWhite" : ""} onClick={toggleTabs}>
          Word Input
        </div>
        <div className={!isWordTab? "backgroundWhite" : ""} onClick={toggleTabs}>
          Paragraph
        </div>
      </div>
      {isWordTab ? <WordTab /> : <ParagraphTab />}
    </div>
  );
};

export default TextAnalyzer;
