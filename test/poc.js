var BasicToken = artifacts.require('./BasicToken.sol');
const EthereumTx = require('../node_modules/ethereumjs-tx')
const userAccount = '0x5239d2bec5c8ee929ec27944cffc7b2667710b51';

contract('BasicToken', function (accounts) {

    it('Should have 1000 token in userAccount', function () {
        return BasicToken.deployed().then(function (instance) {
            return instance.balanceOf(userAccount);
        }).then(function (balance) {
            assert.equal(balance.valueOf(), 1000, '1000 token wasn\'t in the user account');
        });
    });

    it('Should have 0 ETH in userAccount', function () {
        web3.eth.getBalance(userAccount, function (error, data) {
            assert.equal(data.valueOf(), 0, 'userAccount balance geater than 0');
        });
    });

    it('Should able to transfer 200 token to ' + accounts[0], function () {

        //Private key for userAccount
        const privateKey = Buffer.from('a5e498830bedf84e4e946093ada718ab820bd087e439bf6a2d73b5d1563f0201', 'hex');

        //Create transaction
        const txParams = {
            nonce: web3.eth.getTransactionCount(userAccount),
            from: userAccount,
            gasPrice: '0x6FC23AC00',
            gasLimit: '0xF93E0',
            to: BasicToken.address,
            value: '0x00',
            data: '0xa9059cbb000000000000000000000000' + accounts[0].substr(2) + '00000000000000000000000000000000000000000000000000000000000000c8',
            // EIP 155 chainId - mainnet: 1, ropsten: 3
            chainId: 3
        };

        //Sign transaction with private key
        var tx = new EthereumTx(txParams);
        tx.sign(privateKey);
        var serializedTx = tx.serialize();

        //Estimate transaction fee
        var estimateValue = web3.toBigNumber('0x6FC23AC00').mul(web3.toBigNumber('0xF93E0'));

        //Transfer Ethereum from service provider to user
        web3.eth.sendTransaction({
            from: accounts[0],
            to: userAccount,
            value: estimateValue
        }, function (error, data) {

            //Provider broadcast singed transaction to network
            web3.eth.sendRawTransaction(serializedTx.toString('hex'), function (error, data) {

                //Recheck balance
                return BasicToken.deployed().then(function (instance) {
                    return instance.balanceOf(accounts[0]);
                }).then(function (balance) {
                    assert.equal(balance.valueOf(), 200, ' 200 token was not in ' + accounts[0]);
                });

            });

        });

    });

});

