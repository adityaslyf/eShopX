const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-t-4 border-blue-400 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png" 
              alt="Cat Loading"
              className="w-16 h-16"
            />
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-lg">Loading, please wait...</p>
      </div>
    );
  }
  
  export default Loader;
  