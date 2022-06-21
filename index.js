import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
  Easing
} from "react-native";

export default class ScrollingBackground extends Component {
  static defaultProps = {
    useNativeDriver: false // Run animations on the UI thread instead of the main thread. Might cause slight lag when loop restarts if enabled
	}
  constructor(props) {
    super(props);

    let imageComponents = []; // Store all image components to dynamiclly add
    let heightOfAllImages = 0; // Store sum of height of scaled images
    let heightOfAllImagesUnscaled = 0; // Store sum of height of unscaled images
    let counter = 0; // Counter to use as a key
    let deviceWidth = Dimensions.get("window").width;
    let deviceHeight = Dimensions.get("window").height;
    if (this.props.direction == "right" || this.props.direction == "left") {
      deviceWidth = Dimensions.get("window").height;
      deviceHeight = Dimensions.get("window").width;
    }
    this.props.images.forEach(image => {
      // Loop over each image passed in through props
      const { width, height } = Image.resolveAssetSource(image);

      let localElement = {}; // Create object for current image infromation
      let currentKey = "image" + counter.toString();
      localElement.width = width;
      localElement.height = (height * deviceWidth) / width;
      localElement.image = image;
      localElement.currentKey = currentKey;
      imageComponents.push(localElement);
      heightOfAllImages = heightOfAllImages + localElement.height;
      heightOfAllImagesUnscaled = heightOfAllImagesUnscaled + height;
      counter++;
    });

    let timesToDuplicate = Math.ceil(deviceHeight / heightOfAllImages); // Find out how many times we need to duplicate the image components we already created in order to fill the screen by the time the scrolling animations finishes
    for (let i = 0; i < timesToDuplicate + 1; i++) {
      this.props.images.forEach(image => {
        const { width, height } = Image.resolveAssetSource(image);


        let localElement = {};
        let currentKey = "image" + counter.toString();
        localElement.width = width;
        localElement.height = (height * deviceWidth) / width;
        localElement.image = image;
        localElement.currentKey = currentKey;
        imageComponents.push(localElement);
        counter++;
      });
    }
    let topPositionAnimated = new Animated.Value(0); // Top y translation starts at 0

    // Set the rotation
    let rotation = "0deg";
    switch (this.props.direction) {
      case "down":
        topPositionAnimated = new Animated.Value(-1 * heightOfAllImages); // Top y translation starts at 0
        break;

      case "right":
        topPositionAnimated = new Animated.Value(-1 * heightOfAllImages); // Left x translation starts at 0
        rotation = "-90deg";
        break;

      case "left":
        rotation = "-90deg";
        break;
      default:
        break;
    }

    this.state = {
      imageComponents: imageComponents,
      heightOfAllImages: heightOfAllImages,
      heightOfAllImagesUnscaled: heightOfAllImagesUnscaled,
      topPositionAnimated: topPositionAnimated,
      rotation: rotation
    };
    this.ready = true;
  }

  componentDidMount() {
    if (this.props.direction == "up" || this.props.direction == "left") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.topPositionAnimated, {
            toValue: -1 * this.state.heightOfAllImages,
            duration: this.props.speed * this.state.heightOfAllImagesUnscaled,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: this.props.useNativeDriver,
          }),
          Animated.timing(this.state.topPositionAnimated, {
            toValue: 0,
            duration: 0,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: this.props.useNativeDriver,
          })
        ])
      ).start();
    } else if (
      this.props.direction == "down" ||
      this.props.direction == "right"
    ) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.topPositionAnimated, {
            toValue: 0,
            duration: this.props.speed * this.state.heightOfAllImagesUnscaled,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: this.props.useNativeDriver,
          }),
          Animated.timing(this.state.topPositionAnimated, {
            toValue: -1 * this.state.heightOfAllImages,
            duration: 0,
            delay: 0,
            easing: Easing.linear,
            useNativeDriver: this.props.useNativeDriver,
          })
        ])
      ).start();
    }
  }

  render() {
    if (!this.ready) return null;
    let elements = [];
    for (imageComponent of this.state.imageComponents) {
      elements.push(
        <Image
          key={imageComponent.currentKey}
          source={imageComponent.image}
          style={{
            width: "100%",
            height: imageComponent.height,
            resizeMode: "stretch"
          }}
        />
      );
    }

    let translationObject = {};
    let width = "100%"
    let height = "100%"
    switch (this.props.direction) {
      case "left":
        translationObject.translateX = this.state.topPositionAnimated;
        width = 100*Dimensions.get("window").height/Dimensions.get("window").width + "%"
        height = 100*Dimensions.get("window").width/Dimensions.get("window").height + "%"
        break;

      case "right":
        translationObject.translateX = this.state.topPositionAnimated;
        width = 100*Dimensions.get("window").height/Dimensions.get("window").width + "%"
        height = 100*Dimensions.get("window").width/Dimensions.get("window").height + "%"
        break;
      default:
        translationObject.translateY = this.state.topPositionAnimated;
        break;
    }
    return (
      <Animated.View
        style={
          {
            width: width,
            height: height,
            transform: [
              translationObject,
              {
                rotate: this.state.rotation
              }
            ],
            backgroundColor: this.props.style.backgroundColor
          }
        }
      >
        {elements}
      </Animated.View>
    );
  }
}