import useAddColumnForm from "../hooks/addColumnForm.hook";
const AddColumnForm = () => {
  const { handleSubmit, onAddColumn, register } = useAddColumnForm();
  return (
    <form onSubmit={handleSubmit(onAddColumn)}>
      <h1 className="text-3xl font-bold mb-4">Add column</h1>
      <p className="text-lg">Name</p>
      <input
        {...register("name")}
        type="text"
        className="block border border-white w-full  text-sm text-[#B5B5B5] p-4 rounded-lg my-2"
        placeholder="Enter board name"
      />

      <input {...register("BoardId")} type="hidden" />
      <button className="p-2 bg-green-700  hover:bg-green-600  text-lg my-2 text-center rounded-lg cursor-pointer ">
        Add
      </button>
    </form>
  );
};

export default AddColumnForm;
