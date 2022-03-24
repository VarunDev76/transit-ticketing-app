import React, { ReactElement, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../../assets/theme/colors";
import Passenger from "../../../assets/svg/Passengers";

export const Stepper: React.FC<{
  maxLimit: number,
  label: string,
  bubbleUpValue: (value: number) => void
}> = ({ maxLimit, label, bubbleUpValue }): ReactElement => {

  const [ counter, setCounter ] = useState(1);
  const increment = ():void => {
    if (counter < maxLimit) 
      setCounter(counter + 1);    
  };
  const decrement = (): void => {
    if (counter > 1) 
      setCounter(counter - 1);
  };

  useEffect(() => {
    bubbleUpValue(counter);
  }, [ counter ]);

  return (
    <View style={styles.container}>
      <Passenger style={styles.passengerIcon}></Passenger>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.incrementDecrement}>
        <View style={styles.button} onTouchStart={decrement}>
          <Text style={[ styles.black_color, styles.IconSize ]}>-</Text>
        </View>
        <Text style={styles.counter}>
          {counter}
        </Text>
        <View style={styles.button} onTouchStart={increment}>
          <Text style={[ styles.black_color, styles.IconSize ]}>+</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 20,
    height: 53,
    width: 350,
    borderColor: colors.Dim_Black,
    alignItems: "center"
  },
  button: {
    height: 30,
    width: 30,
    marginHorizontal:10,
    alignItems: "center",
    justifyContent: "center"
  },
  incrementDecrement: {
    marginLeft:40,
    flexDirection: "row",
    alignItems: "center"
  },
  passengerIcon: {
    marginLeft: 7,
    marginTop: 12
  },
  counter: {
    width: 20,
    fontSize: 14,
    color: colors.Black,
    fontWeight: "700",
    fontFamily: "Inter-Black"
  },
  label: {
    right: 20,
    left: 5,
    color: colors.Grey_Black
  },
  black_color: {
    fontWeight: "700",
    color: colors.Black,
    fontFamily: "Inter-Black"
  },
  IconSize: {
    fontSize: 18
  }
});
