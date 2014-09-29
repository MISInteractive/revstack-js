RevStack = {};

(function (window, undefined) {
    var root = this;
    
    /*
    ======================================================
    @Initialize API
    ======================================================
    */
    window.RevStack = root.RevStack = {
        DEFAULT_API_VERSION: '0.0.1',
        DEFAULT_API_HOST_URL: 'http://localhost:56415',
        DEFAULT_API_TOKEN: '',
        DEFAULT_ACCESS_TOKEN_KEY: 'revstack',
        apiVersion: '',
        appId: '',
        apiToken: '',
        accessTokenKey: '',
        apiHostUrl: '',
        apiUrl: '',
        dataType: '',
        base64: '',

        init: function (options) {
            options = options || {};
            this.apiVersion = options['apiVersion'] || this.DEFAULT_API_VERSION;
            this.apiHostUrl = options['apiHostUrl'] || this.DEFAULT_API_HOST_URL;
            this.apiToken = options['apiToken'] || this.DEFAULT_API_TOKEN;
            this.accessTokenKey = options['accessTokenKey'] || this.DEFAULT_ACCESS_TOKEN_KEY;
            this.appId = options['appId'];
            this.apiUrl = this.apiHostUrl + '/api';
            this.dataType = 'jsonp';
            var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
            this.base64 = Base64;
        }
    };

    RevStack.ApiService = {
        ajax: function (options, callback) {
            var key = RevStack.accessTokenKey;
            var serviceEndpoint = options['serviceEndpoint'];
            var type = options['type'];
            var data = options['data'];
            var sendAccessToken = options['sendAccessToken'];
            var sendAuthCredentials = options['sendAuthCredentials'];
            var storeAccessToken = options['storeAccessToken'];
            var token = options['token'];
            var un = options['un'];
            var pw = options['pw'];
            var contentType = options["contentType"];

            $.ajax({
                type: type,
                cache: false,
                url: serviceEndpoint,
                crossDomain: true,
                contentType: contentType,
                data: data,
                processData: false,
                beforeSend: function (xhr) {
                    if (sendAccessToken)
                        xhr.setRequestHeader('Authorization', RevStack.ApiService.getSessionTokenAuthenticationHeader(token.access_token));
                    if (sendAuthCredentials)
                        xhr.setRequestHeader('Authorization', RevStack.ApiService.createBasicAuthenticationHeader(un, pw));

                    xhr.setRequestHeader('X-R3VStack-API-Version', RevStack.apiVersion);
                },
                success: function (data, status, xhr) {
                    if (storeAccessToken)
                        localStorage.setItem(RevStack.accessTokenKey, JSON.stringify(data));
                        
                    callback(data, status, xhr);
                },
                error: function (error) {
                    if (error.status == 401) {
                        callback('Unauthorized');
                    }
                    else {
                        callback(error);
                    }
                }
            });
        },
        ajaxRequest: function (options, callback) {
            var requiresAccessToken = options['requiresAccessToken'];
            var key = RevStack.accessTokenKey;

            if (requiresAccessToken) {
                RevStack.ApiService.getLocalSessionToken(key, function (token) {
                    if (token == null) {
                        callback('No token available');
                        return;
                    };

                    var isExpired = RevStack.ApiService.isTokenExpired(token);

                    if (isExpired == true) {
                        callback('Token is expired!');
                    }
                    else {
                        options['token'] = token;
                        RevStack.ApiService.ajax(options, callback);
                    }
                });
            }
            else {
                this.ajax(options, callback);
            }
        },
        createBasicAuthenticationHeader: function (un, pw) {
            //var header = 'Basic ' + $.base64.encode(un + ":" + pw);
            var header = 'Basic ' + RevStack.base64.encode(un + ":" + pw);
            return header;
        },
        getSessionTokenAuthenticationHeader: function (token) {
            var header = 'Session ' + token;
            return header;
        },
        getLocalSessionToken: function (key, callback) {
            var data = localStorage.getItem(key);
            if (data != null)
            {
                callback(JSON.parse(localStorage.getItem(key)));
            }
            else 
            {
                callback(null);
            }
        },
        clearTokenCache: function (key) {
            localStorage.removeItem(key);
        },
        isTokenExpired: function (token) {
            var nowEpoch = Math.round(new Date().getTime() / 1000.0);
            return token.expires_in - nowEpoch < 0;
        }
    }

    /*
    ======================================================
    @Account API
    ======================================================
    */
    RevStack.Account = (function () {
        this.create = function (un, pw, callback) {
            var options = {};
            options['requiresAccessToken'] = false;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/?callback=?';
            options['type'] = "POST";
            options['data'] = null;
            options['sendAccessToken'] = false;
            options['sendAuthCredentials'] = true;
            options['storeAccessToken'] = false;
            options['un'] = un;
            options['pw'] = pw;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.login = function (un, pw, callback) {
            var options = {};
            options['requiresAccessToken'] = false;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/login?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = false;
            options['sendAuthCredentials'] = true;
            options['storeAccessToken'] = true;
            options['un'] = un;
            options['pw'] = pw;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.logout = function () {
            RevStack.ApiService.clearTokenCache(null);
        },
        this.getProfile = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/profile?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.changePassword = function (model, callback) {
            var data = JSON.stringify(model);

            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/change-password?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getById = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/' + id + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getAll = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/list?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.suspend = function (model, callback) {
            var data = JSON.stringify(model);

            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/suspend?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.activate = function (model, callback) {
            var data = JSON.stringify(model);

            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/activate?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroy = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/account/' + id + '?callback=?';
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        }
        return {
            create: create,
            login: login,
            logout: logout,
            getProfile: getProfile,
            changePassword: changePassword,
            getById: getById,
            getAll: getAll,
            suspend: suspend,
            activate: activate,
            destroy: destroy            
        };
    })();
    
    /*
    ======================================================
    @App API
    ======================================================
    */
    RevStack.App = (function () {
        this.create = function (model, callback) {
            var data = JSON.stringify(model);

            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/app/?callback=?';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.update = function (model, callback) {
            var data = JSON.stringify(model);

            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/app/?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getById = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/app/' + id + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getAll = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/app/list?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroy = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/app/' + id + '?callback=?';
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        }
        return {
            create: create,
            update: update,
            getById: getById,
            getAll: getAll,
            destroy: destroy
        };
    })();

    /*
    ======================================================
    @Datastore API
    ======================================================
    */
    RevStack.Datastore = (function () {
        
        this.getAll = function (className, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/_class/' + className;
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getByRid = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/' + id;
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getById = function (className, id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/' + className + '/' + id;
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.lookup = function (options, callback) {
            var url = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/lookup?';
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
        },
        this.query = function (query, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/sql/' + escape(encodeURIComponent(query));
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.command = function (sql, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/command/' + escape(encodeURIComponent(sql));
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.createSchema = function (data, callback) {
            var options = {};
            data = JSON.stringify(data);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/schema';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.updateSchema = function (data, callback) {
            var options = {};
            data = JSON.stringify(data);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/schema';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getSchema = function (className, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/schema/' + className;
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroySchema = function (className, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/schema/' + className;
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.create = function (data, callback) {
            var options = {};
            data = JSON.stringify(data);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.update = function (data, callback) {
            var options = {};
            data = JSON.stringify(data);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroy = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/datastore/' + id;
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        }

        return {
            lookup: lookup,
            query: query,
            command: command,
            createSchema: createSchema,
            updateSchema: updateSchema,
            getSchema: getSchema,
            destroySchema: destroySchema,
            create: create,
            update: update,
            getByRid: getByRid,
            getById: getById,
            getAll: getAll,
            destroy: destroy
        };
    })();

    /*
    ======================================================
    @User Management API
    ======================================================
    */
    RevStack.UserManagement = (function () {
        this.getAll = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.get = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/' + encodeURI(id) + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.create = function (data, callback) {
            var options = {};
            data = JSON.stringify(model);
            options['requiresAccessToken'] = false;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/?callback=?';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = false;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.update = function (id, data, callback) {
            var options = {};
            data = JSON.stringify(model);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.resetPassword = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/reset-password/' + encodeURI(id) + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.addUserToRole = function (id, role, callback) {
            var userRole = { 'name': id, 'role': role }
            var data = JSON.stringify(userRole);
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/add-user-to-role?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.removeUserFromRole = function (id, role, callback) {
            var userRole = { 'name': id, 'role': role }
            var data = JSON.stringify(userRole);
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/remove-user-from-role?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroy = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/membership/' + encodeURI(id) + '?callback=?';
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        }

        return {
            getAll: getAll,
            get: get,
            create: create,
            update: update,
            resetPassword: resetPassword,
            addUserToRole: addUserToRole,
            removeUserFromRole: removeUserFromRole,
            destroy: destroy
        };
    })();

    /*
    ======================================================
    @Role API
    ======================================================
    */
    RevStack.Role = (function () {
        this.getAll = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/role/?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.get = function (roleName, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/role/' + roleName + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getUsersInRole = function (roleName, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/role/users/' + roleName + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.create = function (role, callback) {
            var options = {};
            var data = JSON.stringify(role);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/role/?callback=?';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.update = function (role, callback) {
            var options = {};
            var data = JSON.stringify(role);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/role/?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroy = function (roleName, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/role/' + roleName + '?callback=?';
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        }

        return {
            getAll: getAll,
            get: get,
            getUsersInRole: getUsersInRole,
            create: create,
            update: update,
            destroy: destroy
        };
    })();

    /*
    ======================================================
    @User API
    ======================================================
    */
    RevStack.User = (function () {
        this.login = function (un, pw, callback) {
            var options = {};
            options['requiresAccessToken'] = false;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/user/login?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = false;
            options['sendAuthCredentials'] = true;
            options['storeAccessToken'] = true;
            options['un'] = un;
            options['pw'] = pw;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getAccessToken = function (callback) {
            var data = localStorage.getItem(RevStack.accessTokenKey);
            if (data != null) {
                callback(JSON.parse(data));
            }
            else
            {
                callback();
            }
        },
        this.logout = function () {
            localStorage.removeItem(RevStack.accessTokenKey);
        },
        this.getProfile = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/user/?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.destroy = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/user/?callback=?';
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.update = function (data, callback) {
            data = JSON.stringify(data);
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/user/?callback=?';
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.resetPassword = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/user/reset-password?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.changePassword = function (oldPassword, newPassword, callback) {
            var upBit = $.base64.encode(oldPassword + ":" + newPassword);
            var serviceEndpoint = RevStack.apiUrl + '/' + RevStack.appId + '/user/change-password/' + upBit + '?callback=?';

            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = serviceEndpoint
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        },
        this.getRoles = function (callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/user/roles?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "text/javascript";

            RevStack.ApiService.ajaxRequest(options, callback);
        };

        return {
            login: login,
            getAccessToken: getAccessToken,
            logout: logout,
            getProfile: getProfile,
            destroy: destroy,
            update: update,
            resetPassword: resetPassword,
            changePassword: changePassword,
            getRoles: getRoles
        };
    })();

    /*
    ======================================================
    @Logger API
    ======================================================
    */
    RevStack.Logger = (function () {
        
        this.info = function (entry) {
            return this.log(entry, "info", null)
        };

        this.warn = function (entry) {
            return this.log(entry, "warn", null)
        };

        this.fatal = function (entry) {
            return this.log(entry, "fatal", null)
        };

        this.error = function (entry) {
            return this.log(entry, "error", null)
        };

        this.get = function (id, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/log/' + id + '?callback=?';
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
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/log/' + id + '?callback=?';
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        };

        this.query = function (query, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/log/query/command/' + encodeURI(query) + '/-1' + '?callback=?';
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;

            RevStack.ApiService.ajaxRequest(options, callback);
        };

        log = function (entry, loglevel, callback) {
            var d = { "message": entry, "loglevel": loglevel };
            var options = {};
            var data = JSON.stringify(d);
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/log/?callback=?';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        }

        return {
            get: get,
            query: query,
            info: info,
            warn: warn,
            error: error,
            fatal: fatal,
            destroy: destroy
        };
    })();

    /*
    ======================================================
    @Messaging API
    ======================================================
    */
    RevStack.Messaging = {};
    RevStack.Messaging.Email = (function () {
        
        this.sendEmail = function (message, callback) {
            var options = {};
            var data = JSON.stringify(message);
            options['requiresAccessToken'] = false;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/messaging/send-email';
            options['type'] = "POST";
            options['data'] = data;
            options['sendAccessToken'] = false;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = "application/json";

            RevStack.ApiService.ajaxRequest(options, callback);
        };

        return {
            sendEmail: sendEmail
        };
    })();

    /*
    ======================================================
    @File API
    ======================================================
    */
    RevStack.File = (function () {
        this.upload = function (data, path, callback) {
            var options = {};
            options['requiresAccessToken'] = false;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/file/' + path;
            options['type'] = "PUT";
            options['data'] = data;
            options['sendAccessToken'] = false;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            options['contentType'] = false;
            RevStack.ApiService.ajaxRequest(options, callback);
        };
        this.get = function (path, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/file/' + path;
            options['type'] = "GET";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            RevStack.ApiService.ajaxRequest(options, callback);
        };
        this.destroy = function (path, callback) {
            var options = {};
            options['requiresAccessToken'] = true;
            options['serviceEndpoint'] = RevStack.apiUrl + '/' + RevStack.appId + '/file/' + path;
            options['type'] = "DELETE";
            options['data'] = null;
            options['sendAccessToken'] = true;
            options['sendAuthCredentials'] = false;
            options['storeAccessToken'] = false;
            RevStack.ApiService.ajaxRequest(options, callback);
        };
        return {
            upload: upload,
            get: get,
            destroy: destroy
        };
    })();

})(this)


