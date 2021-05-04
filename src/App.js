import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  // const api=(limit,page)`https://jsonplaceholder.typicode.com/posts?_limits=${limit} &_page=${page}`
  const [dataArray, setDataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const apicallFunction = async () => {
      const apiData = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${5}&_page=${pageNumber}`
      );
      const apiDatajson = await apiData.json();
      console.log({ apiDatajson });
      const newArray = [...apiDatajson];
      setDataArray(newArray);
    };
    apicallFunction();
  }, [pageNumber]);
  const MAX_PAGE_Number = 20;
  const pageNumberArray = new Array(MAX_PAGE_Number)
    .fill(1)
    .map((_, idx) => idx + 1);
  const handlePrev = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber >= 20 ? pageNumber : pageNumber + 1);
  };
  return (
    <div className="App">
      <ul>
        {dataArray.map((data) => (
          <li>{data.id}</li>
        ))}
      </ul>
      <button disabled={pageNumber === 1} onClick={handlePrev}>
        previous
      </button>
      <button disabled={pageNumber <= 0} onClick={handleNext}>
        Next
      </button>
      <div>
        {pageNumberArray.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPageNumber(idx + 1);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
