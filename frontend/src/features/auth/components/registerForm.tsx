import Toast from "../../../components/toast";
import {useRegister} from "../auth.hooks";

function LoginForm() {
    const {handleSubmit,register,onSubmit} = useRegister();
    return (
        <form onSubmit={handleSubmit(onSubmit)}  className="border border-white w-full md:w-1/3 px-12 rounded-lg min-w-[340px]">
              <h1 className="text-3xl font-bold text-center my-10">Sign Up</h1>
              <input {...register("username",{required:true})} type="text" className="block border border-white w-[100%] text-lg text-white p-4 rounded-lg my-5" placeholder="Enter your username"/>
              <input {...register("firstName",{required:true})} type="text" className="block border border-white w-[100%] text-lg text-white p-4 rounded-lg my-5" placeholder="Enter your first Name"/>
              <input {...register("lastName",{required:true})} type="text" className="block border border-white w-[100%] text-lg text-white p-4 rounded-lg my-5" placeholder="Enter your last Name"/>              
              <input {...register("email",{required:true})} type="email" className="block border border-white w-[100%] text-lg text-white p-4 rounded-lg my-5" placeholder="Enter your email"/>
              <input {...register("password",{required:true})} type="password" className="block border border-white w-[100%] text-lg text-white p-4 rounded-lg my-5" placeholder="Enter your password"/>
              <div className="flex justify-center mb-10 mt-10">
                  <button className="p-2 bg-green-700 text-xl text-center w-2/3 rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transform transition-transform duration-200 ease-in-out">Sign Up</button>
              </div>
              <Toast/>
          </form>
    );
  }
export default LoginForm;