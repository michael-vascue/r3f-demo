import React from 'react'
import NextApp from 'next/app'
import './styles.css'

export default class App extends NextApp {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public render() {
    const { Component, pageProps } = this.props

    return (
      <Component {...pageProps} />
    )
  }
}
