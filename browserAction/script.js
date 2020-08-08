const domainMatcher = RegExp(
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
    "gu"
);

const reset = false;
if (reset) {
    browser.storage.sync.set({
        list: [],
    });
}

let domainErrors = "";
setDomainErrors();

function addToStorage(domain) {
    readDomains((storage) => {
        let list = storage.list;
        console.log("OLDLIST", list);
        if (list.includes(domain) === false) {
            list.push(domain);
        } else {
            domainErrors = "Domain already added!";
            return;
        }
        console.log("NEWLIST", list);
        browser.storage.sync.set({
            list: list,
        });
    });
}

function readDomains(func) {
    browser.storage.sync.get().then(func);
}

document
    .getElementById("addWebsiteSubmit")
    .addEventListener("click", onClickPrint);

function onClickPrint() {
    const value = document.getElementById("linkInput").value;
    const matches = domainMatcher.exec(value);
    if (matches !== null) {
        console.log("MATCHES", matches);
        addToStorage(matches[0]);
        setDomainErrors();
    } else {
        console.log("no matches for ", value);
    }
}

function setDomainErrors() {
    if (domainErrors && domainErrors.length > 0) {
        document.getElementById("errorCard").style.display = "";
        document.getElementById("errorText").textContent = domainErrors;
    } else {
        document.getElementById("errorCard").style.display = "none";
    }
}
