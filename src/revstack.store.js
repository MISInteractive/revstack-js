RevStack.Store = (function () {
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.destroy = function (callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/';
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        destroy: destroy
    };
})();

RevStack.Store.Brand = (function () {      
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/brand';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/brand';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/brand/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/brand/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/brand/' + id;
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Catalog = (function () {  
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/catalog/?callback=?';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/catalog/?callback=?';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/catalog/' + id + '?callback=?';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/catalog/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/catalog/' + id + '?callback=?';
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Category = (function () { 
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/category';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/category';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/category/' + id + '?';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/category/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/category/' + id;
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Customer = (function () {    
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/customer/?callback=?';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/customer/?callback=?';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/customer/' + id + '?callback=?';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/customer/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/customer/' + id + '?callback=?';
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();


RevStack.Store.Shipping = {
    init: function () { }
};

RevStack.Store.Shipping.Method = (function () {  
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/shipping/method/?callback=?';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/shipping/method/?callback=?';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/shipping/method/' + id + '?callback=?';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/shipping/method/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/shipping/method/' + id + '?callback=?';
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Product = (function () { 
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/?callback=?';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/?callback=?';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/' + id + '?callback=?';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/' + id + '?callback=?';
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Product.Sku = (function () {    
    this.create = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/sku/?callback=?';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (data, callback) {
        var options = {};
        data = JSON.stringify(data);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/sku/?callback=?';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/sku/' + id + '?callback=?';
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/sku/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/product/sku/' + id + '?callback=?';
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;

        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Discount = (function () {
    this.create = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/discount';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/discount';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/discount/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/discount/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/discount/' + id;
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();

RevStack.Store.Cart = (function () {
    this.create = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/cart';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/cart';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/cart/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/cart/lookup?';
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
        create: create,
        update: update,
        get: get,
        lookup: lookup
    };
})();

RevStack.Store.Transaction = (function () {
    this.create = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/transaction';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/transaction';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/transaction/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/transaction/lookup?';
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
        create: create,
        update: update,
        get: get,
        lookup: lookup
    };
})();

RevStack.Store.Order = (function () {
    this.create = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/order?fetch=*:-1';
        options['type'] = "POST";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.update = function (model, callback) {
        var options = {};
        var data = JSON.stringify(model);
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/order?fetch=*:-1';
        options['type'] = "PUT";
        options['data'] = data;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        options['contentType'] = "application/json";
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.get = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/order/' + id;
        options['type'] = "GET";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    this.lookup = function (options, callback) {
        var url = RevStack.apiUrl + '/' + RevStack.appId + '/store/order/lookup?';
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

    this.destroy = function (id, callback) {
        var options = {};
        options['requiresAccessToken'] = true;
        options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/store/order/' + id;
        options['type'] = "DELETE";
        options['data'] = null;
        options['sendAccessToken'] = true;
        options['sendAuthCredentials'] = false;
        options['storeAccessToken'] = false;
        RevStack.ApiService.ajaxRequest(options, callback);
    };

    return {
        create: create,
        update: update,
        get: get,
        lookup: lookup,
        destroy: destroy
    };
})();
