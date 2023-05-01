import { useState, useEffect } from 'react';

function App() {
  const [records, setRecords] = useState([]);

  const baseId = 'appBd6NK5BJ3l7YMC';
  const apiKey = 'keyeGJgv1WpWyYP6Y';
  const tableId = 'tbl8z9fwJIHBaWOTf';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}?view=viwdjvRLSeQY3vw15`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const data = await response.json();
        setRecords(data.records);
      } catch (error) {
        console.error(error);
      }
    };

    if (urlParams.has('Genre')) {
      fetchParameters('Genre');
    } else if (urlParams.has('Author')) {
      fetchParameters('Author');
    } else if (urlParams.has('Region')) {
      fetchParameters('Region');
    } else {
      fetchRecords();
    }
  }, []);

  const fetchParameters = async (param) => {
    try {
      const tag = urlParams.get(param);
      const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}?view=viwdjvRLSeQY3vw15&filterByFormula=${param}='${tag}'`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      const data = await response.json();
      setRecords(data.records);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1><a href="index.html">caaarto</a></h1>
      </div>

      <div className="wrapper">
        <div id="grid" className="grid">
          {records.map(record => (
            <div key={record.id} className="grid-item">
              <a href={record.fields.Link} target="_blank" className="map-link">
                <img src={record.fields.Attachments[0].url} onLoad={(e) => e.target.style.height = 'auto'} />
              </a>
              {record.fields.Author && (
                <a href={`?Author=${record.fields.Author}`} className="tag">{record.fields.Author}</a>
              )}
              {record.fields.Genre && (
                <a href={`?Genre=${record.fields.Genre}`} className="tag">{record.fields.Genre}</a>
              )}
              {record.fields.Region && (
                <a href={`?Region=${record.fields.Region}`} className="tag">{record.fields.Region}</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
