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

/**
 * To use the async/await syntax, we need to
 * wrap the code in a function
 */
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: "1000000" });

    console.log(abi);
    console.log("Contract deployed to: ", result.options.address);

    // To prevent the hanging deployment
    provider.engine.stop();
};

export default deploy();

/**
 *Attempting to deploy from account 0x6a10491a8fDD29e3E8b0598bDAf95acc0E89A296
[
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
    constant: undefined,
    payable: undefined,
    signature: 'constructor'
  },
  {
    inputs: [],
    name: 'enter',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    constant: undefined,
    payable: true,
    signature: '0xe97dcb62'
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x8b5b9ccc'
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0x481c6a75'
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: undefined,
    payable: undefined,
    signature: '0x5d495aea'
  },
  {
    inputs: [ [Object] ],
    name: 'players',
    outputs: [ [Object] ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
    payable: undefined,
    signature: '0xf71d96cb'
  }
]
Contract deployed to:  0xad08dd2A0890DD1DdcC20b2fF6669fe4D5BC6F74
 */
