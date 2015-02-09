(function () {
    var COMPILED = !0, goog = goog || {};
    goog.global = this;
    goog.DEBUG = !0;
    goog.LOCALE = "en";
    goog.provide = function (a) {
        if (!COMPILED) {
            if (goog.isProvided_(a))throw Error('Namespace "' + a + '" already declared.');
            delete goog.implicitNamespaces_[a];
            for (var b = a; (b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);)goog.implicitNamespaces_[b] = !0
        }
        goog.exportPath_(a)
    };
    goog.setTestOnly = function (a) {
        if (COMPILED && !goog.DEBUG)throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
    };
    COMPILED || (goog.isProvided_ = function (a) {
        return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
    }, goog.implicitNamespaces_ = {});
    goog.exportPath_ = function (a, b, c) {
        a = a.split(".");
        c = c || goog.global;
        !(a[0]in c) && c.execScript && c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());)!a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
    };
    goog.getObjectByName = function (a, b) {
        for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)if (goog.isDefAndNotNull(d[e]))d = d[e]; else return null;
        return d
    };
    goog.globalize = function (a, b) {
        var c = b || goog.global, d;
        for (d in a)c[d] = a[d]
    };
    goog.addDependency = function (a, b, c) {
        if (!COMPILED) {
            for (var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0; d = b[f]; f++) {
                e.nameToPath[d] = a;
                a in e.pathToNames || (e.pathToNames[a] = {});
                e.pathToNames[a][d] = true
            }
            for (d = 0; b = c[d]; d++) {
                a in e.requires || (e.requires[a] = {});
                e.requires[a][b] = true
            }
        }
    };
    goog.ENABLE_DEBUG_LOADER = !0;
    goog.require = function (a) {
        if (!COMPILED && !goog.isProvided_(a)) {
            if (goog.ENABLE_DEBUG_LOADER) {
                var b = goog.getPathFromDeps_(a);
                if (b) {
                    goog.included_[b] = true;
                    goog.writeScripts_();
                    return
                }
            }
            a = "goog.require could not find: " + a;
            goog.global.console && goog.global.console.error(a);
            throw Error(a);
        }
    };
    goog.basePath = "";
    goog.nullFunction = function () {
    };
    goog.identityFunction = function (a) {
        return a
    };
    goog.abstractMethod = function () {
        throw Error("unimplemented abstract method");
    };
    goog.addSingletonGetter = function (a) {
        a.getInstance = function () {
            if (a.instance_)return a.instance_;
            goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
            return a.instance_ = new a
        }
    };
    goog.instantiatedSingletons_ = [];
    !COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames: {}, nameToPath: {}, requires: {}, visited: {}, written: {}}, goog.inHtmlDocument_ = function () {
        var a = goog.global.document;
        return typeof a != "undefined" && "write"in a
    }, goog.findBasePath_ = function () {
        if (goog.global.CLOSURE_BASE_PATH)goog.basePath = goog.global.CLOSURE_BASE_PATH; else if (goog.inHtmlDocument_())for (var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1; b >= 0; --b) {
            var c = a[b].src, d = c.lastIndexOf("?"),
                d = d == -1 ? c.length : d;
            if (c.substr(d - 7, 7) == "base.js") {
                goog.basePath = c.substr(0, d - 7);
                break
            }
        }
    }, goog.importScript_ = function (a) {
        var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
        !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = true)
    }, goog.writeScriptTag_ = function (a) {
        if (goog.inHtmlDocument_()) {
            goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>');
            return true
        }
        return false
    }, goog.writeScripts_ = function () {
        function a(e) {
            if (!(e in d.written)) {
                if (!(e in
                    d.visited)) {
                    d.visited[e] = true;
                    if (e in d.requires)for (var g in d.requires[e])if (!goog.isProvided_(g))if (g in d.nameToPath)a(d.nameToPath[g]); else throw Error("Undefined nameToPath for " + g);
                }
                if (!(e in c)) {
                    c[e] = true;
                    b.push(e)
                }
            }
        }

        var b = [], c = {}, d = goog.dependencies_, e;
        for (e in goog.included_)d.written[e] || a(e);
        for (e = 0; e < b.length; e++)if (b[e])goog.importScript_(goog.basePath + b[e]); else throw Error("Undefined script input");
    }, goog.getPathFromDeps_ = function (a) {
        return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] :
            null
    }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
    goog.typeOf = function (a) {
        var b = typeof a;
        if (b == "object")if (a) {
            if (a instanceof Array)return"array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if (c == "[object Window]")return"object";
            if (c == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice"))return"array";
            if (c == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call"))return"function"
        } else return"null";
        else if (b == "function" && typeof a.call == "undefined")return"object";
        return b
    };
    goog.isDef = function (a) {
        return a !== void 0
    };
    goog.isNull = function (a) {
        return a === null
    };
    goog.isDefAndNotNull = function (a) {
        return a != null
    };
    goog.isArray = function (a) {
        return goog.typeOf(a) == "array"
    };
    goog.isArrayLike = function (a) {
        var b = goog.typeOf(a);
        return b == "array" || b == "object" && typeof a.length == "number"
    };
    goog.isDateLike = function (a) {
        return goog.isObject(a) && typeof a.getFullYear == "function"
    };
    goog.isString = function (a) {
        return typeof a == "string"
    };
    goog.isBoolean = function (a) {
        return typeof a == "boolean"
    };
    goog.isNumber = function (a) {
        return typeof a == "number"
    };
    goog.isFunction = function (a) {
        return goog.typeOf(a) == "function"
    };
    goog.isObject = function (a) {
        var b = typeof a;
        return b == "object" && a != null || b == "function"
    };
    goog.getUid = function (a) {
        return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
    };
    goog.removeUid = function (a) {
        "removeAttribute"in a && a.removeAttribute(goog.UID_PROPERTY_);
        try {
            delete a[goog.UID_PROPERTY_]
        } catch (b) {
        }
    };
    goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
    goog.uidCounter_ = 0;
    goog.getHashCode = goog.getUid;
    goog.removeHashCode = goog.removeUid;
    goog.cloneObject = function (a) {
        var b = goog.typeOf(a);
        if (b == "object" || b == "array") {
            if (a.clone)return a.clone();
            var b = b == "array" ? [] : {}, c;
            for (c in a)b[c] = goog.cloneObject(a[c]);
            return b
        }
        return a
    };
    goog.bindNative_ = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    };
    goog.bindJs_ = function (a, b, c) {
        if (!a)throw Error();
        if (arguments.length > 2) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    };
    goog.bind = function (a, b, c) {
        goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
        return goog.bind.apply(null, arguments)
    };
    goog.partial = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b)
        }
    };
    goog.mixin = function (a, b) {
        for (var c in b)a[c] = b[c]
    };
    goog.now = Date.now || function () {
        return+new Date
    };
    goog.globalEval = function (a) {
        if (goog.global.execScript)goog.global.execScript(a, "JavaScript"); else if (goog.global.eval) {
            if (goog.evalWorksForGlobals_ == null) {
                goog.global.eval("var _et_ = 1;");
                if (typeof goog.global._et_ != "undefined") {
                    delete goog.global._et_;
                    goog.evalWorksForGlobals_ = true
                } else goog.evalWorksForGlobals_ = false
            }
            if (goog.evalWorksForGlobals_)goog.global.eval(a); else {
                var b = goog.global.document, c = b.createElement("script");
                c.type = "text/javascript";
                c.defer = false;
                c.appendChild(b.createTextNode(a));
                b.body.appendChild(c);
                b.body.removeChild(c)
            }
        } else throw Error("goog.globalEval not available");
    };
    goog.evalWorksForGlobals_ = null;
    goog.getCssName = function (a, b) {
        var c = function (a) {
            return goog.cssNameMapping_[a] || a
        }, d = function (a) {
            for (var a = a.split("-"), b = [], d = 0; d < a.length; d++)b.push(c(a[d]));
            return b.join("-")
        }, d = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? c : d : function (a) {
            return a
        };
        return b ? a + "-" + d(b) : d(a)
    };
    goog.setCssNameMapping = function (a, b) {
        goog.cssNameMapping_ = a;
        goog.cssNameMappingStyle_ = b
    };
    !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
    goog.getMsg = function (a, b) {
        var c = b || {}, d;
        for (d in c)var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e);
        return a
    };
    goog.exportSymbol = function (a, b, c) {
        goog.exportPath_(a, b, c)
    };
    goog.exportProperty = function (a, b, c) {
        a[b] = c
    };
    goog.inherits = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.superClass_ = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    };
    goog.base = function (a, b, c) {
        var d = arguments.callee.caller;
        if (d.superClass_)return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
        for (var e = Array.prototype.slice.call(arguments, 2), f = false, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor)if (g.prototype[b] === d)f = true; else if (f)return g.prototype[b].apply(a, e);
        if (a[b] === d)return a.constructor.prototype[b].apply(a, e);
        throw Error("goog.base called from a method of one name to a method of a different name");
    };
    goog.scope = function (a) {
        a.call(goog.global)
    };
    var fb = {util: {}};
    fb.util.validation = {};
    fb.util.validation.validateArgCount = function (a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        if (e)throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    };
    fb.util.validation.errorPrefix_ = function (a, b, c) {
        var d = "";
        switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                fb.core.util.validation.assert(!1, "errorPrefix_ called with argumentNumber > 4.  Need to update it?")
        }
        return a + " failed: " + (d + " argument ")
    };
    fb.util.validation.validateNamespace = function (a, b, c, d) {
        if ((!d || goog.isDef(c)) && !goog.isString(c))throw Error(fb.util.validation.errorPrefix_(a, b, d) + "must be a valid firebase namespace.");
    };
    fb.util.validation.validateCallback = function (a, b, c, d) {
        if ((!d || goog.isDef(c)) && !goog.isFunction(c))throw Error(fb.util.validation.errorPrefix_(a, b, d) + "must be a valid function.");
    };
    fb.util.validation.validateString = function (a, b, c, d) {
        if ((!d || goog.isDef(c)) && !goog.isString(c))throw Error(fb.util.validation.errorPrefix_(a, b, d) + "must be a valid string.");
    };
    fb.util.validation.validateContextObject = function (a, b, c, d) {
        if (!d || goog.isDef(c))if (!goog.isObject(c) || null === c)throw Error(fb.util.validation.errorPrefix_(a, b, d) + "must be a valid context object.");
    };
    fb.simplelogin = {};
    fb.simplelogin.persona = {};
    fb.simplelogin.persona.login = function (a) {
        navigator.id.watch({onlogin: function (b) {
            a(b)
        }, onlogout: function () {
        }});
        navigator.id.request({oncancel: function () {
            a(null)
        }})
    };
    fb.constants = {};
    var NODE_CLIENT = !1;
    goog.json = {};
    goog.json.isValid_ = function (a) {
        return/^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    };
    goog.json.parse = function (a) {
        a = String(a);
        if (goog.json.isValid_(a))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    };
    goog.json.unsafeParse = function (a) {
        return eval("(" + a + ")")
    };
    goog.json.serialize = function (a, b) {
        return(new goog.json.Serializer(b)).serialize(a)
    };
    goog.json.Serializer = function (a) {
        this.replacer_ = a
    };
    goog.json.Serializer.prototype.serialize = function (a) {
        var b = [];
        this.serialize_(a, b);
        return b.join("")
    };
    goog.json.Serializer.prototype.serialize_ = function (a, b) {
        switch (typeof a) {
            case "string":
                this.serializeString_(a, b);
                break;
            case "number":
                this.serializeNumber_(a, b);
                break;
            case "boolean":
                b.push(a);
                break;
            case "undefined":
                b.push("null");
                break;
            case "object":
                if (null == a) {
                    b.push("null");
                    break
                }
                if (goog.isArray(a)) {
                    this.serializeArray(a, b);
                    break
                }
                this.serializeObject_(a, b);
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof a);
        }
    };
    goog.json.Serializer.charToJsonCharCache_ = {'"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b"};
    goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    goog.json.Serializer.prototype.serializeString_ = function (a, b) {
        b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function (a) {
            if (a in goog.json.Serializer.charToJsonCharCache_)return goog.json.Serializer.charToJsonCharCache_[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return goog.json.Serializer.charToJsonCharCache_[a] = e + b.toString(16)
        }), '"')
    };
    goog.json.Serializer.prototype.serializeNumber_ = function (a, b) {
        b.push(isFinite(a) && !isNaN(a) ? a : "null")
    };
    goog.json.Serializer.prototype.serializeArray = function (a, b) {
        var c = a.length;
        b.push("[");
        for (var d = "", e = 0; e < c; e++)b.push(d), d = a[e], this.serialize_(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b), d = ",";
        b.push("]")
    };
    goog.json.Serializer.prototype.serializeObject_ = function (a, b) {
        b.push("{");
        var c = "", d;
        for (d in a)if (Object.prototype.hasOwnProperty.call(a, d)) {
            var e = a[d];
            "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serialize_(this.replacer_ ? this.replacer_.call(a, d, e) : e, b), c = ",")
        }
        b.push("}")
    };
    fb.util.json = {};
    fb.util.json.eval = function (a) {
        return"undefined" !== typeof JSON && goog.isDef(JSON.parse) ? JSON.parse(a) : goog.json.parse(a)
    };
    fb.util.json.stringify = function (a) {
        return"undefined" !== typeof JSON && goog.isDef(JSON.stringify) ? JSON.stringify(a) : goog.json.serialize(a)
    };
    fb.simplelogin.validation = {};
    var VALID_EMAIL_REGEX_ = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    fb.simplelogin.validation.isValidEmail = function (a) {
        return goog.isString(a) && VALID_EMAIL_REGEX_.test(a)
    };
    fb.simplelogin.validation.isValidPassword = function (a) {
        return goog.isString(a)
    };
    fb.simplelogin.validation.validateUser = function (a, b, c, d) {
        if ((!d || goog.isDef(c)) && !fb.simplelogin.validation.isValidEmail(c))throw Error(fb.util.validation.errorPrefix_(a, b, d) + "must be a valid email address.");
    };
    fb.simplelogin.validation.validatePassword = function (a, b, c, d) {
        if ((!d || goog.isDef(c)) && !fb.simplelogin.validation.isValidPassword(c))throw Error(fb.util.validation.errorPrefix_(a, b, d) + "must be a valid password.");
    };
    fb.simplelogin.winchan = function () {
        function a(a, b, c) {
            a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
        }

        function b(a, b, c) {
            a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1)
        }

        function c(a) {
            /^https?:\/\//.test(a) || (a = window.location.href);
            var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
            return b ? b[1] : a
        }

        var d = "die", e, f = -1, g = navigator.userAgent;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            var h = /MSIE ([0-9]{1,}[\.0-9]{0,})/;
            (g = g.match(h)) && 1 < g.length && (f = parseFloat(g[1]))
        } else-1 < g.indexOf("Trident") && (h = /rv:([0-9]{2,2}[\.0-9]{0,})/, (g = g.match(h)) && 1 < g.length && (f = parseFloat(g[1])));
        e = 8 <= f;
        return fb.util.json && fb.util.json.eval && fb.util.json.stringify && window.postMessage ? {open: function (f, g) {
            function h() {
                n && document.body.removeChild(n);
                n = void 0;
                w && (w = clearInterval(w));
                b(window, "message", l);
                b(window, "unload", h);
                if (v)try {
                    v.close()
                } catch (a) {
                    p.postMessage(d, r)
                }
                v = p = void 0
            }

            function l(a) {
                if (a.origin === r)try {
                    var b = fb.util.json.eval(a.data);
                    "ready" === b.a ? p.postMessage(x, r) : "error" === b.a ? (h(), g && (g(b.d), g = null)) : "response" === b.a && (h(), g && (g(null, b.d), g = null))
                } catch (c) {
                }
            }

            if (!g)throw"missing required callback argument";
            var m;
            f.url || (m = "missing required 'url' parameter");
            f.relay_url || (m = "missing required 'relay_url' parameter");
            m && setTimeout(function () {
                g(m)
            }, 0);
            f.window_name || (f.window_name = null);
            var o;
            if (!(o = !f.window_features))a:{
                try {
                    var q = navigator.userAgent;
                    o = -1 != q.indexOf("Fennec/") || -1 != q.indexOf("Firefox/") && -1 != q.indexOf("Android");
                    break a
                } catch (u) {
                }
                o = !1
            }
            o && (f.window_features = void 0);
            var n, r = c(f.url);
            if (r !== c(f.relay_url))return setTimeout(function () {
                g("invalid arguments: origin of url and relay_url must match")
            }, 0);
            var p;
            e && (n = document.createElement("iframe"), n.setAttribute("src", f.relay_url), n.style.display = "none", n.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(n), p = n.contentWindow);
            var v = window.open(f.url, f.window_name, f.window_features);
            p || (p = v);
            var w = setInterval(function () {
                if (v && v.closed) {
                    h();
                    if (g) {
                        g("unknown closed window");
                        g = null
                    }
                }
            }, 500), x = fb.util.json.stringify({a: "request", d: f.params});
            a(window, "unload", h);
            a(window, "message", l);
            return{close: h, focus: function () {
                if (v)try {
                    v.focus()
                } catch (a) {
                }
            }}
        }, onOpen: function (c) {
            function f(a) {
                a = fb.util.json.stringify(a);
                e ? p.doPost(a, m) : p.postMessage(a, m)
            }

            function g(a) {
                var d;
                try {
                    d = fb.util.json.eval(a.data)
                } catch (e) {
                }
                d && "request" === d.a && (b(window, "message", g), m = a.origin, c && setTimeout(function () {
                    c(m, d.d, function (a) {
                        c = void 0;
                        f({a: "response", d: a})
                    })
                }, 0))
            }

            function h(a) {
                if (a.data === d)try {
                    window.close()
                } catch (b) {
                }
            }

            var m = "*", o;
            if (e)a:{
                for (var q = window.location, u = window.opener.frames, q = q.protocol + "//" + q.host, n = u.length - 1; 0 <= n; n--)try {
                    if (0 === u[n].location.href.indexOf(q) && "__winchan_relay_frame" === u[n].name) {
                        o = u[n];
                        break a
                    }
                } catch (r) {
                }
                o = void 0
            } else o = window.opener;
            var p = o;
            if (!p)throw"can't find relay frame";
            a(e ? p : window, "message", g);
            a(e ? p : window, "message", h);
            try {
                f({a: "ready"})
            } catch (v) {
                a(p, "load", function () {
                    f({a: "ready"})
                })
            }
            var w = function () {
                try {
                    b(e ? p : window, "message", h)
                } catch (a) {
                }
                c && f({a: "error", d: "client closed window"});
                c = void 0;
                try {
                    window.close()
                } catch (d) {
                }
            };
            a(window, "unload", w);
            return{detach: function () {
                b(window, "unload", w)
            }}
        }} : {open: function (a, b, c, d) {
            setTimeout(function () {
                d("unsupported browser")
            }, 0)
        }, onOpen: function (a) {
            setTimeout(function () {
                a("unsupported browser")
            }, 0)
        }}
    }();
    fb.util.sjcl = {};
    var sjcl = {cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: {corrupt: function (a) {
        this.toString = function () {
            return"CORRUPT: " + this.message
        };
        this.message = a
    }, invalid: function (a) {
        this.toString = function () {
            return"INVALID: " + this.message
        };
        this.message = a
    }, bug: function (a) {
        this.toString = function () {
            return"BUG: " + this.message
        };
        this.message = a
    }, notReady: function (a) {
        this.toString = function () {
            return"NOT READY: " + this.message
        };
        this.message = a
    }}};
    "undefined" != typeof module && module.exports && (module.exports = sjcl);
    sjcl.cipher.aes = function (a) {
        this.h[0][0][0] || this.w();
        var b, c, d, e, f = this.h[0][4], g = this.h[1];
        b = a.length;
        var h = 1;
        if (b !== 4 && b !== 6 && b !== 8)throw new sjcl.exception.invalid("invalid aes key size");
        this.a = [d = a.slice(0), e = []];
        for (a = b; a < 4 * b + 28; a++) {
            c = d[a - 1];
            if (a % b === 0 || b === 8 && a % b === 4) {
                c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255];
                if (a % b === 0) {
                    c = c << 8 ^ c >>> 24 ^ h << 24;
                    h = h << 1 ^ (h >> 7) * 283
                }
            }
            d[a] = d[a - b] ^ c
        }
        for (b = 0; a; b++, a--) {
            c = d[b & 3 ? a : a - 4];
            e[b] = a <= 4 || b < 4 ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^
                g[3][f[c & 255]]
        }
    };
    sjcl.cipher.aes.prototype = {encrypt: function (a) {
        return this.G(a, 0)
    }, decrypt: function (a) {
        return this.G(a, 1)
    }, h: [
        [
            [],
            [],
            [],
            [],
            []
        ],
        [
            [],
            [],
            [],
            [],
            []
        ]
    ], w: function () {
        var a = this.h[0], b = this.h[1], c = a[4], d = b[4], e, f, g, h = [], i = [], k, j, l, m;
        for (e = 0; e < 256; e++)i[(h[e] = e << 1 ^ (e >> 7) * 283) ^ e] = e;
        for (f = g = 0; !c[f]; f = f ^ (k || 1), g = i[g] || 1) {
            l = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
            l = l >> 8 ^ l & 255 ^ 99;
            c[f] = l;
            d[l] = f;
            j = h[e = h[k = h[f]]];
            m = j * 16843009 ^ e * 65537 ^ k * 257 ^ f * 16843008;
            j = h[l] * 257 ^ l * 16843008;
            for (e = 0; e < 4; e++) {
                a[e][f] = j = j << 24 ^ j >>> 8;
                b[e][l] = m = m << 24 ^ m >>> 8
            }
        }
        for (e =
                 0; e < 5; e++) {
            a[e] = a[e].slice(0);
            b[e] = b[e].slice(0)
        }
    }, G: function (a, b) {
        if (a.length !== 4)throw new sjcl.exception.invalid("invalid aes block size");
        var c = this.a[b], d = a[0] ^ c[0], e = a[b ? 3 : 1] ^ c[1], f = a[2] ^ c[2], a = a[b ? 1 : 3] ^ c[3], g, h, i, k = c.length / 4 - 2, j, l = 4, m = [0, 0, 0, 0];
        g = this.h[b];
        var o = g[0], q = g[1], u = g[2], n = g[3], r = g[4];
        for (j = 0; j < k; j++) {
            g = o[d >>> 24] ^ q[e >> 16 & 255] ^ u[f >> 8 & 255] ^ n[a & 255] ^ c[l];
            h = o[e >>> 24] ^ q[f >> 16 & 255] ^ u[a >> 8 & 255] ^ n[d & 255] ^ c[l + 1];
            i = o[f >>> 24] ^ q[a >> 16 & 255] ^ u[d >> 8 & 255] ^ n[e & 255] ^ c[l + 2];
            a = o[a >>> 24] ^ q[d >> 16 & 255] ^
                u[e >> 8 & 255] ^ n[f & 255] ^ c[l + 3];
            l = l + 4;
            d = g;
            e = h;
            f = i
        }
        for (j = 0; j < 4; j++) {
            m[b ? 3 & -j : j] = r[d >>> 24] << 24 ^ r[e >> 16 & 255] << 16 ^ r[f >> 8 & 255] << 8 ^ r[a & 255] ^ c[l++];
            g = d;
            d = e;
            e = f;
            f = a;
            a = g
        }
        return m
    }};
    sjcl.bitArray = {bitSlice: function (a, b, c) {
        a = sjcl.bitArray.N(a.slice(b / 32), 32 - (b & 31)).slice(1);
        return c === void 0 ? a : sjcl.bitArray.clamp(a, c - b)
    }, extract: function (a, b, c) {
        var d = Math.floor(-b - c & 31);
        return((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1
    }, concat: function (a, b) {
        if (a.length === 0 || b.length === 0)return a.concat(b);
        var c = a[a.length - 1], d = sjcl.bitArray.getPartial(c);
        return d === 32 ? a.concat(b) : sjcl.bitArray.N(b, d, c | 0, a.slice(0, a.length - 1))
    }, bitLength: function (a) {
        var b = a.length;
        return b ===
            0 ? 0 : (b - 1) * 32 + sjcl.bitArray.getPartial(a[b - 1])
    }, clamp: function (a, b) {
        if (a.length * 32 < b)return a;
        var a = a.slice(0, Math.ceil(b / 32)), c = a.length, b = b & 31;
        c > 0 && b && (a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1));
        return a
    }, partial: function (a, b, c) {
        return a === 32 ? b : (c ? b | 0 : b << 32 - a) + a * 1099511627776
    }, getPartial: function (a) {
        return Math.round(a / 1099511627776) || 32
    }, equal: function (a, b) {
        if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b))return false;
        var c = 0, d;
        for (d = 0; d < a.length; d++)c = c | a[d] ^ b[d];
        return c ===
            0
    }, N: function (a, b, c, d) {
        var e;
        for (d === void 0 && (d = []); b >= 32; b = b - 32) {
            d.push(c);
            c = 0
        }
        if (b === 0)return d.concat(a);
        for (e = 0; e < a.length; e++) {
            d.push(c | a[e] >>> b);
            c = a[e] << 32 - b
        }
        e = a.length ? a[a.length - 1] : 0;
        a = sjcl.bitArray.getPartial(e);
        d.push(sjcl.bitArray.partial(b + a & 31, b + a > 32 ? c : d.pop(), 1));
        return d
    }, O: function (a, b) {
        return[a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]
    }};
    sjcl.codec.utf8String = {fromBits: function (a) {
        var b = "", c = sjcl.bitArray.bitLength(a), d, e;
        for (d = 0; d < c / 8; d++) {
            (d & 3) === 0 && (e = a[d / 4]);
            b = b + String.fromCharCode(e >>> 24);
            e = e << 8
        }
        return decodeURIComponent(escape(b))
    }, toBits: function (a) {
        var a = unescape(encodeURIComponent(a)), b = [], c, d = 0;
        for (c = 0; c < a.length; c++) {
            d = d << 8 | a.charCodeAt(c);
            if ((c & 3) === 3) {
                b.push(d);
                d = 0
            }
        }
        c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d));
        return b
    }};
    sjcl.codec.base64 = {C: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function (a, b, c) {
        var d = "", e = 0, f = sjcl.codec.base64.C, g = 0, h = sjcl.bitArray.bitLength(a);
        c && (f = f.substr(0, 62) + "-_");
        for (c = 0; d.length * 6 < h;) {
            d = d + f.charAt((g ^ a[c] >>> e) >>> 26);
            if (e < 6) {
                g = a[c] << 6 - e;
                e = e + 26;
                c++
            } else {
                g = g << 6;
                e = e - 6
            }
        }
        for (; d.length & 3 && !b;)d = d + "=";
        return d
    }, toBits: function (a, b) {
        var a = a.replace(/\s|=/g, ""), c = [], d = 0, e = sjcl.codec.base64.C, f = 0, g;
        b && (e = e.substr(0, 62) + "-_");
        for (b = 0; b < a.length; b++) {
            g = e.indexOf(a.charAt(b));
            if (g < 0)throw new sjcl.exception.invalid("this isn't base64!");
            if (d > 26) {
                d = d - 26;
                c.push(f ^ g >>> d);
                f = g << 32 - d
            } else {
                d = d + 6;
                f = f ^ g << 32 - d
            }
        }
        d & 56 && c.push(sjcl.bitArray.partial(d & 56, f, 1));
        return c
    }};
    sjcl.codec.base64url = {fromBits: function (a) {
        return sjcl.codec.base64.fromBits(a, 1, 1)
    }, toBits: function (a) {
        return sjcl.codec.base64.toBits(a, 1)
    }};
    sjcl.hash.sha256 = function (a) {
        this.a[0] || this.w();
        if (a) {
            this.m = a.m.slice(0);
            this.i = a.i.slice(0);
            this.e = a.e
        } else this.reset()
    };
    sjcl.hash.sha256.hash = function (a) {
        return(new sjcl.hash.sha256).update(a).finalize()
    };
    sjcl.hash.sha256.prototype = {blockSize: 512, reset: function () {
        this.m = this.L.slice(0);
        this.i = [];
        this.e = 0;
        return this
    }, update: function (a) {
        typeof a === "string" && (a = sjcl.codec.utf8String.toBits(a));
        var b, c = this.i = sjcl.bitArray.concat(this.i, a);
        b = this.e;
        a = this.e = b + sjcl.bitArray.bitLength(a);
        for (b = 512 + b & -512; b <= a; b = b + 512)this.B(c.splice(0, 16));
        return this
    }, finalize: function () {
        var a, b = this.i, c = this.m, b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]);
        for (a = b.length + 2; a & 15; a++)b.push(0);
        b.push(Math.floor(this.e /
            4294967296));
        for (b.push(this.e | 0); b.length;)this.B(b.splice(0, 16));
        this.reset();
        return c
    }, L: [], a: [], w: function () {
        function a(a) {
            return(a - Math.floor(a)) * 4294967296 | 0
        }

        var b = 0, c = 2, d;
        a:for (; b < 64; c++) {
            for (d = 2; d * d <= c; d++)if (c % d === 0)continue a;
            b < 8 && (this.L[b] = a(Math.pow(c, 0.5)));
            this.a[b] = a(Math.pow(c, 1 / 3));
            b++
        }
    }, B: function (a) {
        for (var b, c, d = a.slice(0), e = this.m, f = this.a, g = e[0], h = e[1], i = e[2], k = e[3], j = e[4], l = e[5], m = e[6], o = e[7], a = 0; a < 64; a++) {
            if (a < 16)b = d[a]; else {
                b = d[a + 1 & 15];
                c = d[a + 14 & 15];
                b = d[a & 15] = (b >>> 7 ^ b >>> 18 ^
                    b >>> 3 ^ b << 25 ^ b << 14) + (c >>> 17 ^ c >>> 19 ^ c >>> 10 ^ c << 15 ^ c << 13) + d[a & 15] + d[a + 9 & 15] | 0
            }
            b = b + o + (j >>> 6 ^ j >>> 11 ^ j >>> 25 ^ j << 26 ^ j << 21 ^ j << 7) + (m ^ j & (l ^ m)) + f[a];
            o = m;
            m = l;
            l = j;
            j = k + b | 0;
            k = i;
            i = h;
            h = g;
            g = b + (h & i ^ k & (h ^ i)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0
        }
        e[0] = e[0] + g | 0;
        e[1] = e[1] + h | 0;
        e[2] = e[2] + i | 0;
        e[3] = e[3] + k | 0;
        e[4] = e[4] + j | 0;
        e[5] = e[5] + l | 0;
        e[6] = e[6] + m | 0;
        e[7] = e[7] + o | 0
    }};
    sjcl.mode.ccm = {name: "ccm", encrypt: function (a, b, c, d, e) {
        var f, g = b.slice(0), h = sjcl.bitArray, i = h.bitLength(c) / 8, k = h.bitLength(g) / 8, e = e || 64, d = d || [];
        if (i < 7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
        for (f = 2; f < 4 && k >>> 8 * f; f++);
        f < 15 - i && (f = 15 - i);
        c = h.clamp(c, 8 * (15 - f));
        b = sjcl.mode.ccm.F(a, b, c, d, e, f);
        g = sjcl.mode.ccm.H(a, g, c, b, e, f);
        return h.concat(g.data, g.tag)
    }, decrypt: function (a, b, c, d, e) {
        var e = e || 64, d = d || [], f = sjcl.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b), i = f.clamp(b, h - e), k = f.bitSlice(b,
                h - e), h = (h - e) / 8;
        if (g < 7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");
        for (b = 2; b < 4 && h >>> 8 * b; b++);
        b < 15 - g && (b = 15 - g);
        c = f.clamp(c, 8 * (15 - b));
        i = sjcl.mode.ccm.H(a, i, c, k, e, b);
        a = sjcl.mode.ccm.F(a, i.data, c, d, e, b);
        if (!f.equal(i.tag, a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");
        return i.data
    }, F: function (a, b, c, d, e, f) {
        var g = [], h = sjcl.bitArray, i = h.O, e = e / 8;
        if (e % 2 || e < 4 || e > 16)throw new sjcl.exception.invalid("ccm: invalid tag length");
        if (d.length > 4294967295 || b.length > 4294967295)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
        f = [h.partial(8, (d.length ? 64 : 0) | e - 2 << 2 | f - 1)];
        f = h.concat(f, c);
        f[3] = f[3] | h.bitLength(b) / 8;
        f = a.encrypt(f);
        if (d.length) {
            c = h.bitLength(d) / 8;
            c <= 65279 ? g = [h.partial(16, c)] : c <= 4294967295 && (g = h.concat([h.partial(16, 65534)], [c]));
            g = h.concat(g, d);
            for (d = 0; d < g.length; d = d + 4)f = a.encrypt(i(f, g.slice(d, d + 4).concat([0, 0, 0])))
        }
        for (d = 0; d < b.length; d = d + 4)f = a.encrypt(i(f, b.slice(d, d + 4).concat([0, 0, 0])));
        return h.clamp(f, e * 8)
    }, H: function (a, b, c, d, e, f) {
        var g, h = sjcl.bitArray;
        g = h.O;
        var i = b.length, k = h.bitLength(b), c = h.concat([h.partial(8,
                f - 1)], c).concat([0, 0, 0]).slice(0, 4), d = h.bitSlice(g(d, a.encrypt(c)), 0, e);
        if (!i)return{tag: d, data: []};
        for (g = 0; g < i; g = g + 4) {
            c[3]++;
            e = a.encrypt(c);
            b[g] = b[g] ^ e[0];
            b[g + 1] = b[g + 1] ^ e[1];
            b[g + 2] = b[g + 2] ^ e[2];
            b[g + 3] = b[g + 3] ^ e[3]
        }
        return{tag: d, data: h.clamp(b, k)}
    }};
    sjcl.misc.hmac = function (a, b) {
        this.K = b = b || sjcl.hash.sha256;
        var c = [
            [],
            []
        ], d = b.prototype.blockSize / 32;
        this.k = [new b, new b];
        a.length > d && (a = b.hash(a));
        for (b = 0; b < d; b++) {
            c[0][b] = a[b] ^ 909522486;
            c[1][b] = a[b] ^ 1549556828
        }
        this.k[0].update(c[0]);
        this.k[1].update(c[1])
    };
    sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (a) {
        a = (new this.K(this.k[0])).update(a).finalize();
        return(new this.K(this.k[1])).update(a).finalize()
    };
    sjcl.misc.pbkdf2 = function (a, b, c, d, e) {
        c = c || 1E3;
        if (d < 0 || c < 0)throw sjcl.exception.invalid("invalid params to pbkdf2");
        typeof a === "string" && (a = sjcl.codec.utf8String.toBits(a));
        var e = e || sjcl.misc.hmac, a = new e(a), f, g, h, i, k = [], j = sjcl.bitArray;
        for (i = 1; 32 * k.length < (d || 1); i++) {
            e = f = a.encrypt(j.concat(b, [i]));
            for (g = 1; g < c; g++) {
                f = a.encrypt(f);
                for (h = 0; h < f.length; h++)e[h] = e[h] ^ f[h]
            }
            k = k.concat(e)
        }
        d && (k = j.clamp(k, d));
        return k
    };
    sjcl.random = {randomWords: function (a, b) {
        var c = [], b = this.isReady(b), d;
        if (b === 0)throw new sjcl.exception.notReady("generator isn't seeded");
        b & 2 && this.T(!(b & 1));
        for (b = 0; b < a; b = b + 4) {
            (b + 1) % 65536 === 0 && this.J();
            d = this.u();
            c.push(d[0], d[1], d[2], d[3])
        }
        this.J();
        return c.slice(0, a)
    }, setDefaultParanoia: function (a) {
        this.s = a
    }, addEntropy: function (a, b, c) {
        var c = c || "user", d, e, f = (new Date).valueOf(), g = this.p[c], h = this.isReady(), i = 0;
        d = this.D[c];
        d === void 0 && (d = this.D[c] = this.Q++);
        g === void 0 && (g = this.p[c] = 0);
        this.p[c] = (this.p[c] +
            1) % this.b.length;
        switch (typeof a) {
            case "number":
                b === void 0 && (b = 1);
                this.b[g].update([d, this.t++, 1, b, f, 1, a | 0]);
                break;
            case "object":
                c = Object.prototype.toString.call(a);
                if (c === "[object Uint32Array]") {
                    e = [];
                    for (c = 0; c < a.length; c++)e.push(a[c]);
                    a = e
                } else {
                    c !== "[object Array]" && (i = 1);
                    for (c = 0; c < a.length && !i; c++)typeof a[c] != "number" && (i = 1)
                }
                if (!i) {
                    if (b === void 0)for (c = b = 0; c < a.length; c++)for (e = a[c]; e > 0;) {
                        b++;
                        e = e >>> 1
                    }
                    this.b[g].update([d, this.t++, 2, b, f, a.length].concat(a))
                }
                break;
            case "string":
                if (b === void 0)b = a.length;
                this.b[g].update([d, this.t++, 3, b, f, a.length]);
                this.b[g].update(a);
                break;
            default:
                i = 1
        }
        if (i)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");
        this.j[g] = this.j[g] + b;
        this.f = this.f + b;
        if (h === 0) {
            this.isReady() !== 0 && this.I("seeded", Math.max(this.g, this.f));
            this.I("progress", this.getProgress())
        }
    }, isReady: function (a) {
        a = this.A[a !== void 0 ? a : this.s];
        return this.g && this.g >= a ? this.j[0] > 80 && (new Date).valueOf() > this.M ? 3 : 1 : this.f >= a ? 2 : 0
    }, getProgress: function (a) {
        a = this.A[a ?
            a : this.s];
        return this.g >= a ? 1 : this.f > a ? 1 : this.f / a
    }, startCollectors: function () {
        if (!this.l) {
            if (window.addEventListener) {
                window.addEventListener("load", this.n, false);
                window.addEventListener("mousemove", this.o, false)
            } else if (document.attachEvent) {
                document.attachEvent("onload", this.n);
                document.attachEvent("onmousemove", this.o)
            } else throw new sjcl.exception.bug("can't attach event");
            this.l = true
        }
    }, stopCollectors: function () {
        if (this.l) {
            if (window.removeEventListener) {
                window.removeEventListener("load", this.n,
                    false);
                window.removeEventListener("mousemove", this.o, false)
            } else if (window.detachEvent) {
                window.detachEvent("onload", this.n);
                window.detachEvent("onmousemove", this.o)
            }
            this.l = false
        }
    }, addEventListener: function (a, b) {
        this.q[a][this.P++] = b
    }, removeEventListener: function (a, b) {
        var c, a = this.q[a], d = [];
        for (c in a)a.hasOwnProperty(c) && a[c] === b && d.push(c);
        for (b = 0; b < d.length; b++) {
            c = d[b];
            delete a[c]
        }
    }, b: [new sjcl.hash.sha256], j: [0], z: 0, p: {}, t: 0, D: {}, Q: 0, g: 0, f: 0, M: 0, a: [0, 0, 0, 0, 0, 0, 0, 0], d: [0, 0, 0, 0], r: void 0, s: 6, l: !1,
        q: {progress: {}, seeded: {}}, P: 0, A: [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024], u: function () {
            for (var a = 0; a < 4; a++) {
                this.d[a] = this.d[a] + 1 | 0;
                if (this.d[a])break
            }
            return this.r.encrypt(this.d)
        }, J: function () {
            this.a = this.u().concat(this.u());
            this.r = new sjcl.cipher.aes(this.a)
        }, S: function (a) {
            this.a = sjcl.hash.sha256.hash(this.a.concat(a));
            this.r = new sjcl.cipher.aes(this.a);
            for (a = 0; a < 4; a++) {
                this.d[a] = this.d[a] + 1 | 0;
                if (this.d[a])break
            }
        }, T: function (a) {
            var b = [], c = 0, d;
            this.M = b[0] = (new Date).valueOf() + 3E4;
            for (d = 0; d < 16; d++)b.push(Math.random() *
                4294967296 | 0);
            for (d = 0; d < this.b.length; d++) {
                b = b.concat(this.b[d].finalize());
                c = c + this.j[d];
                this.j[d] = 0;
                if (!a && this.z & 1 << d)break
            }
            if (this.z >= 1 << this.b.length) {
                this.b.push(new sjcl.hash.sha256);
                this.j.push(0)
            }
            this.f = this.f - c;
            if (c > this.g)this.g = c;
            this.z++;
            this.S(b)
        }, o: function (a) {
            sjcl.random.addEntropy([a.x || a.clientX || a.offsetX || 0, a.y || a.clientY || a.offsetY || 0], 2, "mouse")
        }, n: function () {
            sjcl.random.addEntropy((new Date).valueOf(), 2, "loadtime")
        }, I: function (a, b) {
            var c, a = sjcl.random.q[a], d = [];
            for (c in a)a.hasOwnProperty(c) &&
            d.push(a[c]);
            for (c = 0; c < d.length; c++)d[c](b)
        }};
    try {
        var s = new Uint32Array(32);
        crypto.getRandomValues(s);
        sjcl.random.addEntropy(s, 1024, "crypto['getRandomValues']")
    } catch (t) {
    }
    sjcl.json = {defaults: {v: 1, iter: 1E3, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes"}, encrypt: function (a, b, c, d) {
        var c = c || {}, d = d || {}, e = sjcl.json, f = e.c({iv: sjcl.random.randomWords(4, 0)}, e.defaults), g;
        e.c(f, c);
        c = f.adata;
        if (typeof f.salt === "string")f.salt = sjcl.codec.base64.toBits(f.salt);
        if (typeof f.iv === "string")f.iv = sjcl.codec.base64.toBits(f.iv);
        if (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || typeof a === "string" && f.iter <= 100 || f.ts !== 64 && f.ts !== 96 && f.ts !== 128 || f.ks !== 128 && f.ks !== 192 && f.ks !== 256 || f.iv.length <
            2 || f.iv.length > 4)throw new sjcl.exception.invalid("json encrypt: invalid parameters");
        if (typeof a === "string") {
            g = sjcl.misc.cachedPbkdf2(a, f);
            a = g.key.slice(0, f.ks / 32);
            f.salt = g.salt
        }
        typeof b === "string" && (b = sjcl.codec.utf8String.toBits(b));
        typeof c === "string" && (c = sjcl.codec.utf8String.toBits(c));
        g = new sjcl.cipher[f.cipher](a);
        e.c(d, f);
        d.key = a;
        f.ct = sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);
        return e.encode(f)
    }, decrypt: function (a, b, c, d) {
        var c = c || {}, d = d || {}, e = sjcl.json, b = e.c(e.c(e.c({}, e.defaults), e.decode(b)),
            c, true), f, c = b.adata;
        if (typeof b.salt === "string")b.salt = sjcl.codec.base64.toBits(b.salt);
        if (typeof b.iv === "string")b.iv = sjcl.codec.base64.toBits(b.iv);
        if (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || typeof a === "string" && b.iter <= 100 || b.ts !== 64 && b.ts !== 96 && b.ts !== 128 || b.ks !== 128 && b.ks !== 192 && b.ks !== 256 || !b.iv || b.iv.length < 2 || b.iv.length > 4)throw new sjcl.exception.invalid("json decrypt: invalid parameters");
        if (typeof a === "string") {
            f = sjcl.misc.cachedPbkdf2(a, b);
            a = f.key.slice(0, b.ks / 32);
            b.salt = f.salt
        }
        typeof c ===
        "string" && (c = sjcl.codec.utf8String.toBits(c));
        f = new sjcl.cipher[b.cipher](a);
        c = sjcl.mode[b.mode].decrypt(f, b.ct, b.iv, c, b.ts);
        e.c(d, b);
        d.key = a;
        return sjcl.codec.utf8String.fromBits(c)
    }, encode: function (a) {
        var b, c = "{", d = "";
        for (b in a)if (a.hasOwnProperty(b)) {
            if (!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");
            c = c + (d + '"' + b + '":');
            d = ",";
            switch (typeof a[b]) {
                case "number":
                case "boolean":
                    c = c + a[b];
                    break;
                case "string":
                    c = c + ('"' + escape(a[b]) + '"');
                    break;
                case "object":
                    c =
                        c + ('"' + sjcl.codec.base64.fromBits(a[b], 0) + '"');
                    break;
                default:
                    throw new sjcl.exception.bug("json encode: unsupported type");
            }
        }
        return c + "}"
    }, decode: function (a) {
        a = a.replace(/\s/g, "");
        if (!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");
        var a = a.replace(/^\{|\}$/g, "").split(/,/), b = {}, c, d;
        for (c = 0; c < a.length; c++) {
            if (!(d = a[c].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");
            b[d[2]] = d[3] ? parseInt(d[3], 10) : d[2].match(/^(ct|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4])
        }
        return b
    }, c: function (a, b, c) {
        a === void 0 && (a = {});
        if (b === void 0)return a;
        for (var d in b)if (b.hasOwnProperty(d)) {
            if (c && a[d] !== void 0 && a[d] !== b[d])throw new sjcl.exception.invalid("required parameter overridden");
            a[d] = b[d]
        }
        return a
    }, V: function (a, b) {
        var c = {}, d;
        for (d in a)a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]);
        return c
    }, U: function (a, b) {
        var c = {}, d;
        for (d = 0; d < b.length; d++)a[b[d]] !== void 0 && (c[b[d]] =
            a[b[d]]);
        return c
    }};
    sjcl.encrypt = sjcl.json.encrypt;
    sjcl.decrypt = sjcl.json.decrypt;
    sjcl.misc.R = {};
    sjcl.misc.cachedPbkdf2 = function (a, b) {
        var c = sjcl.misc.R, d, b = b || {};
        d = b.iter || 1E3;
        c = c[a] = c[a] || {};
        d = c[d] = c[d] || {firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0)};
        c = b.salt === void 0 ? d.firstSalt : b.salt;
        d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter);
        return{key: d[c].slice(0), salt: c.slice(0)}
    };
    var FirebaseSimpleLogin = function (a, b, c) {
        var d = a.toString(), e = null;
        fb.util.validation.validateArgCount("new FirebaseSimpleLogin", 1, 3, arguments.length);
        fb.util.validation.validateCallback("new FirebaseSimpleLogin", 2, b, !1);
        if ("string" === typeof a)throw Error("new FirebaseSimpleLogin(): Oops, it looks like you passed a string instead of a Firebase reference (i.e. new Firebase(<firebaseURL>)).");
        if (goog.isString(d)) {
            var f = d.indexOf("//");
            0 <= f && (d = d.substring(f + 2));
            f = d.indexOf(".");
            0 <= f && (e = d.substring(0,
                f))
        }
        if (!goog.isString(e))throw Error("new FirebaseSimpleLogin(): First argument must be a valid Firebase reference (i.e. new Firebase(<firebaseURL>)).");
        "file:" === window.location.protocol && (!this.isMobilePhoneGap() && !this.isMobileTriggerIo() && console && console.log) && console.log("FirebaseSimpleLogin(): Due to browser security restrictions, loading applications via `file://*` URLs will prevent popup-based authentication providers from working properly. When testing locally, you'll need to run a barebones webserver on your machine rather than loading your test files via `file://*`. The easiest way to run a barebones server on your local machine is to `cd` to the root directory of your code and run `python -m SimpleHTTPServer`, which will allow you to access your content via `http://127.0.0.1:8000/*`.");
        this.mRef = a;
        this.mNamespace = e;
        this.mApiHost = "https://auth.firebase.com";
        this.sessionLengthDays = null;
        this.mLoginStateChange = function () {
            var d = Array.prototype.slice.apply(arguments), e = {anonymous: ["uid", "firebaseAuthToken", "id", "provider"], password: "uid email firebaseAuthToken id md5_hash provider".split(" "), facebook: "uid accessToken displayName firebaseAuthToken id provider".split(" "), github: "uid accessToken displayName firebaseAuthToken id provider username".split(" "), persona: "uid email firebaseAuthToken id md5_hash provider".split(" "),
                twitter: "uid accessToken accessTokenSecret displayName firebaseAuthToken id provider username".split(" ")};
            if ("function" === typeof window.Proxy && 2 === window.Proxy.length && d[1] && d[1].provider) {
                var f = d[1].provider;
                Firebase && (Firebase.INTERNAL && Firebase.INTERNAL.statsIncrementCounter) && (d[1] = new Proxy(d[1], {get: function (b, c) {
                    0 > e[f].indexOf(c) && Firebase.INTERNAL.statsIncrementCounter(a, "simple_login_undocumented_attribute_use." + c);
                    return b[c]
                }}))
            }
            setTimeout(function () {
                b.apply(c, d)
            }, 0)
        };
        this.resumeSession()
    };
    goog.exportSymbol("FirebaseSimpleLogin", FirebaseSimpleLogin);
    FirebaseSimpleLogin.onOpen = function (a) {
        fb.simplelogin.winchan.onOpen(a)
    };
    goog.exportProperty(FirebaseSimpleLogin, "onOpen", FirebaseSimpleLogin.onOpen);
    FirebaseSimpleLogin.prototype.hasLocalStorage = function () {
        try {
            localStorage.setItem("firebase-sentinel", "test");
            var a = localStorage.getItem("firebase-sentinel");
            localStorage.removeItem("firebase-sentinel");
            return"test" === a
        } catch (b) {
        }
        return!1
    };
    FirebaseSimpleLogin.prototype.resumeSession = function () {
        var a = {};
        if (this.hasLocalStorage()) {
            var b = this.readCookie("firebaseSessionKey"), c = localStorage.getItem("firebaseSession");
            if (b && c)try {
                a = fb.util.json.eval(sjcl.decrypt(b, fb.util.json.eval(c)))
            } catch (d) {
            }
        }
        a && a.token && a.user ? this.attemptAuth(a.token, a.user, !1) : this.mLoginStateChange(null, null)
    };
    FirebaseSimpleLogin.prototype.saveSession = function (a, b) {
        if (this.hasLocalStorage()) {
            var c = b.sessionKey, d = sjcl.encrypt(c, fb.util.json.stringify({token: a, user: b}));
            this.writeCookie("firebaseSessionKey", c, this.sessionLengthDays);
            localStorage.setItem("firebaseSession", fb.util.json.stringify(d))
        }
    };
    FirebaseSimpleLogin.prototype.clearSession = function () {
        this.hasLocalStorage() && (this.writeCookie("firebaseSessionKey", "", -1), localStorage.removeItem("firebaseSession"))
    };
    FirebaseSimpleLogin.prototype.writeCookie = function (a, b, c) {
        var d = "";
        c && (d = new Date, d.setTime(d.getTime() + 864E5 * c), d = "; expires=" + d.toGMTString());
        document.cookie = a + "=" + b + d + "; path=/"
    };
    FirebaseSimpleLogin.prototype.readCookie = function (a) {
        for (var a = a + "=", b = document.cookie.split(";"), c = 0; c < b.length; c++) {
            for (var d = b[c]; " " == d.charAt(0);)d = d.substring(1, d.length);
            if (0 == d.indexOf(a))return d.substring(a.length, d.length)
        }
        return null
    };
    FirebaseSimpleLogin.prototype.attemptAuth = function (a, b, c) {
        var d = this;
        this.mRef.auth(a, function (e, f) {
            e ? (d.clearSession(), d.mLoginStateChange(null, null)) : (c && d.saveSession(a, b), "function" == typeof f && f(), delete b.sessionKey, b.firebaseAuthToken = a, d.mLoginStateChange(null, b))
        }, function () {
            d.clearSession();
            d.mLoginStateChange(null, null)
        })
    };
    FirebaseSimpleLogin.prototype.login = function (a) {
        fb.util.validation.validateString(d, 1, a, !1);
        var b = this, c = {}, a = a.toLowerCase(), d = "FirebaseSimpleLogin.login(" + a + ")";
        if ("password" === a) {
            c = arguments[1] || {};
            if (!fb.simplelogin.validation.isValidEmail(c.email))return this.mLoginStateChange(this.formatError({code: "INVALID_EMAIL", message: "Invalid email specified."}));
            if (!fb.simplelogin.validation.isValidPassword(c.password))return this.mLoginStateChange(this.formatError({code: "INVALID_PASSWORD", message: "Invalid password specified."}))
        } else if ("facebook" ===
            a || "github" === a || "persona" === a || "twitter" === a || "anonymous" === a)fb.util.validation.validateArgCount(d, 1, 2, arguments.length), c = arguments[1] || {};
        var e = this.mLoginStateChange;
        this.sessionLengthDays = c.rememberMe ? 30 : null;
        switch (a) {
            case "password":
                this.jsonp("/auth/firebase", {email: c.email, password: c.password}, function (a, c) {
                    a || !c.token ? e(b.formatError(a)) : b.attemptAuth(c.token, c.user, !0)
                });
                break;
            case "github":
                c.height = 850, c.width = 950;
            case "facebook":
            case "twitter":
                d = "twitter" === a && c.user_id && c.oauth_token &&
                    c.oauth_token_secret;
                "facebook" === a && c.access_token || d ? this.jsonp("/auth/" + a + "/token", c, function (a, c) {
                    a || !c.token ? e(b.formatError(a)) : b.attemptAuth(c.token, c.user, !0)
                }) : this.launchAuthWindow(a, c, function (a, c, d) {
                    a ? b.mLoginStateChange(b.formatError(a), null) : b.attemptAuth(c, d, !0)
                });
                break;
            case "persona":
                if (!navigator.id)throw Error(d + ": Unable to find Persona include.js");
                fb.simplelogin.persona.login(function (a) {
                    null === a ? e(b.formatError({code: "UNKNOWN_ERROR", message: "User denied authentication request or an error occurred."})) :
                        b.jsonp("/auth/persona/token", {assertion: a}, function (a, c) {
                            a || !c.token ? e(b.formatError(a), null) : b.attemptAuth(c.token, c.user, !0)
                        })
                });
                break;
            case "anonymous":
                b.jsonp("/auth/anonymous", {}, function (a, c) {
                    a || !c.token ? e(b.formatError(a), null) : b.attemptAuth(c.token, c.user, !0)
                });
                break;
            default:
                throw Error("FirebaseSimpleLogin.login() failed: unrecognized authentication provider");
        }
    };
    goog.exportProperty(FirebaseSimpleLogin.prototype, "login", FirebaseSimpleLogin.prototype.login);
    FirebaseSimpleLogin.prototype.logout = function () {
        fb.util.validation.validateArgCount("FirebaseSimpleLogin.logout", 0, 0, arguments.length);
        this.clearSession();
        this.mRef.unauth();
        this.mLoginStateChange(null, null)
    };
    goog.exportProperty(FirebaseSimpleLogin.prototype, "logout", FirebaseSimpleLogin.prototype.logout);
    FirebaseSimpleLogin.prototype.parseURL = function (a) {
        var b = document.createElement("a");
        b.href = a;
        for (var a = b.protocol.replace(":", ""), c = b.hostname, d = b.port, e = b.search, f = {}, g = b.search.replace(/^\?/, "").split("&"), h = g.length, i = 0, k; i < h; i++)g[i] && (k = g[i].split("="), f[k[0]] = k[1]);
        return{protocol: a, host: c, port: d, query: e, params: f, hash: b.hash.replace("#", ""), path: b.pathname.replace(/^([^\/])/, "/$1")}
    };
    FirebaseSimpleLogin.prototype.isMobilePhoneGap = function () {
        return(window.cordova || window.PhoneGap || window.phonegap) && /^file:\/{3}[^\/]/i.test(window.location.href) && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)
    };
    FirebaseSimpleLogin.prototype.isMobileTriggerIo = function () {
        return window.forge && /^file:\/{3}[^\/]/i.test(window.location.href) && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)
    };
    FirebaseSimpleLogin.prototype.launchAuthWindow = function (a, b, c) {
        var d = this, a = this.mApiHost + "/auth/" + a + "?firebase=" + this.mNamespace;
        b.scope && (a += "&scope=" + b.scope);
        var e = {menubar: 0, location: 0, resizable: 0, scrollbars: 1, status: 0, dialog: 1, width: 700, height: 375};
        b.height && (e.height = b.height, delete b.height);
        b.width && (e.width = b.width, delete b.width);
        if (this.isMobilePhoneGap()) {
            var f = window.open(a + "&internalRedirect=true&transport=internalRedirect", "blank", "location=no"), g = !1;
            f.addEventListener("loadstop",
                function (a) {
                    try {
                        var b = d.parseURL(a.url);
                        if (b.path === "/auth/_blank") {
                            f.close();
                            var e = b.params, a = {}, h;
                            for (h in e)try {
                                a[h] = fb.util.json.eval(decodeURIComponent(e[h]))
                            } catch (m) {
                            }
                            if (!g) {
                                g = true;
                                return a && a.error ? c(a.error) : a && a.token && a.user ? c(null, a.token, a.user) : c({code: "UNKNOWN_ERROR", message: "An unknown error occurred."})
                            }
                        }
                    } catch (o) {
                        f.close();
                        if (!g) {
                            g = true;
                            return c({code: "UNKNOWN_ERROR", message: "An unknown error occurred."})
                        }
                    }
                });
            f.addEventListener("exit", function () {
                if (!g) {
                    g = true;
                    return c({code: "UNKNOWN_ERROR",
                        message: "An unknown error occurred."})
                }
            });
            setTimeout(function () {
                f && f.close && f.close()
            }, 4E4)
        } else if (this.isMobileTriggerIo()) {
            if (!window.forge || !window.forge.tabs)return c({code: "TRIGGER_IO_ERROR", message: '"forge.tabs" module required when using Firebase Simple Login and Trigger.io'});
            forge.tabs.openWithOptions({url: a + "&internalRedirect=true&transport=internalRedirect", pattern: this.mApiHost + "/auth/_blank*"}, function (a) {
                var b = null;
                if (a && a.url)try {
                    var e = d.parseURL(a.url).params, b = {}, f;
                    for (f in e)b[f] =
                        fb.util.json.eval(decodeURIComponent(e[f]))
                } catch (g) {
                } else if (a && a.userCancelled)return c({code: "USER_DENIED", message: "User cancelled the authentication request."});
                return b && b.token && b.user ? c(null, b.token, b.user) : b && b.error ? c(b.error) : c({code: "UNKNOWN_ERROR", message: "An unknown error occurred."})
            }, function () {
                c({code: "UNKNOWN_ERROR", message: "An unknown error occurred."})
            })
        } else {
            var b = [], h;
            for (h in e)b.push(h + "=" + e[h]);
            fb.simplelogin.winchan.open({url: a + "&transport=winchan", relay_url: this.mApiHost +
                "/auth/channel", window_features: b.join(",")}, function (a, b) {
                b && b.token && b.user ? c(null, b.token, b.user) : a === "unknown closed window" ? c({code: "USER_DENIED", message: "User cancelled the authentication request."}) : b.error ? c(b.error) : c({code: "UNKNOWN_ERROR", message: "An unknown error occurred."})
            })
        }
    };
    FirebaseSimpleLogin.prototype.createUser = function (a, b, c) {
        var d = this;
        fb.util.validation.validateArgCount("FirebaseSimpleLogin.createUser", 3, 3, arguments.length);
        fb.util.validation.validateCallback("FirebaseSimpleLogin.createUser", 3, c, !1);
        if (!fb.simplelogin.validation.isValidEmail(a))return c(this.formatError({code: "INVALID_EMAIL", message: "Invalid email specified."}));
        if (!fb.simplelogin.validation.isValidPassword(b))return c(this.formatError({code: "INVALID_PASSWORD", message: "Invalid password specified. "}));
        this.jsonp("/auth/firebase/create", {email: a, password: b}, function (a, b) {
            a ? c(d.formatError(a), null) : c(null, b)
        })
    };
    goog.exportProperty(FirebaseSimpleLogin.prototype, "createUser", FirebaseSimpleLogin.prototype.createUser);
    FirebaseSimpleLogin.prototype.changePassword = function (a, b, c, d) {
        var e = this;
        fb.util.validation.validateArgCount("FirebaseSimpleLogin.changePassword", 4, 4, arguments.length);
        fb.util.validation.validateCallback("FirebaseSimpleLogin.changePassword", 4, d, !1);
        if (!fb.simplelogin.validation.isValidEmail(a))return d(this.formatError({code: "INVALID_EMAIL", message: "Invalid email specified."}));
        if (!fb.simplelogin.validation.isValidPassword(b) || !fb.simplelogin.validation.isValidPassword(c))return d(this.formatError({code: "INVALID_PASSWORD",
            message: "Invalid password specified. "}));
        this.jsonp("/auth/firebase/update", {email: a, oldPassword: b, newPassword: c}, function (a) {
            a ? d(e.formatError(a), !1) : d(null, !0)
        })
    };
    goog.exportProperty(FirebaseSimpleLogin.prototype, "changePassword", FirebaseSimpleLogin.prototype.changePassword);
    FirebaseSimpleLogin.prototype.removeUser = function (a, b, c) {
        var d = this;
        fb.util.validation.validateArgCount("FirebaseSimpleLogin.removeUser", 3, 3, arguments.length);
        fb.util.validation.validateCallback("FirebaseSimpleLogin.removeUser", 3, c, !1);
        if (!fb.simplelogin.validation.isValidEmail(a))return c(this.formatError({code: "INVALID_EMAIL", message: "Invalid email specified."}));
        if (!fb.simplelogin.validation.isValidPassword(b))return c(this.formatError({code: "INVALID_PASSWORD", message: "Invalid password specified. "}));
        this.jsonp("/auth/firebase/remove", {email: a, password: b}, function (a) {
            a ? c(d.formatError(a), !1) : c(null, !0)
        })
    };
    goog.exportProperty(FirebaseSimpleLogin.prototype, "removeUser", FirebaseSimpleLogin.prototype.removeUser);
    FirebaseSimpleLogin._callbacks = {};
    FirebaseSimpleLogin.prototype.jsonp = function (a, b, c) {
        var d = this, e = this.mApiHost + a, e = e + (/\?/.test(e) ? "" : "?"), e = e + ("&firebase=" + this.mNamespace), e = e + "&transport=jsonp", f;
        for (f in b)e += "&" + encodeURIComponent(f) + "=" + encodeURIComponent(b[f]);
        var g = "_firebaseXDR" + (new Date).getTime().toString() + Math.floor(100 * Math.random()), e = e + ("&callback=" + encodeURIComponent("FirebaseSimpleLogin._callbacks." + g));
        FirebaseSimpleLogin._callbacks[g] = function (a) {
            var b = a.error || null;
            delete a.error;
            c(b, a);
            setTimeout(function () {
                delete FirebaseSimpleLogin._callbacks[g];
                var a = document.getElementById(g);
                null !== a && a.parentNode.removeChild(a)
            })
        };
        setTimeout(function () {
                try {
                    var a = document.createElement("script");
                    a.type = "text/javascript";
                    a.id = g;
                    a.async = !0;
                    a.src = e;
                    a.onerror = function () {
                        var a = document.getElementById(g);
                        null !== a && a.parentNode.removeChild(a);
                        c(d.formatError({code: "SERVER_ERROR", message: "An unknown server error occurred."}))
                    };
                    var b = document.getElementsByTagName("script")[0];
                    b.parentNode.insertBefore(a, b)
                } catch (f) {
                    c(d.formatError({code: "SERVER_ERROR", message: "An unknown server error occurred."}))
                }
            },
            1)
    };
    FirebaseSimpleLogin.prototype.formatError = function (a) {
        var b = Error(a.message || "");
        b.code = a.code || "UNKNOWN_ERROR";
        return b
    };
    var FirebaseAuthClient = function (a, b, c) {
        Firebase && (Firebase.INTERNAL && Firebase.INTERNAL.statsIncrementCounter) && Firebase.INTERNAL.statsIncrementCounter(a, "simple_login_deprecated_constructor");
        "undefined" !== typeof console && ("undefined" !== typeof console.warn ? console.warn("FirebaseAuthClient class being deprecated. Please use https://cdn.firebase.com/v0/firebase-simple-login.js and reference FirebaseSimpleLogin instead.") : console.log("FirebaseAuthClient class being deprecated. Please use https://cdn.firebase.com/v0/firebase-simple-login.js and reference FirebaseSimpleLogin instead."));
        return new FirebaseSimpleLogin(a, b, c)
    };
    goog.exportSymbol("FirebaseAuthClient", FirebaseAuthClient);
    FirebaseAuthClient.onOpen = FirebaseSimpleLogin.onOpen;
    goog.exportProperty(FirebaseAuthClient, "onOpen", FirebaseAuthClient.onOpen);
})();