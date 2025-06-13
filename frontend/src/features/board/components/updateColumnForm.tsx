import useUpdateColumnForm from "../hooks/updateColumnForm.hook";
import type { IColumn } from "../board.types";
const UpdateColumnForm = ({ column }: { column: IColumn }) => {
  const { handleSubmit, register, onUpdateColumnName } =
    useUpdateColumnForm(column);
  return (
    <form onSubmit={handleSubmit(onUpdateColumnName)}>
      <h1 className="text-3xl font-bold mb-4">Update board</h1>
      <p className="text-lg">Name</p>
      <input
        {...register("name")}
        type="text"
        className="block border border-white w-full  text-sm text-[#B5B5B5] p-4 rounded-lg my-2"
        placeholder="Enter board name"
      />
      <input {...register("id")} type="hidden" />
      <button className="p-2 bg-green-500  text-lg my-2 text-center rounded-lg cursor-pointer ">
        Update
      </button>
    </form>
  );
};

export default UpdateColumnForm;
