import 'bootstrap';
require('../stylesheets/layout.css');

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-108402613-1', 'auto');
ga('send', 'pageview');

! function(R) {
    "function" == typeof define && define.amd ? define("jquery-fta", ["jquery"], function(T) {
        return R(T)
    }) : "object" == typeof module && module.exports ? module.exports = function(T, D) {
        return void 0 === T && (T = "undefined" == typeof window ? require("jquery")(D) : require("jquery")), R(T)
    }() : R(jQuery)
}(function(R) {
    "use strict";
    var T = {
            input: null,
            minLength: 2,
            maxLength: !1,
            maxItem: 8,
            dynamic: !1,
            delay: 300,
            order: null,
            offset: !1,
            hint: !1,
            accent: !1,
            highlight: !0,
            multiselect: null,
            group: !1,
            groupOrder: null,
            maxItemPerGroup: null,
            dropdownFilter: !1,
            dynamicFilter: null,
            backdrop: !1,
            backdropOnFocus: !1,
            cache: !1,
            ttl: 36e5,
            compression: !1,
            searchOnFocus: !1,
            blurOnTab: !0,
            resultContainer: null,
            generateOnLoad: null,
            mustSelectItem: !1,
            href: null,
            display: ["display"],
            template: null,
            templateValue: null,
            groupTemplate: null,
            correlativeTemplate: !1,
            emptyTemplate: !1,
            cancelButton: !0,
            loadingAnimation: !0,
            filter: !0,
            matcher: null,
            source: null,
            callback: {
                onInit: null,
                onReady: null,
                onShowLayout: null,
                onHideLayout: null,
                onSearch: null,
                onResult: null,
                onLayoutBuiltBefore: null,
                onLayoutBuiltAfter: null,
                onNavigateBefore: null,
                onNavigateAfter: null,
                onEnter: null,
                onLeave: null,
                onClickBefore: null,
                onClickAfter: null,
                onDropdownFilter: null,
                onSendRequest: null,
                onReceiveRequest: null,
                onPopulateSource: null,
                onCacheSave: null,
                onSubmit: null,
                onCancel: null
            },
            selector: {
                container: "fta__container",
                result: "fta__result",
                list: "fta__list",
                group: "fta__group",
                item: "fta__item",
                empty: "fta__empty",
                display: "fta__display",
                query: "fta__query",
                filter: "fta__filter",
                filterButton: "fta__filter-button",
                dropdown: "fta__dropdown",
                dropdownItem: "fta__dropdown-item",
                labelContainer: "fta__label-container",
                label: "fta__label",
                button: "fta__button",
                backdrop: "fta__backdrop",
                hint: "fta__hint",
                cancelButton: "fta__cancel-button"
            },
            debug: !1
        },
        B = {
            from: "\xE3\xE0\xE1\xE4\xE2\u1EBD\xE8\xE9\xEB\xEA\xEC\xED\xEF\xEE\xF5\xF2\xF3\xF6\xF4\xF9\xFA\xFC\xFB\xF1\xE7",
            to: "aaaaaeeeeeiiiiooooouuuunc"
        },
        E = ~window.navigator.appVersion.indexOf("MSIE 9."),
        M = ~window.navigator.appVersion.indexOf("MSIE 10"),
        P = !!~window.navigator.userAgent.indexOf("Trident") && ~window.navigator.userAgent.indexOf("rv:11"),
        N = function(H, V) {
            this.rawQuery = H.val() || "", this.query = H.val() || "", this.selector = H[0].selector, this.deferred = null, this.tmpSource = {}, this.source = {}, this.dynamicGroups = [], this.hasDynamicGroups = !1, this.generatedGroupCount = 0, this.groupBy = "group", this.groups = [], this.searchGroups = [], this.generateGroups = [], this.requestGroups = [], this.result = [], this.tmpResult = {}, this.groupTemplate = "", this.resultHtml = null, this.resultCount = 0, this.resultCountPerGroup = {}, this.options = V, this.node = H, this.namespace = "." + this.helper.slugify.call(this, this.selector) + ".fta", this.isContentEditable = "undefined" != typeof this.node.attr("contenteditable") && "false" !== this.node.attr("contenteditable"), this.container = null, this.resultContainer = null, this.item = null, this.items = null, this.comparedItems = null, this.xhr = {}, this.hintIndex = null, this.filters = {
                dropdown: {},
                dynamic: {}
            }, this.dropdownFilter = {
                "static": [],
                dynamic: []
            }, this.dropdownFilterAll = null, this.isDropdownEvent = !1, this.requests = {}, this.backdrop = {}, this.hint = {}, this.label = {}, this.hasDragged = !1, this.focusOnly = !1, this.__construct()
        };
    N.prototype = {
        _validateCacheMethod: function(H) {
            var V;
            if (!0 === H) H = "localStorage";
            else if ("string" == typeof H && !~["localStorage", "sessionStorage"].indexOf(H)) return this.options.debug && (_debug.log({
                node: this.selector,
                "function": "extendOptions()",
                message: "Invalid options.cache, possible options are \"localStorage\" or \"sessionStorage\""
            }), _debug.print()), !1;
            V = "undefined" != typeof window[H];
            try {
                window[H].setItem("fta", "fta"), window[H].removeItem("fta")
            } catch (z) {
                V = !1
            }
            return V && H || !1
        },
        extendOptions: function() {
            if (this.options.cache = this._validateCacheMethod(this.options.cache), this.options.compression && ("object" == typeof LZString && this.options.cache || (this.options.debug && (_debug.log({
                    node: this.selector,
                    "function": "extendOptions()",
                    message: "Missing LZString Library or options.cache, no compression will occur."
                }), _debug.print()), this.options.compression = !1)), (!this.options.maxLength || isNaN(this.options.maxLength)) && (this.options.maxLength = 1 / 0), "undefined" != typeof this.options.maxItem && ~[0, !1].indexOf(this.options.maxItem) && (this.options.maxItem = 1 / 0), this.options.maxItemPerGroup && !/^\d+$/.test(this.options.maxItemPerGroup) && (this.options.maxItemPerGroup = null), this.options.display && !Array.isArray(this.options.display) && (this.options.display = [this.options.display]), this.options.multiselect && (this.items = [], this.comparedItems = [], "string" == typeof this.options.multiselect.matchOn && (this.options.multiselect.matchOn = [this.options.multiselect.matchOn])), this.options.group && (Array.isArray(this.options.group) ? this.options.debug && (_debug.log({
                    node: this.selector,
                    "function": "extendOptions()",
                    message: "options.group must be a boolean|string|object as of 2.5.0"
                }), _debug.print()) : ("string" == typeof this.options.group ? this.options.group = {
                    key: this.options.group
                } : "boolean" == typeof this.options.group && (this.options.group = {
                    key: "group"
                }), this.options.group.key = this.options.group.key || "group")), this.options.highlight && !~["any", !0].indexOf(this.options.highlight) && (this.options.highlight = !1), this.options.dropdownFilter && this.options.dropdownFilter instanceof Object) {
                Array.isArray(this.options.dropdownFilter) || (this.options.dropdownFilter = [this.options.dropdownFilter]);
                for (var H = 0, V = this.options.dropdownFilter.length; V > H; ++H) this.dropdownFilter[this.options.dropdownFilter[H].value ? "static" : "dynamic"].push(this.options.dropdownFilter[H])
            }
            this.options.dynamicFilter && !Array.isArray(this.options.dynamicFilter) && (this.options.dynamicFilter = [this.options.dynamicFilter]), this.options.accent && ("object" == typeof this.options.accent ? this.options.accent.from && this.options.accent.to && this.options.accent.from.length !== this.options.accent.to.length && this.options.debug && (_debug.log({
                node: this.selector,
                "function": "extendOptions()",
                message: "Invalid \"options.accent\", from and to must be defined and same length."
            }), _debug.print()) : this.options.accent = B), this.options.groupTemplate && (this.groupTemplate = this.options.groupTemplate), this.options.resultContainer && ("string" == typeof this.options.resultContainer && (this.options.resultContainer = R(this.options.resultContainer)), this.options.resultContainer instanceof R && this.options.resultContainer[0] ? this.resultContainer = this.options.resultContainer : this.options.debug && (_debug.log({
                node: this.selector,
                "function": "extendOptions()",
                message: "Invalid jQuery selector or jQuery Object for \"options.resultContainer\"."
            }), _debug.print())), this.options.maxItemPerGroup && this.options.group && this.options.group.key && (this.groupBy = this.options.group.key), this.options.callback && this.options.callback.onClick && (this.options.callback.onClickBefore = this.options.callback.onClick, delete this.options.callback.onClick), this.options.callback && this.options.callback.onNavigate && (this.options.callback.onNavigateBefore = this.options.callback.onNavigate, delete this.options.callback.onNavigate), this.options = R.extend(!0, {}, T, this.options)
        },
        unifySourceFormat: function() {
            this.dynamicGroups = [], Array.isArray(this.options.source) && (this.options.source = {
                group: {
                    data: this.options.source
                }
            }), "string" == typeof this.options.source && (this.options.source = {
                group: {
                    ajax: {
                        url: this.options.source
                    }
                }
            }), this.options.source.ajax && (this.options.source = {
                group: {
                    ajax: this.options.source.ajax
                }
            }), (this.options.source.url || this.options.source.data) && (this.options.source = {
                group: this.options.source
            });
            var H, V, U;
            for (H in this.options.source)
                if (this.options.source.hasOwnProperty(H)) {
                    if (V = this.options.source[H], "string" == typeof V && (V = {
                            ajax: {
                                url: V
                            }
                        }), U = V.url || V.ajax, Array.isArray(U) ? (V.ajax = "string" == typeof U[0] ? {
                            url: U[0]
                        } : U[0], V.ajax.path = V.ajax.path || U[1] || null, delete V.url) : ("object" == typeof V.url ? V.ajax = V.url : "string" == typeof V.url && (V.ajax = {
                            url: V.url
                        }), delete V.url), !V.data && !V.ajax) return this.options.debug && (_debug.log({
                        node: this.selector,
                        "function": "unifySourceFormat()",
                        arguments: JSON.stringify(this.options.source),
                        message: "Undefined \"options.source." + H + ".[data|ajax]\" is Missing - fta dropped"
                    }), _debug.print()), !1;
                    V.display && !Array.isArray(V.display) && (V.display = [V.display]), V.minLength = "number" == typeof V.minLength ? V.minLength : this.options.minLength, V.maxLength = "number" == typeof V.maxLength ? V.maxLength : this.options.maxLength, V.dynamic = "boolean" == typeof V.dynamic || this.options.dynamic, V.minLength > V.maxLength && (V.minLength = V.maxLength), this.options.source[H] = V, this.options.source[H].dynamic && this.dynamicGroups.push(H), V.cache = "undefined" == typeof V.cache ? this.options.cache : this._validateCacheMethod(V.cache), V.compression && ("object" == typeof LZString && V.cache || (this.options.debug && (_debug.log({
                        node: this.selector,
                        "function": "unifySourceFormat()",
                        message: "Missing LZString Library or group.cache, no compression will occur on group: " + H
                    }), _debug.print()), V.compression = !1))
                }
            return this.hasDynamicGroups = this.options.dynamic || !!this.dynamicGroups.length, !0
        },
        init: function() {
            this.helper.executeCallback.call(this, this.options.callback.onInit, [this.node]), this.container = this.node.closest("." + this.options.selector.container), this.options.debug && (_debug.log({
                node: this.selector,
                "function": "init()",
                message: "OK - fta activated on " + this.selector
            }), _debug.print())
        },
        delegateEvents: function() {
            var H = this,
                V = ["focus" + this.namespace, "input" + this.namespace, "propertychange" + this.namespace, "keydown" + this.namespace, "keyup" + this.namespace, "search" + this.namespace, "generate" + this.namespace];
            R("html").on("touchmove", function() {
                H.hasDragged = !0
            }).on("touchstart", function() {
                H.hasDragged = !1
            }), this.node.closest("form").on("submit", function(W) {
                return H.options.mustSelectItem && H.helper.isEmpty(H.item) ? void W.preventDefault() : (H.options.backdropOnFocus || H.hideLayout(), H.options.callback.onSubmit ? H.helper.executeCallback.call(H, H.options.callback.onSubmit, [H.node, this, H.item || H.items, W]) : void 0)
            }).on("reset", function() {
                setTimeout(function() {
                    H.node.trigger("input" + H.namespace), H.hideLayout()
                })
            });
            var U = !1;
            if (this.node.attr("placeholder") && (M || P)) {
                var z = !0;
                this.node.on("focusin focusout", function() {
                    z = !this.value && this.placeholder
                }), this.node.on("input", function(W) {
                    z && (W.stopImmediatePropagation(), z = !1)
                })
            }
            this.node.off(this.namespace).on(V.join(" "), function(W, Z) {
                switch (W.type) {
                    case "generate":
                        H.generateSource(Object.keys(H.options.source));
                        break;
                    case "focus":
                        if (H.focusOnly) {
                            H.focusOnly = !1;
                            break
                        }
                        H.options.backdropOnFocus && (H.buildBackdropLayout(), H.showLayout()), H.options.searchOnFocus && !H.item && (H.deferred = R.Deferred(), H.assignQuery(), H.generateSource());
                        break;
                    case "keydown":
                        8 === W.keyCode && H.options.multiselect && H.options.multiselect.cancelOnBackspace && "" === H.query && H.items.length ? H.cancelMultiselectItem(H.items.length - 1, null, W) : W.keyCode && ~[9, 13, 27, 38, 39, 40].indexOf(W.keyCode) && (U = !0, H.navigate(W));
                        break;
                    case "keyup":
                        E && H.node[0].value.replace(/^\s+/, "").toString().length < H.query.length && H.node.trigger("input" + H.namespace);
                        break;
                    case "propertychange":
                        if (U) {
                            U = !1;
                            break
                        }
                    case "input":
                        H.deferred = R.Deferred(), H.assignQuery(), "" === H.rawQuery && "" === H.query && (W.originalEvent = Z || {}, H.helper.executeCallback.call(H, H.options.callback.onCancel, [H.node, W])), H.options.cancelButton && H.toggleCancelButtonVisibility(), H.options.hint && H.hint.container && "" !== H.hint.container.val() && 0 !== H.hint.container.val().indexOf(H.rawQuery) && (H.hint.container.val(""), H.isContentEditable && H.hint.container.text("")), H.hasDynamicGroups ? H.helper.typeWatch(function() {
                            H.generateSource()
                        }, H.options.delay) : H.generateSource();
                        break;
                    case "search":
                        H.searchResult(), H.buildLayout(), H.result.length || H.searchGroups.length && H.options.emptyTemplate && H.query.length ? H.showLayout() : H.hideLayout(), H.deferred && H.deferred.resolve();
                }
                return H.deferred && H.deferred.promise()
            }), this.options.generateOnLoad && this.node.trigger("generate" + this.namespace)
        },
        assignQuery: function() {
            this.rawQuery = this.isContentEditable ? this.node.text() : this.node.val().toString(), this.rawQuery = this.rawQuery.replace(/^\s+/, ""), this.rawQuery !== this.query && (this.item = null, this.query = this.rawQuery)
        },
        filterGenerateSource: function() {
            if (this.searchGroups = [], this.generateGroups = [], !this.focusOnly || this.options.multiselect)
                for (var H in this.options.source)
                    if (this.options.source.hasOwnProperty(H) && this.query.length >= this.options.source[H].minLength && this.query.length <= this.options.source[H].maxLength) {
                        if (this.searchGroups.push(H), !this.options.source[H].dynamic && this.source[H]) continue;
                        this.generateGroups.push(H)
                    }
        },
        generateSource: function(H) {
            if (this.filterGenerateSource(), Array.isArray(H) && H.length) this.generateGroups = H;
            else if (!this.generateGroups.length) return void this.node.trigger("search" + this.namespace);
            if (this.requestGroups = [], this.generatedGroupCount = 0, this.options.loadingAnimation && this.container.addClass("loading"), !this.helper.isEmpty(this.xhr)) {
                for (var V in this.xhr) this.xhr.hasOwnProperty(V) && this.xhr[V].abort();
                this.xhr = {}
            }
            for (var U, z, W, Z, $, K, X, J = this, V = 0, Y = this.generateGroups.length; Y > V; ++V) {
                if (U = this.generateGroups[V], W = this.options.source[U], Z = W.cache, $ = W.compression, Z && (K = window[Z].getItem("fta_" + this.selector + ":" + U))) {
                    $ && (K = LZString.decompressFromUTF16(K)), X = !1;
                    try {
                        K = JSON.parse(K + ""), K.data && K.ttl > new Date().getTime() ? (this.populateSource(K.data, U), X = !0, this.options.debug && (_debug.log({
                            node: this.selector,
                            "function": "generateSource()",
                            message: "Source for group \"" + U + "\" found in " + Z
                        }), _debug.print())) : window[Z].removeItem("fta_" + this.selector + ":" + U)
                    } catch (ee) {}
                    if (X) continue
                }!W.data || W.ajax ? W.ajax && (this.requests[U] || (this.requests[U] = this.generateRequestObject(U)), this.requestGroups.push(U)) : "function" == typeof W.data ? (z = W.data.call(this), Array.isArray(z) ? J.populateSource(z, U) : "function" == typeof z.promise && ! function(ee) {
                    R.when(z).then(function(te) {
                        te && Array.isArray(te) && J.populateSource(te, ee)
                    })
                }(U)) : this.populateSource(R.extend(!0, [], W.data), U)
            }
            return this.requestGroups.length && this.handleRequests(), !!this.generateGroups.length
        },
        generateRequestObject: function(H) {
            var V = this,
                U = this.options.source[H],
                z = {
                    request: {
                        url: U.ajax.url || null,
                        dataType: "json",
                        beforeSend: function(Z) {
                            V.xhr[H] = Z;
                            var K = V.requests[H].callback.beforeSend || U.ajax.beforeSend;
                            "function" == typeof K && K.apply(null, arguments)
                        }
                    },
                    callback: {
                        beforeSend: null,
                        done: null,
                        fail: null,
                        then: null,
                        always: null
                    },
                    extra: {
                        path: U.ajax.path || null,
                        group: H
                    },
                    validForGroup: [H]
                };
            if ("function" != typeof U.ajax && (U.ajax instanceof Object && (z = this.extendXhrObject(z, U.ajax)), 1 < Object.keys(this.options.source).length))
                for (var W in this.requests) this.requests.hasOwnProperty(W) && (this.requests[W].isDuplicated || z.request.url && z.request.url === this.requests[W].request.url && (this.requests[W].validForGroup.push(H), z.isDuplicated = !0, delete z.validForGroup));
            return z
        },
        extendXhrObject: function(H, V) {
            return "object" == typeof V.callback && (H.callback = V.callback, delete V.callback), "function" == typeof V.beforeSend && (H.callback.beforeSend = V.beforeSend, delete V.beforeSend), H.request = R.extend(!0, H.request, V), "jsonp" !== H.request.dataType.toLowerCase() || H.request.jsonpCallback || (H.request.jsonpCallback = "callback_" + H.extra.group), H
        },
        handleRequests: function() {
            var H, V = this,
                U = this.requestGroups.length;
            if (!1 !== this.helper.executeCallback.call(this, this.options.callback.onSendRequest, [this.node, this.query]))
                for (var z = 0, W = this.requestGroups.length; W > z; ++z) H = this.requestGroups[z], !this.requests[H].isDuplicated && function(Z, $) {
                    if ("function" == typeof V.options.source[Z].ajax) {
                        var K = V.options.source[Z].ajax.call(V, V.query);
                        if ($ = V.extendXhrObject(V.generateRequestObject(Z), "object" == typeof K ? K : {}), "object" != typeof $.request || !$.request.url) return V.options.debug && (_debug.log({
                            node: V.selector,
                            "function": "handleRequests",
                            message: "Source function must return an object containing \".url\" key for group \"" + Z + "\""
                        }), _debug.print()), void V.populateSource([], Z);
                        V.requests[Z] = $
                    }
                    var X, J = !1,
                        Y = {};
                    if (~$.request.url.indexOf("{{query}}") && (J || ($ = R.extend(!0, {}, $), J = !0), $.request.url = $.request.url.replace("{{query}}", encodeURIComponent(V.query))), $.request.data)
                        for (var ee in $.request.data)
                            if ($.request.data.hasOwnProperty(ee) && ~($.request.data[ee] + "").indexOf("{{query}}")) {
                                J || ($ = R.extend(!0, {}, $), J = !0), $.request.data[ee] = $.request.data[ee].replace("{{query}}", V.query);
                                break
                            }
                    R.ajax($.request).done(function(te, oe, ne) {
                        for (var ae, ie = 0, re = $.validForGroup.length; re > ie; ie++) ae = $.validForGroup[ie], X = V.requests[ae], X.callback.done instanceof Function && (Y[ae] = X.callback.done.call(V, te, oe, ne), Array.isArray(Y[ae]) && "object" == typeof Y[ae] || V.options.debug && (_debug.log({
                            node: V.selector,
                            "function": "Ajax.callback.done()",
                            message: "Invalid returned data has to be an Array"
                        }), _debug.print()))
                    }).fail(function(te, oe, ne) {
                        for (var ae = 0, ie = $.validForGroup.length; ie > ae; ae++) X = V.requests[$.validForGroup[ae]], X.callback.fail instanceof Function && X.callback.fail.call(V, te, oe, ne);
                        V.options.debug && (_debug.log({
                            node: V.selector,
                            "function": "Ajax.callback.fail()",
                            arguments: JSON.stringify($.request),
                            message: oe
                        }), console.log(ne), _debug.print())
                    }).always(function(te, oe, ne) {
                        for (var ae, ie = 0, re = $.validForGroup.length; re > ie; ie++) {
                            if (ae = $.validForGroup[ie], X = V.requests[ae], X.callback.always instanceof Function && X.callback.always.call(V, te, oe, ne), "object" != typeof ne) return;
                            V.populateSource(null !== te && "function" == typeof te.promise && [] || Y[ae] || te, X.extra.group, X.extra.path || X.request.path), U -= 1, 0 === U && V.helper.executeCallback.call(V, V.options.callback.onReceiveRequest, [V.node, V.query])
                        }
                    }).then(function(te, oe) {
                        for (var ne = 0, ae = $.validForGroup.length; ae > ne; ne++) X = V.requests[$.validForGroup[ne]], X.callback.then instanceof Function && X.callback.then.call(V, te, oe)
                    })
                }(H, this.requests[H])
        },
        populateSource: function(H, V, U) {
            var z = this,
                W = this.options.source[V],
                Z = W.ajax && W.data;
            U && "string" == typeof U && (H = this.helper.namespace.call(this, U, H)), "undefined" == typeof H && this.options.debug && (_debug.log({
                node: this.selector,
                "function": "populateSource()",
                arguments: U,
                message: "Invalid data path."
            }), _debug.print()), Array.isArray(H) || (this.options.debug && (_debug.log({
                node: this.selector,
                "function": "populateSource()",
                arguments: JSON.stringify({
                    group: V
                }),
                message: "Invalid data type, must be Array type."
            }), _debug.print()), H = []), Z && ("function" == typeof Z && (Z = Z()), Array.isArray(Z) ? H = H.concat(Z) : this.options.debug && (_debug.log({
                node: this.selector,
                "function": "populateSource()",
                arguments: JSON.stringify(Z),
                message: "WARNING - this.options.source." + V + ".data Must be an Array or a function that returns an Array."
            }), _debug.print()));
            for (var $, K = W.display ? "compiled" === W.display[0] ? W.display[1] : W.display[0] : "compiled" === this.options.display[0] ? this.options.display[1] : this.options.display[0], X = 0, J = H.length; J > X; X++) null !== H[X] && "boolean" != typeof H[X] ? ("string" == typeof H[X] && ($ = {}, $[K] = H[X], H[X] = $), H[X].group = V) : this.options.debug && (_debug.log({
                node: this.selector,
                "function": "populateSource()",
                message: "WARNING - NULL/BOOLEAN value inside " + V + "! The data was skipped."
            }), _debug.print());
            if (!this.hasDynamicGroups && this.dropdownFilter.dynamic.length)
                for (var Y, ee, te = {}, X = 0, J = H.length; J > X; X++)
                    for (var oe = 0, ne = this.dropdownFilter.dynamic.length; ne > oe; oe++) Y = this.dropdownFilter.dynamic[oe].key, ee = H[X][Y], ee && (this.dropdownFilter.dynamic[oe].value || (this.dropdownFilter.dynamic[oe].value = []), te[Y] || (te[Y] = []), ~te[Y].indexOf(ee.toLowerCase()) || (te[Y].push(ee.toLowerCase()), this.dropdownFilter.dynamic[oe].value.push(ee)));
            if (this.options.correlativeTemplate) {
                var ae = W.template || this.options.template,
                    ie = "";
                if ("function" == typeof ae && (ae = ae.call(this, "", {})), ae) {
                    if (Array.isArray(this.options.correlativeTemplate))
                        for (var X = 0, J = this.options.correlativeTemplate.length; J > X; X++) ie += "{{" + this.options.correlativeTemplate[X] + "}} ";
                    else ie = ae.replace(/<.+?>/g, " ").replace(/\s{2,}/, " ").trim();
                    for (var X = 0, J = H.length; J > X; X++) H[X].compiled = R("<textarea />").html(ie.replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function(pe, ue) {
                        return z.helper.namespace.call(z, ue, H[X], "get", "")
                    }).trim()).text();
                    W.display ? ~W.display.indexOf("compiled") || W.display.unshift("compiled") : ~this.options.display.indexOf("compiled") || this.options.display.unshift("compiled")
                } else this.options.debug && (_debug.log({
                    node: this.selector,
                    "function": "populateSource()",
                    arguments: V + "",
                    message: "WARNING - this.options.correlativeTemplate is enabled but no template was found."
                }), _debug.print())
            }
            this.options.callback.onPopulateSource && (H = this.helper.executeCallback.call(this, this.options.callback.onPopulateSource, [this.node, H, V, U]), this.options.debug && (H && Array.isArray(H) || (_debug.log({
                node: this.selector,
                "function": "callback.populateSource()",
                message: "callback.onPopulateSource must return the \"data\" parameter"
            }), _debug.print()))), this.tmpSource[V] = Array.isArray(H) && H || [];
            var re = this.options.source[V].cache,
                le = this.options.source[V].compression,
                se = this.options.source[V].ttl || this.options.ttl;
            if (re && !window[re].getItem("fta_" + this.selector + ":" + V)) {
                this.options.callback.onCacheSave && (H = this.helper.executeCallback.call(this, this.options.callback.onCacheSave, [this.node, H, V, U]), this.options.debug && (H && Array.isArray(H) || (_debug.log({
                    node: this.selector,
                    "function": "callback.populateSource()",
                    message: "callback.onCacheSave must return the \"data\" parameter"
                }), _debug.print())));
                var ce = JSON.stringify({
                    data: H,
                    ttl: new Date().getTime() + se
                });
                le && (ce = LZString.compressToUTF16(ce)), window[re].setItem("fta_" + this.selector + ":" + V, ce)
            }
            this.incrementGeneratedGroup()
        },
        incrementGeneratedGroup: function() {
            if (this.generatedGroupCount++, this.generatedGroupCount === this.generateGroups.length) {
                this.xhr = {};
                for (var H = 0, V = this.generateGroups.length; V > H; H++) this.source[this.generateGroups[H]] = this.tmpSource[this.generateGroups[H]];
                this.hasDynamicGroups || this.buildDropdownItemLayout("dynamic"), this.options.loadingAnimation && this.container.removeClass("loading"), this.node.trigger("search" + this.namespace)
            }
        },
        navigate: function(H) {
            if (this.helper.executeCallback.call(this, this.options.callback.onNavigateBefore, [this.node, this.query, H]), 27 === H.keyCode) return H.preventDefault(), void(this.query.length ? (this.resetInput(), this.node.trigger("input" + this.namespace, [H])) : (this.node.blur(), this.hideLayout()));
            if (this.result.length) {
                var V = this.resultContainer.find("." + this.options.selector.item).not("[disabled]"),
                    U = V.filter(".active"),
                    z = U[0] ? V.index(U) : null,
                    W = U[0] ? U.attr("data-index") : null,
                    Z = null,
                    $ = null;
                if (this.clearActiveItem(), this.helper.executeCallback.call(this, this.options.callback.onLeave, [this.node, null !== z && V.eq(z) || void 0, null !== W && this.result[W] || void 0, H]), 13 === H.keyCode) return H.preventDefault(), void(0 < U.length ? "javascript:;" === U.find("a:first")[0].href ? U.find("a:first").trigger("click", H) : U.find("a:first")[0].click() : this.node.closest("form").trigger("submit"));
                if (39 === H.keyCode) return void(null === z ? this.options.hint && "" !== this.hint.container.val() && this.helper.getCaret(this.node[0]) >= this.query.length && V.filter("[data-index=\"" + this.hintIndex + "\"]").find("a:first")[0].click() : V.eq(z).find("a:first")[0].click());
                9 === H.keyCode ? this.options.blurOnTab ? this.hideLayout() : 0 < U.length ? z + 1 < V.length ? (H.preventDefault(), Z = z + 1, this.addActiveItem(V.eq(Z))) : this.hideLayout() : V.length ? (H.preventDefault(), Z = 0, this.addActiveItem(V.first())) : this.hideLayout() : 38 === H.keyCode ? (H.preventDefault(), 0 < U.length ? 0 <= z - 1 && (Z = z - 1, this.addActiveItem(V.eq(Z))) : V.length && (Z = V.length - 1, this.addActiveItem(V.last()))) : 40 === H.keyCode && (H.preventDefault(), 0 < U.length ? z + 1 < V.length && (Z = z + 1, this.addActiveItem(V.eq(Z))) : V.length && (Z = 0, this.addActiveItem(V.first()))), $ = null === Z ? null : V.eq(Z).attr("data-index"), this.helper.executeCallback.call(this, this.options.callback.onEnter, [this.node, null !== Z && V.eq(Z) || void 0, null !== $ && this.result[$] || void 0, H]), H.preventInputChange && ~[38, 40].indexOf(H.keyCode) && this.buildHintLayout(null !== $ && $ < this.result.length ? [this.result[$]] : null), this.options.hint && this.hint.container && this.hint.container.css("color", H.preventInputChange ? this.hint.css.color : null === $ && this.hint.css.color || this.hint.container.css("background-color") || "fff");
                var K = null === $ || H.preventInputChange ? this.rawQuery : this.getTemplateValue.call(this, this.result[$]);
                this.node.val(K), this.isContentEditable && this.node.text(K), this.helper.executeCallback.call(this, this.options.callback.onNavigateAfter, [this.node, V, null !== Z && V.eq(Z).find("a:first") || void 0, null !== $ && this.result[$] || void 0, this.query, H])
            }
        },
        getTemplateValue: function(H) {
            if (H) {
                var V = H.group && this.options.source[H.group].templateValue || this.options.templateValue;
                if ("function" == typeof V && (V = V.call(this)), !V) return this.helper.namespace.call(this, H.matchedKey, H).toString();
                var U = this;
                return V.replace(/\{\{([\w\-.]+)}}/gi, function(z, W) {
                    return U.helper.namespace.call(U, W, H, "get", "")
                })
            }
        },
        clearActiveItem: function() {
            this.resultContainer.find("." + this.options.selector.item).removeClass("active")
        },
        addActiveItem: function(H) {
            H.addClass("active")
        },
        searchResult: function() {
            this.resetLayout(), !1 !== this.helper.executeCallback.call(this, this.options.callback.onSearch, [this.node, this.query]) && (!this.searchGroups.length || this.options.multiselect && this.options.multiselect.limit && this.items.length >= this.options.multiselect.limit || this.searchResultData(), this.helper.executeCallback.call(this, this.options.callback.onResult, [this.node, this.query, this.result, this.resultCount, this.resultCountPerGroup]), this.isDropdownEvent && (this.helper.executeCallback.call(this, this.options.callback.onDropdownFilter, [this.node, this.query, this.filters.dropdown, this.result]), this.isDropdownEvent = !1))
        },
        searchResultData: function() {
            var H, V, U, z, W, Z, $, K, X, J, Y, ee, te, oe = this,
                ne = this.groupBy,
                ae = null,
                ie = this.query.toLowerCase(),
                re = this.options.maxItem,
                le = this.options.maxItemPerGroup,
                se = this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
                ce = {},
                pe = "function" == typeof this.options.matcher && this.options.matcher;
            this.options.accent && (ie = this.helper.removeAccent.call(this, ie));
            for (var ue = 0, de = this.searchGroups.length; de > ue; ++ue)
                if (H = this.searchGroups[ue], !this.filters.dropdown || "group" !== this.filters.dropdown.key || this.filters.dropdown.value === H) {
                    $ = "undefined" == typeof this.options.source[H].filter ? this.options.filter : this.options.source[H].filter, X = "function" == typeof this.options.source[H].matcher && this.options.source[H].matcher || pe;
                    for (var ge = 0, me = this.source[H].length; me > ge && (!(this.resultItemCount >= re) || this.options.callback.onResult); ge++)
                        if ((!se || this.dynamicFilter.validate.apply(this, [this.source[H][ge]])) && (V = this.source[H][ge], null !== V && "boolean" != typeof V && (!this.options.multiselect || this.isMultiselectUniqueData(V)) && (!this.filters.dropdown || (V[this.filters.dropdown.key] || "").toLowerCase() === (this.filters.dropdown.value || "").toLowerCase()))) {
                            if (ae = "group" === ne ? H : V[ne] ? V[ne] : V.group, ae && !this.tmpResult[ae] && (this.tmpResult[ae] = [], this.resultCountPerGroup[ae] = 0), le && "group" === ne && this.tmpResult[ae].length >= le && !this.options.callback.onResult) break;
                            W = this.options.source[H].display || this.options.display;
                            for (var fe = 0, he = W.length; he > fe; ++fe) {
                                if (!1 !== $) {
                                    if (Z = /\./.test(W[fe]) ? this.helper.namespace.call(this, W[fe], V) : V[W[fe]], "undefined" == typeof Z || "" === Z) {
                                        this.options.debug && (ce[fe] = {
                                            display: W[fe],
                                            data: V
                                        });
                                        continue
                                    }
                                    Z = this.helper.cleanStringFromScript(Z)
                                }
                                if ("function" == typeof $) {
                                    if (K = $.call(this, V, Z), void 0 === K) break;
                                    if (!K) continue;
                                    "object" == typeof K && (V = K)
                                }
                                if (~[void 0, !0].indexOf($)) {
                                    if (z = Z, z = z.toString().toLowerCase(), this.options.accent && (z = this.helper.removeAccent.call(this, z)), U = z.indexOf(ie), this.options.correlativeTemplate && "compiled" === W[fe] && 0 > U && /\s/.test(ie)) {
                                        Y = !0, ee = ie.split(" "), te = z;
                                        for (var ye = 0, be = ee.length; be > ye; ye++)
                                            if ("" !== ee[ye]) {
                                                if (!~te.indexOf(ee[ye])) {
                                                    Y = !1;
                                                    break
                                                }
                                                te = te.replace(ee[ye], "")
                                            }
                                    }
                                    if (0 > U && !Y) continue;
                                    if (this.options.offset && 0 !== U) continue;
                                    if (X) {
                                        if (J = X.call(this, V, Z), void 0 === J) break;
                                        if (!J) continue;
                                        "object" == typeof J && (V = J)
                                    }
                                }
                                if (this.resultCount++, this.resultCountPerGroup[ae]++, this.resultItemCount < re) {
                                    if (le && this.tmpResult[ae].length >= le) break;
                                    this.tmpResult[ae].push(R.extend(!0, {
                                        matchedKey: W[fe]
                                    }, V)), this.resultItemCount++
                                }
                                break
                            }
                            if (!this.options.callback.onResult) {
                                if (this.resultItemCount >= re) break;
                                if (le && this.tmpResult[ae].length >= le && "group" === ne) break
                            }
                        }
                }
            if (this.options.debug && (this.helper.isEmpty(ce) || (_debug.log({
                    node: this.selector,
                    "function": "searchResult()",
                    arguments: JSON.stringify(ce),
                    message: "Missing keys for display, make sure options.display is set properly."
                }), _debug.print())), this.options.order) {
                var ke, W = [];
                for (var H in this.tmpResult)
                    if (this.tmpResult.hasOwnProperty(H)) {
                        for (var ue = 0, de = this.tmpResult[H].length; de > ue; ue++) ke = this.options.source[this.tmpResult[H][ue].group].display || this.options.display, ~W.indexOf(ke[0]) || W.push(ke[0]);
                        this.tmpResult[H].sort(oe.helper.sort(W, "asc" === oe.options.order, function(Ce) {
                            return Ce.toString().toUpperCase()
                        }))
                    }
            }
            var xe = [],
                ve = [];
            ve = "function" == typeof this.options.groupOrder ? this.options.groupOrder.apply(this, [this.node, this.query, this.tmpResult, this.resultCount, this.resultCountPerGroup]) : Array.isArray(this.options.groupOrder) ? this.options.groupOrder : "string" == typeof this.options.groupOrder && ~["asc", "desc"].indexOf(this.options.groupOrder) ? Object.keys(this.tmpResult).sort(oe.helper.sort([], "asc" === oe.options.groupOrder, function(Ce) {
                return Ce.toString().toUpperCase()
            })) : Object.keys(this.tmpResult);
            for (var ue = 0, de = ve.length; de > ue; ue++) xe = xe.concat(this.tmpResult[ve[ue]] || []);
            this.groups = JSON.parse(JSON.stringify(ve)), this.result = xe
        },
        buildLayout: function() {
            this.buildHtmlLayout(), this.buildBackdropLayout(), this.buildHintLayout(), this.options.callback.onLayoutBuiltBefore && this.helper.executeCallback.call(this, this.options.callback.onLayoutBuiltBefore, [this.node, this.query, this.result, this.resultHtml]), this.resultHtml instanceof R && this.resultContainer.html(this.resultHtml), this.options.callback.onLayoutBuiltAfter && this.helper.executeCallback.call(this, this.options.callback.onLayoutBuiltAfter, [this.node, this.query, this.result])
        },
        buildHtmlLayout: function() {
            if (!1 !== this.options.resultContainer) {
                this.resultContainer || (this.resultContainer = R("<div/>", {
                    "class": this.options.selector.result
                }), this.container.append(this.resultContainer));
                var H;
                if (!this.result.length)
                    if (this.options.multiselect && this.options.multiselect.limit && this.items.length >= this.options.multiselect.limit) H = this.options.multiselect.limitTemplate ? "function" == typeof this.options.multiselect.limitTemplate ? this.options.multiselect.limitTemplate.call(this, this.query) : this.options.multiselect.limitTemplate.replace(/\{\{query}}/gi, R("<div>").text(this.helper.cleanStringFromScript(this.query)).html()) : "Can't select more than " + this.items.length + " items.";
                    else {
                        if (!this.options.emptyTemplate || "" === this.query) return;
                        H = "function" == typeof this.options.emptyTemplate ? this.options.emptyTemplate.call(this, this.query) : this.options.emptyTemplate.replace(/\{\{query}}/gi, R("<div>").text(this.helper.cleanStringFromScript(this.query)).html())
                    }
                var V = this.query.toLowerCase();
                this.options.accent && (V = this.helper.removeAccent.call(this, V));
                var U = this,
                    z = this.groupTemplate || "<ul></ul>",
                    W = !1;
                this.groupTemplate ? z = R(z.replace(/<([^>]+)>\{\{(.+?)}}<\/[^>]+>/g, function(se, ce, pe) {
                    var ge = "",
                        me = "group" === pe ? U.groups : [pe];
                    if (!U.result.length) return !0 == W ? "" : (W = !0, "<" + ce + " class=\"" + U.options.selector.empty + "\">" + H + "</" + ce + ">");
                    for (var fe = 0, he = me.length; he > fe; ++fe) ge += "<" + ce + " data-group-template=\"" + me[fe] + "\"><ul></ul></" + ce + ">";
                    return ge
                })) : (z = R(z), this.result.length || z.append(H instanceof R ? H : "<li class=\"" + U.options.selector.empty + "\">" + H + "</li>")), z.addClass(this.options.selector.list + (this.helper.isEmpty(this.result) ? " empty" : ""));
                for (var Z, $, K, X, J, Y, ee, te, oe, ne, ae, ie = this.groupTemplate && this.result.length && U.groups || [], re = 0, le = this.result.length; le > re; ++re) K = this.result[re], Z = K.group, X = !this.options.multiselect && this.options.source[K.group].href || this.options.href, te = [], oe = this.options.source[K.group].display || this.options.display, this.options.group && (Z = K[this.options.group.key], this.options.group.template && ("function" == typeof this.options.group.template ? $ = this.options.group.template.call(this, K) : "string" == typeof this.options.group.template && ($ = this.options.group.template.replace(/\{\{([\w\-\.]+)}}/gi, function(se, ce) {
                        return U.helper.namespace.call(U, ce, K, "get", "")
                    }))), z.find("[data-search-group=\"" + Z + "\"]")[0] || (this.groupTemplate ? z.find("[data-group-template=\"" + Z + "\"] ul") : z).append(R("<li/>", {
                        "class": U.options.selector.group,
                        html: R("<a/>", {
                            href: "javascript:;",
                            html: $ || Z,
                            tabindex: -1
                        }),
                        "data-search-group": Z
                    }))), this.groupTemplate && ie.length && (ae = ie.indexOf(Z || K.group), ~ae && ie.splice(ae, 1)), J = R("<li/>", {
                        "class": U.options.selector.item + " " + U.options.selector.group + "-" + this.helper.slugify.call(this, Z),
                        disabled: !!K.disabled,
                        "data-group": Z,
                        "data-index": re,
                        html: R("<a/>", {
                            href: X && !K.disabled ? function(se, ce) {
                                return ce.href = U.generateHref.call(U, se, ce)
                            }(X, K) : "javascript:;",
                            html: function() {
                                if (Y = K.group && U.options.source[K.group].template || U.options.template) "function" == typeof Y && (Y = Y.call(U, U.query, K)), ee = Y.replace(/\{\{([^\|}]+)(?:\|([^}]+))*}}/gi, function(pe, ue, de) {
                                    var ge = U.helper.cleanStringFromScript(U.helper.namespace.call(U, ue, K, "get", "") + "");
                                    return de = de && de.split("|") || [], ~de.indexOf("slugify") && (ge = U.helper.slugify.call(U, ge)), ~de.indexOf("raw") || !0 === U.options.highlight && V && ~oe.indexOf(ue) && (ge = U.helper.highlight.call(U, ge, V.split(" "), U.options.accent)), ge
                                });
                                else {
                                    for (var se = 0, ce = oe.length; ce > se; se++) ne = /\./.test(oe[se]) ? U.helper.namespace.call(U, oe[se], K, "get", "") : K[oe[se]], "undefined" != typeof ne && "" !== ne && te.push(ne);
                                    ee = "<span class=\"" + U.options.selector.display + "\">" + U.helper.cleanStringFromScript(te.join(" ") + "") + "</span>"
                                }(!0 === U.options.highlight && V && !Y || "any" === U.options.highlight) && (ee = U.helper.highlight.call(U, ee, V.split(" "), U.options.accent)), R(this).append(ee)
                            }
                        })
                    }),
                    function(se, ce, pe) {
                        pe.on("click", function(ue, de) {
                            if (ce.disabled) return void ue.preventDefault();
                            if (de && "object" == typeof de && (ue.originalEvent = de), U.options.mustSelectItem && U.helper.isEmpty(ce)) return void ue.preventDefault();
                            if (U.options.multiselect ? (U.items.push(ce), U.comparedItems.push(U.getMultiselectComparedData(ce))) : U.item = ce, !1 !== U.helper.executeCallback.call(U, U.options.callback.onClickBefore, [U.node, R(this), ce, ue]) && !(ue.originalEvent && ue.originalEvent.defaultPrevented || ue.isDefaultPrevented())) {
                                var ge = U.getTemplateValue.call(U, ce);
                                U.options.multiselect ? (U.query = U.rawQuery = "", U.addMultiselectItemLayout(ge)) : (U.focusOnly = !0, U.query = U.rawQuery = ge, U.isContentEditable && (U.node.text(U.query), U.helper.setCaretAtEnd(U.node[0]))), U.hideLayout(), U.node.val(U.query).focus(), U.helper.executeCallback.call(U, U.options.callback.onClickAfter, [U.node, R(this), ce, ue])
                            }
                        }), pe.on("mouseenter", function(ue) {
                            ce.disabled || (U.clearActiveItem(), U.addActiveItem(R(this))), U.helper.executeCallback.call(U, U.options.callback.onEnter, [U.node, R(this), ce, ue])
                        }), pe.on("mouseleave", function(ue) {
                            ce.disabled || U.clearActiveItem(), U.helper.executeCallback.call(U, U.options.callback.onLeave, [U.node, R(this), ce, ue])
                        })
                    }(re, K, J), (this.groupTemplate ? z.find("[data-group-template=\"" + Z + "\"] ul") : z).append(J);
                if (this.result.length && ie.length)
                    for (var re = 0, le = ie.length; le > re; ++re) z.find("[data-group-template=\"" + ie[re] + "\"]").remove();
                this.resultHtml = z
            }
        },
        generateHref: function(H, V) {
            var U = this;
            return "string" == typeof H ? H = H.replace(/\{\{([^\|}]+)(?:\|([^}]+))*}}/gi, function(z, W, Z) {
                var $ = U.helper.namespace.call(U, W, V, "get", "");
                return Z = Z && Z.split("|") || [], ~Z.indexOf("slugify") && ($ = U.helper.slugify.call(U, $)), $
            }) : "function" == typeof H && (H = H.call(this, V)), H
        },
        getMultiselectComparedData: function(H) {
            var V = "";
            if (Array.isArray(this.options.multiselect.matchOn))
                for (var U = 0, z = this.options.multiselect.matchOn.length; z > U; ++U) V += "undefined" == typeof H[this.options.multiselect.matchOn[U]] ? "" : H[this.options.multiselect.matchOn[U]];
            else {
                for (var W = JSON.parse(JSON.stringify(H)), Z = ["group", "matchedKey", "compiled", "href"], U = 0, z = Z.length; z > U; ++U) delete W[Z[U]];
                V = JSON.stringify(W)
            }
            return V
        },
        buildBackdropLayout: function() {
            this.options.backdrop && (this.backdrop.container || (this.backdrop.css = R.extend({
                opacity: .6,
                filter: "alpha(opacity=60)",
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                "z-index": 1040,
                "background-color": "#000"
            }, this.options.backdrop), this.backdrop.container = R("<div/>", {
                "class": this.options.selector.backdrop,
                css: this.backdrop.css
            }).insertAfter(this.container)), this.container.addClass("backdrop").css({
                "z-index": this.backdrop.css["z-index"] + 1,
                position: "relative"
            }))
        },
        buildHintLayout: function(H) {
            if (this.options.hint) {
                if (this.node[0].scrollWidth > Math.ceil(this.node.innerWidth())) return void(this.hint.container && this.hint.container.val(""));
                var V = this,
                    U = "",
                    H = H || this.result,
                    z = this.query.toLowerCase();
                if (this.options.accent && (z = this.helper.removeAccent.call(this, z)), this.hintIndex = null, this.searchGroups.length) {
                    if (this.hint.container || (this.hint.css = R.extend({
                            "border-color": "transparent",
                            position: "absolute",
                            top: 0,
                            display: "inline",
                            "z-index": -1,
                            float: "none",
                            color: "silver",
                            "box-shadow": "none",
                            cursor: "default",
                            "-webkit-user-select": "none",
                            "-moz-user-select": "none",
                            "-ms-user-select": "none",
                            "user-select": "none"
                        }, this.options.hint), this.hint.container = R("<" + this.node[0].nodeName + "/>", {
                            type: this.node.attr("type"),
                            "class": this.node.attr("class"),
                            readonly: !0,
                            unselectable: "on",
                            "aria-hidden": "true",
                            tabindex: -1,
                            click: function() {
                                V.node.focus()
                            }
                        }).addClass(this.options.selector.hint).css(this.hint.css).insertAfter(this.node), this.node.parent().css({
                            position: "relative"
                        })), this.hint.container.css("color", this.hint.css.color), z)
                        for (var W, Z, $, K = 0, X = H.length; X > K; K++)
                            if (!H[K].disabled) {
                                Z = H[K].group, W = this.options.source[Z].display || this.options.display;
                                for (var J = 0, Y = W.length; Y > J; J++)
                                    if ($ = (H[K][W[J]] + "").toLowerCase(), this.options.accent && ($ = this.helper.removeAccent.call(this, $)), 0 === $.indexOf(z)) {
                                        U = H[K][W[J]] + "", this.hintIndex = K;
                                        break
                                    }
                                if (null !== this.hintIndex) break
                            }
                    var ee = 0 < U.length && this.rawQuery + U.substring(this.query.length) || "";
                    this.hint.container.val(ee), this.isContentEditable && this.hint.container.text(ee)
                }
            }
        },
        buildDropdownLayout: function() {
            if (this.options.dropdownFilter) {
                var H = this;
                R("<span/>", {
                    "class": this.options.selector.filter,
                    html: function() {
                        R(this).append(R("<button/>", {
                            type: "button",
                            "class": H.options.selector.filterButton,
                            style: "display: none;",
                            click: function() {
                                H.container.toggleClass("filter");
                                var V = H.namespace + "-dropdown-filter";
                                R("html").off(V), H.container.hasClass("filter") && R("html").on("click" + V + " touchend" + V, function(U) {
                                    R(U.target).closest("." + H.options.selector.filter)[0] && R(U.target).closest(H.container)[0] || H.hasDragged || (H.container.removeClass("filter"), R("html").off(V))
                                })
                            }
                        })), R(this).append(R("<ul/>", {
                            "class": H.options.selector.dropdown
                        }))
                    }
                }).insertAfter(H.container.find("." + H.options.selector.query))
            }
        },
        buildDropdownItemLayout: function(H) {
            function V(ee) {
                "*" === ee.value ? delete this.filters.dropdown : this.filters.dropdown = ee, this.container.removeClass("filter").find("." + this.options.selector.filterButton).html(ee.template), this.isDropdownEvent = !0, this.node.trigger("search" + this.namespace), this.options.multiselect && this.adjustInputSize(), this.node.focus()
            }
            if (this.options.dropdownFilter) {
                var U, z, W = this,
                    Z = "string" == typeof this.options.dropdownFilter && this.options.dropdownFilter || "All",
                    $ = this.container.find("." + this.options.selector.dropdown);
                "static" !== H || !0 !== this.options.dropdownFilter && "string" != typeof this.options.dropdownFilter || this.dropdownFilter["static"].push({
                    key: "group",
                    template: "{{group}}",
                    all: Z,
                    value: Object.keys(this.options.source)
                });
                for (var K = 0, X = this.dropdownFilter[H].length; X > K; K++) {
                    z = this.dropdownFilter[H][K], Array.isArray(z.value) || (z.value = [z.value]), z.all && (this.dropdownFilterAll = z.all);
                    for (var J = 0, Y = z.value.length; Y >= J; J++)(J !== Y || K === X - 1) && (J === Y && K === X - 1 && "static" === H && this.dropdownFilter.dynamic.length || (U = this.dropdownFilterAll || Z, z.value[J] ? U = z.template ? z.template.replace(new RegExp("{{" + z.key + "}}", "gi"), z.value[J]) : z.value[J] : this.container.find("." + W.options.selector.filterButton).html(U), function(ee, te, oe) {
                        $.append(R("<li/>", {
                            "class": W.options.selector.dropdownItem + " " + W.helper.slugify.call(W, te.key + "-" + (te.value[ee] || Z)),
                            html: R("<a/>", {
                                href: "javascript:;",
                                html: oe,
                                click: function(ne) {
                                    ne.preventDefault(), V.call(W, {
                                        key: te.key,
                                        value: te.value[ee] || "*",
                                        template: oe
                                    })
                                }
                            })
                        }))
                    }(J, z, U)))
                }
                this.dropdownFilter[H].length && this.container.find("." + W.options.selector.filterButton).removeAttr("style")
            }
        },
        dynamicFilter: {
            isEnabled: !1,
            init: function() {
                this.options.dynamicFilter && (this.dynamicFilter.bind.call(this), this.dynamicFilter.isEnabled = !0)
            },
            validate: function(H) {
                var V, U, z = null,
                    W = null;
                for (var Z in this.filters.dynamic)
                    if (this.filters.dynamic.hasOwnProperty(Z) && (U = ~Z.indexOf(".") ? this.helper.namespace.call(this, Z, H, "get") : H[Z], "|" !== this.filters.dynamic[Z].modifier || z || (z = U == this.filters.dynamic[Z].value || !1), "&" === this.filters.dynamic[Z].modifier)) {
                        if (U != this.filters.dynamic[Z].value) {
                            W = !1;
                            break
                        }
                        W = !0
                    }
                return V = z, null !== W && (V = W, !0 === W && null !== z && (V = z)), !!V
            },
            set: function(H, V) {
                var U = H.match(/^([|&])?(.+)/);
                V ? this.filters.dynamic[U[2]] = {
                    modifier: U[1] || "|",
                    value: V
                } : delete this.filters.dynamic[U[2]], this.dynamicFilter.isEnabled && this.generateSource()
            },
            bind: function() {
                for (var H, V = this, U = 0, z = this.options.dynamicFilter.length; z > U; U++) H = this.options.dynamicFilter[U], "string" == typeof H.selector && (H.selector = R(H.selector)), H.selector instanceof R && H.selector[0] && H.key ? ! function(W) {
                    W.selector.off(V.namespace).on("change" + V.namespace, function() {
                        V.dynamicFilter.set.apply(V, [W.key, V.dynamicFilter.getValue(this)])
                    }).trigger("change" + V.namespace)
                }(H) : this.options.debug && (_debug.log({
                    node: this.selector,
                    "function": "buildDynamicLayout()",
                    message: "Invalid jQuery selector or jQuery Object for \"filter.selector\" or missing filter.key"
                }), _debug.print())
            },
            getValue: function(H) {
                var V;
                return "SELECT" === H.tagName ? V = H.value : "INPUT" === H.tagName && ("checkbox" === H.type ? V = H.checked && H.getAttribute("value") || H.checked || null : "radio" === H.type && H.checked && (V = H.value)), V
            }
        },
        buildMultiselectLayout: function() {
            if (this.options.multiselect) {
                var H, V = this;
                this.label.container = R("<span/>", {
                    "class": this.options.selector.labelContainer,
                    "data-padding-left": parseFloat(this.node.css("padding-left")) || 0,
                    "data-padding-right": parseFloat(this.node.css("padding-right")) || 0,
                    "data-padding-top": parseFloat(this.node.css("padding-top")) || 0,
                    click: function(U) {
                        R(U.target).hasClass(V.options.selector.labelContainer) && V.node.focus()
                    }
                }), this.node.closest("." + this.options.selector.query).prepend(this.label.container), this.options.multiselect.data && (Array.isArray(this.options.multiselect.data) ? this.populateMultiselectData(this.options.multiselect.data) : "function" == typeof this.options.multiselect.data && (H = this.options.multiselect.data.call(this), Array.isArray(H) ? this.populateMultiselectData(H) : "function" == typeof H.promise && R.when(H).then(function(U) {
                    U && Array.isArray(U) && V.populateMultiselectData(U)
                })))
            }
        },
        isMultiselectUniqueData: function(H) {
            for (var V = !0, U = 0, z = this.comparedItems.length; z > U; ++U)
                if (this.comparedItems[U] === this.getMultiselectComparedData(H)) {
                    V = !1;
                    break
                }
            return V
        },
        populateMultiselectData: function(H) {
            for (var V = 0, U = H.length; U > V; ++V) this.isMultiselectUniqueData(H[V]) && (this.items.push(H[V]), this.comparedItems.push(this.getMultiselectComparedData(H[V])), this.addMultiselectItemLayout(this.getTemplateValue(H[V])));
            this.node.trigger("search" + this.namespace, {
                origin: "populateMultiselectData"
            })
        },
        addMultiselectItemLayout: function(H) {
            var V = this,
                U = this.options.multiselect.href ? "a" : "span",
                z = R("<span/>", {
                    "class": this.options.selector.label,
                    html: R("<" + U + "/>", {
                        text: H,
                        click: function(W) {
                            var Z = R(this).closest("." + V.options.selector.label),
                                $ = V.label.container.find("." + V.options.selector.label).index(Z);
                            V.options.multiselect.callback && V.helper.executeCallback.call(V, V.options.multiselect.callback.onClick, [V.node, V.items[$], W])
                        },
                        href: this.options.multiselect.href ? function(W) {
                            return V.generateHref.call(V, V.options.multiselect.href, W)
                        }(V.items[V.items.length - 1]) : null
                    })
                });
            z.append(R("<span/>", {
                "class": this.options.selector.cancelButton,
                html: "\xD7",
                click: function(W) {
                    var Z = R(this).closest("." + V.options.selector.label),
                        $ = V.label.container.find("." + V.options.selector.label).index(Z);
                    V.cancelMultiselectItem($, Z, W)
                }
            })), this.label.container.append(z), this.adjustInputSize()
        },
        cancelMultiselectItem: function(H, V, U) {
            var z = this.items[H];
            V = V || this.label.container.find("." + this.options.selector.label).eq(H), V.remove(), this.items.splice(H, 1), this.comparedItems.splice(H, 1), this.options.multiselect.callback && this.helper.executeCallback.call(this, this.options.multiselect.callback.onCancel, [this.node, z, U]), this.adjustInputSize(), this.focusOnly = !0, this.node.focus().trigger("input" + this.namespace, {
                origin: "cancelMultiselectItem"
            })
        },
        adjustInputSize: function() {
            var H = this.node[0].getBoundingClientRect().width - (parseFloat(this.label.container.data("padding-right")) || 0) - (parseFloat(this.label.container.css("padding-left")) || 0),
                V = 0,
                U = 0,
                z = 0,
                W = !1,
                Z = 0;
            this.label.container.find("." + this.options.selector.label).filter(function(X, J) {
                0 === X && (Z = R(J)[0].getBoundingClientRect().height + parseFloat(R(J).css("margin-bottom") || 0)), V = R(J)[0].getBoundingClientRect().width + parseFloat(R(J).css("margin-right") || 0), z + V > .7 * H && !W && (U++, W = !0), H > z + V ? z += V : (W = !1, z = V)
            });
            var $ = parseFloat(this.label.container.data("padding-left") || 0) + (W ? 0 : z),
                K = U * Z + parseFloat(this.label.container.data("padding-top") || 0);
            this.container.find("." + this.options.selector.query).find("input, textarea, [contenteditable], .fta__hint").css({
                paddingLeft: $,
                paddingTop: K
            })
        },
        showLayout: function() {
            !this.container.hasClass("result") && (this.result.length || this.options.emptyTemplate || this.options.backdropOnFocus) && (function() {
                var V = this;
                R("html").off("keydown" + this.namespace).on("keydown" + this.namespace, function(U) {
                    U.keyCode && 9 === U.keyCode && setTimeout(function() {
                        R(":focus").closest(V.container).find(V.node)[0] || V.hideLayout()
                    }, 0)
                }), R("html").off("click" + this.namespace + " touchend" + this.namespace).on("click" + this.namespace + " touchend" + this.namespace, function(U) {
                    R(U.target).closest(V.container)[0] || R(U.target).closest("." + V.options.selector.item)[0] || U.target.className === V.options.selector.cancelButton || V.hasDragged || V.hideLayout()
                })
            }.call(this), this.container.addClass([this.result.length || this.searchGroups.length && this.options.emptyTemplate && this.query.length ? "result " : "", this.options.hint && this.searchGroups.length ? "hint" : "", this.options.backdrop || this.options.backdropOnFocus ? "backdrop" : ""].join(" ")), this.helper.executeCallback.call(this, this.options.callback.onShowLayout, [this.node, this.query]))
        },
        hideLayout: function() {
            (this.container.hasClass("result") || this.container.hasClass("backdrop")) && (this.container.removeClass("result hint filter" + (this.options.backdropOnFocus && R(this.node).is(":focus") ? "" : " backdrop")), this.options.backdropOnFocus && this.container.hasClass("backdrop") || (R("html").off(this.namespace), this.helper.executeCallback.call(this, this.options.callback.onHideLayout, [this.node, this.query])))
        },
        resetLayout: function() {
            this.result = [], this.tmpResult = {}, this.groups = [], this.resultCount = 0, this.resultCountPerGroup = {}, this.resultItemCount = 0, this.resultHtml = null, this.options.hint && this.hint.container && (this.hint.container.val(""), this.isContentEditable && this.hint.container.text(""))
        },
        resetInput: function() {
            this.node.val(""), this.isContentEditable && this.node.text(""), this.item = null, this.query = "", this.rawQuery = ""
        },
        buildCancelButtonLayout: function() {
            if (this.options.cancelButton) {
                var H = this;
                R("<span/>", {
                    "class": this.options.selector.cancelButton,
                    html: "\xD7",
                    mousedown: function(V) {
                        V.stopImmediatePropagation(), V.preventDefault(), H.resetInput(), H.node.trigger("input" + H.namespace, [V])
                    }
                }).insertBefore(this.node)
            }
        },
        toggleCancelButtonVisibility: function() {
            this.container.toggleClass("cancel", !!this.query.length)
        },
        __construct: function() {
            this.extendOptions(), this.unifySourceFormat() && (this.dynamicFilter.init.apply(this), this.init(), this.buildDropdownLayout(), this.buildDropdownItemLayout("static"), this.buildMultiselectLayout(), this.delegateEvents(), this.buildCancelButtonLayout(), this.helper.executeCallback.call(this, this.options.callback.onReady, [this.node]))
        },
        helper: {
            isEmpty: function(H) {
                for (var V in H)
                    if (H.hasOwnProperty(V)) return !1;
                return !0
            },
            removeAccent: function(H) {
                if ("string" == typeof H) {
                    var V = B;
                    return "object" == typeof this.options.accent && (V = this.options.accent), H = H.toLowerCase().replace(new RegExp("[" + V.from + "]", "g"), function(U) {
                        return V.to[V.from.indexOf(U)]
                    })
                }
            },
            slugify: function(H) {
                return H = H + "", "" !== H && (H = this.helper.removeAccent.call(this, H), H = H.replace(/[^-a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")), H
            },
            sort: function(H, V, U) {
                var z = function(W) {
                    for (var Z = 0, $ = H.length; $ > Z; Z++)
                        if ("undefined" != typeof W[H[Z]]) return U(W[H[Z]]);
                    return W
                };
                return V = [-1, 1][+!!V],
                    function(W, Z) {
                        return W = z(W), Z = z(Z), V * ((W > Z) - (Z > W))
                    }
            },
            replaceAt: function(H, V, U, z) {
                return H.substring(0, V) + z + H.substring(V + U)
            },
            highlight: function(H, V, U) {
                H = H + "";
                var z = U && this.helper.removeAccent.call(this, H) || H,
                    W = [];
                Array.isArray(V) || (V = [V]), V.sort(function($, K) {
                    return K.length - $.length
                });
                for (var Z = V.length - 1; 0 <= Z; Z--) "" === V[Z].trim() ? V.splice(Z, 1) : V[Z] = V[Z].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                z.replace(new RegExp("(?:" + V.join("|") + ")(?!([^<]+)?>)", "gi"), function($, K, X) {
                    W.push({
                        offset: X,
                        length: $.length
                    })
                });
                for (var Z = W.length - 1; 0 <= Z; Z--) H = this.helper.replaceAt(H, W[Z].offset, W[Z].length, "<strong>" + H.substr(W[Z].offset, W[Z].length) + "</strong>");
                return H
            },
            getCaret: function(H) {
                var V = 0;
                if (H.selectionStart) return H.selectionStart;
                if (document.selection) {
                    var U = document.selection.createRange();
                    if (null === U) return V;
                    var z = H.createTextRange(),
                        W = z.duplicate();
                    z.moveToBookmark(U.getBookmark()), W.setEndPoint("EndToStart", z), V = W.text.length
                } else if (window.getSelection) {
                    var Z = window.getSelection();
                    if (Z.rangeCount) {
                        var $ = Z.getRangeAt(0);
                        $.commonAncestorContainer.parentNode == H && (V = $.endOffset)
                    }
                }
                return V
            },
            setCaretAtEnd: function(H) {
                if ("undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
                    var V = document.createRange();
                    V.selectNodeContents(H), V.collapse(!1);
                    var U = window.getSelection();
                    U.removeAllRanges(), U.addRange(V)
                } else if ("undefined" != typeof document.body.createTextRange) {
                    var z = document.body.createTextRange();
                    z.moveToElementText(H), z.collapse(!1), z.select()
                }
            },
            cleanStringFromScript: function(H) {
                return "string" == typeof H && H.replace(/<\/?(?:script|iframe)\b[^>]*>/gm, "") || H
            },
            executeCallback: function(H, V) {
                if (H) {
                    var U;
                    if ("function" == typeof H) U = H;
                    else if (("string" == typeof H || Array.isArray(H)) && ("string" == typeof H && (H = [H, []]), U = this.helper.namespace.call(this, H[0], window), "function" != typeof U)) return void(this.options.debug && (_debug.log({
                        node: this.selector,
                        "function": "executeCallback()",
                        arguments: JSON.stringify(H),
                        message: "WARNING - Invalid callback function\""
                    }), _debug.print()));
                    return U.apply(this, (H[1] || []).concat(V ? V : []))
                }
            },
            namespace: function(H, V, U, z) {
                if ("string" != typeof H || "" === H) return this.options.debug && (_debug.log({
                    node: this.options.input || this.selector,
                    "function": "helper.namespace()",
                    arguments: H,
                    message: "ERROR - Missing string\""
                }), _debug.print()), !1;
                var W = "undefined" == typeof z ? void 0 : z;
                if (!~H.indexOf(".")) return V[H] || W;
                for (var Z = H.split("."), $ = V || window, U = U || "get", K = "", X = 0, J = Z.length; J > X; X++) {
                    if (K = Z[X], "undefined" == typeof $[K]) {
                        if (~["get", "delete"].indexOf(U)) return "undefined" == typeof z ? void 0 : z;
                        $[K] = {}
                    }
                    if (~["set", "create", "delete"].indexOf(U) && X === J - 1) {
                        if ("set" !== U && "create" !== U) return delete $[K], !0;
                        $[K] = W
                    }
                    $ = $[K]
                }
                return $
            },
            typeWatch: function() {
                var H = 0;
                return function(V, U) {
                    clearTimeout(H), H = setTimeout(V, U)
                }
            }()
        }
    }, R.fn.fta = R.fta = function(H) {
        return Q.fta(this, H)
    };
    var Q = {
        fta: function(H, V) {
            if (!V || !V.source || "object" != typeof V.source) return _debug.log({
                node: H.selector || V && V.input,
                "function": "$.fta()",
                arguments: JSON.stringify(V && V.source || ""),
                message: "Undefined \"options\" or \"options.source\" or invalid source type - fta dropped"
            }), void _debug.print();
            if ("function" == typeof H) {
                if (!V.input) return _debug.log({
                    node: H.selector,
                    "function": "$.fta()",
                    message: "Undefined \"options.input\" - fta dropped"
                }), void _debug.print();
                H = R(V.input)
            }
            if ("undefined" == typeof H[0].value && (H[0].value = H.text()), !H.length) return _debug.log({
                node: H.selector,
                "function": "$.fta()",
                arguments: JSON.stringify(V.input),
                message: "Unable to find jQuery input element - fta dropped"
            }), void _debug.print();
            if (1 === H.length) return H[0].selector = H.selector || V.input || H[0].nodeName.toLowerCase(), window.fta[H[0].selector] = new N(H, V);
            for (var U, z = {}, W = 0, Z = H.length; Z > W; ++W) U = H[W].nodeName.toLowerCase(), "undefined" != typeof z[U] && (U += W), H[W].selector = U, window.fta[U] = z[U] = new N(H.eq(W), V);
            return z
        }
    };
    return window.console = window.console || {
        log: function() {}
    }, Array.isArray || (Array.isArray = function(H) {
        return "[object Array]" === Object.prototype.toString.call(H)
    }), "trim" in String.prototype || (String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }), "indexOf" in Array.prototype || (Array.prototype.indexOf = function(H, V) {
        void 0 === V && (V = 0), 0 > V && (V += this.length), 0 > V && (V = 0);
        for (var U = this.length; U > V; V++)
            if (V in this && this[V] === H) return V;
        return -1
    }), Object.keys || (Object.keys = function(H) {
        var V, U = [];
        for (V in H) Object.prototype.hasOwnProperty.call(H, V) && U.push(V);
        return U
    }), N
});
var display = ["Address", "City", "Zip"],
    template = "<span><{{img}}> </span><span>{{Address}}, {{City}}, CA, {{Zip}}</span>",
    Address = [],
    City = [],
    Zip = [];
