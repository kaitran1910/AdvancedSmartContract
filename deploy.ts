/**
 * Read documentation in test/*.test.js for more details
 * about module usages
 */
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { abi, evm } = require("./compile");

/**
 ** Remember to duplicate the mnemonic.js.sample and
 ** the infuraAPI.js.sample into .js files and put
 ** your own mnemonic and infuraAPI key in there.
 */
const mnemonic = require("./mnemonic");
const infuraAPI = require("./infuraAPI");
const provider = new HDWalletProvider(mnemonic, infuraAPI);
const web3 = new Web3(provider);

let accounts;
let inbox;

/**
 * To use the async/await syntax, we need to
 * wrap the code in a function
 */
const deploy = async () => {
    accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: "1000000" });

    console.log("Contract deployed to: ", inbox.options.address);

    // To prevent the hanging deployment
    provider.engine.stop();
};
deploy();

export {};

/**
 *
 */
