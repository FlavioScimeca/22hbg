import { useEffect, useState } from 'react';
import { Post } from './models/interface';

const TaskPost: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchApi = () => {
    fetch(`${import.meta.env.VITE_URL_KEY}/posts`, { method: 'GET' })
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
          </a>
        </span>
      </header>
      <main>
        <section>
          <div>
            <p className="text-center font-semibold my-2">GET/posts</p>
          </div>
          {data.length > 0 ? (
            <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-3">
              {data[0].map((el: Post, idx: number) => (
                <a key={idx} href={el.link} target="blank">
                  <div className=" cursor-pointer shadow-lg p-2 rounded-lg bg-slate-300 m-2">
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
            <div className="text-center font-semibold text-4xl">
              Dati non fetchati
            </div>
          )}
        </section>
      </main>
    </>
  );
};

function TaskPostFiltered() {
  const [title, setTitle] = useState<string>('');
  const [items, setItems] = useState<string>('');
  const [post, setPost] = useState<Array<Post>>();
  const [message, setMessage] = useState<string>('');

  const fetchPostFiltered = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();

    const condition = [
      title.trim() != '',
      title != null,
      title != undefined,
      items != null,
      items != undefined,
      items.trim() != '',
    ];

    if (condition.includes(false)) {
      setMessage('Controlla o compila i campi');
      return false;
    }
    fetch(
      `${
        import.meta.env.VITE_URL_KEY
      }/posts-filtered/?title=${title}&items=${items}`,
      { method: 'POST' }
    )
      .then((res) => res.json())
      .then((resp: Array<Post>) => {
        setPost(resp);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Controlla o compila i campi');
      });

    setTitle('');
    setItems('');
    setMessage('Completata!');
  };

  useEffect(() => {
    console.log(post);
  }, [post]);
  return (
    <>
      <section className="p-3">
        <div>
          <p className="text-center font-semibold my-2">GET/posts-filtered</p>
        </div>
        <div className="p-3 bg-slate-200 rounded-lg flex flex-col items-center gap-2 mx-auto max-w-5xl ">
          <div className="mx-auto w-[80%]">
            <div className="flex justify-between w-full">
              <label htmlFor="title">Inserisci titolo</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(ev.target.value)
                }
              />
            </div>
            <div className="flex justify-between w-full mt-2">
              <label htmlFor="items">Items</label>
              <input
                value={items}
                id="items"
                type="number"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setItems(ev.target.value)
                }
              />
            </div>
          </div>
          <button
            onClick={(ev) => fetchPostFiltered(ev)}
            className="py-1 px-4 bg-emerald-500 rounded-xl text-gray-600 font-semibold mt-2"
          >
            Invia
          </button>

          {message && (
            <div>
              <p className="text-center text-lg">{message}</p>
            </div>
          )}
        </div>
        <div>
          {post != undefined && post.length > 0 ? (
            <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-3">
              {post.map((el: Post, idx) => (
                <a key={idx} href={el.link} target="blank">
                  <div className=" cursor-pointer shadow-lg p-2 rounded-lg bg-slate-300 m-2">
                    <h3
                      className="text-center font-semibold  line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: el.title.rendered }}
                    ></h3>
                    <div
                      className=" line-clamp-4 mt-3 font-extralight"
                      dangerouslySetInnerHTML={{ __html: el.content.rendered }}
                    />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center text-2xl">cerca qualcosa!</div>
          )}
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <>
      <TaskPost />

      <TaskPostFiltered />
    </>
  );
}

export default App;
