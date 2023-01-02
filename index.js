const maximumCharacters = 500;
// const textAreaElement = document.querySelector("#message");
const textAreas = document.querySelectorAll(".textarea");
const typedCharactersElements = document.querySelectorAll(".typed-characters");
// console.log(typedCharactersElements);
const copyButtons = document.querySelectorAll(".copy");
const totalNumberOfPostsElement = document.querySelector("#totalNumberOfPosts");
const copyAllButton = document.querySelector("#copyAll");

// totalNumberOfPosts.innerHTML = 0;

// initialize the page
for (let x = 0; x < textAreas.length; x++) {
  countCharacters(x);
}

function countCharacters(postNumber) {
  // console.log(postNumber);
  let typedCharacters = 0;
  const thisTextArea = textAreas[postNumber];
  const thisTypedCharactersElement = typedCharactersElements[postNumber];
  // console.log(thisTypedCharactersElement);

  const foundLinks = thisTextArea.value.match(/http.+?(?!\S)/g);
  const messageNoLinks = thisTextArea.value.replace(/http.+?(?!\S)/g, "");
  let linkCharacterTotal = 0;
  if (foundLinks) {
    linkCharacterTotal = 23 * foundLinks.length;
  }
  typedCharacters = messageNoLinks.length + linkCharacterTotal;

  /*Display the number of characters typed.   */
  thisTypedCharactersElement.textContent = maximumCharacters - typedCharacters;
  // console.log(maximumCharacters - typedCharacters);

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
  let numberOfPosts = 0;
  for (let x = 0; x < textAreas.length; x++) {
    if (textAreas[x].value.length > 0) {
      numberOfPosts++;
      // console.log(numberOfPosts)
    }
    totalNumberOfPostsElement.textContent = numberOfPosts;
    console.log(totalNumberOfPostsElement);
  }
}

for (let x = 0; x < textAreas.length; x++) {
  textAreas[x].addEventListener("input", event => {
    countCharacters(event.target.attributes.postnumber.value);
    // console.log(event.target.attributes.postnumber.value);
  });
  copyButtons[x].addEventListener("click", event => {
    navigator.clipboard.writeText(textAreas[x].value);
  });
}

copyAllButton.addEventListener("click", event => {
  let allAreas = "";
  for (let x = 0; x < textAreas.length; x++) {
    // console.log(textAreas[x].value.length);

    if (textAreas[x].value.length > 0) {
      allAreas += textAreas[x].value;
      if (x < textAreas.length - 1) {
        allAreas += `\n\n----------------------------------\n\n`;
      }
    }
  }
  navigator.clipboard.writeText(allAreas);
});
