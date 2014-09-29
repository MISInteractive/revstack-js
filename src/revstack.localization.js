RevStack.Localization = {};
RevStack.Localization.Continent = (function () {
    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/localization/continent/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };
    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/localization/continent/lookup?';
        for (name in options) {
            if (options.hasOwnProperty(name)) {
                var value = options[name];
                url = url + '&' + name + '=' + value;
            }
        }
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = url;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        get: get,
        lookup: lookup
    };
})();

RevStack.Localization.Country = (function () {
    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/localization/country/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };
    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/localization/country/lookup?';
        for (name in options) {
            if (options.hasOwnProperty(name)) {
                var value = options[name];
                url = url + '&' + name + '=' + value;
            }
        }
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = url;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        get: get,
        lookup: lookup
    };
})();

RevStack.Localization.Culture = (function () {
    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/localization/culture/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };
    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/localization/culture/lookup?';
        for (name in options) {
            if (options.hasOwnProperty(name)) {
                var value = options[name];
                url = url + '&' + name + '=' + value;
            }
        }
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = url;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        get: get,
        lookup: lookup
    };
})();

RevStack.Localization.Currency = (function () {
    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/localization/currency/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };
    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/localization/currency/lookup?';
        for (name in options) {
            if (options.hasOwnProperty(name)) {
                var value = options[name];
                url = url + '&' + name + '=' + value;
            }
        }
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = url;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        get: get,
        lookup: lookup
    };
})();

RevStack.Localization.Language = (function () {
    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/localization/language/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };
    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/localization/language/lookup?';
        for (name in options) {
            if (options.hasOwnProperty(name)) {
                var value = options[name];
                url = url + '&' + name + '=' + value;
            }
        }
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = url;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        get: get,
        lookup: lookup
    };
})();

