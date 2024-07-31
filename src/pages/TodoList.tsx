import Button from "../ui/Button";
import { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "../ui/Textarea";
import axiosInstance from "../config/axios.config";

const TodoList = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isEditModal, setIsEditModal] = useState(false);
  const defaultTodo = {
    description: "",
    id: 0,
    title: "",
  };
  const [editTodo, setEditTodo] = useState<ITodo>(defaultTodo);
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
  const onEditTodo = (todo: ITodo) => {
    setEditTodo(todo);
    toggleEditModal();
  };
  const onCloseEditModal = () => {
    setEditTodo(defaultTodo);
    toggleEditModal();
  };
  const onChangeEditTodo = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditTodo({ ...editTodo, [name]: value });
  };
  const onSubmitEditTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description } = editTodo;
    await axiosInstance.put(
      `/todos/${editTodo.id}`,
      { data: { title, description } },
      {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      }
    );
    toggleEditModal();
  };
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
              <Button onClick={() => onEditTodo(todo)}>Edit</Button>
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
        <form onSubmit={onSubmitEditTodo}>
          <Input
            name="title"
            value={editTodo.title}
            onChange={onChangeEditTodo}
          />
          <Textarea
            value={editTodo.description}
            name="description"
            onChange={onChangeEditTodo}
          />
          <div className="flex items-center justify-between mt-4 space-x-5">
            <Button>Update</Button>
            <Button
              onClick={onCloseEditModal}
              type="button"
              className="bg-red-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default TodoList;
