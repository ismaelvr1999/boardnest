import Task from "./task";

const Column = ({name}:{name:string}) => {
  return (
    <div className="flex flex-col h-full w-90 border rounded-xl p-4 shrink-0">
      <h1 className="text-2xl font-bold h-fit">{name}</h1>
      <div className="overflow-y-auto">
        <Task />
      </div>
    </div>
  );
};

export default Column;
