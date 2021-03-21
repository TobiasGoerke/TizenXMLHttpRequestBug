var setContent = function(content) {
	var outputDiv = document.getElementById('output');
	outputDiv.innerText = new Date() + ":\n" + content;
};

var refreshContent = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://ip.jsontest.com/", true);

    setContent("Loading...");
    
    xhr.onload = function () {
        if (this.status === 200) {
        	setContent("XHR success. Your IP is:\n" + JSON.parse(this.responseText)["ip"]);
        } else {
            setContent("Error: Status was " + this.status);
        }
    };

    xhr.onerror = function () {
    	// !!! When changing networks, onError gets called without a meaningful error description
    	// This is what this bug is about
    	// How to solve this?
    	setContent("Error: " + this.status + "/" + this.readyState + "/" + this.statusText + "/" + this.responseText);
    };
    
    xhr.send(null);
};

window.onload = function() {
    window.setInterval(refreshContent, 1000 * 10);
    
    refreshContent();
};
