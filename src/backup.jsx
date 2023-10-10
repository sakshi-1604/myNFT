import React, { Component } from 'react';
import { ethers } from 'ethers';
import axios from 'axios'; 

class ContractInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {

    //mint
       contract: null,
       contractAddress : '0x1634e503b1F5CC28146E6Db3D6F8CeeE61493D9B',
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
      market_contractAddress : '0x8b7df3621EDec030346C2D90045f01DaD75124F2',
      market_contractABI : [
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
                }
            ],
            "name": "makeItem",
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
        }
    ],
      tokenCount: 0, // Example state to store a contract value
      
     

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
      JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk',

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
        this.setState({ tokenCount: tokenCount.toString() });
      } else {
        console.error('MetaMask or compatible Ethereum wallet not found.');
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  }

  uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ name: 'pinnie' }));

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
           'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Image uploaded, CID:', res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  uploadMetadata = async () => {
    const { name, description, external_url, price, cid } = this.state;
    const imageCID = await this.uploadImage(this.state.file);
     

    try {
      const data = JSON.stringify({
        pinataContent: {
          name,
          description,
          external_url,
          image: `https://green-applicable-harrier-127.mypinata.cloud/ipfs/${imageCID}`,
          price,
        },
        pinataMetadata: {
          name: 'Pinnie NFT Metadata',
        },
      });

      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Metadata uploaded, CID:', res.data.IpfsHash);

      //const cid = res.data.IpfsHash ;
       // Set the CID in the component's state
    this.setState({ cid: res.data.IpfsHash });
    } catch (error) {
      
      console.error('Error uploading metadata:', error);
    }
  };

  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.setState({ file: selectedFile });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Example function to interact with the contract
  async mintToken() {
    try {
      const { contract,contractAddress, cid, market_contractAddress,image,market_contract,price,tokenCount} = this.state;

      // Example: Call a contract function to mint a token
      const tx = await contract.mint(`ipfs://${cid}`);
      await tx.wait();

      console.log('Token minted successfully!');
      console.log('Token minted successfully with CID:',cid);
      const id = await contract.tokenCount() ;
      console.log('Token count/id set',id.toString());
      await(await contract.setApprovalForAll(market_contractAddress, true)).wait();
      console.log('setApprovalForAll done');
      console.log('id',id.toString());
      console.log('nft add',contractAddress);
      console.log('price',price);
      const listingPrice = ethers.utils.parseEther(price.toString());
      await(await market_contract.makeItem(contractAddress, id, listingPrice)).wait();
      console.log('makeItem done');
     // const itemDetails = await contractInstance.getItemDetails(itemId);
      //console.log('Item Details:', itemDetails);
     
  
      const item = await market_contract.items('1'); //put item id not token id 
      //const item = await market_contract.items(id);

const itemId = item[0].toString(); // Convert to a JavaScript number
const tokenId = item[2].toString(); // Convert to a JavaScript number
const prices = item[3].toString();   // Convert to a string
console.log('image:',image);
console.log('Item ID:', itemId);
console.log('Token ID:', tokenId);
console.log('Price:', prices);
      console.log('Item Details:', item);
    } catch (error) {
      console.error('Error minting token:', error);
    }
  }

  render() {
    const { tokenCount, isWalletConnected } = this.state;
    const { name, description, external_url, price} = this.state;
    return (
      <div>
        <h1>Contract Interaction</h1>
        {isWalletConnected ? (
          <div>
            <p>Token Count: {tokenCount}</p>
            <button onClick={() => this.mintToken()}>Mint Token</button>
          </div>
        ) : (
          <p>Please connect your Ethereum wallet (e.g., MetaMask).</p>
        )}
    
       
         <div>
           <h1>File Upload</h1>
           <input
             type="text"
             name="name"
             placeholder="Name"
             value={name}
             onChange={this.handleInputChange}
           />
           <input
             type="text"
             name="description"
             placeholder="Description"
             value={description}
             onChange={this.handleInputChange}
           />
           <input
             type="text"
             name="external_url"
             placeholder="External URL"
             value={external_url}
             onChange={this.handleInputChange}
           />
           <input
             type="text"
             name="price"
             placeholder="price"
             value={price}
             onChange={this.handleInputChange}
           />
           <input
             type="file"
             accept=".jpg, .jpeg, .png, .gif"
             onChange={this.handleFileChange}
           />
           <button onClick={this.uploadMetadata}>Upload Metadata</button>
           <div>
             {isWalletConnected ? (
               <button onClick={this.mintNFT}>Mint NFT</button>
             ) : (
               <button onClick={this.connectWallet}>Connect Wallet</button>
             )}
           </div>
         </div>
         </div>
    );
  }
}

export default ContractInteraction;