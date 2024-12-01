"use strict";

process.title = "Multithread Bitcoin Brute Force by Corvus Codex";

//Created by: Corvus Codex
//Github: https://github.com/CorvusCodex/
//Licence : MIT License

//Support my work:
//BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3
//ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0
//Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex

// Importing required modules
const CoinKey = require('coinkey');
const fs = require('fs');
const crypto = require('crypto');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

function credit(){
    console.log("===========================================================");
    console.log("Created by: Corvus Codex");
    console.log("Github: https://github.com/CorvusCodex/");
    console.log("Licence : MIT License");
    console.log("===========================================================");
    console.log("Support my work:");
    console.log("BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3");
    console.log("ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0");
    console.log("Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex");
    console.log("Buy standalone Windows app: https://ko-fi.com/s/e059759b3b");
    console.log("===========================================================");
  
  };
  
  
  console.clear();
    credit();

// Initializing a Set to store addresses
let addresses;
addresses = new Set();

// Reading data from a file named 'data.txt'
const data = fs.readFileSync('./data.txt');

// Splitting the data by new line and adding each address to the Set
data.toString().split("\n").forEach(address => {
    if (address.startsWith('1')) {
        addresses.add(address);
    } else {
        console.error('Error: Addresses are not in correct format. Legacy Bitcoin Addresses must start with 1');
        process.exit(1);
    }
});

// Initializing an object to store counts for each worker
let counts = {};

// Initializing an object to store start times for each worker
let startTimes = {};

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
  setInterval(() => {
    let totalLoops = 0;
    let totalKeysPerMin = 0;
    for (let workerId in counts) {
      let elapsedTimeInMinutes = (Date.now() - startTimes[workerId]) / 1000 / 60;
      let speedPerMinute = counts[workerId] / elapsedTimeInMinutes;
      totalLoops += counts[workerId];
      totalKeysPerMin += speedPerMinute;
    }
    console.clear();
    credit();

    console.log(`Total loops: ${totalLoops}`);
    console.log(`Average keys/min: ${(totalKeysPerMin/numCPUs).toFixed(2)}`);
    console.log("===========================================================");
    
  }, 60 * 1000);

  cluster.on('message', (worker, message) => {
    if (message.counts) {
      for (let workerId in message.counts) {
        counts[workerId] = message.counts[workerId];
        if (!startTimes[workerId]) {
          startTimes[workerId] = Date.now();
        }
      }
    }
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  setInterval(generate, 0);
}
