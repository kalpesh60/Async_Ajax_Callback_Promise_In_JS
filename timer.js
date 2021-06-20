function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "secs:";
}

function showSessionExpire() {
    console.log("Activity-B: Your session expired at " + showTime());
}

console.log("Activity-A: Trigerring Activity-B at " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity-A: Triggered Activity-B at " + showTime() + "will execute after 5 seconds");

//Output:
// Activity-A: Trigerring Activity-B at 17Hrs:9Mins:22secs:
// Activity-A: Triggered Activity-B at 17Hrs:9Mins:22secs:will execute after 5 seconds
// Activity-B: Your session expired at 17Hrs:9Mins:27secs: