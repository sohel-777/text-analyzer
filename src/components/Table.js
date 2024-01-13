import React, { useEffect, useState } from "react";

const Table = ({ isWordTab, paraDetails }) => {
  const [tableData, setTableData] = useState(paraDetails);

  useEffect(() => {
    setTableData(paraDetails);
  }, [paraDetails]);

  return (
    <div className="paraTable">
      {isWordTab ? (
        <table className="wordTable table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">characters</th>
              <th className="th">words</th>
            </tr>
          </thead>
          <tbody className="tbody-wordTab">
            <tr className="tr">
              <td className="td">{tableData.characters}</td>
              <td className="td">{tableData.words}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="table para-Table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">characters</th>
              <th className="th">words</th>
              <th className="th">sentences</th>
              <th className="th">paragraphs</th>
              <th className="th">spaces</th>
              <th className="th">punctuations</th>
            </tr>
          </thead>
          <tbody className="tbody">
            <tr className="tr">
              <td className="td">{tableData.characters}</td>
              <td className="td">{tableData.words}</td>
              <td className="td">{tableData.sentences}</td>
              <td className="td">{tableData.paragraphs}</td>
              <td className="td">{tableData.spaces}</td>
              <td className="td">{tableData.punctuations}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
