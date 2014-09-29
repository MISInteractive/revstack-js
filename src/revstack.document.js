RevStack.Document = {};
RevStack.Document.MailMerge = {};
RevStack.Document.MailMerge = (function () {
    this.upload = function (data, callback) {
        var options = {};
        options['requiresAccessToken'] = false;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/document/mail-merge';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = false;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };
    return {
        upload: upload
    };
})();