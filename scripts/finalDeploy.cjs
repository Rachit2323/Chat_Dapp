// import pkg from 'hardhat';
// const { ethers } = pkg;
// async function main() {
//   const ChatApp = await hre.ethers.getContractFactory("ChatApp");
//   const chatApp = await ChatApp.deploy(); //instance of contract

//   await chatApp.waitForDeployment();
//   console.log("Address of contract:", chatApp.target);
// }
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// async function main() {
//   const ChatApp = await ethers.getContractFactory("ChatApp");
//   const chatApp = await ChatApp.deploy();
//   await chatApp.deployed();
//     console.log("Address of contract:", chatApp.address);

  // const currentValue = await myContract.getMessage();
  // console.log("Current value:", currentValue);

  // const transactionResponse = await myContract.updateMessage("A new message");
  // await transactionResponse.wait(1);

  // const newValue = await myContract.getMessage();
  // console.log("New value:", newValue);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const hre = require("hardhat");
async function main() {
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chatApp = await ChatApp.deploy(); //instance of contract

  await chatApp.deployed();

    console.log("Address of contract:", chatApp.address);

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });