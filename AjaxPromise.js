let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "secs:";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(methodType + " state changed called at: " + showTime() + "RS: " + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 client error or 500 server error: " + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server at: " + showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employee/5";

makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " + showTime() + " data: " + responseText);
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made GET AJAX Call to server at: " + showTime());

const deleteURL = "http://localhost:3000/employee/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));


const postURL = "http://localhost:3000/employee";
const empData = { "name": "Harry", "salary": "200000" };
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added at: " + responseText)
    })
    .catch(error => console.log("POST error Status: " + JSON.stringify(error)));