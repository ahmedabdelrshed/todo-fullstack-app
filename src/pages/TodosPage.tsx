import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Paginator from "../ui/Paginator";
import TodoListSkeleton from "../ui/TodoListSkeleton";

const TodosPage = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["TodoPage"],
    url: "/todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  if (isLoading) return <TodoListSkeleton />;
  return (
    <div className="space-y-4 my-4">
      {data.data.length ? (
        data.data.map((todo: { id: number; attributes: { title: string } }) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">
              {todo.id} - {todo.attributes.title}
            </p>
          </div>
        ))
      ) : (
        <h2>You don't have todos Yet !!!</h2>
      )}
      <Paginator />
    </div>
  );
};

export default TodosPage;
