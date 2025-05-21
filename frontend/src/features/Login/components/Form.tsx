function Form() {
    return (
        <form action="#" className="border border-white w-1/3 px-12 rounded-lg min-w-[340px]">
              <h1 className="text-3xl font-bold text-center my-10">Sign In</h1>
              <input type="text" className="block border border-white w-[100%] text-lg text-[#B5B5B5] p-4 rounded-lg my-10" placeholder="Enter your username"/>
              <input type="text" className="block border border-white w-[100%] text-lg text-[#B5B5B5] p-4 rounded-lg my-10" placeholder="Enter your password"/>
  
              <div className="flex justify-center mb-10 mt-20">
                  <button className="p-2 bg-green-700 text-xl text-center w-2/3 rounded-lg cursor-pointer ">Sign In</button>
              </div>
          </form>
    );
  }
export default Form;