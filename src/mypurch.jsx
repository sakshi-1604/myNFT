import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
//import { Row, Col, Card } from 'react-bootstrap'
//import './mypurch.css';
import React, { Component } from 'react';

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
  setPurchases:[],
  purchases:[],
  
  
  //form
  file: null,
  name: '',
  description: '',
  external_url: '',
  price:'',
  provider: null,
  signer: null,
  
  isWalletConnected: false,
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
            signer.getAddress().then((address) => {
              console.log('Signer Address:', address);
            }).catch((error) => {
              console.error('Error getting signer address:', error);
            });
          } else {
            console.error('Signer not available.');
          }
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
          this.setState({ market_contract });
  
          // Example: Call a contract function to get a value
          const tokenCount = await contract.count();
          //console.log("tokencount", tokenCount.toString);
          this.setState({ tokenCount: tokenCount.toString() });
        } else {
          console.error('MetaMask or compatible Ethereum wallet not found.');
        }
       // this.MyListedItems(this.state.market_contract,this.contract,this.signer);
       this.MyPurchases(); 
        //MyListedItems
      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
      }
  }
  MyPurchases = async () => {
	try {
	  const { market_contract, signer, contract } = this.state;
	  const signerAddress = await signer.getAddress();
  
	  // Fetch purchased items from the marketplace by querying Bought events with the buyer set as the user
	  const filter = market_contract.filters.Bought(null, null, null, null, null, signerAddress);
	  const results = await market_contract.queryFilter(filter);
    console.log("filter::::" ,filter);
    console.log("results:::",results);
	  if (results && results.length) {
		// Fetch metadata of each NFT and add that to the purchasedItem object.
		const purchasedItems = await Promise.all(
		  results.map(async (i, index) => {
			// Start mapping from the 4th item (index 3)
			if (index >= 1) {
			  i = i.args;
			  console.log("idx is ",index)
			  console.log("i is",i);
			  const item = await market_contract.items(index);
			  console.log(item);
			  // Get URI URL from NFT contract
			  const uri = `https://green-applicable-harrier-127.mypinata.cloud/ipfs/${item.cid}`;
			  console.log(uri);
			  // Use URI to fetch the NFT metadata stored on IPFS
			  const response = await fetch(uri);
  
			  if (!response.ok) {
				throw new Error(`Failed to fetch data from ${uri}. Status: ${response.status}`);
			  }
  
			  const metadata = await response.json();
			  // Get the total price of the item (item price + fee)
			  const totalPrice = await market_contract.getTotalPrice(i.itemId);
  
			  // Define purchased item object
			  let purchasedItem = {
				totalPrice,
				price: i.price,
				itemId: i.itemId,
				name: metadata.name,
				description: metadata.description,
				image: metadata.image,
			  };
  
			  return purchasedItem;
			}
			return null;
		  })
		);
  
		const filteredPurchases = purchasedItems.filter((item) => item !== null);
		this.setState({ purchases: filteredPurchases, loading: false });
	  } else {
		// Handle the case where there are no results (purchases)
		this.setState({ purchases: [], loading: false });
	  }
	} catch (error) {
	  console.error('Error fetching purchased items:', error);
	}
  }
  render() {
    const {
      purchasedItems,
      listedItems,
      loadingPurchasedItems,
      purchasedItemsError,
      loadingListedItems
    } = this.state;
  
    return (
      <div className="flex justify-center">
        <h1 className="purchases-heading">My Purchases</h1>
  
        {loadingPurchasedItems ? (
          <main style={{ padding: "1rem 0" }}>
            <h2>Loading purchased items...</h2>
          </main>
        ) : purchasedItemsError ? (
          <main style={{ padding: "1rem 0" }}>
            <h2>Error loading purchased items. Please try again later.</h2>
          </main>
        ) : purchasedItems.length > 0 ? (
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {purchasedItems.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Footer>
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                      <br />
                      {item.name}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No purchases</h2>
          </main>
        )}
  
        <h1 className="purchases-heading">My Listed Items</h1>
  
        {loadingListedItems ? (
          <main style={{ padding: "1rem 0" }}>
            <h2>Loading listed items...</h2>
          </main>
        ) : (
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {listedItems.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Footer>
                      {ethers.utils.formatEther(item.totalPrice)} ETH
                      <br />
                      {item.name}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    );
  }
}  
export default ContractInteraction;