import React, { ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LogOut from "../../../assets/svg/LogOut";
import Logo from "../../../assets/svg/Logo";
import BackIcon from "../../../assets/svg/BackIcon";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { Navigation } from "../../constants/navigation";
import { colors } from "../../../assets/theme/colors";
import { useDispatch } from "react-redux";
import { clearBlockTicketResponse } from "../../store/actions/blockTicketAction";
import { clearStationsList } from "../../store/actions/linkedStationAction";
import { clearDestinationStation, clearOriginStation } from "../../store/actions/stationsAction";
import { clearTrip } from "../../store/actions/tripsAction";

export const HeaderTitle = (): ReactElement => {
  const title = "Kerala State Water Transport Department";
  const subTitle = "Government of Kerala";
  return(
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Logo width={40}></Logo>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export const HeaderLeft = (navigation: NavigationScreenProp<NavigationState,NavigationParams> ): ReactElement => {
  return <TouchableOpacity onPress={() => navigation.goBack()}>
    <BackIcon style={styles.marginLeft}></BackIcon>
  </TouchableOpacity>;
};

export const HeaderRight = (navigation: NavigationScreenProp<NavigationState,NavigationParams> ): ReactElement => {
  const dispatch = useDispatch();
  const onPress = (navigation:  NavigationScreenProp<NavigationState,NavigationParams> ):void => {
    dispatch(clearBlockTicketResponse());
    dispatch(clearTrip());
    dispatch(clearStationsList());
    dispatch(clearDestinationStation());
    dispatch(clearOriginStation());
    navigation.navigate(Navigation.Authorization);
  };
  return <TouchableOpacity onPress={() => onPress(navigation)}>
    <LogOut style={ styles.logoutIcon } ></LogOut>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    height: 30,
    marginLeft: 10
  },
  logoContainer: {
    flexDirection: "row",
    alignItems:"center"
  },
  marginLeft: {
    marginLeft:20
  },
  logoutIcon: {
    marginRight: 13
  },
  subTitle: {
    marginLeft: 5,
    fontSize: 8,
    fontWeight: "700",
    color: colors.Black,
    fontFamily: "Inter-SemiBoldItalic"
  },
  title: {
    fontSize: 11,
    bottom: 5,
    fontWeight: "700",
    color: colors.Black,
    fontFamily: "Inter-SemiBoldItalic"
  }
});