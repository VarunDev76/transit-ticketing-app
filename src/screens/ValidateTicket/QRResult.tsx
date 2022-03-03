import React, { ReactElement, useState } from "react";
import {
  SafeAreaView,
  ScrollView, 
  Image,
  StyleSheet,
  Text,
  View, 
  Dimensions
} from "react-native";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button/Button";
import TicketDetails from "../../components/TicketDetail/TicketDetail";
import { clearBlockTicketResponse, clearTicketResponse } from "../../store/actions/blockTicketAction";
import { clearStationsLinkedToOrigin } from "../../store/actions/linkedStationAction";
import { clearDestinationStation, clearOriginStation } from "../../store/actions/stationsAction";
import { clearTrip } from "../../store/actions/tripsAction";
import { colors } from "../../../assets/theme/colors";
import { Navigation } from "../../constants/navigation";
import { State } from "../../store/reducers/reducer";

const height = Dimensions.get("window").height;

const ConfirmationBox = (): ReactElement => {
  return (
    <View>
      <View style={styles.confirmationIconWrapper}>
        <Image style={styles.confirmationIcon} source={require("../../../assets/icons/ticket-confirm.png")} />
      </View>
      <Text style={styles.confirmationTxt}>Your booking is confirmed.</Text>
    </View>
  );
};

const RejectionBox = (): ReactElement => {
  return (
    <View>
      <View style={styles.confirmationIconWrapper}>
        <Image style={styles.confirmationIcon} source={require("../../../assets/icons/RejectTicket.png")} />
      </View>
      <Text style={styles.confirmationTxt}>Your ticket is not valid.</Text>
    </View>
  );
};

export const ValidateTicketResult:React.FC<{
  navigation:  NavigationScreenProp<NavigationState,NavigationParams> 
}> = ({ navigation }): ReactElement => {

  const dispatch = useDispatch();
  const onPress = (navigation:  NavigationScreenProp<NavigationState,NavigationParams> ):void => {
    dispatch(clearBlockTicketResponse());
    dispatch(clearTrip());
    dispatch(clearStationsLinkedToOrigin());
    dispatch(clearDestinationStation());
    dispatch(clearOriginStation());
    dispatch(clearTicketResponse());
    navigation.navigate(Navigation.LandingScreen);
  };
  const { scanner_result, scanner_status } = useSelector((state: State) => state.clientScannerTicketResponse);
  const splitData = scanner_status && scanner_result.split(";");
  let customData = {
    base_fare: "",
    boat_id: "",
    created: "",
    dest_stop: "",
    doj: "",
    no: "",
    order_id: "",
    ori_stop: "",
    schedule_id: "",
    slot: "",
    trip_id: ""
  };
  // eslint-disable-next-line no-console
  // console.log(splitData, "splitData", scanner_status);
  scanner_status && splitData.map((item: any) => {
    let data = item.split(":");

    if(data[0] === "created"){
      data = [ data[0], `${data[1]} ${data[data.length-1]}` ];
    } 
    if(data[0] === "slot"){
      data = [ data[0], `${data[1].slice(0,2)}:${data[1].slice(2, data[1].length)}` ];
    } 
    customData = {
      ...customData,
      [data[0]]: data[1]
    };
    return customData;
  });
  const totalFare = scanner_status && Number(customData.base_fare) * Number(customData.no);
  const seats =  scanner_status && customData.no || 0;
  const selectedSlot = scanner_status && customData.slot || "No Time Sloted";
  const source = scanner_status && customData.ori_stop || "No Source ";
  const destination = scanner_status && customData.dest_stop || "No Destination";
  const initalFareDetail = { label: "Fare per person", value: scanner_status && `₹ ${customData.base_fare}` || 0 };
  const initalPassengerDetail = { label: "Quantity", value: scanner_status && customData.no || 0 };
  const initalTotalDetail = { label: "Total Fare", value: `₹ ${totalFare}` || 0 };
  const [ fareBreakUp ] = useState({
    totalAmount: initalTotalDetail,
    passengerCount: initalPassengerDetail,
    amount: initalFareDetail

  });
  const [ confirmStatus ] = useState(scanner_status);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[ styles.flexColumn, styles.container ]}>
          <View style={styles.mainContent}>
            {confirmStatus ? 
              <ConfirmationBox />:
              <RejectionBox />
            }

            {confirmStatus && (
              <>
                <View style={[ styles.flexRow, styles.ticketDetailsWrapper ]}>
                  <TicketDetails
                    origin={source}
                    destination={destination}
                    selectedSlot={selectedSlot}
                    totalPassengers={seats}
                  />
                </View>
                <View style={[ styles.flexRow, styles.ticketDetailsWrapper ]}>
                  <View style={styles.card}>
                    <Text style={[ styles.detailsHeader, styles.boldText ]}>Fare details</Text>
                    
                    <View style={[ styles.flexRow, styles.justifyContentBetween ]}>
                      <Text style={styles.detailsHeader}> {fareBreakUp.amount.label} </Text>
                      <Text style={styles.detailsHeader}>{fareBreakUp.amount.value}</Text>
                    </View>

                    <View style={[ styles.flexRow, styles.justifyContentBetween ]}>
                      <Text style={styles.detailsHeader}> {fareBreakUp.passengerCount.label} </Text>
                      <Text style={styles.detailsHeader}>{fareBreakUp.passengerCount.value}</Text>
                    </View>

                    <View style={[ styles.flexRow, styles.justifyContentBetween ]}>
                      <Text style={[ styles.detailsHeader, styles.boldText ]}> {fareBreakUp.totalAmount.label} </Text>
                      <Text style={[ styles.detailsHeader, styles.boldText ]}>{fareBreakUp.totalAmount.value}</Text>
                    </View>
                  </View>
                </View>
              </>  
            )}
          </View>
          
          <View style={[ styles.createTicketBtnParent ]}>
            <View style={[ styles.createTicketBtn, styles.flexRow ]}>
              <Button isTansparent={!confirmStatus} label="Scan Another Ticket" onPress={() => onPress(navigation)} />
            </View>

            {!confirmStatus && (
              <View style={[ styles.createTicketBtn, styles.flexRow ]}>
                <Button label="Book another TICKET" onPress={() => onPress(navigation)} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  justifyContentBetween: {
    justifyContent: "space-between"
  },
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    marginHorizontal: 15
  },
  mainContent: {
    flexGrow: 1
  },
  confirmationIconWrapper: {
    alignItems: "center",
    paddingTop: 60
  },
  confirmationIcon: {
    width: 86,
    height: 86
  },
  confirmationTxt: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
    paddingTop: 20,
    color: colors.Dim_Black,
    paddingBottom: 30
  },
  createTicketBtnParent: {
    flexDirection: "column",
    bottom: 100,
    width: 350,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center"
  },
  createTicketBtn: {
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  ticketDetailsWrapper: {
    justifyContent: "center"
  },
  card: {
    width: "100%",
    maxWidth: 330,
    borderRadius: 16,
    paddingHorizontal: 15,
    marginTop: 20,
    paddingVertical: 20,
    elevation: 5,
    shadowColor: colors.Black,
    backgroundColor: colors.White
  },
  detailsHeader: {
    paddingBottom: 10,
    fontWeight: "600",
    lineHeight: 22,
    color: colors.Grey_Black
  },
  boldText: {
    fontWeight: "500",
    fontFamily: "Inter"
  }
});

