require.config
  paths:
    rsvp: '../vendor/rsvp'
    react: '../vendor/react'

require ['react', './app'], (React, App)->

  React.renderComponent App(), document.getElementById('container')
