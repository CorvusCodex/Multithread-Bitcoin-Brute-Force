"use strict";

process.title = "Bitcoin Bruteforce";

// Importing required modules
const CoinKey = require('coinkey');
const fs = require('fs');
const crypto = require('crypto');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const blessed = require('blessed');

// Initializing a Set to store addresses
let addresses;
addresses = new Set();

// Reading data from a file named 'data.txt'
const data = fs.readFileSync('./data.txt');
// Splitting the data by new line and adding each address to the Set
data.toString().split("\n").forEach(address => addresses.add(address));

// Initializing an object to store counts for each worker
let counts = {};

// Function to generate a private key and check if the corresponding public address is in the Set of addresses
function generate() {
 // Incrementing the count for the current worker
 counts[cluster.worker.id] = (counts[cluster.worker.id] || 0) + 1;
 // Sending the updated counts to the master process
 process.send({counts: counts});

 // Generating a random private key in hexadecimal format
 let privateKeyHex = crypto.randomBytes(32).toString('hex');

 // Creating a CoinKey object using the private key
 let ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'));

 // Setting the compressed property of the CoinKey object to false
 ck.compressed = false;

 // Checking if the public address corresponding to the private key is in the Set of addresses
 if(addresses.has(ck.publicAddress)){
 console.log("");
 // Making a beep sound
 process.stdout.write('\x07');
 // Logging success message with the public address in green color
 console.log("\x1b[32m%s\x1b[0m", ">> Match Found: " + ck.publicAddress);
 var successString = "Wallet: " + ck.publicAddress + "\n\nSeed: " + ck.privateWif;

 // Saving the wallet and its private key (seed) to a file named 'match.txt'
 fs.writeFileSync('./match.txt', successString, (err) => {
 if (err) throw err;
 })
 // Exiting the process
 process.exit();
 }
}

// Checking if the current process is the master process
if (cluster.isMaster) {
 // Creating a blessed screen object
 let screen = blessed.screen({
 smartCSR: true
 });

 // Initializing an array to store boxes for each worker
 let boxes = [];

 // Looping through each CPU and creating a box for each worker
 for (let i = 0; i < numCPUs; i++) {
 let box = blessed.box({
 top: `${i * 100/numCPUs}%`,
 left: 0,
 width: '100%',
 height: `${100/numCPUs}%`,
 content: `Worker ${i+1} Loop count: 0`,
 border: {
 type: 'line'
 },
 style: {
 border: {
 fg: 'blue'
 }
 }
 });
 screen.append(box);
 boxes.push(box);
 }

 // Rendering the screen
 screen.render();

 // Listening for messages from worker processes
 cluster.on('message', (worker, message) => {
 if (message.counts) {
 for (let workerId in message.counts) {
 boxes[workerId-1].setContent(`Worker ${workerId} Loop count: ${message.counts[workerId]}`);
 }
 screen.render();
 }
 });

 // Forking worker processes for each CPU
 for (let i = 0; i < numCPUs; i++) {
 cluster.fork();
 }

 // Listening for exit event of worker processes
 cluster.on('exit', (worker, code, signal) => {
 console.log(`worker ${worker.process.pid} died`);
 });
} else {
 // Setting an interval to run the generate function repeatedly with no delay
 setInterval(generate, 0);
}