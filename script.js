window.onload = function() {
    console.log("Hello from JavaScript!");
    const iframe = document.querySelector("iframe");
    iframe.style.border = "5px solid red"; // Example of styling the iframe
    window.login();
};

let loginWindow;
let webData;

//opens the login window prompting the user to login
function login() {
  loginWindow = window.open(
    'https://login.pishock.com?proto=web',
    'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=500,height=800'
  )
}

//once the user logs in this function will be passed the userID and token
//The userID and Token will be used in the rest of these docs for authentication
function receiveMessage(event) {
  if (event.origin !== 'https://login.pishock.com') {
    return;
  }
  var loginData = event.data;
  const userId = loginData.Id
  const token = loginData.Token;
  loginWindow.close();

    fetch('https://ps.pishock.com/PiShock/GetUserDevices?UserId='userId'&Token='+token)  // The URL you want to send the request to
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    webData = response.json(); // Parse the JSON from the response
      console.log(webData);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

window.addEventListener('message', receiveMessage, false);
