const hre = require("hardhat");

async function main() {

  const Y = await hre.ethers.getContractFactory("Y");
  const y = await Y.deploy();

  await y.deployed();

  console.log(
    `contract deployed to ${y.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
