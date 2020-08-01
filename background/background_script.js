function readDomains(func) {
    browser.storage.sync.get().then(func);
}

init();

function init() {
    const reset = false;
    if (reset) {
        browser.storage.sync.clear();
        browser.tabs.onUpdated.removeListener(onPageChange);
    }

    console.log("Opening OB-PIT addon");
    const storage = browser.storage.sync.get();

    if (browser.tabs.onUpdated.hasListener(onPageChange) === false) {
        console.log("DID NOT HAVE LISTENER");
        browser.tabs.onUpdated.addListener(onPageChange);
    }

    storage.then((response) => {
        console.log("STORAGE", response);
        if (response.list === undefined) {
            browser.storage.sync.set({
                list: [],
            });
        }
    });
}

function onPageChange(id, changed) {
    if (changed.url === undefined) {
        return;
    }

    console.log("TAB " + id + " UPDATED!");

    const data = browser.tabs.get(id);
    data.then((page) => {
        console.log("NEWPAGE?", page);
        readDomains((stor) => {
            const links = stor.list;
            let found = false;
            links.forEach((link) => {
                if (page.url.includes(link)) {
                    console.log("FECKAFF");
                    found = true;
                }
            });

            if (found) {
                browser.tabs.remove(id);
                browser.tabs.create({
                    active: true,
                    url: "./insult/insult.html",
                });
            }
        });
    });
}
