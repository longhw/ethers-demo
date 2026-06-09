import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署账户:", deployer.address);
  console.log("账户余额:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)));

  const Counter2 = await hre.ethers.getContractFactory("Counter2");
  const counter = await Counter2.deploy();
  
  await counter.waitForDeployment();
  const address = await counter.getAddress();
  
  console.log("Counter2合约已部署到:", address);
  console.log("初始number值:", (await counter.getNumber()).toString());
  
  return address;
}

main()
  .then((address) => {
    console.log("部署成功，合约地址:", address);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });