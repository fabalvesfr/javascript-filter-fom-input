// NAME SPACE
const nameInput = document.getElementById("name-input");
const filteredNames = document.getElementById("filtered-names"); // DOM container where the filtered names will appear

// Sourcing names from API
apiURL = "https://jsonplaceholder.typicode.com/users";
const apiRequest = new XMLHttpRequest();

function getRequest() {
  return new Promise((resolve, reject) => {
    apiRequest.open("GET", apiURL);

    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
          resolve(JSON.parse(apiRequest.response));
        } else {
          reject(JSON.parse(apiRequest.response));
        }
      }
    };
    apiRequest.send();
  });
}

// Using Async/Await to handle the asynchronicity of the HTTP request operation
async function getNames() {
  const response = await getRequest();
  //populating an array with only the person's name and email address
  const contactsList = [];
  for (let i = 0; i < response.length; i++) {
    const contact = {
      name: response[i].name,
      email: response[i].email,
    };
    contactsList.push(contact);
  }
  nameInput.addEventListener("input", () => {
    // Cleaning the filtered names on the browser before adding new ones
    filteredNames.innerHTML = "";

    // Grabbing the user's input and cleaning it
    const cleanInputValue = nameInput.value.toLowerCase();

    // Filtering the list according to what user has typed
    filteredList = contactsList.filter((contact) =>
      contact.name.toLowerCase().includes(cleanInputValue)
    );

    filteredList.forEach((contact) => {
      // Creating DOM elements for each of the items in the filtered list
      const container = document.createElement("div");
      container.setAttribute("class", "filtered-name-container");

      const filteredName = document.createElement("h3");
      filteredName.textContent = contact.name;

      const filteredEmail = document.createElement("p");
      filteredEmail.textContent = contact.email;

      // Appending the children DOM elements to their respective parent
      container.appendChild(filteredName);
      container.appendChild(filteredEmail);
      filteredNames.appendChild(container);
    });
  });
}

// Calling the getNames() function to launch the HTTP Get request and start the filtering process on the user input
getNames();
