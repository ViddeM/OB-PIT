setInsult();

document.getElementById("reloadButton").addEventListener("click", setInsult);
document.getElementById("reloadButton").addEventListener("click", ani);

function ani() {
  var element = document.getElementById("reloadButton");
  element.animate(
    [
      // keyframes
      { transform: "rotate(0deg)" },
      { transform: "rotate(360deg)" },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
      easing: "ease-in-out",
    }
  );

  //element.classList.add("spinning");
}

function setInsult() {
  window
    .fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json")
    .then((response) => {
      response.json().then((json) => {
        console.log("RESPONSE", json);
        document.getElementById("insult").textContent = json.insult;
      });
    });
}
