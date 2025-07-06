
import type { CreateBoardFormProps } from "../boards.types";
const CreateBoardForm = ({handleSubmit,onCreate,register}:CreateBoardFormProps) => {

  return (
    <form onSubmit={handleSubmit(onCreate)}>
      <h1 className="text-3xl font-bold mb-4">Create new board</h1>
      <p  className="text-lg">Name</p>
      <input
        {...register("name",{required:true})}
        type="text"
        className="block border border-white w-full  text-sm text-[#B5B5B5] p-4 rounded-lg my-2"
        placeholder="Enter board name"
      />
      <p className="text-lg">Description</p>
      <input
        {...register("description",{required:true})}
        type="text"
        className="block border border-white w-full text-sm text-[#B5B5B5] p-4 rounded-lg my-2"
        placeholder="Enter board description"
      />
      <button className="p-2 bg-green-700  text-lg hover:bg-green-600 my-2 text-center rounded-lg cursor-pointer ">
        Create
      </button>
    </form>
  );
};

export default CreateBoardForm;