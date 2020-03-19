process.stdout.write('\x1Bc')

const express = require('express')
const app = express()

// STRIPE
// const stripe = require('stripe')('sk_test_I9y5Cytv97AlhMQIOCqNoVrF00Q2NJqGZ2')

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
  app.listen(process.env.PORT, process.env.HOST)
  consola.ready({
    message: `Server listening on http://${process.env.HOST}:${process.env.PORT}`,
    badge: true
  })
}

start()
