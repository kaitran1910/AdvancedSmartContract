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
const { abi, evm } = require("../compile.ts");

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

/**
 * Use it.only() to run a specific test
 */
describe("Lottery Contract", () => {
    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    });

    it("allows one account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether"),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it("allows multiple account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether"),
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.02", "ether"),
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei("0.02", "ether"),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it("requires a minimum amount of ether to enter", async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0,
            });
            assert(false);
        } catch (err) {
            assert.ok(err);
        }
    });

    it("only manager can call pickWinner", async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1],
            });
            assert(false);
        } catch (err) {
            assert.ok(err);
        }
    });

    it("sends money to the winner and resets the players array", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("2", "ether"),
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;

        console.log(web3.utils.fromWei(difference.toString(), "ether"));

        assert(difference > web3.utils.toWei("1.8", "ether"));
    });
});
