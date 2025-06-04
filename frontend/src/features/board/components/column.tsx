import Task from "./task";

const Column = () => {
  return (
    <div className="w-90 border rounded-xl p-4 shrink-0 ">
      <h1 className="text-2xl font-bold h-fit">Column name</h1>
      <Task/>
    </div>
  );
};

export default Column;
