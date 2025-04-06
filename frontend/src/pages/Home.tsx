import { useNavigate } from "react-router-dom"; 

const Home = () => {
  const nav = useNavigate();
  
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col overflow-hidden bg-black z-5">
      {/* Background GIF */}
      <img
        src="/pokemeat1.gif"
        alt="pokemon2 gif"
        className="w-fit h-fit object-cover z-10"
      />

      <div className="grid grid-flow-col gap-x-[10vw] mt-[10vh]">
        <button className="w-[30vw] aspect-[3/1] rounded-2xl border-2 hover:animate-pulse hover:cursor-pointer bg-white text-[4vw]" onClick={() => nav('/pokesearch')}>Search by name</button>
        <button className="w-[30vw] aspect-[3/1] rounded-2xl border-2 hover:animate-pulse hover:cursor-pointer bg-white text-[4vw]" onClick={() => nav('/revsearch')}>Reverse Search</button>
      </div>
    </div>
  )
}

export default Home