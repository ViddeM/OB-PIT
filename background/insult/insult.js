setInsult();

document.getElementById("reloadButton").addEventListener("click", setInsult);
document.getElementById("reloadButton").addEventListener("click", ani);

function ani() {
  console.log("ANIMATION");
  document.getElementById("reloadButton").className = "spinning";
}

function setInsult() {
  console.log("Händer något??");
  window
    .fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json")
    .then((response) => {
      response.json().then((json) => {
        console.log("RESPONSE", json);
        document.getElementById("insult").textContent = json.insult;
      });
    });
}
