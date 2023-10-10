import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import './home.css';
import './myListedItems.css';
import React, { Component } from 'react';
//import './myListedItems.css'
import axios from 'axios'; 

class ContractInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
 //mint
 JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk',

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
listedItems: [],
setListedItems: [],
setSoldItems: [],
soldItems: [],
purchases:[],

purItems:[],
//form
file: null,
name: '',
description: '',
external_url: '',
price:'',
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
// JWT: 'YOUR_PINATA_JWT',


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
      console.log("uri",uri);
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
            console.log("uri",uri);
            console.log("uri!!!!:::::::",uri);
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
/*

   loadPurchasedItems = async () => {
    const { market_contract, signer, contract,setPurchases } = this.state;
    const signerAddress = await signer.getAddress();
    console.log("signer:",signerAddress);
      // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
      const filter =  market_contract.filters.Bought(null,null,null,null,null,signerAddress)
      const results = await market_contract.queryFilter(filter)
      //Fetch metadata of each nft and add that to listedItem object.
      const purchases = await Promise.all(results.map(async i => {
        // fetch arguments from each result
        i = i.args
        // get uri url from nft contract
        const uri = await contract.tokenURI(i.tokenId)
        console.log("uri:",uri)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await market_contract.getTotalPrice(i.itemId)

        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        console.log(purchasedItem,"this is:")
        return purchasedItem
      }))
    
     // this.setState({  setPurchases: purchases});
      //setPurchases(purchases)
      //this.setState({ setPurchases: purchases });





    }


  
  render() {
    const { purchases } = this.state; // Use purchases directly
  
    return (
      <div>
        <h1>My Purchased Items</h1>
        <div className="purchase-items">
          {purchases.map((item, index) => (
            <div key={index} className="purchase-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Description: {item.description}</p>
              <p>Total Price: {item.totalPrice} ETH</p>
              <p>Price: {item.price} ETH</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  */
