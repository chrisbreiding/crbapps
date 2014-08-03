require.config
  paths:
    rsvp: '../vendor/rsvp'
    react: '../vendor/react'

require ['react', './app', '../vendor/fastclick'], (React, App, FastClick)->
  FastClick.attach document.body

  React.renderComponent App(), document.getElementById('container')
