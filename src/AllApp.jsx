import { useEffect, useState } from "react";
import "./App.css";
import { connectWallet, connectingWithContract } from "./Utils/apiFeature.js";
import Modal from "./Components/Modal/Modal.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllApp() {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setList, setUserList] = useState([]);
  const [error, setError] = useState("");

  const [currentUserName, setCurrentUserName] = useState("");
  const [currenUserAddress, setCurrentAddress] = useState("");

  // const navigate=useNav

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();

      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      

      if (!connectAccount) {
        toast.error("Connect your Meta Mask ");
      }


    
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
       
      
    } catch (error) {
      setError("Please install the Metamask");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently You have no message");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      //  if(!name||!accountAddress)
      //  setError("Name and account can't be emmpty ");

      const contract = await connectingWithContract();

      const getCreateUser = await contract
        .createAccount(name, accountAddress)
        .send({ from: accountAddress });

      //  fetchData();
      console.log(getCreateUser)

      setLoading(true);
      await getCreateUser.wait();
      setLoading(false);

      window.location.reload();
    } catch (error) {
      console.log(error)
      setError("Please reload your browser");
    }
  };

  // const addFriends=async({name,accountAddress})=>{
  //   try{
  //     if(!name||!accountAddress)
  //     return setError("Name and account can't be emmpty ");
  //     const contract=await connectingWithContract();
  //     const addFriend=await contract.addFriend(accountAddress,name);
  //     setLoading(true);
  //     await addFriend.wait();
  //     setLoading(false);
  //     // navigate("/");
  //     window.location.reload();

  //   }catch(error)
  //   {
  //     setError("Error while adding friend");
  //   }
  // }

  // const sendMessage=async({msg,address})=>{
  //   try{
  //     if(!msg||!address)
  //     return setError("Please type your message");
  //     const contract=await connectingWithContract();
  //     const addMessage=await contract.sendMessage(address,msg);
  //     setLoading(true);
  //     await addMessage.wait();
  //     setLoading(false);
  //     window.location.reload();
  //   }catch(error)
  //   {
  //     setError("please reload the window")
  //   }
  // }

  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(connectAccount);
    setUserName(userName);
    setCurrentAddress(userAddress);
  };

  return (
    <>
      <Modal
        account={account}
        userName={userName}
        createAccount={createAccount}
      />
      <ToastContainer />
    </>
  );
}

export default AllApp;
