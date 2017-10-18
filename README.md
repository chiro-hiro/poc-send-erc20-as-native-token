# Proof of Concept: Send Ethereum ERC20 standard token as well as native token

## Requirement

Install testrpc
```
$ npm install -g ethereumjs-testrpc
```

Clone PoC and Install dependencie:
```
$ git clone https://github.com/tad88dev/poc-send-erc20-as-native-token.git
cd poc-send-erc20-as-native-token
poc-send-erc20-as-native-token~$ npm install
```

## Test process

Start test RPC
```
$ testrpc
```

At the same time execute:
```
npm test
```

Result:
```
$ npm test

> poc@1.0.0 test /home/chiro8x/poc-send-erc20-as-native-token
> truffle test

Compiling ./contracts/BasicToken.sol...
Compiling ./contracts/Migrations.sol...


  Contract: BasicToken
    √ Should have 1000 token in userAccount (116ms)
    √ Should have 0 ETH in userAccount
    √ Should able to transfer 200 token to 0x0e31ad7828ee4ed5fa4fe957cbab0d50dab2fe68 (192ms)

  3 passing (371ms)
```