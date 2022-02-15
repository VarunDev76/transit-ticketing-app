import React, { useState, ReactElement } from "react";
import {
  NativeModules, 
  Text, 
  View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { setQRScannerTicket } from "../../store/actions/blockTicketAction";
import { ClientScannerTicketRequest } from "../../request/clientScannerTicketRequest";
import BarcodeMask from "react-native-barcode-mask";
import { RNCamera } from "react-native-camera";
import { colors } from "../../../assets/theme/colors";
import FlashOff from "../../../assets/svg/FlashOff";
import FlashOn from "../../../assets/svg/FlashOn";
import { NavigationParams, NavigationScreenProp,NavigationState } from "react-navigation";
import { Navigation } from "../../constants/navigation";
import { atob } from "react-native-quick-base64";

const width = Dimensions.get("window").width;
// const SignatureModule = NativeModules.SignatureModule;
const CrypticModule = NativeModules.CrypticModule;

export const ValidateTicket: React.FC<{
  navigation: NavigationScreenProp<NavigationState,NavigationParams> 
}> = (
  { navigation }
) :ReactElement => {
  const [ flash, setFlash ] = useState(RNCamera.Constants.FlashMode.off);
  const [ scanned, setScanned ] = useState(false);
  const dispatch = useDispatch();

  const handleBarCodeScanned = async ( scanningResult: any ): Promise<void> => {
    try {
      if (!scanned) {
        const { data } = scanningResult;
        if(data) { 
          setScanned(true);
          try {
            const result = atob(data);
            if(result){
              const splitString = result.split(";");
              const signatureString = splitString[ splitString.length - 1 ].trim();
              const sliceSign = signatureString.slice(0, 10);
              const sliceMess = splitString.slice(0, splitString.length - 1).join(";");
              const obj= {
                sign: "",
                mess: ""
              };
              if(sliceSign === "signature:") {
                obj.mess = sliceMess;
                obj.sign = signatureString.slice(10, signatureString.length);
              }
              if(obj.mess === "" || obj.sign === "" ){
                // setTimeout(() => {
                //   setScanned(false);
                // }, 500);
                navigation.navigate(Navigation.ValidateTicketResult);
              }
              else{
                const pubKey = "h5W9FOm5C3POe7wQShwi+Uw7C8bMO5qiRSNHMgu/2vA=";
                // const id = await SignatureModule.verified(obj.mess, obj.sign);
                const id = await CrypticModule.verify(pubKey, obj.mess, obj.sign);
                // eslint-disable-next-line no-console
                console.log("id Calling::::::::::::::: ", id);
                if(id) {
                  const scannerTicketReq: ClientScannerTicketRequest = {
                    scanner_status: true,
                    scanner_result: obj.mess
                  };
                  // eslint-disable-next-line no-console
                  console.log("Calling::::::::::::::: ");
                  dispatch(setQRScannerTicket(scannerTicketReq));
                }
                navigation.navigate(Navigation.ValidateTicketResult);
                // setTimeout(() => {
                //   setScanned(false);
                // }, 500);
              }
            }
          } catch(er){
            // setTimeout(() => {
            //   setScanned(false);
            // }, 500);
            // eslint-disable-next-line no-console
            console.log("first catch Calling::::::::::::::: ");
            navigation.navigate(Navigation.ValidateTicketResult);
          }
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("last catch Calling::::::::::::::: ");
      // setTimeout(() => {
      //   setScanned(false);
      // }, 500);
      navigation.navigate(Navigation.ValidateTicketResult);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <RNCamera
          style={[ StyleSheet.absoluteFillObject, styles.container ]}
          // type={RNCamera.Constants.Type.back}
          flashMode={flash}
          ratio="16:9"
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
        >
          <BarcodeMask 
            width={280}
            height={280}
            edgeBorderWidth={15} 
            edgeRadius={25} 
            edgeWidth={80} 
            edgeHeight={70} 
            edgeColor="#FFF" 
            animatedLineColor={"#F8A388"}
            animatedLineHeight={8}
            animatedLineWidth={"110%"}
            showAnimatedLine
          />

          <Text style={styles.qrCodeText}> Place QR code </Text>
          <Text style={[ styles.qrCodeText, styles.qrCodeTextBottom ]}> in the box </Text>
          
          <View 
            style={styles.flashContainer}
            onTouchEndCapture={() => flash === RNCamera.Constants.FlashMode.torch ? 
              setFlash(RNCamera.Constants.FlashMode.off) :
              setFlash(RNCamera.Constants.FlashMode.torch) 
            }
          >
            {flash === RNCamera.Constants.FlashMode.torch ?
              <FlashOff /> :
              <FlashOn /> 
            }
          </View>
        </RNCamera>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 25
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  qrCodeText: {
    position: "absolute",
    color: colors.White,
    bottom: "20%",
    width: width,
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Inter-SemiBoldItalic"
  },
  qrCodeTextBottom: {
    bottom: "16.5%"
  },
  flashContainer: {
    position: "absolute",
    backgroundColor: colors.White,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: "10%",
    right: "10%"
  }
});
