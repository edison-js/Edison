<p align="center">

  <img width="300px" src="/public/images/icon.png" alt="Something nice img">

</p>

<h1 align="center">Edison</h1>

<p align="center">Edison can control microcontroller board with TypeScript or JavaScript!</p>

<div align="center">

  <a href="https://github.com/edison-js/Edison/stargazers">
    <img src="https://img.shields.io/github/stars/edison-js/Edison" alt="GitHub stars">
  </a>

[![NPM
version](https://img.shields.io/npm/v/edison.svg?style=flat)](https://www.npmjs.com/package/edison)
[![NPM
downloads](https://img.shields.io/npm/dm/edison.svg?style=flat)](https://www.npmjs.com/package/edison)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/edison-js/Edison/blob/main/LICENSE)

</div>

## Documentation

Our documentation site is [here](https://edison-js-document.vercel.app/)!

## If you have not yet installed the Arduino IDE ?

please click on [the official site](https://www.arduino.cc/en/software) and install it.

## How to use in WSL

Please read [this article](https://zenn.dev/konjikun/articles/e905f4ce99d3ea).

## Installation

Install Edison your project

```console
npm install edison
```

or

```console
yarn add edison
```

## Getting Started

```.ts
import { Board, Button, Led, render } from "edison"
import React from "react"

const App: React.FC = () => {
  return (
    <Board port={'/dev/ttyUSB0'}> // Please replace with your port
      <Led
        pin={13}
        blink={500}
      />
    </Board>
  )
}

render(<App />)
```

## Contributing

We love collaborating with folks inside and outside of GitHub and welcome contributions!

> 👉 [Discord](eHB5dBkZyW)
