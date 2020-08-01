setInsult();

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
