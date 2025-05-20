function Login() {
  return (
    <>
    <div className="grid grid-rows-[4rem_1fr] h-screen  text-white">
      <nav className="bg-[#1E1E1E] p-4">
        <h1 className=" text-4xl">BoardNest</h1>
      </nav>
      <div className="flex items-center justify-center bg-[#1E1E1E]">
        <form action="#" className="border border-white w-1/3 px-12 rounded-lg min-w-[340px]">
            <h1 className="text-4xl text-center my-10">Sign In</h1>
            <input type="text" className="block border border-white w-[100%] text-lg text-[#B5B5B5] p-4 rounded-lg my-10" placeholder="Enter your username"/>
            <input type="text" className="block border border-white w-[100%] text-lg text-[#B5B5B5] p-4 rounded-lg my-10" placeholder="Enter your password"/>

            <div className="flex justify-center mb-10 mt-20">
                <button className="p-2 bg-green-700 text-xl text-center w-2/3 rounded-lg">Sign In</button>
            </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
