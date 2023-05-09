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
      <header className="py-2 px-5 bg-yellow-300 font-semibold mb-3 flex justify-between">
        <h2>Flavio scimeca task</h2>
        <span>
          <a href="https://github.com/FlavioScimeca/22hbg" target="blank">
            Repo Github
          </a>{' '}
        </span>
      </header>
      <div>
        <p className="text-center font-semibold my-2">GET/posts</p>
      </div>
      {data.length > 0 ? (
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-3 m-2">
          {data[0].map((el: Post, idx: number) => (
            <a href={el.link} target="blank">
              <div
                key={idx}
                className=" cursor-pointer shadow-lg p-2 rounded-lg bg-slate-300"
              >
                <h3
                  className="text-center font-semibold  line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: el.title.rendered }}
                ></h3>
                {/* //! utilizzo dangerouslySetInnerHTML per tarttare la stringa non
              //! come tale ma come HTML perche se no stampava <p></p> href ecc. */}
                <div
                  className=" line-clamp-4 mt-3 font-extralight"
                  dangerouslySetInnerHTML={{ __html: el.content.rendered }}
                />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div>non fetchati</div>
      )}
    </>
  );
}

export default App;
