import { useEffect, useState } from 'react';
import { Post } from './models/interface';

function App() {
  const [data, setData] = useState<any[]>([]);

  const fetchApi = () => {
    fetch(`${import.meta.env.VITE_URL_KEY}/posts`)
      .then((res) => res.json())
      .then((resp) => {
        setData([...data, resp]);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
      <h2 className="p-2 bg-emerald-400 text-3xl">api</h2>
      {data.length > 0 ? (
        data[0].map((el: Post, idx: number) => (
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
