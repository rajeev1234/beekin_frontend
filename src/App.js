// import data from "./data.json";
import Jobs from "./components/Jobs";
import { useEffect, useState } from "react";
import Header from "./components/Header";

 
function App() {
  const [data, setData] = useState([]);


  const fetchData = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/job"
    );
    const json = await res.json();
    return json;
  };

  useEffect(() => {
    fetchData().then((apiData) => {
      setData(apiData);
    });
  }, []);

  const [filterKeywords, setfilterKeywords] = useState([]);



  const addFilterKeywords = (data) => {
    if (!filterKeywords.includes(data)) {
      setfilterKeywords([...filterKeywords, data]);
    }
  };

  const deleteKeyword = (data) => {
    const newKeywords = filterKeywords.filter((key) => key !== data);
    setfilterKeywords(newKeywords);
  };

  const clearAll = () => {
    setfilterKeywords([]);
  };

  return (
    <div>
      <div className="header"><h1>Beekin Assignment Job Portal</h1></div>


      {data?.length && filterKeywords.length > 0 && (
        <Header
          keywords={filterKeywords}
          removeKeywords={deleteKeyword}
          clearAll={clearAll}
        />
      )}

      {data?.length && <Jobs
        keywords={filterKeywords}
        data={data}
        setKeywords={addFilterKeywords}
      />}

    </div>
  );
}
export default App;