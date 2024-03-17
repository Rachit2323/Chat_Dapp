// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
//   paths:{
//    artifacts:'./artifacts'
//   },
//   networks:{
//     hardhat:{
//       chainId:1337
//     }
//   }
// };

// require("@nomiclabs/hardhat-ethers");

// const INFURA_API_KEY = "bc835211e420482fbe3739334c2ee8bc"; 
// const PRIVATE_KEY = "b82d210d37057e18ceb1f4177fc1124678d860c6b67f67252a4c5e9fa7882aa3";

// module.exports = {
//   solidity: "0.8.18",
//   defaultNetwork: "sepolia",
//   networks: {
//     hardhat: {},
//     sepolia: {
//       url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
//       accounts: [PRIVATE_KEY],
//       chainId: 11155111,
//     },
//   },
// };


require("@nomiclabs/hardhat-waffle");




/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/xPbcdHmp0VScR3UZ--hxX3-s9RqQ1i6q",
      accounts: ['0xb82d210d37057e18ceb1f4177fc1124678d860c6b67f67252a4c5e9fa7882aa3'],
    },
    // matic: {
    //   url: process.env.MATIC_URL,
    //   accounts: ["b82d210d37057e18ceb1f4177fc1124678d860c6b67f67252a4c5e9fa7882aa3"],
    // }
  }
};