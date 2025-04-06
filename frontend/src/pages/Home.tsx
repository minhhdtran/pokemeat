import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  
  return (
    <div className="w-screen h-screen bg-red-500 flex flex-col justify-top items-center">
      <p className="font-bold text-[15vw]">PokeMeat</p>
      
      <div className="grid grid-flow-col gap-x-[10vw] mt-[10vh]">
        <button className="w-[30vw] aspect-[3/1] rounded-2xl border-2 hover:animate-pulse hover:cursor-pointer bg-white text-[4vw]" onClick={() => nav('/pokesearch')}>Search by name</button>
        <button className="w-[30vw] aspect-[3/1] rounded-2xl border-2 hover:animate-pulse hover:cursor-pointer bg-white text-[4vw]" onClick={() => nav('/revsearch')}>Reverse Search</button>
      </div>
    </div>
  )
}

export default Home