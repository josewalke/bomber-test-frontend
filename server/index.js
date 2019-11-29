process.stdout.write('\x1Bc')
import config from '../.config.js'

const express = require('express')
const app = express()

/******************************************************
 * NUXT-EXPRESS CONFIGURATION (don't touch)
 *****************************************************/
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  // Build only in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(config.PORT, config.HOST)
  consola.ready({
    message: `Server listening on http://${config.HOST}:${config.PORT}`,
    badge: true
  })
}

start()
