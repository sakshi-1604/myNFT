import React, { Component } from 'react';
import { ethers } from 'ethers';
import axios from 'axios'; 

class ContractInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {

    //mint
       contract: null,
       contractAddress : '0x163CC28146E6Db3D6F8CeeE61493D9B',
       contractABI : [],
      tokenCount: 0, // Example state to store a contract value
      isWalletConnected: false,

    //form
      file: null,
      name: '',
      description: '',
      external_url: '',
      provider: null,
      signer: null,
      contract: null,
      isWalletConnected: false,
      cid : '',
      // JWT: 'YOUR_PINATA_JWT',
      JWT : 'eyJhbGcI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk', // Define your JWT token here
    

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
          this.state.contractABI,
          signer
        );

        this.setState({ contract });

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
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Image uploaded, CID:', res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  uploadMetadata = async () => {
    const { name, description, external_url } = this.state;
    const imageCID = await this.uploadImage(this.state.file);
     

    try {
      const data = JSON.stringify({
        pinataContent: {
          name,
          description,
          external_url,
          image: `ipfs://${imageCID}`,
        },
        pinataMetadata: {
          name: 'Pinnie NFT Metadata',
        },
      });

      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${this.state.JWT}`,
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
      const { contract, cid } = this.state;

      // Example: Call a contract function to mint a token
      const tx = await contract.mint(`ipfs://${cid}`);
      await tx.wait();

      console.log('Token minted successfully!');
      console.log('Token minted successfully with CID:',cid);
    } catch (error) {
      console.error('Error minting token:', error);
    }
  }

  render() {
    const { tokenCount, isWalletConnected } = this.state;
    const { name, description, external_url} = this.state;
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

/*import React, { Component } from 'react';
import { ethers } from 'ethers';
import axios from 'axios'; 

class ContractInteraction extends Component {
  constructor(props) {
    super(props);
    this.state = {

    //mint
       contract: null,
       contractAddress : '',
       contractABI : '',
      tokenCount: 0, // Example state to store a contract value
      isWalletConnected: false,

    //form
      file: null,
      name: '',
      description: '',
      external_url: '',
      provider: null,
      signer: null,
      contract: null,
      isWalletConnected: false,
      cid : '',
      // JWT: 'YOUR_PINATA_JWT',
      JWT : 'VCJ4iOns5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk', // Define your JWT token here
    

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
          this.state.contractABI,
          signer
        );

        this.setState({ contract });

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
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Image uploaded, CID:', res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  uploadMetadata = async () => {
    const { name, description, external_url } = this.state;
    const imageCID = await this.uploadImage(this.state.file);
     

    try {
      const data = JSON.stringify({
        pinataContent: {
          name,
          description,
          external_url,
          image: `ipfs://${imageCID}`,
        },
        pinataMetadata: {
          name: 'Pinnie NFT Metadata',
        },
      });

      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Metadata uploaded, CID:', res.data.IpfsHash);
      const cid = res.data.IpfsHash ;
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
      const { contract } = this.state;

      // Example: Call a contract function to mint a token
      const tx = await contract.mint('ipfs://${cid}');
      await tx.wait();

      console.log('Token minted successfully!');
    } catch (error) {
      console.error('Error minting token:', error);
    }
  }

  render() {
    const { tokenCount, isWalletConnected } = this.state;

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
      </div>
    );
  }
}

export default ContractInteraction;



import React, { Component } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: '',
      description: '',
      external_url: '',
      provider: null,
      signer: null,
      contract: null,
      isWalletConnected: false,
      // JWT: 'YOUR_PINATA_JWT',
      JWT : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk', // Define your JWT token here
    };
    }
  

  async componentDidMount() {
    try {
      // Connect to Ethereum provider (e.g., MetaMask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Set up a signer (assuming the user has connected to MetaMask)
      const signer = provider.getSigner();

      // Replace with your contract's address
      const contractAddress = '0x521ec24d44C10D25379cBffF32261385e1394953';
      // Replace with your contract ABI
      //const contractABI = []; // Your contract's ABI
      const contractABI = [[
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
    ]];
      // Connect to your smart contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      this.setState({ provider, signer, contract });

      if (await provider.getSigner().isConnected()) {
        this.setState({ isWalletConnected: true });
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  }

  connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({ isWalletConnected: true });
      console.log('Wallet connected!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  mintNFT = async () => {
    try {
      const { contract, isWalletConnected } = this.state;

      if (!isWalletConnected) {
        console.error('Wallet is not connected. Please connect your wallet.');
        return;
      }

      // Replace with the recipient's Ethereum address
      const recipientAddress = 'ipfs//';

      // Mint the NFT (assuming the mint function takes a recipient address)
      const tx = await contract.mint(recipientAddress);

      await tx.wait();

      console.log('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ name: 'pinnie' }));

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Image uploaded, CID:', res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  uploadMetadata = async () => {
    const { name, description, external_url } = this.state;
    const imageCID = await this.uploadImage(this.state.file);

    try {
      const data = JSON.stringify({
        pinataContent: {
          name,
          description,
          external_url,
          image: `ipfs://${imageCID}`,
        },
        pinataMetadata: {
          name: 'Pinnie NFT Metadata',
        },
      });

      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Metadata uploaded, CID:', res.data.IpfsHash);
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

  render() {
    const { name, description, external_url, isWalletConnected } = this.state;
    return (
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
    );
  }
}

export default FileUpload;

/*
import React, { Component } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';


class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: '',
      description: '',
      external_url: '',
      provider: null,
        signer: null,
        contract: null,
        isWalletConnected: false,
     // JWT: 'YOUR_PINATA_JWT',
     
    };
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  async componentDidMount() {
    // Connect to Ethereum provider (e.g., MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Set up a signer (assuming the user has connected to MetaMask)
    const signer = provider.getSigner();

    // Replace with your contract's address and ABI
    const contractAddress = '0x4BC20eEC3003DB16bCCe9D730451B5800c3B2734';
    

    // Connect to your smart contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    this.setState({ provider, signer, contract });

    if (await provider.getSigner().isConnected()) {
      this.setState({ isWalletConnected: true });
    }
  }


// Function to connect the wallet
connectWallet = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({ isWalletConnected: true });
    console.log('Wallet connected!');
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
};


mintNFT = async () => {
  try {
    const { contract, isWalletConnected } = this.state;

    // Check if the wallet is connected before minting
    if (!isWalletConnected) {
      console.error('Wallet is not connected. Please connect your wallet.');
      return;
    }

    // Replace with the recipient's Ethereum address
    const recipientAddress = 'RECIPIENT_ADDRESS';

    // Mint the NFT (assuming the mint function takes a recipient address)
    const tx = await contract.mint(recipientAddress);

    // Wait for the transaction to be mined
    await tx.wait();

    console.log('NFT minted successfully!');
  } catch (error) {
    console.error('Error minting NFT:', error);
  }
};



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Function to upload an image to Pinata
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

  // Function to upload metadata to Pinata
  uploadMetadata = async () => {
    const { name, description, external_url } = this.state;
    const imageCID = await this.uploadImage(this.state.file);

    try {
      const data = JSON.stringify({
        pinataContent: {
          name,
          description,
          external_url,
          image: `ipfs://${imageCID}`,
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

  render() {
    const { name, description, external_url } = this.state;
    const { isWalletConnected } = this.state;
    return (
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
    );
  }
}

export default FileUpload;
====================================================
/*
import React, { Component } from 'react';
import axios from 'axios';
const FormData = require('form-data');

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      pinataContent: {
        name: '',
        description: '',
        external_url: '',
        CID: '',
      },
    //  JWT: 'YOUR_PINATA_JWT',
     JWT : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk', // Define your JWT token here
    };
  }

  // Function to upload a file to Pinata
  pinFileToIPFS = async (file) => {
    const { pinataContent, JWT } = this.state;

    const formData = new FormData();
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`,
        },
      });
      console.log('File uploaded to IPFS:', res.data);

      // After successfully pinning the file, call the uploadMetadata function
      const CID = res.data.IpfsHash;
      this.setState({
        pinataContent: {
          ...pinataContent,
          CID: `ipfs://${CID}`,
        },
      });
      this.uploadMetadata(pinataContent);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Function to upload metadata to Pinata
  uploadMetadata = async (pinataContent) => {
    try {
      const data = JSON.stringify({
        pinataContent,
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
    } catch (error) {
      console.error('Error uploading metadata:', error);
    }
  };

  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Call the pinFileToIPFS function with the selected file
      this.pinFileToIPFS(selectedFile);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      pinataContent: {
        ...prevState.pinataContent,
        [name]: value,
      },
    }));
  };

  render() {
    const { pinataContent } = this.state;

    return (
      <div>
        <h1>File Upload</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={pinataContent.name}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={pinataContent.description}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="external_url"
          placeholder="External URL"
          value={pinataContent.external_url}
          onChange={this.handleInputChange}
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default FileUpload;

/*
import React, { Component } from 'react';
import axios from 'axios';
const FormData = require('form-data');
//const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk';
//const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk';
class FileUpload extends Component {
  // Define your JWT token here
  JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk';
  // Function to upload a file to Pinata
  pinFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${this.JWT}`, // Use the JWT token defined in your class
        },
      });
      console.log('File uploaded to IPFS:', res.data);

      // After successfully pinning the file, call the uploadMetadata function
      const CID = res.data.IpfsHash;
      this.uploadMetadata('File name', 'File description', 'External URL', CID);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Function to upload metadata to Pinata
  uploadMetadata = async (name, description, external_url, CID) => {
    try {
      const data = JSON.stringify({
        pinataContent: {
          name: `${name}`,
          description: `${description}`,
          external_url: `${external_url}`,
          image: `ipfs://${CID}`,
        },
        pinataMetadata: {
          name: 'Pinnie NFT Metadata',
        },
      });

      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.JWT}`, // Use the JWT token defined in your class
        },
      });

      console.log('Metadata uploaded, CID:', res.data.IpfsHash);
    } catch (error) {
      console.error('Error uploading metadata:', error);
    }
  };

  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Call the pinFileToIPFS function with the selected file
      this.pinFileToIPFS(selectedFile);
    }
  };

  render() {
    return (
      <div>
        <h1>File Upload</h1>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default FileUpload;

/*
import React, { Component } from 'react';

import axios from "axios"
const FormData = require('form-data')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk';
const pinFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  
class FileUpload extends Component {
  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Call the pinFileToIPFS function with the selected file
      pinFileToIPFS(selectedFile);
    }
  };

  render() {
    return (
      <div>
        <h1>File Upload</h1>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default FileUpload;
*/
/*
import React, { Component } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: '',
      description: '',
      external_url: '',
      provider: null,
      signer: null,
      contract: null,
      isWalletConnected: false,
      // JWT: 'YOUR_PINATA_JWT',
      JWT : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjVkODE5Yy05ZTE5LTQ1ZjUtYjJkYi0xNzgzYzFhNDVmNWMiLCJlbWFpbCI6InNkZGFoYWtlMTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2MDRmYzkyOWZhZDYzNjAyNDU2Iiwic2NvcGVkS2V5U2VjcmV0IjoiOWZhNTQ4NWEzNDExN2ZkZjYyMzAwMGM0YWI5MjA5NjhkY2I1YmZkYTZiNjM2OWRlMTYyYWU2ZDQwZmUzYzViMCIsImlhdCI6MTY5NDI3NjczNn0.O8NchXg2IQ1QHDZEtcecfBUXKeOQBg-KjUnBN1INYFk', // Define your JWT token here
    };
    }
  

  async componentDidMount() {
    try {
      // Connect to Ethereum provider (e.g., MetaMask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Set up a signer (assuming the user has connected to MetaMask)
      const signer = provider.getSigner();

      // Replace with your contract's address
      const contractAddress = '0x521ec24d44C10D25379cBffF32261385e1394953';
      // Replace with your contract ABI
      //const contractABI = []; // Your contract's ABI
      const contractABI = [[
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
    ]];
      // Connect to your smart contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      this.setState({ provider, signer, contract });

      if (await provider.getSigner().isConnected()) {
        this.setState({ isWalletConnected: true });
      }
    } catch (error) {
      console.error('Error connecting to Ethereum:', error);
    }
  }

  connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({ isWalletConnected: true });
      console.log('Wallet connected!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  mintNFT = async () => {
    try {
      const { contract, isWalletConnected } = this.state;

      if (!isWalletConnected) {
        console.error('Wallet is not connected. Please connect your wallet.');
        return;
      }

      // Replace with the recipient's Ethereum address
      const recipientAddress = 'ipfs//';

      // Mint the NFT (assuming the mint function takes a recipient address)
      const tx = await contract.mint(recipientAddress);

      await tx.wait();

      console.log('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ name: 'pinnie' }));

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Image uploaded, CID:', res.data.IpfsHash);
      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  uploadMetadata = async () => {
    const { name, description, external_url } = this.state;
    const imageCID = await this.uploadImage(this.state.file);

    try {
      const data = JSON.stringify({
        pinataContent: {
          name,
          description,
          external_url,
          image: `ipfs://${imageCID}`,
        },
        pinataMetadata: {
          name: 'Pinnie NFT Metadata',
        },
      });

      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${this.state.JWT}`,
        },
      });

      console.log('Metadata uploaded, CID:', res.data.IpfsHash);
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

  render() {
    const { name, description, external_url, isWalletConnected } = this.state;
    return (
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
    );
  }
}

export default FileUpload;
*/