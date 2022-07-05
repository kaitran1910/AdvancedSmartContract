/**
 * Modules usage explanation:
 *
 * - "assert": For making assertions about the test,
 * mostly used to assert some value is equal to another
 *
 * - "ganache-cli": for deploying a local test network
 * do pretty much the same thing as using Remix Editor
 *
 * - "web3": a library for interacting with the test network
 * (here only use web3 constructor, hence using a capital Web3)
 * (web3 only supports promises + async/await since v1.*.*)
 *
 * - provider(): a communication layer between web3 library
 * and some specific ETH network, which is Ganache (the
 * local test network) in this case
 *
 * - abi: the ABI of the contract, which is the
 * interface between the contract and the test network
 *
 * - evm: the bytecode of the contract, which is
 * the compiled code of the contract
 */
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

/**
 * Mocha functions:
 * - it: Run a test and make an assertion
 * - describe: Group "it" tests together
 * - beforeEach: Execute some general setup code before each test
 */
let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    });
});
