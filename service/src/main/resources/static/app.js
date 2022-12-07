var stompClient = null;

function setConnectedWithSockJS(connected) {
    $("#connectWithSockJS").prop("disabled", connected);
    $("#disconnectWithSockJS").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function setConnectedWithWebSockets(connected) {
    $("#connectWithWebSockets").prop("disabled", connected);
    $("#disconnectWithWebSockets").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function generatePath(originalPath) {
    var pathName = window.location.pathname;
    var path = pathName.substring(0, pathName.lastIndexOf("/"));

    return (path == '/' ? originalPath : path + originalPath);
}

function connectWithSockJS() {
    var socket = new SockJS('http://localhost/apim/demo/wsService/notifications/sockjs');

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnectedWithSockJS(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe(generatePath('/topic/messages'), function (message) {
            showMessage(message.body, "message");
        });
    });
}

function connectWithWebSockets() {
    var socket = new WebSocket("ws://localhost/apim/demo/wsService/notifications/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnectedWithWebSockets(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe(generatePath('/topic/messages'), function (message) {
            showMessage(message.body, "message");
        });
    });
}

function disconnectWithSockJS() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnectedWithSockJS(false);
    console.log("Disconnected");
}

function disconnectWithWebSockets() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnectedWithWebSockets(false);
    console.log("Disconnected");
}

function showMessage(message, id) {
    $("#" + id).append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("#sockJSForm").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connectWithSockJS" ).click(function() { connectWithSockJS(); });
    $( "#disconnectWithSockJS" ).click(function() { disconnectWithSockJS(); });
});

$(function () {
    $("#webSocketForm").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connectWithWebSockets" ).click(function() { connectWithWebSockets(); });
    $( "#disconnectWithWebSockets" ).click(function() { disconnectWithWebSockets(); });
});