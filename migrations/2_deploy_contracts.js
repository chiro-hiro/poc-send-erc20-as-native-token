var BasicToken = artifacts.require("./BasicToken.sol");

module.exports = function(deployer) {
  deployer.deploy(BasicToken);
};
