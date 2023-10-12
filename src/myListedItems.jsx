import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import './home.css';
import './myListedItems.css';
import React, { Component } from 'react';

import axios from 'axios';
import marketAbi from './marketAbi.json'; 
import nftAbi from './nftAbi.json';
class ContractInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {

 //mint
 JWT: process.env.REACT_APP_JWT,

 contract: null,
 contractAddress : process.env.REACT_APP_NFT_ADD,

contractABI:  nftAbi,

market_contract: null,
market_contractAddress : process.env.REACT_APP_MARKET_ADD,
market_contractABI :marketAbi,
tokenCount: 0, 
loading: true,
setLoading: true,
items: [],
setItems: [],
listedItems: [],
setListedItems: [],
setSoldItems: [],
soldItems: [],
purchases:[],
signerAddress: null,
purItems:[],


provider: null,
signer: null,
items: [],
setItems: [],
listedItems: [],
setListedItems: [],
setSoldItems: [],
soldItems: [],
setPurchases:[],
purchases:[],
purchasedItems :[],
isWalletConnected: false,
purchasedItems: [],
loadingPurchasedItems: true, // New loading state
purchasedItemsError: false,
cid : '',
walletConnected: false,



    };
   
  }
  async componentDidMount() {
    try {
      // Connect to Ethereum provider (e.g., MetaMask)
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({ isWalletConnected: true });
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        this.setState({ signer });
  
        if (signer) {
          try {
            const signerAddress = await signer.getAddress();
            console.log('Signer Address:', signerAddress);
  
            // Create a contract instance
            const contract = new ethers.Contract(
              this.state.contractAddress,
              this.state.contractABI,
              signer
            );
  
            const market_contract = new ethers.Contract(
              this.state.market_contractAddress,
              this.state.market_contractABI,
              signer
            );
  
            this.setState({ contract, market_contract });
            this.setState({ signerAddress });
  
            // Example: Call a contract function to get a value
            const tokenCount = await contract.count();
            this.setState({ tokenCount: tokenCount.toString() });
  
            // Now, after all asynchronous operations, load the listed items
           this.loadListedItems();
          this.loadPurchasedItems(); 

          } catch (error) {
            console.error('Error getting signer address or creating contract:', error);
          }
        } else {
          console.error('Signer not available.');
        }
      } else {
        console.error('MetaMask or compatible Ethereum wallet not found.');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  }
  //tokenid 0to6 bet prob//check smart contract ,bougth 3 tooken.id
  loadPurchasedItems = async () => {
    const { market_contract, signer , contract} = this.state;
    
    const signerAddress = await signer.getAddress();
    let purItems = [];
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =   market_contract.filters.Bought(null,null,null,null,null,signerAddress)
    const results = await  market_contract.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
      
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await  contract.tokenURI(i.tokenId)
      console.log("uri");
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await  market_contract.getTotalPrice(i.itemId)
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      purItems.push(purchasedItem);
    }))
    this.setState({
      purItems: [...this.state.purItems, ...purItems],
      //soldItems: [...this.state.soldItems, ...soldItems],
      loading: false,
    });
  
  }

    loadListedItems = async () => {
      const { market_contract, signer , contract} = this.state;
    
      try {
        // Get the signer's address
        const signerAddress = await signer.getAddress();
        console.log('Signer Address:', signerAddress);
    
        // Get the item count
        const itemCount = await market_contract.itemCount();
        console.log('Item Count:', itemCount.toString());
    
        let listedItems = [];
        let soldItems = [];
    
        for (let indx = 6; indx <= itemCount.toNumber(); indx++) {
          const item = await market_contract.items(indx);
          //const uri = await contract.tokenURI(tokenId)
          const tokenId = item[2].toString();
          // Check if the seller is the current signer
          if (item.seller === signerAddress) {
            const uri = await contract.tokenURI(tokenId);
            console.log("uri");
           
            const response = await fetch(uri);
            const metadata = await response.json();
    
            const totalPrice = await market_contract.getTotalPrice(item.itemId);
    
            let listItem = {
              totalPrice,
              price: item.price,
              itemId: item.itemId,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
            };
    
            listedItems.push(listItem);
    
            if (item.sold) {
              soldItems.push(listItem);
            }
          }
        }
    
        this.setState({
          listedItems: [...this.state.listedItems, ...listedItems],
          soldItems: [...this.state.soldItems, ...soldItems],
          loading: false,
        });
      } catch (error) {
        console.error('Error loading listed items:', error);
      }
    };

 
render() {
  const { purItems, listedItems, soldItems,  loading, isWalletConnected,signerAddress  } = this.state;


  return (
    <div className="flex justify-center">
       {/* Add the "Connect Wallet" button */}
       {isWalletConnected ? (
          <div className="wallet-info">
            <p>Wallet connected: {signerAddress}</p>
          </div>
        ) : (
          <p className="wallet-info">
            Please connect your Ethereum wallet (e.g., MetaMask).
          </p>
        )}
              

    <h1 className="listed-heading">My Listed and Sold NFTs</h1>
    {loading ? (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    ) : (
      <div className="px-5 py-3 container">
        {/* Listed Items */}
        {listedItems.length > 0 && (
          <>
            <h2 className='heading'>Listed</h2>
            <Row xs={1} md={2} lg={4} className="g-4 py-3">
              {listedItems.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card className="card">
                    <Card.Img variant="top" src={item.image} className="card-img" />
                    <Card.Footer>
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                      <div className="item-name">{item.name}</div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Sold Items */}

        {soldItems.length > 0 && (
          <>
            <h2 className='heading'>Sold</h2>
            <Row xs={1} md={2} lg={4} className="g-4 py-3">
              {soldItems.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card className="card">
                    <Card.Img variant="top" src={item.image} className="card-img" />
                    <Card.Footer className="sold-card-footer">
                      For {ethers.utils.formatEther(item.totalPrice)} ETH - Received {ethers.utils.formatEther(item.price)} ETH
                      <div className="item-name">{item.name}</div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    )}


    
      <h1 className="listed-heading">My Purchased Items</h1>
      {loading ? (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      ) : (
        <div className="px-5 py-3 container">
          {/* Listed Items */}
          {purItems.length > 0 && (
            <>
              <h2 className='heading'>Purched</h2>
              <Row xs={1} md={2} lg={4} className="g-4 py-3">
                {purItems.map((item, idx) => (
                  <Col key={idx} className="overflow-hidden">
                    <Card className="card">
                      <Card.Img variant="top" src={item.image} className="card-img" />
                      <Card.Footer>
                        {ethers.utils.formatEther(item.totalPrice)} ETH
                        <div className="item-name">{item.name}</div>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
          </div>
)
         
  
}</div>)

}}


export default ContractInteraction;
