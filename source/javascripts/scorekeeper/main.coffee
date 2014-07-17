require.config
  paths:
    jquery: '../vendor/jquery'
    lodash: '../vendor/lodash'
    rsvp: '../vendor/rsvp'
    react: '../vendor/react'

require ['react', './app'], (React, App)->

  React.renderComponent App(), document.getElementById('container')
