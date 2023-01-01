const textAreaElement = document.querySelector("#message");
const characterCounterElement = document.querySelector("#character-counter");
const typedCharactersElement = document.querySelector("#typed-characters");
const maximumCharacters = 500;

const copyButton1 = document.querySelector("#copyM1");

copyButton1.addEventListener("click", event => {
  navigator.clipboard.writeText(textAreaElement.value);
});

function countCharacters() {
  let typedCharacters = 0;

  const foundLinks = textAreaElement.value.match(/http.+?\s/g);

  const messageNoLinks = textAreaElement.value.replace(/http.+?\s/g, " ");
  let linkCharacterTotal = 0;
  if (foundLinks) {
    linkCharacterTotal = 23 * foundLinks.length;
  }
  typedCharacters = messageNoLinks.length + linkCharacterTotal;

  /*Display the number of characters typed.   */
  typedCharactersElement.textContent = maximumCharacters - typedCharacters;

  /*Change the character counter text colour to "orange" if the typed
   * characters number is between 200 to 250. If more, then change the colour to "red".*/
  if (typedCharacters > maximumCharacters) {
    characterCounterElement.classList.add("text-danger");
  } else {
    characterCounterElement.classList.remove("text-danger");
  }

  if (typedCharacters > maximumCharacters) {
    textAreaElement.classList.add("warning");
  } else {
    textAreaElement.classList.remove("warning");
  }
}

countCharacters();

textAreaElement.addEventListener("input", event => {
  countCharacters();
});
