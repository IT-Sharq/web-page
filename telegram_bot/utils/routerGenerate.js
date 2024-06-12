class RouterGenerate {
  routs = {};

  addRout(uri, fn) {
    this.routs[uri] = fn;
  }
}

module.exports = RouterGenerate;
