import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

const { cond, eq, add, call, set, Value, event, or } = Animated;

export default class CodeExperiment extends React.Component {
  constructor(props) {
    super(props);
    // You can pass these variables to the styles
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.absoluteY = new Value(200); // Use this value in multiple places
    this.gestureState = new Value(-1);
    // onGestureEvent is just mapping information
    this.onGestureEvent = event([
      {
        nativeEvent: {
          state: this.gestureState,
          absoluteY: this.absoluteY
        }
      }
    ]);

    // Create a new value by adding
    this.circleY = add(this.absoluteY, new Value(200));

    this.state = { dragging: false, y: 0 };
  }

  showCircle = ([]) => {
    this.setState({ dragging: true });
  };
  hideCircle = ([]) => {
    this.setState({ dragging: false });
  };
  getAbsoluteY_Value = ([y]) => {
    this.setState({ y });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Do stuff under conditions, like
         call a function, when the state in ACTIVE or END etc 
         */}
        <Animated.Code>
          {() =>
            cond(
              eq(this.gestureState, State.BEGAN),
              // In the array you can pass values
              call([], this.showCircle)
            )
          }
        </Animated.Code>
        <Animated.Code>
          {() =>
            cond(
              or(
                eq(this.gestureState, State.END),
                eq(this.gestureState, State.FAILED),
                eq(this.gestureState, State.CANCELLED)
              ),
              // In the array you can pass values
              call([], this.hideCircle)
            )
          }
        </Animated.Code>
        <Animated.Code>
          {() =>
            cond(
              eq(this.gestureState, State.ACTIVE),
              // In the array you can pass values
              call([this.absoluteY], this.getAbsoluteY_Value)
            )
          }
        </Animated.Code>
        {/* Note that you can not drag this circle, because
        // it's not in a PanGestureHandler.
        But, when you drag the text below, it will be dragged along. 
        ...Show circle when we drag the text*/}
        {this.state.dragging && (
          <Animated.View style={[styles.circle, { top: this.circleY }]} />
        )}
        {/* PanGestureHandler gives you events */}
        <PanGestureHandler
          maxPointers={1} // ?
          minDist={10}
          onGestureEvent={this.onGestureEvent}
          // onGestureEvent={e => console.log(e)}
          onHandlerStateChange={this.onGestureEvent}
        >
           {/* You create an Animated.View inside a PanGestureHandler,
            and then you can put anything you like in there */}
          <Animated.View
            style={[
              // styles.circle,
              { top: this.absoluteY }
            ]}
          >
            {/* <Text>anything</Text> */}
        <Text>Y: {this.state.y}</Text>
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