o.forEach(function(R) {
    Address.push(R.Address), City.push(R.City), Zip.push(R.Zip)
}), City = City.filter(function(R, T, D) {
    return D.indexOf(R) == T
});
var data = {
    Address, City, Zip
};
let dropdownBedroom = 1,
    dropdownBathroom = 1;

$(document).ready(function() {
    try {
        $.fta({
            input: ".jst",
            minLength: 1,
            maxItem: 5,
            maxItemPerGroup: 5,
            order: "asc",
            hint: true,
            group: true,
            searchOnFocus: true,
            dropdownFilter: "<strong>All</strong>",
            emptyTemplate: 'no result for {{query}}',
            display: display,
            href: "/search?q={{Address}}",
            source: {
                "<strong>All</strong>": {
                    data: o,
                    template: template,
                    href: "/property?id={{Address}}",
                    source: o
                },
                "<strong>Address</strong>": {
                    data: data.Address,
                    href: "/property?id={{Address}}"
                },
                "<strong>City</strong>": {
                    data: data.City
                },
                "<strong>Zip Code</strong>": {
                    data: data.Zip
                }
            },
        });
    } catch (e) {}
    $('#top').hide();
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 10) {
            $('.n').addClass('change');
            $('#top').fadeIn();
        } else {
            $('.n').removeClass('change');
            $('#top').fadeOut();
        }
    });
    $('#top').on('click', function(e) {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
    });
    $('#goRight').on('click', function() {
        $('#slideBox').animate({
            'marginLeft': '0'
        });
        $('.topLayer').animate({
            'marginLeft': '100%'
        });
    });
    $('#goLeft').on('click', function() {
        $('#slideBox').animate({
            'marginLeft': '50%'
        });
        $('.topLayer').animate({
            'marginLeft': '0'
        });
    });
    $("#myModal").on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var titleData = button.data('title');
        var bodyData = button.data('body')
        if (titleData == 'Terms') {
            $("#recipient-name").hide();
            $("#send").hide();
        } else {
            $("#recipient-name").show();
            $("#send").show();
        }
        $(this).find('.modal-title').text(titleData);
        $(this).find('label.control-label').text(bodyData);
    });
    $('#password, #password2').on('keyup', function() {
        if ($('#password').val() == $('#password2').val()) {
            $('#msg').html('').css('color', 'green');
            $("#mySubmit").prop('disabled', false);
        } else {
            $('#msg').html('Passwords Do Not Match!').css('color', 'red');
            $("#mySubmit").prop('disabled', true);
        }
    });
    $("#low").on("click", function() {
        $('#price').text('Price: Low to High').wrapInner('<strong></strong>');
        $("li.card").sort(asc_sort).appendTo('#list');

        function asc_sort(a, b) {
            var p1 = parseInt($(a).text().replace(/[$,]/g, ''));
            var p2 = parseInt($(b).text().replace(/[$,]/g, ''));
            return p2 < p1 ? 1 : -1;
        }
    });
    $("#high").on("click", function() {
        $('#price').text('Price: High to Low').wrapInner('<strong></strong>');
        $("li.card").sort(des_sort).appendTo('#list');

        function des_sort(a, b) {
            var p1 = parseInt($(a).text().replace(/[$,]/g, ''));
            var p2 = parseInt($(b).text().replace(/[$,]/g, ''));
            return p2 > p1 ? 1 : -1;
        }
    });
    var filter = function() {
      $("li.card").show();
      $('#bd').text('Bedrooms: '+ dropdownBedroom +'+').wrapInner('<strong></strong>');
      $('#ba').text('Bathrooms: '+ dropdownBathroom +'+').wrapInner('<strong></strong>');
      $("li.card").show().filter(function getNum() {
        return (
          parseInt($(this).find('.bds').text()) < dropdownBedroom  ||
          parseInt($(this).find('.bas').text()) < dropdownBathroom
        );
      }).hide();
    };
    $("#dropbd .dropdown-item").on("click", function(){
      let bedrooms = $(this).data("value");
      dropdownBedroom = bedrooms;
      filter();
    });
    $("#dropba .dropdown-item").on("click", function(){
      let bathrooms = $(this).data("value");
      dropdownBathroom = bathrooms ;
      filter();
    });
});
