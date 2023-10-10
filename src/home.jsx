import React, { Component } from 'react';
import './FileUpload';

import axios from 'axios'; 
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Container,Row,CardGroup, Col, Card, Button } from 'react-bootstrap'
import './home.css';
import './fileUpload.css';
import './modal';
import Modal from './modal';

import './styles/components/_button.scss';
import logo from './nft.jpg'
import ether from './etherss.svg'


class ContractInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
 //mint
  
 contract: null,
 contractAddress : '0xB84AEf8030A8F1Bc4867fB7ADffB78f4E9Fc2dF9',
 contractABI : [
   {
     "inputs": [],
     "stateMutability": "nonpayable",
     "type": "constructor"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "approved",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "Approval",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "operator",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "bool",
         "name": "approved",
         "type": "bool"
       }
     ],
     "name": "ApprovalForAll",
     "type": "event"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "approve",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "_fromTokenId",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "_toTokenId",
         "type": "uint256"
       }
     ],
     "name": "BatchMetadataUpdate",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "_tokenId",
         "type": "uint256"
       }
     ],
     "name": "MetadataUpdate",
     "type": "event"
   },
   {
     "inputs": [
       {
         "internalType": "string",
         "name": "_tokenURI",
         "type": "string"
       }
     ],
     "name": "mint",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "safeTransferFrom",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       },
       {
         "internalType": "bytes",
         "name": "data",
         "type": "bytes"
       }
     ],
     "name": "safeTransferFrom",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "operator",
         "type": "address"
       },
       {
         "internalType": "bool",
         "name": "approved",
         "type": "bool"
       }
     ],
     "name": "setApprovalForAll",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "Transfer",
     "type": "event"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "transferFrom",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       }
     ],
     "name": "balanceOf",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "count",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "getApproved",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "operator",
         "type": "address"
       }
     ],
     "name": "isApprovedForAll",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "name",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "ownerOf",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "bytes4",
         "name": "interfaceId",
         "type": "bytes4"
       }
     ],
     "name": "supportsInterface",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "symbol",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "tokenCount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "tokenId",
         "type": "uint256"
       }
     ],
     "name": "tokenURI",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   }
 ],
market_contract: null,
market_contractAddress : '0x4c1D398004Bd107A1f6C682Bfd9367b248528D6B',//'0x8b7df3621EDec030346C2D90045f01DaD75124F2',
market_contractABI :[
 {
   "inputs": [
     {
       "internalType": "uint256",
       "name": "_feePercent",
       "type": "uint256"
     }
   ],
   "stateMutability": "nonpayable",
   "type": "constructor"
 },
 {
   "anonymous": false,
   "inputs": [
     {
       "indexed": false,
       "internalType": "uint256",
       "name": "itemId",
       "type": "uint256"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "nft",
       "type": "address"
     },
     {
       "indexed": false,
       "internalType": "uint256",
       "name": "tokenId",
       "type": "uint256"
     },
     {
       "indexed": false,
       "internalType": "uint256",
       "name": "price",
       "type": "uint256"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "seller",
       "type": "address"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "buyer",
       "type": "address"
     }
   ],
   "name": "Bought",
   "type": "event"
 },
 {
   "anonymous": false,
   "inputs": [
     {
       "indexed": false,
       "internalType": "uint256",
       "name": "itemId",
       "type": "uint256"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "nft",
       "type": "address"
     },
     {
       "indexed": false,
       "internalType": "uint256",
       "name": "tokenId",
       "type": "uint256"
     },
     {
       "indexed": false,
       "internalType": "uint256",
       "name": "price",
       "type": "uint256"
     },
     {
       "indexed": true,
       "internalType": "address",
       "name": "seller",
       "type": "address"
     }
   ],
   "name": "Offered",
   "type": "event"
 },
 {
   "inputs": [],
   "name": "feeAccount",
   "outputs": [
     {
       "internalType": "address payable",
       "name": "",
       "type": "address"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "feePercent",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "uint256",
       "name": "_itemId",
       "type": "uint256"
     }
   ],
   "name": "getTotalPrice",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [],
   "name": "itemCount",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "uint256",
       "name": "",
       "type": "uint256"
     }
   ],
   "name": "items",
   "outputs": [
     {
       "internalType": "uint256",
       "name": "itemId",
       "type": "uint256"
     },
     {
       "internalType": "contract IERC721",
       "name": "nft",
       "type": "address"
     },
     {
       "internalType": "uint256",
       "name": "tokenId",
       "type": "uint256"
     },
     {
       "internalType": "uint256",
       "name": "price",
       "type": "uint256"
     },
     {
       "internalType": "string",
       "name": "cid",
       "type": "string"
     },
     {
       "internalType": "address payable",
       "name": "seller",
       "type": "address"
     },
     {
       "internalType": "bool",
       "name": "sold",
       "type": "bool"
     }
   ],
   "stateMutability": "view",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "contract IERC721",
       "name": "_nft",
       "type": "address"
     },
     {
       "internalType": "uint256",
       "name": "_tokenId",
       "type": "uint256"
     },
     {
       "internalType": "uint256",
       "name": "_price",
       "type": "uint256"
     },
     {
       "internalType": "string",
       "name": "_cid",
       "type": "string"
     }
   ],
   "name": "makeItem",
   "outputs": [],
   "stateMutability": "nonpayable",
   "type": "function"
 },
 {
   "inputs": [
     {
       "internalType": "uint256",
       "name": "_itemId",
       "type": "uint256"
     }
   ],
   "name": "purchaseItem",
   "outputs": [],
   "stateMutability": "payable",
   "type": "function"
 }
],
tokenCount: 0, // Example state to store a contract value
loading: true,
setLoading: true,
items: [],
setItems: [],
showMintAndListForm: false,
isDropdownOpen: false,


