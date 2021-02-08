import React, { Component } from 'react'
import './App.css';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import MEWconnect from "@myetherwallet/mewconnect-web-client";
import Web3 from "web3";
 
const ETH_JSONRPC_URL = "wss://mainnet.infura.io/ws/v3/8d865f273ca04854bb372ea9c7d1e10a"
const CHAIN_ID = 1
// Initialize MEWconnect
export const mewConnect = new MEWconnect.Provider()
 
// Initialize a Web3 Provider object
export const ethereum = mewConnect.makeWeb3Provider(CHAIN_ID, ETH_JSONRPC_URL)
 
// Initialize a Web3 object
export const web3 = new Web3(ethereum)

class App extends Component {

    state = {
      address: ''

    }
   connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    MEWwalletConnectFunc=async () => {
      console.log("MEWwalletConnectFunc called:",  )
      ethereum.enable().then(async(accounts) => {
     
      //  await this.props.postAddToProfile(obj);
        console.log(`User's address is ${accounts[0]}`)
        alert(accounts[0])
      })

   } 

  walletConnectFunc = async () => {

    if (this.connector.connected) {
      alert("already connected")
      return
    }
    this.connector.createSession();
    this.connector.on("connect", async (error, payload) => {
      console.log("connect")
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.log("connect account", accounts)
      console.log("chainid account", chainId)

      const obj = {
        "address": accounts[0],

      }
      this.setState({ address: obj.address })
      console.log(this.state.address)
      alert(this.state.address)
    })


  }
  render() {
    return (
      <div className="App">

        <body>
          <div>
            <button className="btn btn-primary my-4" type="button" onClick={() => this.walletConnectFunc()}>WalletConnect</button>
            <p id="walletconnect" hidden>{this.state.address}</p>
            <button type="button" onClick={() => this.MEWwalletConnectFunc()}>MEW-Wallet-Connect</button>
            <p id="mew_walletconnect" hidden>{this.state.address}</p>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
