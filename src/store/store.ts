import { createStore } from "redux";
import { combineReducers } from "redux";
import { bookTicketReducer } from "./reducers/blockTicketReducer";
import { scannerTicketReducer } from "./reducers/scannerTicketReducer";
import { linkedStationsToOriginReducer, stationListReducer } from "./reducers/stationListReducer";
import { destinationStationReducer, originStationReducer } from "./reducers/stationsReducer";
import { tripReducer } from "./reducers/tripReducer";


export const rootReducer  =  combineReducers({
  originStation: originStationReducer,
  destinationStation: destinationStationReducer,
  linkedStationsToOrigin : linkedStationsToOriginReducer,
  stations: stationListReducer,
  trip: tripReducer,
  clientBookTicketResponse: bookTicketReducer,
  clientScannerTicketResponse: scannerTicketReducer
});

export default createStore(rootReducer);