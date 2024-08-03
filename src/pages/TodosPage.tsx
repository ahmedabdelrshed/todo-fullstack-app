import { ChangeEvent, useState } from "react";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Paginator from "../ui/Paginator";
import TodoListSkeleton from "../ui/TodoListSkeleton";

const TodosPage = () => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(7);
  const { isLoading, data, isFetching } = useAuthenticatedQuery({
    queryKey: [`todos-page-${page}`, `todos-size-${pageSize}`],
    url: `/todos/?pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  // Handlers
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };
  const onChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+event.target.value);
  };
  if (isLoading) return <TodoListSkeleton />;
  const { pageCount, total } = data.meta.pagination;
  return (
    <div className="max-w-2xl mx-auto space-y-4 my-2">
      <div className="flex justify-between items-center">
        <h3 className="text-blue-600 font-bold ">Your Todos</h3>
        <select
          className="border-2 border-indigo-600 rounded-md p-2"
          value={pageSize}
          onChange={onChangePageSize}
        >
          <option disabled>Page Size</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
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
      <Paginator
        isLoading={isLoading || isFetching}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        page={page}
        pageCount={pageCount}
        total={total}
      />
    </div>
  );
};

export default TodosPage;
