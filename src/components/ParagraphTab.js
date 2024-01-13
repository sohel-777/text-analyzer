import React, { useEffect, useState } from "react";
import Table from "./Table";

const ParagraphTab = () => {
  const [text, setText] = useState("");
  const [paraDetails, setParaDetails] = useState({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    spaces: 0,
    punctuations: 0,
  });

  const analyzeText = () => {
    const characters = text.length;
    const words = text.split(/\s+/).filter((word) => word.length > 0).length;
    const sentences = text.split(/[.!?]/).filter((sentence) => sentence.length > 0).length;
    const paragraphs = text.split('\n').filter((paragraph) => paragraph.length > 0).length;
    const spaces = text.split(' ').length - 1;
    const punctuations = text.replace(/[^\.,!?]/g, '').length;

    setParaDetails({
      characters,
      words,
      sentences,
      paragraphs,
      spaces,
      punctuations,
    });
   
  };

  useEffect(() => {
    analyzeText();
  }, [text]);

  return (
    <div className="paraTab">
      <textarea
        type="text"
        className="paraInput"
        placeholder="Type, or copy/paste your content here."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          analyzeText();
        }}
      />

      <Table isWordTab={false}  paraDetails={paraDetails}/>
    </div>
  );
};

export default ParagraphTab;