/*
  loadPurchasedItems = async () => {
    const { market_contract, signer, contract } = this.state;
    const signerAddress = await signer.getAddress();

    // Fetch purchased items from the marketplace by querying Bought events with the buyer set as the user
    const filter = market_contract.filters.Bought(null, null, null, null, null, signerAddress);
    const results = await market_contract.queryFilter(filter);

    // Fetch metadata of each NFT and add it to the purchasedItems array.
    const purchasedItems = await Promise.all(
      results.map(async (i) => {
        // Fetch arguments from each result
        i = i.args;

        // Get the URI URL from the NFT contract
        const tokenId = i.tokenId.toString();
        const uri = await contract.tokenURI(tokenId);

        // Use the URI to fetch the NFT metadata stored on IPFS
        const response = await fetch(uri);

        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${uri}. Status: ${response.status}`);
        }

        const metadata = await response.json();

        // Get the total price of the item (item price + fee)
        const totalPrice = await market_contract.getTotalPrice(i.itemId);

        // Define the purchased item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return purchasedItem;
      })
    );

    // Update the state with the purchasedItems
    this.setState({ purchasedItems, loading: false });
  };

loadPurchasedItems = async () => {
  const { market_contract, signer, contract } = this.state;
  const signerAddress = await signer.getAddress();

  try {
    // Fetch purchased items from the marketplace by querying Bought events with the buyer set as the user
    const filter = market_contract.filters.Bought(null, null, null, null, null, signerAddress);
    const results = await market_contract.queryFilter(filter);

    // Fetch metadata of each NFT and add it to the purchasedItems array.
    const purchasedItems = await Promise.all(
      results.map(async (i) => {
        // Fetch arguments from each result
        i = i.args;

        // Get the URI URL from the NFT contract
        const tokenId = i.tokenId.toString();
        const uri = await contract.tokenURI(tokenId);

        // Use the URI to fetch the NFT metadata stored on IPFS
        const response = await fetch(uri);

        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${uri}. Status: ${response.status}`);
        }

        const metadata = await response.json();

        // Get the total price of the item (item price + fee)
        const totalPrice = await market_contract.getTotalPrice(i.itemId);

        // Define the purchased item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };

        return purchasedItem;
      })
    );

    // Update the state with the purchasedItems
    this.setState({ purchasedItems, loadingPurchasedItems: false });
  } catch (error) {
    console.error('Error loading purchased items:', error);
    this.setState({ loadingPurchasedItems: false, purchasedItemsError: true });
  }
};
*/

 
render() {
  const { purItems, listedItems, soldItems,  loading } = this.state;

  return (
    <div className="flex justify-center">
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
  /*

render() {
  const { listedItems, soldItems, loading } = this.state;

  return (
    <div className="flex justify-center">
      {loading ? (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      ) : (
        <div className="px-5 py-3 container">
          {listedItems.length > 0 ? (
            <>
              <h2>Listed</h2>
              <Row xs={1} md={2} lg={4} className="g-4 py-3">
                {listedItems.map((item, idx) => (
                  <Col key={idx} className="overflow-hidden">
                    <Card>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Footer>
                        {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <main style={{ padding: "1rem 0" }}>
              <h2>No listed assets</h2>
            </main>
          )}
          {soldItems.length > 0 && (
            <>
              <h2>Sold</h2>
              <Row xs={1} md={2} lg={4} className="g-4 py-3">
                {soldItems.map((item, idx) => (
                  <Col key={idx} className="overflow-hidden">
                    <Card>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Footer>
                        For {ethers.utils.formatEther(item.totalPrice)} ETH - Received {ethers.utils.formatEther(item.price)} ETH
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      )}
    </div>
  );
}
}

export default ContractInteraction;

  /*
 async renderSoldItems(items) {
  return (
    <>
      <h2>Sold</h2>
      <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <Card.Footer>
                For {ethers.utils.formatEther(item.totalPrice)} ETH - Recieved {ethers.utils.formatEther(item.price)} ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
/*
// async  MyListedItems({ marketplace, nft, account }) {
  //const[loading, setLoading] = useState(true)
  //const [listedItems, setListedItems] = useState([])
   loadListedItems = async () => {
console.log("my listed items");
  const { setSoldItems, setListedItems,loading, setLoading }= this.state;
  const { market_contract, contract, signer} = this.state;
//  const loadListedItems = async () => {
    // Load all sold items that the user listed
    console.log("load listed items");
    const itemCount = await market_contract.itemCount()
    let listedItems = [];
    let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await market_contract.items(indx)
      console.log("i is",i);
      if (i.seller.toLowerCase() == signer) {
        // get uri url from nft contract
       // const uri = await nft.tokenURI(i.tokenId)
        
        const uri =  `https://green-applicable-harrier-127.mypinata.cloud/ipfs/${i.cid}`;
       // console.log("uri:",uri);
        
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await market_contract.getTotalPrice(i.itemId)
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    
    this.setState((prevState) => ({
      listedItems: [...prevState.listedItems, item],
      soldItems: i.sold ? [...prevState.soldItems, item] : prevState.soldItems,
    }));
    //setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }}
  
  *//*
  loadListedItems = async () => {
    console.log("my listed items");
    const { setSoldItems, setListedItems, loading, setLoading } = this.state;
    const { market_contract, contract, signer } = this.state;
    const itemCount = await market_contract.itemCount();
    let listedItems = [];
    let soldItems = [];
  
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await market_contract.items(indx);
      console.log("i is", i);
      if (i.seller.toLowerCase() === signer) {
        // get uri url from nft contract
        const uri = `https://green-applicable-harrier-127.mypinata.cloud/ipfs/${i.cid}`;
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await market_contract.getTotalPrice(i.itemId);
        // define listed item object
        const item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        };
        listedItems.push(item);
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item);
      }
    }
  
    this.setState({
      listedItems: [...this.state.listedItems, ...listedItems],
      soldItems: [...this.state.soldItems, ...soldItems],
      setLoading: false,
      //setLoading(false)
    });
  };
  
  render() {
    
 
 
    const {soldItems, setSoldItems,listedItems, setListedItems,loading, setLoading }= this.state;
    const { market_contract, contract} = this.state;
    return(
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 py-3 container">
            <h2>Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
            {soldItems.length > 0 && this.renderSoldItems(soldItems)}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );}
}
export default ContractInteraction;
*/