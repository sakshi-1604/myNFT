import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from './FileUpload'; // Import your FileUpload component
import './index.css';
import Home from './home';
import A from './myListedItems';
import S from './modal'
import H from './mypurch'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const axios = require('axios')
const FormData = require('form-data')
//const fs = require('fs')

const root = ReactDOM.createRoot(document.getElementById('root'));
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
/*
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







ReactDOM.render(
  <React.StrictMode>
    < A/>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const root = ReactDOM.createRoot(document.getElementById('root'));
const JWT = '';
const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "src/duck.jpg";
  
  const file = fs.createReadStream(src)
  formData.append('file', file)
  
  const pinataMetadata = JSON.stringify({
    name: 'File name',
  });
  formData.append('pinataMetadata', pinataMetadata);
  
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', pinataOptions);

  try{
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

pinFileToIPFS()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/