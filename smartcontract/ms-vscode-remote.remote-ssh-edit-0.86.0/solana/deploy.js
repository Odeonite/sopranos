async function main() {

    const contract1 = await ethers.getContractFactory('contract1');
  
    const contract = await contract1.deploy();
  
    console.log('Contract deployed to:', contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });