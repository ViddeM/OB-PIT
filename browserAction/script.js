const domainMatcher = RegExp(
  /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/,
  "gu"
);

const reset = false;
if (reset) {
  browser.storage.sync.set({
    list: [],
  });
}

function addToStorage(domain) {
  readDomains((storage) => {
    let list = storage.list;
    console.log("OLDLIST", list);
    if (list.includes(domain) === false) {
      list.push(domain);
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
  } else {
    console.log("no matches for ", value);
  }
}
