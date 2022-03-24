import React, { ReactElement } from "react";
import { 
  StyleSheet,
  View,
  Dimensions,
  Text
} from "react-native";
import Header from "../../components/Header/Header";
import { Card } from "../../components/Card/Card";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import Slide from "../../../assets/svg/Slide";
import { Title } from "../../components/Title/Title";
import { Navigation } from "../../constants/navigation";
import  TicketValidator  from "../../../assets/svg/TicketValidator";
import  TicketCondutor  from "../../../assets/svg/TicketConductor";
import RightArrow from "../../../assets/svg/RightArrow";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const LandingScreen :React.FC<{
  navigation: NavigationScreenProp<NavigationState,NavigationParams>  
}> = ({ navigation }): ReactElement => {
  // const loginPageTitle = "Kerala State Water Transport Department";
  const issueTicketLabel = "Issue a new ticket";
  const validateTicketLabel = "Validate a ticket";
  const selectOneToContinue ="Select one to continue";
  return(
    <View style={styles.boxContainer}>
      <View  style={styles.header}>
        <Header navigation= {navigation} showLogOutButton={true} />
      </View>

      <View style={styles.Title}>
        <Text style={styles.titleHeading}>Kerala State Water</Text>
        <Text style={styles.titleHeading}>Transport Department</Text>
        {/* <Title label={"Kerala State"}></Title> */}
        {/* <Title label={"Water Transport Department"}></Title> */}
      </View>
      <Slide  style={styles.bannerImage}></Slide>
      <View style={styles.buttonBox}>
        <Text style={styles.landingHeading}>{selectOneToContinue}</Text>
        <View style={styles.buttonBoxMargin}>
          <Card 
            navigation= {navigation}
            navigationScreen= {Navigation.IssueTicket}
            label={issueTicketLabel}
            svgIcons={[ TicketCondutor, RightArrow ]}
          />
        </View>
          
        <View style={styles.buttonBoxMargin}>
          <Card 
            navigation= {navigation}
            navigationScreen= {Navigation.ValidateTicket}
            label={validateTicketLabel}
            svgIcons={[ TicketValidator, RightArrow ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    alignItems: "center",
    marginVertical:30,
    alignSelf: "center",
    width: width / 1.1,
    height: height-45
  },
  header: {
    marginTop: 10,
    width: width/1.1
  },
  Title:{
    position: "relative",
    widtj: "100%",
    marginTop: 20
  },
  titleHeading: {
    width: "100%",
    textAlign: "left",
    marginLeft: -130,
    marginBottom: 10,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "600",
    fontFamily: "Inter"
  },
  buttonBox: {
    marginTop: 100,
    width: width /1.1
  },
  bannerImage:{
    marginLeft: "22%"
  },
  landingHeading: {
    marginBottom: 15,
    fontSize: 18,
    lineHeight: 19,
    fontWeight: "600"
  },
  buttonBoxMargin: {
    marginVertical: 15,
    alignItems: "center",
    width: width /1.1
  }
});

export default LandingScreen;