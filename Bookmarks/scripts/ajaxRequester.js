'use strict';

var ajaxRequester = (function () {
    var baseURL = "https://api.parse.com/1/";

    var headers =
    {
      "X-Parse-Application-Id": "03mRKc39ob67ffPSrnVHmv1z9C7Ib8uSdMzG9y71",
        "X-Parse-REST-API-Key": "Yzhp9oQVAxOg9v1oTcuTCLChFjWE0EQg4zH6ln15"
    };

    function login(username, password, success, error){
        jQuery.ajax({
            method: "GET",
            headers: headers,
            url: baseURL + "login",
            data: {username: username, password: password},
            success: success,
            error: error
        });
    }

    function register(username, password, success, error){
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseURL + "users",
            data: JSON.stringify({username: username, password: password}),
            success: success,
            error: error
        });
    }

    function getHeadersWithSessionToken(sessionToken){
        var headersWithTokens = JSON.parse(JSON.stringify(headers));
        headersWithTokens['X-Parse-Session-Token'] = sessionToken;
        return headersWithTokens;
    }

    function getBookmarks(sessionToken, success, error){
        var headersWithTokens = getHeadersWithSessionToken(sessionToken);
        jQuery.ajax({
            method: "GET",
            headers: headersWithTokens,
            url: baseURL + "classes/Bookmark",
            success: success,
            error: error
        });
    }

    function createBookmark(title, url, userId, success, error){
        var bookmark = {title: title, url: url, ACL : {}};
        bookmark.ACL[userId] = {"write":true, "read": true};
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseURL + "classes/Bookmark/",
            data: JSON.stringify(bookmark),
            success: success,
            error: error
        });
    }

    function deleteBookmark(sessionToken, bookmarkId, success, error){
        var headersWithTokens = getHeadersWithSessionToken(sessionToken);
        jQuery.ajax({
            method: "DELETE",
            headers: headersWithTokens,
            url: baseURL + "classes/Bookmark/" + bookmarkId,
            success: success,
            error: error
        });
    }

    return {
        login: login,
        register: register,
        getBookmarks: getBookmarks,
        createBookmark: createBookmark,
        deleteBookmark: deleteBookmark
    };

})();