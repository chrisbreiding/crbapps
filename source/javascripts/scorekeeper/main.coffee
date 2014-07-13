require.config
  paths:
    jquery: '../vendor/jquery'
    react: '../vendor/react'
    JSXTransformer: '../vendor/JSXTransformer'
    text: '../vendor/require-text'
    jsx: '../vendor/require-jsx'
  jsx:
    fileExtension: '.jsx'

require ['react', './app'], (React, App)->

  React.renderComponent App(), document.getElementById('container')
