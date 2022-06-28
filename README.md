# react-native-scrolling-images
![](https://img.shields.io/github/issues-raw/AndreYonadam/react-native-scrolling-images.svg)
[![npm version](http://img.shields.io/npm/v/react-native-scrolling-images.svg?style=flat)](https://www.npmjs.com/package/react-native-scrolling-images "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Easily create looping scrolling images for backgrounds and parallax.

## Features
- Supports scrolling in the up, down, left and right directions
- Custom scrolling speed
- Takes in an array of images to repeat
- Repeats image components automaticlly to fill the screen
- Smooth animations
- Lightweight
- Compatible with Expo

## Demo
[Link to live demo](https://snack.expo.io/@andreyonadam/react-native-scrolling-images-example)

Scrolling Up | Scrolling Down | Scrolling Left | Scrolling Right
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![](https://raw.githubusercontent.com/AndreYonadam/react-native-scrolling-images/master/demo/up.gif)  |  ![](https://raw.githubusercontent.com/AndreYonadam/react-native-scrolling-images/master/demo/down.gif)  |  ![](https://raw.githubusercontent.com/AndreYonadam/react-native-scrolling-images/master/demo/left.gif)  |  ![](https://raw.githubusercontent.com/AndreYonadam/react-native-scrolling-images/master/demo/right.gif)

## Installation
To install the latest version of react-native-scrolling-images run:
```bash
npm install react-native-scrolling-images
```

## Quick Start
```js
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import ScrollingBackground from 'react-native-scrolling-images';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollingBackground
          style={styles.scrollingBackground}
          speed={20}
          direction={"left"}
          images={[require("./assets/greenOrange.png"),require("./assets/blueOrange.png")]}
          useNativeDriver={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  scrollingBackground: {
    backgroundColor: "#0B7483"
  },
});
```

## API Reference

### Properties
| Prop | Description | Accepted Values | Required |
|---|---|---|---|
|**`speed`**|Duration it takes for the images to repeat (The lower the faster the animation). |**Number**|**Yes**|
|**`direction`**|Direction of scrolling. |"up", "down", "left" or "right"|**Yes**|
|**`images`**|Images stiched together to create the looping pattern. |Array of image references (Check quick start section for example).|**Yes**|
|**`useNativeDriver`**|Specify if the animation should perform natively. |**Boolean** (Defaults to `false`).|**No**|

### Styling
The only styling property used is 'backgroundColor'. This helps default to a background color in case the image doesn't load instantly.
## To-Do
- Auto rotating images when direction is "left" or "right". If the user picks one of these optinos currently, they might have to rotate the actual images manually depending on how they want them displayed.
- Figure out why there is slight delay on animation loop when Native Driver is enabled. When Native Driver is set to true for the current animations, there is a slight pause after the second animation.
