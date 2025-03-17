import { useState, useEffect } from "react";
import api from "../utils/api";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handlePost = async () => {
    setLoading(true);
    console.log(content);
    try {
      const userid = localStorage.getItem("userid");
      if (content === "") {
        toast.error("Post cannot be empty");
        setLoading(false);
        return;
      }
      console.log(anonymous);
      const apibody = { content, anonymous, userid };
      const response = await api.post("/post", apibody);
      console.log(response);
      if (response.status === 201) {
        const data = await response.data;
        setContent("");
        setAnonymous(false);
        setLoading(false);
        toast.success("Post created successfully", {
          duration: 2000,
          position: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating post");
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await api.get("/post");
      if (response.status === 200) {
        console.log(response);
        const data = await response.data;
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = async () => {
    const results = posts.filter((post) =>
      post.content.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
    setPosts(results);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <Toaster />

        <div class="w-[35%]">
          <div class="relative">
            <input
              class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search for a Topic or keyword"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button
              class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow hover:cursor-pointer focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
        <div className="w-[85%] bg-white rounded-md h-full my-2 p-4 flex flex-col justify-center items-center">
          <h1 className="font-semibold text-2xl">Public Community Feed</h1>
          <div className="w-[90%] max-h-[475px] overflow-y-auto mt-4">
            {posts &&
              posts.map((post, index) => (
                <div key={index} className="border rounded-md p-4 my-4 w-full">
                  <div className="text-slate-600 text-sm">
                    {post.annonymous ? "Annonymous" : post.User.email}
                  </div>
                  <div className="text-xl p-3">{post.content}</div>
                </div>
              ))}
          </div>
        </div>

        <div class=" w-[85%] h-[25%] bg-white px-6 rounded-md flex flex-col items-center justify-center pb-4">
          <h2 className="font-bold text-xl  ml-4">
            Share your thoughts with the community without any judgements
          </h2>

          <div class="relative w-[80%] h-[40%] mt-8">
            <div class="relative w-full h-full">
              <textarea
                rows="8"
                class="peer h-full w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                What's on your mind?
              </label>
            </div>
            <div class="flex w-full justify-between py-1.5">
              <div class="inline-flex items-center  ">
                <label
                  class="flex items-center cursor-pointer relative"
                  for="check-2"
                >
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={() => setAnonymous(!anonymous)}
                    class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                    id="check-2"
                  />
                  <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label class="cursor-pointer ml-2 text-sm" for="check-2">
                  anonymous post
                </label>
              </div>

              <div class="flex gap-2">
                <button
                  class="select-none hover:cursor-pointer rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={handlePost}
                >
                  {loading ? (
                    <TailSpin
                      height={25}
                      width={80}
                      radius={1}
                      color="#ffffff"
                    />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
