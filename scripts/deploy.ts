import { network } from "hardhat";

const { ethers } = await network.create();


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("部署账户:", deployer.address);
  console.log("账户余额:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));

  const Counter2 = await ethers.getContractFactory("Counter2");
  const counter2 = await Counter2.deploy();
  
  await counter2.waitForDeployment();
  const address = await counter2.getAddress();
  
  console.log("Counter2合约已部署到:", address);
  console.log("初始number值:", (await counter2.getNumber()).toString());
  
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