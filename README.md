<p align="center">
  <img width="300px" src="./public/images/icon.png">
</p>

<h1 align="center">Edison</h1>

<p align="center">Edison can control Arduino with TypeScript or JavaScript!</p>

<p align="center">

</p>

## Documentation

Our documentation site is none now

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
import setup from "../utils/setup"

const main = async () => {
    const port = await setup();
    const led1 = port.led(9);

    await led1.on();
}

main();
```

## Contributing

We love collaborating with folks inside and outside of GitHub and welcome contributions!

> 👉 I'll create developers role on this project as soon as possible.
