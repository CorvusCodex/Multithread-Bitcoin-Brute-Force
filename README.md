# Multithread Bitcoin Brute Force for P2PKH or legacy address


This is a Node.js script that uses multiple worker processes to generate random private keys for Bitcoin P2PKH or legacy wallets in hexadecimal format and check if they match any of the P2PKH or legacy addresses in a file named `data.txt`. If a match is found,  the script saves the wallet and its private key (seed) in WIF format to a file named ‘match.txt’ and quits program.

## For people without technical experience you can buy the compiled application for windows from here:
https://www.buymeacoffee.com/CorvusCodex/e/142988
Keep in mind that a Windows app won’t speed up searching or guarantee success.

Check out my Bitcoin Brute-Force calculator
https://corvuscodex.github.io/Bitcoin-Brute-Force-Calculator-Website/

## Requirements

- Node.js
- npm

## Installation

1. Clone this repository or download the code as a zip file and extract it.
2. Open a terminal or command prompt and navigate to the directory where the code is located.
3. Run `npm install` to install the required dependencies.

## Usage

1. Add the Bitcoin addresses you want to check against to a file named `data.txt`, with one address per line (Addresses must start with 1).
2. Run `node app.js` to start the script.
3. The script will display the loop count for each worker process in real-time.
4. If a match is found, the wallet address and its private key will be saved to a file named `match.txt` and the script will exit.
5. ck.compressed - Set false for uncompressed or set true for compressed Bitcoin Addresses)



>Support my work:<br>
>BTC: bc1q7wth254atug2p4v9j3krk9kauc0ehys2u8tgg3<br>
>ETH & BNB: 0x68B6D33Ad1A3e0aFaDA60d6ADf8594601BE492F0<br>
>Buy me a coffee: https://www.buymeacoffee.com/CorvusCodex


## Check out my Ethereum Brute-Force Project
https://github.com/CorvusCodex/Multithread-Ethereum-Brute-Force

## Disclaimer

The code within this repository comes with no guarantee, the use of this code is your responsibility. I take NO responsibility and/or liability for how you choose to use any of the source code available here. By using any of the files available in this repository, you understand that you are AGREEING TO USE AT YOUR OWN RISK. Once again, ALL files available here are for EDUCATION and/or RESEARCH purposes ONLY. The chances of finding a match are extremely low and it is not recommended to use this script for any illegal or unethical activities.


MIT License

Copyright (c) 2023 CorvusCodex

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
