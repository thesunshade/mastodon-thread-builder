let baseMaximumCharacters = 500;
let maximumCharacters;
const textAreas = document.querySelectorAll(".textarea");
const typedCharactersElements = document.querySelectorAll(".typed-characters");
const copyButtons = document.querySelectorAll(".copy");
const trashButtons = document.querySelectorAll(".trash-button");
const numeratorSelector = document.getElementById("numerator");
const totalNumberOfPostsElement = document.querySelector("#totalNumberOfPosts");
const copyAllButton = document.querySelector("#copyAll");
let numberOfPosts = 0;

let numerator = numeratorSelector.value;
numeratorSelector.addEventListener("change", () => {
  numerator = numeratorSelector.value;
  console.log(numerator);
  if (numerator === "top" || numerator === "bottom") {
    maximumCharacters = baseMaximumCharacters - 6;
  } else {
    maximumCharacters = baseMaximumCharacters;
  }
  recountAllTextAreas();
});

// initialize the page
function recountAllTextAreas() {
  if (numerator === "top" || numerator === "bottom") {
    maximumCharacters = baseMaximumCharacters - 6;
  } else {
    maximumCharacters = baseMaximumCharacters;
  }
  for (let x = 0; x < textAreas.length; x++) {
    countCharacters(x);
  }
}
recountAllTextAreas();

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

  if (thisTextArea.value.length === 0) {
    thisTextArea.classList.add("empty-post");
  } else {
    thisTextArea.classList.remove("empty-post");
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
    const numeratorText = `${x + 1}/${numberOfPosts}`;
    let postContent = textAreas[x].value;
    switch (numerator) {
      case "top":
        postContent = numeratorText + "\n" + postContent;
        break;
      case "bottom":
        postContent = postContent + "\n" + numeratorText;
        break;
      case "manual":
        break;
    }
    navigator.clipboard.writeText(postContent);
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
      const numeratorText = `${x + 1}/${numberOfPosts}`;
      let postContent = textAreas[x].value;
      switch (numerator) {
        case "top":
          postContent = numeratorText + "\n" + postContent;
          break;
        case "bottom":
          postContent = postContent + "\n" + numeratorText;
          break;
        case "manual":
          break;
      }

      allAreas += postContent;
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