//form
file: null,
name: '',
description: '',
external_url: '',
price:'',
provider: null,
signer: null,
signerAddress: null,


isWalletConnected: false,
cid : '',
// JWT: 'YOUR_PINATA_JWT',
JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk',

toggleMintAndListForm : () => {
  this.setState((prevState) => ({
    showMintAndListForm: !prevState.showMintAndListForm,
  }))},
 

  }
this.toggleDropdown = this.toggleDropdown.bind(this);
  this.openModal = this.openModal.bind(this);}
  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }));
  };
  
  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  // Method to close the modal
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  async componentDidMount() {
    try {
      // Connect to Ethereum provider (e.g., MetaMask)
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.setState({ isWalletConnected: true });

        const provider =  new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        // Create a contract instance
        const contract = new ethers.Contract(
          this.state.contractAddress,
          this.state.contractABI, //no need to use state there
          signer
        );

        const market_contract = new ethers.Contract(
            this.state.market_contractAddress,
            this.state.market_contractABI, //no need to use state there
            signer
          );

        this.setState({ contract });
        this.setState({ market_contract, signerAddress });
          console.log("sig add:", signerAddress);

        // Example: Call a contract function to get a value
        const tokenCount = await contract.count();
        this.setState({ tokenCount: tokenCount.toString() });
      } else {
        console.error('MetaMask or compatible Ethereum wallet not found.');
      }
      //this.loadMarketplaceItems();
      this.MyPurchases(); 

    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
}
  
   loadMarketplaceItems = async () => { 
    try{
    // Load all unsold items

    const { market_contract, contract} = this.state;
    let itemCount = await market_contract.itemCount()
    console.log('itemCount :',itemCount);
    let items = [];
    for (let i = 8; i <= itemCount.toNumber(); i++) {
      const item = await market_contract.items(i)
      const cids = item[4].toString(); 
      console.log("cids",cids)
      console.log('Item:', item.toString());
      if (!item.sold) {
        // get uri url from nft contract
       //const uri = await contract.tokenURI(item.tokenId)
       const cids = item[4].toString(); 
       console.log('ice:', cids);
       console.log("id:",item.cid);
       const tokenId = item[2].toString();
       console.log("tokenId:",tokenId);
       //const tokenId = item[2].toString();
       const uri = await contract.tokenURI(tokenId)
       console.log("token uriiiii", uri);
        //const uri =  `https://green-applicable-harrier-127.mypinata.cloud/ipfs/${cids}`;
        console.log("idmm:",i);
        console.log("urimm:",uri);
        //const response = await fetch(uri)
        //const metadata = await response.json()
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri);
        const metadata = await response.json()
        console.log("uri2:",uri);
       
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${uri}. Status: ${response.status}`);
          };
          console.log("response:",response);
         // console.log("metadata:",metadata)
        console.log("image",metadata.image);
        // get total price of item (item price + fee)
        const totalPrice = await market_contract.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image                  //not able to fetch metadata
        })
        //console.log(itemId);

      }
      
   }


   // setLoading(false)
    this.setState({ items, loading: false });
    //setItems(items)
  }

  catch (error) {
    console.error('Error loading marketplace items:', error);
  }}
  
  

   buyMarketItem = async (item) => {
    try {
        await (await this.state.market_contract.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
        this.loadMarketplaceItems(); // Call the function within the component using this
      } catch (error) {
        console.error('Error buying marketplace item:', error);
      }
  }
 

render() {
  const { tokenCount, isWalletConnected, items, signerAddress, loading } = this.state;

  //const signerAddress =  signer.getAddress();
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">NFT Marketplace</div>
        <ul className="nav-links">
          <li><a href="#" onClick={this.openModal}>Mint and list NFTs</a></li>
          <li><a href="#" onClick={this.toggleDropdown}>Wallet</a></li>
        </ul>
      </div>
      <div className="dropdown">
        {this.state.isDropdownOpen && (
          <div className="dropdown-content">
             <a> Wallet Connected: </a>  <br />
            <a> {signerAddress }</a>  <br />
            <a href="#">My Purchased Items</a>  <br />
            <a href="#">My Listed Items</a>
          </div>
        )}
      </div>
      <div className='heading'>
        <div className="logo-container">
          <img src={logo} alt="NFT Marketplace Logo" style={{ float: 'right' }} className="logo-image" />
        </div>
        <div className="title-container">
          <h1 className="title" style={{ letterSpacing: '4px' }}> 
            Discover  <br />  Collect   &nbsp; Sell  <br /> rare &nbsp; NFTS
          </h1>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {isWalletConnected ? (
            <div className="wallet-info">
              <p>Token Count: {tokenCount}</p>
            </div>
          ) : (
            <p className="wallet-info">
              Please connect your Ethereum wallet (e.g., MetaMask).
            </p>
          )}
          {/* Your component content */}
          {/* Conditionally render the modal */}
          {this.state.isModalOpen && <Modal onClose={this.closeModal} />}
          <div className="collections">EXPLORE <br/> OUR <br/> COLLECTIONS </div>
          <div className="item-container">
            {items.map((item, idx) => (
              <Card key={idx} style={{ flex: '0 0 calc(25% - 20px)', margin: '10px' }} className="item-card">
                <Card.Img className='image' variant="top" src={item.image}  />
                <Card.Body className="item-body">
                  <Card.Title className="item-title">{item.name}</Card.Title>
                  <Card.Text className="item-description">
                    {item.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="item-footer">
                  <div className="item-price">
                    <img src={ether} alt="Ether" style={{ marginRight: '3px' }} className="ether-image" />
                    {ethers.utils.formatEther(item.totalPrice)} ETH
                  </div>
                  <Button
                    onClick={() => this.buyMarketItem(item)}
                    variant="primary"
                    size="lg"
                    className="item-buy-button"
                  >
                    Buy Now
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
          <div className="join-us">
            <h2>Join Us</h2>
            <div className="join-us-links">
              <a href="mailto:your@email.com" className="join-us-link">Email</a>
              <a href="https://www.linkedin.com/your-linkedin-profile" className="join-us-link">LinkedIn</a>
              <a href="https://www.twitter.com/your-twitter-profile" className="join-us-link">Twitter</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


}


export default ContractInteraction;

    /*
    <div className="container">
      <div class="navbar">
  <div class="logo">Your Logo</div>
  <ul class="nav-links">
    <li><a href="#">Wallet</a></li>
    <li><a href="#">Dashboard</a></li>
    <li><a href="#">Account</a></li>
  </ul>
</div>
      <h1 className="title">Welcome to Your NFT Marketplace</h1>
      {isWalletConnected ? (
        <div className="wallet-info">
          <p>Token Count: {tokenCount}</p>
        </div>
      ) : (
        <p className="wallet-info">
          Please connect your Ethereum wallet (e.g., MetaMask).
        </p>
      )}

      <div className="item-container">
        {items.length > 0 ? (
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className="item-card">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body className="item-body">
                    <Card.Title className="item-title">
                      {item.name}
                    </Card.Title>
                    <Card.Text className="item-description">
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="item-footer">
                    <div className="item-price">
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                    </div>
                    <Button
                      onClick={() => this.buyMarketItem(item)}
                      variant="primary"
                      size="lg"
                      className="item-buy-button"
                    >
                      Buy Now
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <main className="no-assets">
            <h2>No listed assets</h2>
          </main>
        )}
      </div>
    </div>
  );
}


}


export default ContractInteraction;

*/