const env = {
  get mode() {
    return process.env.NODE_ENV
  },
  get prod() {
    return this.mode === 'production'
  },
  get dev() {
    return !this.prod
  }
}

module.exports = env
