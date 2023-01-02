let maximumCharacters = 500;
// const textAreaElement = document.querySelector("#message");
const textAreas = document.querySelectorAll(".textarea");
const typedCharactersElements = document.querySelectorAll(".typed-characters");
// console.log(typedCharactersElements);
const copyButtons = document.querySelectorAll(".copy");
const trashButtons = document.querySelectorAll(".trash-button");

const totalNumberOfPostsElement = document.querySelector("#totalNumberOfPosts");
const copyAllButton = document.querySelector("#copyAll");
let numberOfPosts = 0;
let addCountAtEndOfPost = true;

if (addCountAtEndOfPost) {
  maximumCharacters = maximumCharacters - 6;
}

// initialize the page
for (let x = 0; x < textAreas.length; x++) {
  countCharacters(x);
}

function countCharacters(postNumber) {
  let typedCharacters = 0;
  const thisTextArea = textAreas[postNumber];
  const thisTypedCharactersElement = typedCharactersElements[postNumber];

  const foundLinks = thisTextArea.value.match(/http.+?(?!\S)/g);
  let messageNoLinks = thisTextArea.value.replace(/http.+?(?!\S)/g, "");
  messageNoLinks = messageNoLinks.replace(/(@.+?)(@.+?)(?!\S)/g, "$1");

  let linkCharacterTotal = 0;
  if (foundLinks) {
    linkCharacterTotal = 23 * foundLinks.length;
  }

  typedCharacters = messageNoLinks.length + linkCharacterTotal;

  /*Display the number of characters typed.   */
  thisTypedCharactersElement.textContent = maximumCharacters - typedCharacters;

  if (typedCharacters > maximumCharacters) {
    thisTypedCharactersElement.classList.add("text-danger");
  } else {
    thisTypedCharactersElement.classList.remove("text-danger");
  }

  if (typedCharacters > maximumCharacters) {
    thisTextArea.classList.add("warning");
  } else {
    thisTextArea.classList.remove("warning");
  }

  checkNumberOfPosts();
}

function checkNumberOfPosts() {
  numberOfPosts = 0;
  for (let x = 0; x < textAreas.length; x++) {
    if (textAreas[x].value.length > 0) {
      numberOfPosts = x + 1;
      // console.log(numberOfPosts)
    }
    totalNumberOfPostsElement.textContent = numberOfPosts;
  }
}

//initialize listeners
for (let x = 0; x < textAreas.length; x++) {
  textAreas[x].addEventListener("input", event => {
    countCharacters(event.target.attributes.postnumber.value);
  });
  copyButtons[x].addEventListener("click", event => {
    let postContent = `\n(${x + 1}/${numberOfPosts})`;
    navigator.clipboard.writeText(textAreas[x].value + postContent);
    copyButtons[x].innerText = "copied!";
    setTimeout(() => {
      copyButtons[x].innerText = "copy";
    }, 1500);
  });
  trashButtons[x].addEventListener("click", event => {
    console.log(textAreas[x].textContent);
    textAreas[x].value = "";
    event.preventDefault();
    checkNumberOfPosts();
    countCharacters(x);
  });
}

copyAllButton.addEventListener("click", event => {
  let allAreas = "";
  for (let x = 0; x < textAreas.length; x++) {
    if (textAreas[x].value.length > 0) {
      allAreas += textAreas[x].value;
      if (x < textAreas.length - 1) {
        allAreas += `\n\n(${x + 1}/${numberOfPosts})------------------------\n\n`;
      }
    }
  }
  navigator.clipboard.writeText(allAreas);
  copyAllButton.innerText = "copied!";
  setTimeout(() => {
    copyAllButton.innerText = "copy all";
  }, 1500);
});
