let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "secs:";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //console.log(methodType + " state changed called at: " + showTime() + "RS: " + xhr.readyState + " status:" + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client Error or 500 Server Error at: " + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server at: " + showTime());
}

const getURL = "http://127.0.0.1:3000/employee/";

function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to server at: " + showTime());

const deleteURL = "http://127.0.0.1:3000/employee/4";

function userDeleted(data) {
    console.log("User Deleted at: " + showTime() + " data: " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX Call to server at: " + showTime());

const postURL = "http://127.0.0.1:3000/employee";
const emplData = { "name": "Harry", "salary": "5000" };

function userAdded(data) {
    console.log("User Added at: " + showTime() + " data: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX Call to server at: " + showTime());