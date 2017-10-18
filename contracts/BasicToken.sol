pragma solidity ^0.4.11;

contract BasicToken {

  mapping(address => uint256) balances;

  function BasicToken(){
    balances[address(0x005239d2bec5c8ee929ec27944cffc7b2667710b51)] = 1000;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public constant returns (uint256 balance) {
    return balances[_owner];
  }

}