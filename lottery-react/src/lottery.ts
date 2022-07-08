import web3 from "./web3";
import { AbiItem } from "web3-utils";

const contractAddress = "0x35F8fa6c9925b90000cEBC4f5A373594f87B89F1";

const abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
        constant: undefined,
        payable: undefined,
        signature: "constructor",
    },
    {
        inputs: [],
        name: "enter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
        constant: undefined,
        payable: true,
        signature: "0xe97dcb62",
    },
    {
        inputs: [],
        name: "getPlayers",
        outputs: [[Object]],
        stateMutability: "view",
        type: "function",
        constant: true,
        payable: undefined,
        signature: "0x8b5b9ccc",
    },
    {
        inputs: [],
        name: "killContract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        constant: undefined,
        payable: undefined,
        signature: "0x1c02708d",
    },
    {
        inputs: [],
        name: "manager",
        outputs: [[Object]],
        stateMutability: "view",
        type: "function",
        constant: true,
        payable: undefined,
        signature: "0x481c6a75",
    },
    {
        inputs: [],
        name: "pickWinner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        constant: undefined,
        payable: undefined,
        signature: "0x5d495aea",
    },
    {
        inputs: [[Object]],
        name: "players",
        outputs: [[Object]],
        stateMutability: "view",
        type: "function",
        constant: true,
        payable: undefined,
        signature: "0xf71d96cb",
    },
];

export default new web3.eth.Contract(abi as AbiItem[], contractAddress);
