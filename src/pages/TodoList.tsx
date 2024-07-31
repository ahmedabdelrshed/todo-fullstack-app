import Button from "../ui/Button";
import { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "../ui/Textarea";
import axiosInstance from "../config/axios.config";
import { validateTodo } from "../validation";
import ErrorMassage from "../errors/ErrorMassage";
import toast from "react-hot-toast";

const TodoList = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [errorEdit, setErrorEdit] = useState({
    title: "",
    description: "",
  });
  const defaultTodo = {
    description: "",
    id: 0,
    title: "",
  };
  const [editTodo, setEditTodo] = useState<ITodo>(defaultTodo);
  // fetch data using custom query hook
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["TodoList", `${editTodo.id}`],
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
  const toggleDeleteModal = () => setIsDeleteModal(!isDeleteModal);
  const onEditTodo = (todo: ITodo) => {
    setEditTodo(todo);
    toggleEditModal();
  };
  const onCloseEditModal = () => {
    setEditTodo(defaultTodo);
    toggleEditModal();
    setErrorEdit({ title: "", description: "" });
  };
  const onChangeEditTodo = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setEditTodo({ ...editTodo, [name]: value });
    setErrorEdit({ ...errorEdit, [name]: "" });
  };
  const onDeleteTodo = (id: number) => {
    setEditTodo({ ...editTodo, id });
    toggleDeleteModal();
  };
  const onConfirmDeleteTodo = async () => {
    try {
      await axiosInstance.delete(`/todos/${editTodo.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      toggleDeleteModal();
      toast.success("Todo deleted successfully");
      setEditTodo(defaultTodo);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitEditTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description } = editTodo;
    const errors = validateTodo(editTodo.title, editTodo.description);
    const checkErrorMsg = Object.values(errors).every((error) => error === "");
    if (!checkErrorMsg) {
      setErrorEdit(errors);
      return;
    }
    try {
      await axiosInstance.put(
        `/todos/${editTodo.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      onCloseEditModal();
      toast.success("Todo Updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-2">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {todo.id} - {todo.title}
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button onClick={() => onEditTodo(todo)}>Edit</Button>
              <Button
                className="bg-[#C0344D]"
                onClick={() => onDeleteTodo(todo.id)}
              >
                Remove
              </Button>
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
          {errorEdit.title ? <ErrorMassage msg={errorEdit.title} /> : null}
          <Textarea
            value={editTodo.description}
            name="description"
            onChange={onChangeEditTodo}
          />
          {errorEdit.description ? (
            <ErrorMassage msg={errorEdit.description} />
          ) : null}
          <div className="flex items-center justify-between mt-4 space-x-5">
            <Button>Update</Button>
            <Button
              onClick={onCloseEditModal}
              type="button"
              className="bg-[#C0344D]"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isDeleteModal}
        closeModal={toggleDeleteModal}
        title="Are you sure to Delete this Todo ?  "
      >
        <div className="flex items-center space-x-3 mt-5">
          <Button
            className="bg-[#C0344D] hover:bg-red-800"
            onClick={onConfirmDeleteTodo}
          >
            Confirm
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-800"
            type="button"
            onClick={toggleDeleteModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default TodoList;
