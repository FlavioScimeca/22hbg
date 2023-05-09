import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<any[]>([]);

  const fetchApi = () => {
    fetch(`${import.meta.env.VITE_URL_KEY}/posts`)
      .then((res) => res.json())
      .then((resp) => setData([...data, resp]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApi();
    console.log(data);
  }, []);
  return (
    <>
      <h2>api</h2>
      {data.length > 0 ? (
        data[0].map((el: any, idx: number) => (
          <div key={idx}>
            <p>{el.title.rendered}</p>
          </div>
        ))
      ) : (
        <div>non fetchati</div>
      )}
    </>
  );
}

export default App;
