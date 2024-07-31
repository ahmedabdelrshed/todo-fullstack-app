import Button from "../ui/Button";
import { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useState } from "react";

const TodoList = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isEditModal, setIsEditModal] = useState(false);
  // fetch data using custom query hook
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  if (isLoading) return "Loading...";
  // Handlers
  const toggleEditModal = () => setIsEditModal(!isEditModal);
  return (
    <div className="space-y-2">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button onClick={toggleEditModal}>Edit</Button>
              <Button className="bg-red-700">Remove</Button>
            </div>
          </div>
        ))
      ) : (
        <h2>You don't have todos Yet !!!</h2>
      )}
      <Modal
        isOpen={isEditModal}
        title="Edit Todo"
        closeModal={toggleEditModal}
      >
        <Input name="title" value={"Edit Todo"}/>
        <div className="flex items-center justify-between mt-4 space-x-5">
          <Button >Update</Button>
          <Button onClick={toggleEditModal} className="bg-red-700">Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
