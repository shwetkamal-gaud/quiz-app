import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div className="p-5 flex items-center flex-col justify-center h-[85%] gap-2">
      <h1>Welcome to the Quiz Platform</h1>
      <Link to={'/quiz'} className="btn bg-blue-500 rounded-xl text-white px-3 py-2">
        Go to the Quiz Page
      </Link>
    </div>
  )
}

export default Home