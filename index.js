export default class Route {
    constructor(route) {
        let [path, ...query] = route.split(/\?(?!\})/);
        this.path = path.match(/[^\/]+/g) || [];
        this.query = {};
        (query.join("?").match(/[^\&]+/g) || []).forEach(item => {
            let position = item.search("="),
                param = item.slice(0, position >>> 0),
                value = position > -1 ? item.slice(position + 1) : undefined;
            this.query[param] = value;
        });
    }
    match(route) {
        let { path, query } = new this.constructor(route),
            state;

        state = this.parse(this.path, path);
        return state && this.parse(this.query, query, state);
    }
    parse(search, from, params = {}) {
        let size = 0,
            noSize,
            regExpression = /^\{([^\{\}]+)\}$/,
            regAny = /.+/,
            regParam = /((?:\.){3}){0,1}([^\?]+)(\?){0,1}$/;

        for (let index in search) {
            let cursor = from[index],
                status,
                issetCurso = index in from;
            search[index]
                .replace(regExpression, (context, expression) => {
                    expression.replace(
                        regParam,
                        (context, infinite, param, optional) => {
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
                                if (issetCurso) size++;
                            } else {
                                size++;
                                status = issetCurso;
                            }
                        }
                    );
                    return "";
                })
                .replace(regAny, context => {
                    status = context === cursor;
                    size++;
                });
            if (!status) return false;
        }
        return (noSize
          ? size <= Object.keys(from).length
          : size == Object.keys(from).length)
            ? params
            : false;
    }
}
