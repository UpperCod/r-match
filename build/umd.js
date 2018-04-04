(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.RMatch = factory());
}(this, (function () { 'use strict';

var Route = function Route(route) {
    var this$1 = this;

    var ref = route.split(/\?(?!\})/);
    var path = ref[0];
    var query = ref.slice(1);
    this.path = path.match(/[^\/]+/g) || [];
    this.query = {};
    (query.join("?").match(/[^\&]+/g) || []).forEach(function (item) {
        var position = item.search("="),
            param = item.slice(0, position >>> 0),
            value = position > -1 ? item.slice(position + 1) : undefined;
        this$1.query[param] = value;
    });
};
Route.prototype.match = function match (route) {
    var ref = new this.constructor(route);
        var path = ref.path;
        var query = ref.query;
        var state;

    state = this.parse(this.path, path);
    return state && this.parse(this.query, query, state);
};
Route.prototype.parse = function parse (search, from, params) {
        if ( params === void 0 ) params = {};

    var size = 0,
        noSize,
        regExpression = /^\{([^\{\}]+)\}$/,
        regAny = /.+/,
        regParam = /((?:\.){3}){0,1}([^\?]+)(\?){0,1}$/;

    var loop = function ( index ) {
        var cursor = from[index],
            status = (void 0),
            issetCurso = index in from;
        search[index]
            .replace(regExpression, function (context, expression) {
                expression.replace(
                    regParam,
                    function (context, infinite, param, optional) {
                        if (issetCurso) {
                            if (infinite) {
                                if (
                                    Array.isArray(search) &&
                                    Array.isArray(from)
                                ) {
                                    params[param] = from.slice(index);
                                } else {
                                    params[param] = from;
                                }
                                noSize = true;
                            } else {
                                params[param] = cursor;
                            }
                        }
                        if (optional) {
                            status = true;
                            if (issetCurso) { size++; }
                        } else {
                            size++;
                            status = issetCurso;
                        }
                    }
                );
                return "";
            })
            .replace(regAny, function (context) {
                status = context === cursor;
                size++;
            });
        if (!status) { return { v: false }; }
    };

        for (var index in search) {
            var returned = loop( index );

            if ( returned ) return returned.v;
        }
    return (noSize
      ? size <= Object.keys(from).length
      : size == Object.keys(from).length)
        ? params
        : false;
};

return Route;

})));
