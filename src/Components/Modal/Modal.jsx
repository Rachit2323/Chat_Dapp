import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Modal = ({ account ,userName,createAccount }) => {

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    address: account||"", 
  });

  useEffect(() => {
    if (account) {
      setFormData(prevFormData => ({
        ...prevFormData,
        address: account
      }));
     
    }
  }, [account]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount({ name: formData.username, accountAddress: formData.address });
    // window.location.reload();
  };

  useEffect(()=>{
    if(userName)
    {
      navigate("/dash");
    }
  
  },[userName])


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold mb-4">Create Your Account</h1>

        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username 
              {/* {userName} */}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData?.username} // Bind value to form state
              onChange={handleInputChange} // Handle input change
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={account||""} 
              onChange={handleInputChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit" 
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
