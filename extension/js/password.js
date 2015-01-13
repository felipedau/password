function ensureStringContainsANumber(s) {
    if (!s.match(/\d+/)) {
        // Convert the last char to an int from 0 to 9
        s = s.slice(0, -1) + (s.slice(-1).toUpperCase().charCodeAt(0) % 10);
    }
    return s;
}

function generate(domain, password, length) {
    // Default length
    if (!length) {
        length = 10;
    }

    // Generate the key
    var secret = CryptoJS.PBKDF2(password, domain, { keySize: 512/32, iterations: 100 });

    // Encode it to Base62 and slice it
    var ans = window.btoa(secret).replace(/[+/]/g, '').slice(0, length);

    return ensureStringContainsANumber(ans);
}

function startGeneration() {
    var domain = document.getElementById('txtDomain').value;
    var password = document.getElementById('txtPassword').value;
    var length = parseInt(document.getElementById('txtLength').value, 10);

    document.getElementById('txtResult').value = generate(domain, password, length);

    // Copy to clipboard
    document.getElementById('txtResult').select();
    document.execCommand('Copy', false, null);
}

function getDomain() {
    chrome.tabs.getSelected(null, function (tab) {
        var domain = new URL(tab.url).hostname;
        if (domain) {
            document.getElementById('txtDomain').value = domain.replace(/^www\d*\./i, '');
        }
        document.getElementById('txtPassword').focus();
    });
}

window.onload = function () {
    document.getElementById('btnGenerate').onclick = startGeneration;
    getDomain();

    // Bind enter key press in the password field
    $('#txtPassword').keypress(function(e) {
        if(e.keyCode == 13) {
            startGeneration();
        }
    });
};