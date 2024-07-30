// import { useLocation } from "react-router-dom"

import TodoList from "./TodoList"

const HomePage = () => {
    // const userdate = useLocation()
    // console.log(userdate.state.name)
  return (
    <section className="max-w-2xl mx-auto">
     <TodoList/>
    </section>
  )
}

export default HomePage