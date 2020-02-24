import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

const { cond, eq, add, call, set, Value, event } = Animated;

export default class CodeExperiment extends React.Component {
  constructor(props) {
    super(props);
    // You can pass these variables to the styles
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.offsetX = new Value(width / 2);
    this.offsetY = new Value(100);
    this.gestureState = new Value(-1);
    // onGestureEvent is just mapping information
    this.onGestureEvent = event([
      {
        nativeEvent: {
          translationX: this.dragX,
          translationY: this.dragY,
          state: this.gestureState
        }
      }
    ]);

    this.addY = add(this.offsetY, this.dragY);
    this.addX = add(this.offsetX, this.dragX);

    // this.transX = cond(
    //   eq(this.gestureState, State.ACTIVE),
    //   this.addX,
    //   set(this.offsetX, this.addX)
    // );

    this.transY = cond(eq(this.gestureState, State.ACTIVE), this.addY, [
      set(this.offsetY, this.addY)
    ]);
  }

  onDrop = ([x, y]) => {
    // alert(`You dropped at x: ${x} and y: ${y}!`);
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View>
          {() =>
            cond(
              eq(this.gestureState, State.END),
              call([this.addX, this.addY], this.onDrop)
            )
          }
        </Animated.View>
        {/* PanGestureHandler gives you events */}
        <PanGestureHandler
          maxPointers={1} // ?
          minDist={10}
          onGestureEvent={this.onGestureEvent}
          // onGestureEvent={e => console.log(e)}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={[
              // styles.circle,
              {
                transform: [
                  // {
                  //   translateX: this.transX
                  // },
                  {
                    translateY: this.transY
                  }
                ]
              }
            ]}
          >
            {/* You create an Animated.View inside a PanGestureHandler,
            and then you can put anything you like in there */}
            <Text>anything</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const CIRCLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  circle: {
    backgroundColor: "tomato",
    position: "absolute",
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: "#000"
  }
});
