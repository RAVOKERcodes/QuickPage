// Function to add a text block
function addTextBlock() {
    const contentArea = document.getElementById('content-area');
    const textBlock = document.createElement('div');
    textBlock.className = 'block text-block';
    textBlock.contentEditable = 'true';  // Make it editable
    textBlock.innerHTML = 'Edit this text...';
    contentArea.appendChild(textBlock);
  }
  
  // Function to add an image block
  function addImageBlock() {
    const contentArea = document.getElementById('content-area');
    const imageBlock = document.createElement('div');
    imageBlock.className = 'block image-block';
    imageBlock.innerHTML = `
      <input type="file" onchange="loadImage(event)" />
      <p>Select an image to upload</p>
    `;
    contentArea.appendChild(imageBlock);
  }
  
  // Load the image into the block
  function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
      const img = document.createElement('img');
      img.src = reader.result;
      event.target.parentElement.appendChild(img);
      event.target.nextElementSibling.remove(); // Remove the text
      event.target.remove();  // Remove file input after image loads
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  
  // Function to add a link button inside the content area
  function addLinkButton() {
    const contentArea = document.getElementById('content-area');
    const linkButton = document.createElement('a');
    linkButton.className = 'block link-button';
    linkButton.href = 'https://www.example.com';  // Default link
    linkButton.target = '_blank';  // Open in new tab
    linkButton.innerHTML = 'Click here to edit this link';
    linkButton.contentEditable = 'true';  // Make the link editable
    contentArea.appendChild(linkButton);
  }
  
  // Function to add a file upload button inside the content area
  function addFileButton() {
    const contentArea = document.getElementById('content-area');
    const fileButton = document.createElement('div');
    fileButton.className = 'block file-button';
    fileButton.innerHTML = `
      <input type="file" onchange="uploadFile(event)" />
      <p>Select a file to upload</p>
    `;
    contentArea.appendChild(fileButton);
  }
  
  // Handle file upload and create a download link
  function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const fileLink = document.createElement('a');
      fileLink.href = URL.createObjectURL(file);
      fileLink.download = file.name;
      fileLink.className = 'file-button';
      fileLink.textContent = `Download ${file.name}`;
      
      event.target.parentElement.appendChild(fileLink);
      event.target.nextElementSibling.remove(); // Remove the "Select a file" text
      event.target.remove();  // Remove file input after file upload
    }
  }
  
  // Function to refresh/clear the content area
  function refreshPage() {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = ''; // Clear content area
  }
  
  // Export the page as an HTML file
  function exportPage() {
    const contentArea = document.getElementById('content-area').innerHTML;
    const pageHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Custom Page</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div class="content-area">${contentArea}</div>
      </body>
      </html>
    `;
    download('custom-page.html', pageHtml);
  }
  
  // Function to download the HTML file
  function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  