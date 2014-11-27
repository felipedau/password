function generatePassword() {
    $.ajax({
        url: 'http://127.0.0.1:5000/generatePassword',
        data: $('form').serialize(),
        type: 'POST',
        success: function (response) {
            document.getElementById('txtResult').value = response;

            // copy to clipboard
            document.getElementById('txtResult').select();
            document.execCommand('Copy', false, null);
        },
        error: function (error) {
            console.log(error);
        }
    });
};

function getDomain() {
    chrome.tabs.getSelected(null, function (tab) {
        var domain = new URL(tab.url).hostname;
        if (domain) {
            document.getElementById('txtDomain').value = domain;
            document.getElementById('txtPassword').focus();
        }
    });
}

window.onload = function () {
    document.getElementById('btnGenerate').onclick = generatePassword;
    getDomain();
};