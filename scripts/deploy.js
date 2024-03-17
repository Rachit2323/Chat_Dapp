import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const ChatApp = await ethers.getContractFactory("ChatApp");
  const chatApp = await ChatApp.deploy();

  await chatApp.waitForDeployment();

  console.log(`Contract Address ${chatApp.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
