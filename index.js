const maximumCharacters = 500;
const textAreaElement = document.querySelector("#message");
const textAreas = document.querySelectorAll(".textarea");
const typedCharactersElements = document.querySelectorAll(".typed-characters");
const copyButtons = document.querySelectorAll(".copy");
const totalNumberOfPosts = document.querySelector("#totalNumberOfPosts");
const copyAllButton = document.querySelector("#copyAll");

totalNumberOfPosts.innerHTML = 0;

// initialize the page
for (let x = 0; x < textAreas.length; x++) {
  countCharacters(x);
}

function countCharacters(postNumber) {
  // console.log({ postNumber });
  let typedCharacters = 0;
  const thisTextArea = textAreas[postNumber];
  const thisTypedCharactersElement = typedCharactersElements[postNumber];

  const foundLinks = thisTextArea.value.match(/http.+?(?!\S)/g);
  // console.log(foundLinks.length);
  const messageNoLinks = thisTextArea.value.replace(/http.+?(?!\S)/g, "");
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
}

for (let x = 0; x < textAreas.length; x++) {
  textAreas[x].addEventListener("input", event => {
    countCharacters(event.target.attributes.postnumber.value);
  });
  copyButtons[x].addEventListener("click", event => {
    navigator.clipboard.writeText(textAreas[x].value);
  });
}

copyAllButton.addEventListener("click", event => {
  let allAreas = "";
  for (let x = 0; x < textAreas.length; x++) {
    console.log(textAreas[x].value.length);

    if (textAreas[x].value.length > 0) {
      allAreas += textAreas[x].value;
      if (x < textAreas.length - 1) {
        allAreas += `\n\n----------------------------------\n\n`;
      }
    }
  }
  navigator.clipboard.writeText(allAreas);
});
