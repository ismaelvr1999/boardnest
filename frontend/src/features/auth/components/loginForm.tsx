import {useLogin} from "../auth.hooks";
import Toast from "../../../components/toast";
function Form() {
  const {handleSubmit,onSubmit,register} = useLogin();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-white w-1/3 px-12 rounded-lg min-w-[340px] shadow-white shadow-xl/15"
    >
      <h1 className="text-3xl font-bold text-center my-10">Sign In</h1>
      <input
        {...register("username")}
        type="text"
        className="block border border-white w-[100%] text-lg text-[#B5B5B5] p-4 rounded-lg my-10"
        placeholder="Enter your username"
      />
      <input
        {...register("password")}
        type="password"
        className="block border border-white w-[100%] text-lg text-[#B5B5B5] p-4 rounded-lg my-10"
        placeholder="Enter your password"
      />

      <div className="flex justify-center mb-10 mt-20">
        <button className="p-2 bg-green-700 text-xl text-center w-2/3 rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transform transition-transform duration-200 ease-in-out ">
          Sign In
        </button>
      </div>
      <Toast />
    </form>
  );
}
export default Form;
