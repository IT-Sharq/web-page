class RouterGenerate {
  constructor() {
    this.routes = {};
  }

  addRoute(uri, fn) {
    if (typeof uri !== 'string' || typeof fn !== 'function') {
      throw new TypeError('Invalid arguments. Expected a string and a function.');
    }

    this.routes[uri] = fn;
  }

  executeRoute(uri) {
    const routeFunction = this.routes[uri];
    if (routeFunction) {
      return routeFunction();
    }

    console.warn(`Route not found for URI: ${uri}`);
  }
}

module.exports = RouterGenerate;
