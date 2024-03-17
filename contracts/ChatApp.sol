// SPDX-License-Identifier: MIT 
pragma solidity >=0.7.0 <0.9.0;
// import "hardhat/console.sol";

contract ChatApp {
    // Define an event
    event UserCreated(string name);


    struct Friend {
        address pubkey;
        string name;
    }
    
    struct User {
        string name;
        Friend[] friendList;
    }
    
    struct Message {
        address sender;
        uint256 timestamp;
        string msg;
    }

     struct AllUserStruck{
        string name;
        address accountAddress;
     }

     AllUserStruck[] getAllUsers;
     
    mapping(address => User) public userList;
    mapping(bytes32 => Message[]) public allMessages;

    function checkUserExist(address pubkey) public view returns(bool) {

        // console.log("userlist",pubkey,userList[pubkey].name);

        return bytes(userList[pubkey].name).length > 0;
    }

function working() external pure returns (string memory) {
    return "working";
}

    function createAccount(string calldata name,address accountAddress) external returns(string memory){
     
        // console.log(name,"MS",accountAddress);
        

        require(!checkUserExist(accountAddress), "User already exists");
        require(bytes(name).length > 0, "User name can't be empty");
        
        userList[accountAddress].name = name;

        getAllUsers.push(AllUserStruck(name,accountAddress));
        emit UserCreated(name);
        // console.log("User added:", userList[accountAddress].name);
        
        return "User Created";
    }

    function getUsername(address pubkey) external view returns(string memory) {
        // console.log('user',pubkey);
        require(checkUserExist(pubkey), "User does not exist");
        return userList[pubkey].name;
    }

    function addFriend(address friend_key, string calldata name) external  returns(string memory){
        // console.log('list',friend_key,msg.sender,name);
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(msg.sender != friend_key, "User can't add themselves as a friend");
        
        require(!checkAlreadyFriends(msg.sender, friend_key), "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        //   console.log('work added',msg.sender, friend_key,name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
        //  console.log('friend added',friend_key, msg.sender,userList[msg.sender].name);
        return "Friend Added";
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool) {
        // console.log('address',pubkey1,pubkey2);
        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            //    console.log('ouer',userList[pubkey1].friendList[i].pubkey,pubkey2);
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) {
                // console.log('in',userList[pubkey1].friendList[i].pubkey,pubkey2);
                return true;
            }
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal {
        Friend memory newFriend = Friend(friend_key, name);
        // console.log('new',me,newFriend.pubkey,newFriend.name);
        userList[me].friendList.push(newFriend);
        // console.log('me');
    }


    function getMyFriendList() external view returns(Friend[] memory) {
        // console.log('friendlist',msg.sender);

        return userList[msg.sender].friendList;
    }

    function _getChatCode(address pubkey1, address pubkey2) internal pure returns (bytes32) {
        if(pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    function sendMessage(address friend_key, string calldata _msg) external {
        // console.log('msg',friend_key,_msg);
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You aren't friends with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        Message memory newMsg = Message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    function readMessage(address friend_key) external view returns (Message[] memory){
        bytes32 chatCode=_getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    } 

    function getAllAppUser() public view returns(AllUserStruck[] memory){

        return getAllUsers;
    }
}
