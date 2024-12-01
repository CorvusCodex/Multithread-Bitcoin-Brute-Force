"use strict";

process.title = "Multithread Bitcoin Brute Force by Corvus Codex";

//Created by: Corvus Codex
//Github: https://github.com/CorvusCodex/
//Licence : MIT License

//Support my work:
//BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3
//ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0
//Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex
//Ko-fi: https://ko-fi.com/s/e059759b3b

const readline = require('readline');
const { spawn } = require('child_process');


function credit(){
  console.log("=================================================================");
  console.log("Created by: Corvus Codex");
  console.log("Github: https://github.com/CorvusCodex/");
  console.log("Licence : MIT License");
  console.log("=================================================================");
  console.log("Support my work:");
  console.log("BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3");
  console.log("ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0");
  console.log("Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex");
  console.log("Buy standalone Windows app: https://ko-fi.com/s/e059759b3b");
  console.log("=================================================================");

};


console.clear();
  credit();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log();
rl.question('Enter Number 1 to run Simplified view or Number 2 for Secondary view("May not work on some computers.") and press enter: ', (answer) => {
  rl.close();
  if (answer === '1') {
    spawn('node', ['./app1.js'], { stdio: 'inherit' });
  } else if (answer === '2') {
    spawn('node', ['./app2.js'], { stdio: 'inherit' });
  } else {
    console.log('Invalid input. Please enter either 1 or 2.');
  }
});
