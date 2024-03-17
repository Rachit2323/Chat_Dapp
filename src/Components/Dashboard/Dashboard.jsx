import React, { useEffect, useState } from "react";
import {
  connectWallet,
  connectingWithContract,
} from "../../Utils/apiFeature.js";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../assets/Loader.svg";
import { IoMdArrowBack } from "react-icons/io";

const Dashboard = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [allUserList, setAllUserList] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [myFriendList, setMyFriendList] = useState();
  const [selectedUserPubkey, setSelectedUserPubkey] = useState(null);
  const [currentMessageUser, setCurrentMessageUser] = useState();
  const [_msg, setMessage] = useState("");
  const [allUserMessage, setAllUserMessage] = useState();
  const [sendingBack, setSendingBack] = useState(false);
  const [newmsg, setNewMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [chatDisplay, setChatDisplay] = useState(false);
  const[showList,setShowList]=useState(false);

  useEffect(() => {
    if (account) {
      const uppercaseToken = account.toLowerCase();

      localStorage.setItem("token", account);
    }
  }, [account]);

  const presentUser = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();

      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
    } catch (error) {
      // setError("Please install the Metamask");
    }
  };

  const allUser = async () => {
    try {
      const contract = await connectingWithContract();

      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // const allUser = await contract.methods.getAllAppUser().call();
      const allUser = await contract.getAllAppUser();

      setAllUserList(allUser);
    } catch (error) {}
  };

  const freindList = async () => {
    const contract = await connectingWithContract();
    // console.log(account);
    const friend_key = account;
    const allFriend = await contract.getMyFriendList();

    // console.log(allFriend);
    setMyFriendList(allFriend);
  };

  const addFriends = async (name, friend_key) => {
    try {
      // console.log(name, friend_key, account);
      const contract = await connectingWithContract();
      console.log("check");
      const addFriendList = await contract
        .addFriend(friend_key.toLowerCase(), name)
        .send({ from: account });
      console.log("add");
      setLoading(true);
      await addFriendList.wait();
      setLoading(false);
      // toast.success("Added as Friend");
      console.log('done');
      window.location.reload();
    } catch (error) {
      // toast.error("Already Friend");

      // Check if addFriend function exists in the contract instance
    }
  };

  const handleAddFriend = async (name, friendAddress) => {
    // console.log(name, friendAddress);
    const contract = await connectingWithContract();
    // console.log(name, friendAddress);
    const Friend = await addFriends(name, friendAddress);
  };

  const sendMessageToBack = async (friend_key, _msg) => {
    setSendingBack(true);
    const contract = await connectingWithContract();
    const newmsgback = await contract.sendMessage(friend_key, _msg);
    const receivemsg = await contract.readMessage(friend_key);

    // const newmsg = [{
    //   sender: account,
    //   msg: _msg,
    //   timestamp: BigInt(Date.now()),
    // }];
    // console.log(account, _msg);
    // setNewMsg({
    //   sender: account,
    //   msg: _msg,
    //   timestamp: BigInt(Date.now()),
    // });
    // console.log("new", newmsg);
    setLoading(true);
    await newmsgback.wait();
    setLoading(false);
    // setAllUserMessage((prevMessages) => [...prevMessages, ...newmsg]);
    // console.log(allUserMessage);
    setMessage("");
    // console.log(newmsg);
    setNewMsg((_prevMsg) => {
      const newMsg = {
        sender: account,
        msg: _msg,
        timestamp: BigInt(Date.now()),
      };
      setAllUserMessage((prevMessages) => [...prevMessages, newMsg]);
      return newMsg; // Return newMsg to setNewMsg
    });

    // window.location.reload();
    setSendingBack(false);
  };

  const messageUser = async (pubkey, name) => {
    setLoading(true);
    setSelectedUserPubkey(pubkey);
    setCurrentMessageUser(name);
    setLoading(false);
    if (window.innerWidth <= 768) {
      setChatDisplay(!chatDisplay);
    } else {
      setChatDisplay(false);
    }
  };

  useEffect(() => {
    fetchData();
    allUser();
  }, []);

  useEffect(() => {
    if (account) {
      freindList();
    }
  }, [account]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sendingBack || selectedUserPubkey) {
          setLoading(true);
          const contract = await connectingWithContract();
          const receivemsg = await contract.readMessage(selectedUserPubkey);
          // await receivemsg.wait();

          setAllUserMessage(receivemsg);

          setLoading(false);
        }
      } catch (error) {}
    };

    fetchData();
  }, [selectedUserPubkey, sendingBack, newmsg]);

  const handleChatshown = () => {
    setChatDisplay(!chatDisplay);
  };

  const showUserList=()=>{
    setShowList(!showList);
  }

  return (
    <nav className="bg-gray-800 p-4 flex h-screen w-screen flex-col items-center justify-between fixed ">
      <div className="flex flex-col items-center justify-between w-full md:flex-row md:items-center md:justify-between p-1">
        <div className="text-white text-xl font-bold md:text-2xl md:mb-0">
          ChatApp
        </div>
        <div className="text-white text-sm md:text-base">
          {userName}:{account}
        </div>
      </div>

      <hr className="h-0.5 w-screen block border-t border-gray-300" />

      <div className="flex w-full gap-4 xl:h-[95%] lg:h-[95%] h-[92%] pt-4 relative">
      <div className={`lg:flex xl:flex  z-11 ${showList ? "absolute w-full hidden" : ""} flex-col pr-4 bg-slate-600 h-full lg:w-[26%] xl:w-[26%] p-3`}>
          <input
            type="text"
            placeholder="Search any user"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-white bg-gray-800 border outline-none  border-gray-700 rounded px-3 py-2 mb-4"
          />
          <h2 className="text-white text-lg font-semibold mb-2">Users</h2>
          <ul>
            {allUserList
              ?.filter((user) =>
                user.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((user) => (
                <li
                  key={user.accountAddress}
                  className="text-white border-b flex justify-between border-gray-700 py-2 align-middle"
                >
                  {user.accountAddress.toLowerCase() !==
                    account.toLowerCase() && (
                    <div className="flex flex-col">
                      <div>UserName: {user.name}</div>
                   
                      <button
                        onClick={() =>
                          handleAddFriend(user.name, user.accountAddress)
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 cursor-pointer"
                      >
                        {myFriendList?.some(
                          (friend) => friend.pubkey === user.accountAddress
                        )
                          ? "Friend"
                          : "Add Friend"}
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="flex w-full xl:w-3/4 lg:w-3/4 h-full ">
          <div className="flex border border-gray-300 rounded p-4 w-full flex-col">
            <button
             
              className="w-full xl:hidden lg:hidden flex justify-center items-center "
            >
              <IoMdArrowBack onClick={() => handleChatshown()} style={{ color: "white", cursor: "pointer" }} />
            <div className="w-full">
            {/* <span className="px-4 py-1 bg-green-500 text-white text-xs rounded-lg cursor-pointer hover:bg-green-600 hover:text-white hover:shadow-md" onClick={()=>showUserList()}>
  All Users List
</span> */}


</div> 

            </button>
            <div className="flex w-full xl:h-full lg:h-full h-[98%]">
              <div
                className={`overflow-y-auto flex-grow flex-col xl:flex lg:flex lg:w-[15%] xl:w-[15%] ${
                  !chatDisplay ? "hidden" : ""
                }`}
              >
                {myFriendList?.map((user) => (
                  <li
                    key={user.pubkey}
                    className="text-white  flex justify-between  flex-col w-full border-gray-700 py-2 align-middle"
                  >
                    <div className="flex flex-col  w-full">
                      <div
                        className={`border-b cursor-pointer w-full rounded-lg p-2 overflow-hidden ${
                          user.pubkey === selectedUserPubkey
                            ? "bg-blue-500 text-white border border-blue-500"
                            : ""
                        }`}
                        onClick={() => messageUser(user.pubkey, user.name)}
                      >
                        {user.name}
                      </div>
                    </div>
                  </li>
                ))}
              </div>
              {selectedUserPubkey && (
                <span className="xl:block lg:block hidden h-full bg-white w-0.5 m-2"></span>
              )}
              {selectedUserPubkey && (
                <div
                  className={`flex lg:mt-4 xl:mt-4 mt-1 lg:w-11/12 xl:w-11/12 w-full flex-col h-full gap-2 ${
                    chatDisplay ? "hidden" : ""
                  }`}
                >
                  <div className="flex w-full  border flex-col rounded border-gray-300 h-[90%]">
                    <span className="w-full justify-center flex bg-yellow-100 text-cyan-800  align-middle">
                      User: {currentMessageUser}
                    </span>
                    <ScrollToBottom className="w-full h-full  pt-3 overflow-y-scroll scrollbar-hidden">
                      {allUserMessage?.map((message, index) => (
                        <div
                          key={index}
                          className=" px-2"
                          style={{
                            marginLeft:
                              message.sender.toLowerCase() ===
                              account.toLowerCase()
                                ? "70%"
                                : "2%",
                          }}
                        >
                          {/* marginLeft: message.sender === account ? '200px' : '0' */}
                          <div
                            className="border border-gray-300 max-w-max rounded p-2 mb-2"
                            style={{
                              background:
                                message.sender.toLowerCase() ===
                                account.toLowerCase()
                                  ? "green"
                                  : "blue",
                            }}
                          >
                            {/* {console.log(message.sender,account,typeof(account),typeof(message.sender))} */}
                            <p className="text-white xl:text-xl lg:text-xl text-xs">
                              Message: {message.msg}
                            </p>

                            {/* <p>Sender: {message.sender}</p> */}
                          </div>
                        </div>
                      ))}
                    </ScrollToBottom>
                  </div>

                  <div className="flex w-[100%]">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={_msg}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-grow border outline-none border-gray-300 rounded-l px-4 py-2"
                    />
                    <button
                      onClick={() =>
                        sendMessageToBack(selectedUserPubkey, _msg)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r border border-blue-700 cursor-pointer"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center w-screen h-screen absolute">
          <img className="w-[100px] h-[100px]" src={Loader} />
        </div>
      )}

      <ToastContainer />
    </nav>
  );
};

export default Dashboard;
