import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import { useImmerReducer } from "use-immer";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

//react leafLet
import { MapContainer, TileLayer, Marker, useMap, Polygon } from 'react-leaflet'

//component
import { Login, Register } from '../../pages';

//context
import StateContext from "../../Context/StateContext";

//styles
import styles from "./addProperty.module.scss"

//MUI
import {
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  MenuItem
} from "@mui/material"
import Grid from '@mui/material/Grid2';
// import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';

//data property
import {
  bargainTypeOptions,
  listingTypeOptions,
  propertyTypeOptions,
  areaOptions,
  boroughOptions,
  propertyStatusOptions,
  BuildingFaceOptions,
  RoomNumberOptions,
  BuildingApearenceOptions,
  FloorCoveringOptions,
  KitchenApearenceOptions,
  WcTypeOptions,
  HeatingSystemOptions,
  coolingSystemOptions,
  houseDocumentStatusOptions,
  HouseDocumentTypeOptions,
  AdvertiserTypeOptions,
} from "./DataProperty"
import Card from "../card/Card";


import Region1 from "./Boroughs/Region1";
import Region2 from "./Boroughs/Region2";
import Region3 from "./Boroughs/Region3";
import Region4 from "./Boroughs/Region4";
import Region5 from "./Boroughs/Region5";
import Region6 from "./Boroughs/Region6";
import Region7 from "./Boroughs/Region7";
import Region8 from "./Boroughs/Region8";
import Region9 from "./Boroughs/Region9";
import Region10 from "./Boroughs/Region10";
import Region11 from "./Boroughs/Region11";
import Region12 from "./Boroughs/Region12";
import Region13 from "./Boroughs/Region13";
import Region14 from "./Boroughs/Region14";
import Region15 from "./Boroughs/Region15";
import Region16 from "./Boroughs/Region16";
import Region17 from "./Boroughs/Region17";
import Region18 from "./Boroughs/Region18";
import Region19 from "./Boroughs/Region19";
import Region20 from "./Boroughs/Region20";
import Region21 from "./Boroughs/Region21";
import Region22 from "./Boroughs/Region22";


// یک شیء برای نگاشت نام مناطق به فایل‌هایشان
const regionsMap = {
  "منطقه 1": Region1,
  "منطقه 2": Region2,
  "منطقه 3": Region3,
  "منطقه 4": Region4,
  "منطقه 5": Region5,
  "منطقه 6": Region6,
  "منطقه 7": Region7,
  "منطقه 8": Region8,
  "منطقه 9": Region9,
  "منطقه 10": Region10,
  "منطقه 11": Region11,
  "منطقه 12": Region12,
  "منطقه 13": Region13,
  "منطقه 14": Region14,
  "منطقه 15": Region15,
  "منطقه 16": Region16,
  "منطقه 17": Region17,
  "منطقه 18": Region18,
  "منطقه 19": Region19,
  "منطقه 20": Region20,
  "منطقه 21": Region21,
  "منطقه 22": Region22,
};





const useStyles = makeStyles({
  registrationStyle: {
    backgroundColor: "#82050f !important",
    border: "#82050f !important",
    color: "white !important",
    fontSize: "1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "gray !important"
    }
  },
  pictureBtn: {
    backgroundColor: "white !important",
    color: "black !important",
    fontSize: "0.8rem",
    marginLeft: "1rem",
    marginBottom: "15px",
    border: "2px dotted red !important",
  },

})







function AddProperty() {

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);


  const mapRef = useRef();
  const [bounds, setbounds] = useState([
    [-90, -180],
    [90, 180],
  ]);


  const classes = useStyles()
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)


  ///seting for state#####################################################################
  const initialState = {
    bargainTypeValue: "",
    listingTypeValue: "",
    propertyTypeValue: "",
    areaValue: "",
    boroughValue: "",
    latitudeValue: "",
    longitudeValue: "",
    areaMetereValue: "",
    buildingAgeValue: "",
    priceForSaleValue: "",
    rentPerMonthValue: "",
    numberOfFloorOfBuildingValue: "",
    numberOfUnitPerFloorValue: "",
    floorOfBuildingValue: "",
    roomNumberValue: "",
    nameOfPropertyOwnerValue: "",
    addressOfBuildingValue: "",
    descriptionValue: "",
    poolValue: false,
    elevatorValue: false,
    parkingValue: false,
    balconyValue: false,
    lobbyValue: false,
    guardValue: false,
    warehouseValue: false,
    jacuzziValue: false,
    propertyStatusValue: "",
    buildingFaceValue: "",
    buildingApearenceValue: "",
    floorCoveringValue: "",
    kitchenApearenceValue: "",
    wcTypeValue: "",
    heatingSystemValue: "",
    coolingSystemValue: "",
    houseDocumentStatusValue: "",
    houseDocumentTypeValue: "",
    advertiserTypeValue: "",
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
    picture6Value: "",
    uploadedPictures: [],
    mapInstance: null,
    markerPosition: {
      lat: "35.73087557318668",
      lng: "51.35107070174615",
    },
    sendRequest: 0,
    userProfile: {
      agencyName: "",
      phoneNumber: "",
    },
    openSnack: false,
    disabledBtn: false,
    bargainTypeErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    listingTypeErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    propertyTypeErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    areaErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    boroughErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    areaMetereErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    buildingAgeErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    priceForSaleErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    numberOfFloorOfBuildingErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    numberOfUnitPerFloorErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    floorOfBuildingErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    roomNumberErrors: {
      hasErrors: false,
      errorMessage: "",
    }

  }




  ///setting for action or in other words for set state##########################################
  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchBargianTypeChange":
        draft.bargainTypeValue = action.bargainTypeChose;
        draft.bargainTypeErrors.hasErrors = false;
        draft.bargainTypeErrors.errorMessage = "";
        break;
      case "catchListingTypeChange":
        draft.listingTypeValue = action.listingTypeChose;
        draft.listingTypeErrors.hasErrors = false;
        draft.listingTypeErrors.errorMessage = "";
        break;
      case "catchPropertyTypeChange":
        draft.propertyTypeValue = action.propertyTypeChose;
        draft.propertyTypeErrors.hasErrors = false;
        draft.propertyTypeErrors.errorMessage = "";
        break
      case "catchAreaChange":
        draft.areaValue = action.areaChose;
        draft.areaErrors.hasErrors = false;
        draft.areaErrors.errorMessage = "";
        break;
      case "catchBoroughChange":
        draft.boroughValue = action.boroughChose;
        draft.boroughErrors.hasErrors = false;
        draft.boroughErrors.errorMessage = "";
        break;
      case "catchLatitudeChange":
        draft.latitudeValue = action.latitudeChose;
        break;
      case "catchLongitudeChange":
        draft.longitudeValue = action.longitudeChose;
        break;
      case "catchAreaMetereChange":
        draft.areaMetereValue = action.areaMetreChose;
        draft.areaMetereErrors.hasErrors = false;
        draft.areaMetereErrors.errorMessage = "";
        break;
      case "catchBuildingAgeChange":
        draft.buildingAgeValue = action.buildingAgeChose;
        draft.buildingAgeErrors.hasErrors = false;
        draft.buildingAgeErrors.errorMessage = "";
        break;
      case "catchPriceForSaleChange":
        draft.priceForSaleValue = action.priceForSaleChose;
        draft.priceForSaleErrors.hasErrors = false;
        draft.priceForSaleErrors.errorMessage = "";
        break;
      case "catchRentPerMonthChange":
        draft.rentPerMonthValue = action.rentPerMonthChose;
        break;
      case "catchNumberOfFloorOfBuildingChange":
        draft.numberOfFloorOfBuildingValue = action.numberOfFloorOfBuildingChose;
        draft.numberOfFloorOfBuildingErrors.hasErrors = false;
        draft.numberOfFloorOfBuildingErrors.errorMessage = "";
        break;
      case "catchNnumberOfUnitPerFloorChange":
        draft.numberOfUnitPerFloorValue = action.numberOfUnitPerFloorChose;
        draft.numberOfUnitPerFloorErrors.hasErrors = false;
        draft.numberOfUnitPerFloorErrors.errorMessage = "";
        break;
      case "catchFloorOfBuildingChange":
        draft.floorOfBuildingValue = action.floorOfBuildingChose;
        draft.floorOfBuildingErrors.hasErrors = false;
        draft.floorOfBuildingErrors.errorMessage = "";
        break;

      case "catchNameOfPropertyOwnerChange":
        draft.nameOfPropertyOwnerValue = action.nameOfPropertyOwnerChose;
        break;
      case "catchAddressOfBuildingChange":
        draft.addressOfBuildingValue = action.addressOfBuildingChose;
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChose;
        break;
      //check box##############################################
      case "catchPoolChange":
        draft.poolValue = action.poolChose;
        break;
      case "catchElevatorChange":
        draft.elevatorValue = action.elevatorChose;
        break;
      case "catchParkingChange":
        draft.parkingValue = action.parkingChose;
        break;
      case "catchBalconyChange":
        draft.balconyValue = action.balconyChose;
        break;
      case "catchLobbyChange":
        draft.lobbyValue = action.lobbyChose;
        break;
      case "catchGuardChange":
        draft.guardValue = action.guardChose;
        break;
      case "catchWarehouseChange":
        draft.warehouseValue = action.warehouseChose;
        break;
      case "catchJacuzziChange":
        draft.jacuzziValue = action.jacuzziChose;
        break;
      //detail selectin object############################

      case "catchPropertyStatusChange":
        draft.propertyStatusValue = action.propertyStatusChose;
        break;
      case "catchBuildingFaceChange":
        draft.buildingFaceValue = action.buildingFaceChose;
        break;
      case "catchRoomNumbeChange":
        draft.roomNumberValue = action.roomNumberChose;
        draft.roomNumberErrors.hasErrors = false;
        draft.roomNumberErrors.errorMessage = "";
        break;
      case "catchBuildingApearencehange":
        draft.buildingApearenceValue = action.buildingApearenceChose;
        break;
      case "catchFloorCoveringcehange":
        draft.floorCoveringValue = action.floorCoveringChose;
        break;
      case "catchKitchenApearencechange":
        draft.kitchenApearenceValue = action.kitchenApearenceChose;
        break;
      case "catchwcTypechange":
        draft.wcTypeValue = action.wcTypeChose;
        break;
      case "catchHeatingSystemChange":
        draft.heatingSystemValue = action.heatingSystemChose;
        break;
      case "catchCoolingSystemChange":
        draft.coolingSystemValue = action.coolingSystemChose;
        break;
      case "catchHouseDocumentStatusChange":
        draft.houseDocumentStatusValue = action.houseDocumentStatusChose;
        break;
      case "catcHouseDocumentTypeChange":
        draft.houseDocumentTypeValue = action.houseDocumentTypeChose;
        break;
      case "catchAdvertiserTypeChange":
        draft.advertiserTypeValue = action.advertiserTypeChose;
        break;
      //related to picture#########################
      case "catchPicture1Change":
        draft.picture1Value = action.picture1Chose;
        break;
      case "catchPicture2Change":
        draft.picture2Value = action.picture2Chose;
        break;
      case "catchPicture3Change":
        draft.picture3Value = action.picture3Chose;
        break;
      case "catchPicture4Change":
        draft.picture4Value = action.picture4Chose;
        break;
      case "catchPicture5Change":
        draft.picture5Value = action.picture5Chose;
        break;
      case "catchPicture6Change":
        draft.picture6Value = action.picture6Chose;
        break;

      case "catchAploadedPictures":
        draft.uploadedPictures = action.picturesChose
        break
      //related to the map#######################
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
      case "changeMarkerPosition":
        draft.markerPosition.lat = action.changeLatitude;
        draft.markerPosition.lng = action.changeLongitude;
        draft.latitudeValue = "";
        draft.longitudeValue = "";
        break
      //related to getting info
      case 'changeSendRequest':
        draft.sendRequest = draft.sendRequest + 1
        break;
      case 'catchUserProfileInfo':
        draft.userProfile.agencyName = action.profileObject.agency_name
        draft.userProfile.phoneNumber = action.profileObject.phone_number
        break
      //relate dto the sanck bar
      case 'openTheSnack':
        draft.openSnack = true
        break

      case 'disableTheButton':
        draft.disabledBtn = true
        break

      case 'allowTheButton':
        draft.disableBtn = false
        break

      case 'catchBargainTypeErrors':
        if (action.bargainTypeChose.length === 0) {
          draft.bargainTypeErrors.hasErrors = true;
          draft.bargainTypeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchListingTypeErrors':
        if (action.listingTypeChose.length === 0) {
          draft.listingTypeErrors.hasErrors = true;
          draft.listingTypeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchPropertyTypeErrors':
        if (action.propertyTypeChose.length === 0) {
          draft.propertyTypeErrors.hasErrors = true;
          draft.propertyTypeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;
      case 'catchAreaErrors':
        if (action.areaChose.length === 0) {
          draft.areaErrors.hasErrors = true;
          draft.areaErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchBoroughErrors':
        if (action.boroughChose.length === 0) {
          draft.boroughErrors.hasErrors = true;
          draft.boroughErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchAreaMetereErrors':
        if (action.areaMetereChose.length === 0) {
          draft.areaMetereErrors.hasErrors = true;
          draft.areaMetereErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchbuildingAgeErrors':
        if (action.buildingAgeChose.length === 0) {
          draft.buildingAgeErrors.hasErrors = true;
          draft.buildingAgeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchPriceForSaleErrors':
        if (action.priceForSaleChose.length === 0) {
          draft.priceForSaleErrors.hasErrors = true;
          draft.priceForSaleErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;



      case 'catchNumberOfFloorOfBuildingErrors':
        if (action.numberOfFloorOfBuildingChose.length === 0) {
          draft.numberOfFloorOfBuildingErrors.hasErrors = true;
          draft.numberOfFloorOfBuildingErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;


      case 'catchNumberOfUnitPerFloorErrors':
        if (action.numberOfUnitPerFloorChose.length === 0) {
          draft.numberOfUnitPerFloorErrors.hasErrors = true;
          draft.numberOfUnitPerFloorErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;


      case 'catchFloorOfBuildingErrors':
        if (action.floorOfBuildingChose.length === 0) {
          draft.floorOfBuildingErrors.hasErrors = true;
          draft.floorOfBuildingErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;

      case 'catchRoomNumberErrors':
        if (action.roomNumberChose.length === 0) {
          draft.roomNumberErrors.hasErrors = true;
          draft.roomNumberErrors.errorMessage = "این فیلد نباید خالی باشد!";
        }
        break;


      case 'emptyBargainType':
        draft.bargainTypeErrors.hasErrors = true;
        draft.bargainTypeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyListingType':
        draft.listingTypeErrors.hasErrors = true;
        draft.listingTypeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break


      case 'emptyPropertyType':
        draft.propertyTypeErrors.hasErrors = true;
        draft.propertyTypeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyArea':
        draft.areaErrors.hasErrors = true;
        draft.areaErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyBorough':
        draft.boroughErrors.hasErrors = true;
        draft.boroughErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyAreaMetere':
        draft.areaMetereErrors.hasErrors = true;
        draft.areaMetereErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyBuildingAge':
        draft.buildingAgeErrors.hasErrors = true;
        draft.buildingAgeErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyPriceForSale':
        draft.priceForSaleErrors.hasErrors = true;
        draft.priceForSaleErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break


      case 'emptyNumberOfFloorOfBuilding':
        draft.numberOfFloorOfBuildingErrors.hasErrors = true;
        draft.numberOfFloorOfBuildingErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyNumberOfUnitPerFloor':
        draft.numberOfUnitPerFloorErrors.hasErrors = true;
        draft.numberOfUnitPerFloorErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyFloorOfBuilding':
        draft.floorOfBuildingErrors.hasErrors = true;
        draft.floorOfBuildingErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

      case 'emptyRoomNumber':
        draft.roomNumberErrors.hasErrors = true;
        draft.roomNumberErrors.errorMessage = "این فیلد نباید خالی باشد!";
        break

    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)



  // Changing the map view depending on the chosen borough
  // useEffect(() => {
  //   if (state.boroughValue === "فرمانیه") {
  //     state.mapInstance.setView([35.80312057971126, 51.45993572439373], 16);
  //     dispatch({
  //       type: "changeMarkerPosition",
  //       changeLatitude: 35.80312057971126,
  //       changeLongitude: 51.45993572439373,
  //     });
  //   } else if (state.boroughValue === "تجریش") {
  //     state.mapInstance.setView([35.80556314471572, 51.43054224411855], 16);
  //     dispatch({
  //       type: "changeMarkerPosition",
  //       changeLatitude: 35.80556314471572,
  //       changeLongitude: 51.43054224411855,
  //     });
  //   } else if (state.boroughValue === "داراآباد") {
  //     state.mapInstance.setView([35.818784395704725, 51.49073180628075], 16);
  //     dispatch({
  //       type: "changeMarkerPosition",
  //       changeLatitude: 35.818784395704725,
  //       changeLongitude: 51.49073180628075,
  //     });
  //   } else if (state.boroughValue === "میدان انقلاب") {
  //     state.mapInstance.setView([35.70081946995089, 51.39126620349126], 16);
  //     dispatch({
  //       type: "changeMarkerPosition",
  //       changeLatitude: 35.70081946995089,
  //       changeLongitude: 51.39126620349126,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.boroughValue])



  const regionCoordinates = {
    "منطقه 1": [35.828161260292845, 51.46357972220065],
    "منطقه 2": [35.80370386098121, 51.36160582018843],
    "منطقه 3": [35.7915143425377, 51.407713849030095],
    "منطقه 4": [35.776037346638915, 51.53764036323443],
    "منطقه 5": [35.804988529675896, 51.34086127053721],
    "منطقه 6": [35.7515339473954, 51.41738771570738],
    "منطقه 7": [35.74160894908976, 51.44705056445636],
    "منطقه 8": [35.73638803064333, 51.48770799453785],
    "منطقه 9": [35.7019998084633, 51.33795197329218],
    "منطقه 10": [35.70084935245479, 51.3781800458907],
    "منطقه 11": [35.70124825348167, 51.412948122280774],
    "منطقه 12": [35.7018132412606, 51.44731573266675],
    "منطقه 13": [35.72461216108969, 51.56764030590653],
    "منطقه 14": [35.66269458656694, 51.49083360170447],
    "منطقه 15": [35.66135019024801, 51.45507228241473],
    "منطقه 16": [35.65935799716561, 51.43072114000076],
    "منطقه 17": [35.667629315884426, 51.38175803447343],
    "منطقه 18": [35.67711839642643, 51.268676710643476],
    "منطقه 19": [35.64316087805245, 51.392923767551096],
    "منطقه 20": [35.62772821788326, 51.453323064116766],
    "منطقه 21": [35.743311351862594, 51.10022352156877],
    "منطقه 22": [35.776839222025856, 51.264619972936565],
  };



  useEffect(() => {
    const selectedCoordinates = regionCoordinates[state.boroughValue];
    if (selectedCoordinates && state.mapInstance) {
      state.mapInstance.setView(selectedCoordinates, 12);
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: selectedCoordinates[0],
        changeLongitude: selectedCoordinates[1],
      });
    }
  }, [state.boroughValue, state.mapInstance]);





  //Borough Disply function#########################################
  // function BoroughDisplay() {
  //   if (state.boroughValue === "فرمانیه") {
  //     return <Polygon positions={Farmanieh} />;
  //   } else if (state.boroughValue === "میدان انقلاب") {
  //     return <Polygon positions={Enghelab} />;
  //   } else if (state.boroughValue === "داراآباد") {
  //     return <Polygon positions={Darabad} />;
  //   }
  // }




  function BoroughDisplay() {
    const selectedRegion = regionsMap[state.boroughValue];
    if (selectedRegion) {
      return <Polygon positions={selectedRegion} />;
    }
    return null;
  }




  //setting for map component#######################################
  function TheMapComponent() {
    const map = useMap()
    dispatch({ type: 'getMap', mapData: map })
    return null;
  }


  //Dragable Marker###################################################
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        // console.log(marker.getLatLng())

        dispatch({ type: "catchLatitudeChange", latitudeChose: marker.getLatLng().lat });
        dispatch({ type: "catchLongitudeChange", longitudeChose: marker.getLatLng().lng })
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  //catching picture files############################################################
  useEffect(() => {
    if (state.uploadedPictures[0]) {
      dispatch({
        type: "catchPicture1Change",
        picture1Chose: state.uploadedPictures[0]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[0]])
  useEffect(() => {
    if (state.uploadedPictures[1]) {
      dispatch({
        type: "catchPicture2Change",
        picture2Chose: state.uploadedPictures[1]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[1]])
  useEffect(() => {
    if (state.uploadedPictures[2]) {
      dispatch({
        type: "catchPicture3Change",
        picture3Chose: state.uploadedPictures[2]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[2]])
  useEffect(() => {
    if (state.uploadedPictures[3]) {
      dispatch({
        type: "catchPicture4Change",
        picture4Chose: state.uploadedPictures[3]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[3]])
  useEffect(() => {
    if (state.uploadedPictures[4]) {
      dispatch({
        type: "catchPicture5Change",
        picture5Chose: state.uploadedPictures[4]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[4]])
  useEffect(() => {
    if (state.uploadedPictures[4]) {
      dispatch({
        type: "catchPicture6Change",
        picture6Chose: state.uploadedPictures[5]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[5]])



  ////setting for submit#####################################################################
  const formSubmit = (e) => {
    e.preventDefault();
    // console.log("the form has been submitted")
    if (
      !state.bargainTypeErrors.hasErrors &&
      !state.listingTypeErrors.hasErrors &&
      !state.propertyTypeErrors.hasErrors &&
      !state.areaErrors.hasErrors &&
      !state.boroughErrors.hasErrors &&
      !state.areaMetereErrors.hasErrors &&
      !state.buildingAgeErrors.hasErrors &&
      !state.priceForSaleErrors.hasErrors &&
      !state.numberOfFloorOfBuildingErrors.hasErrors &&
      !state.numberOfUnitPerFloorErrors.hasErrors &&
      !state.floorOfBuildingErrors.hasErrors &&
      !state.roomNumberErrors.hasErrors &&
      state.latitudeValue &&
      state.longitudeValue
    ) {
      dispatch({ type: "changeSendRequest" })
      dispatch({ type: 'disableTheButton' })
    }
    else if (state.bargainTypeValue === "") {
      dispatch({ type: 'emptyBargainType' })
      window.scrollTo(0, 0)
    }
    else if (state.listingTypeValue === "") {
      dispatch({ type: 'emptyListingType' })
      window.scrollTo(0, 0)
    }
    else if (state.propertyTypeValue === "") {
      dispatch({ type: 'emptyPropertyType' })
      window.scrollTo(0, 0)
    }
    else if (state.roomNumberValue === "") {
      dispatch({ type: 'emptyRoomNumber' })
      window.scrollTo(0, 0)
    }
    else if (state.areaMetereValue === "") {
      dispatch({ type: 'emptyAreaMetere' })
      window.scrollTo(0, 0)
    }
    else if (state.priceForSaleValue === "") {
      dispatch({ type: 'emptyPriceForSale' })
      window.scrollTo(0, 0)
    }
    else if (state.buildingAgeValue === "") {
      dispatch({ type: 'emptyBuildingAge' })
      window.scrollTo(0, 0)
    }
    else if (state.areaValue === "") {
      dispatch({ type: 'emptyArea' })
      window.scrollTo(0, 0)
    }
    else if (state.boroughValue === "") {
      dispatch({ type: 'emptyBorough' })
      window.scrollTo(0, 0)
    }
    else if (state.numberOfFloorOfBuildingValue === "") {
      dispatch({ type: 'emptyNumberOfFloorOfBuilding' })
      window.scrollTo(0, 0)
    }
    else if (state.numberOfUnitPerFloorValue === "") {
      dispatch({ type: 'emptyNumberOfUnitPerFloor' })
      window.scrollTo(0, 0)
    }
    else if (state.floorOfBuildingValue === "") {
      dispatch({ type: 'emptyFloorOfBuilding' })
      window.scrollTo(0, 0)
    }
  }


  //axis for submit for send Request###################################################
  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData()
        formData.append("bargain_type", state.bargainTypeValue);
        formData.append("listing_type", state.listingTypeValue);
        formData.append("property_type", state.propertyTypeValue);
        formData.append("area", state.areaValue);
        formData.append("borough", state.boroughValue);
        formData.append("latitude", state.latitudeValue);
        formData.append("longitude", state.longitudeValue);
        formData.append("area_metere", state.areaMetereValue);
        formData.append("age_of_building", state.buildingAgeValue);
        formData.append("price_for_sale", state.priceForSaleValue);
        formData.append("rent_per_month", state.rentPerMonthValue);
        formData.append("number_of_floor_of_building", state.numberOfFloorOfBuildingValue);
        formData.append("number_of_unit_per_floor", state.numberOfUnitPerFloorValue);
        formData.append("floor_of_building", state.floorOfBuildingValue);
        formData.append("name_of_property_owner", state.nameOfPropertyOwnerValue);
        formData.append("address_of_building", state.addressOfBuildingValue);
        formData.append("description", state.descriptionValue);
        formData.append("pool", state.poolValue);
        formData.append("elevator", state.elevatorValue);
        formData.append("balcony", state.parkingValue);
        formData.append("parking", state.balconyValue);
        formData.append("lobby", state.lobbyValue);
        formData.append("guard", state.guardValue);
        formData.append("warehouse", state.warehouseValue);
        formData.append("Jacuzzi", state.jacuzziValue);
        formData.append("property_status", state.propertyStatusValue);
        formData.append("building_face", state.buildingFaceValue);
        formData.append("rooms", state.roomNumberValue);
        formData.append("building_apearence", state.buildingApearenceValue);
        formData.append("floor_covering", state.floorCoveringValue);
        formData.append("kitchen_apearence", state.kitchenApearenceValue);
        formData.append("wc_type", state.wcTypeValue);
        formData.append("heating_system", state.heatingSystemValue);
        formData.append("cooling_system", state.coolingSystemValue);
        formData.append("house_document_status", state.houseDocumentStatusValue);
        formData.append("house_document_type", state.houseDocumentTypeValue);
        formData.append("advertiser", state.advertiserTypeValue);
        formData.append("picture1", state.picture1Value);
        formData.append("picture2", state.picture2Value);
        formData.append("picture3", state.picture3Value);
        formData.append("picture4", state.picture4Value);
        formData.append("picture5", state.picture5Value);
        formData.append("picture6", state.picture6Value);
        formData.append("seller", GlobalState.userId);
        try {
          const response = await Axios.post("https://api.amlakeeno.ir/api/listings/create/", formData);
          console.log(response.data)
          dispatch({ type: "openTheSnack" })
        } catch (e) {
          console.log(e.response)
          dispatch({ type: "allowTheButton" })
        }
      }
      AddProperty()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest])



  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/")
      }, 1500);
    }
  }, [state.openSnack])





  //request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(`https://api.amlakeeno.ir/api/profiles/${GlobalState.userId}/`);
        console.log(response.data)
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data
        })

      } catch (e) {
        console.log(e.response)
      }

    }
    GetProfileInfo()
  }, [])




  // setting for submit button
  function SubmitButtonDisplay() {
    if (

      GlobalState.userIsLogged &&
      state.userProfile.agencyName !== null &&
      state.userProfile.agencyName !== "" &&
      state.userProfile.phoneNumber !== null &&
      state.userProfile.phoneNumber !== ""

    ) {
      return (
        <Button
          variant='contained'
          fullWidth
          type='submit'
          className={classes.registrationStyle}
          disabled={state.disabledBtn}
        >
          ثبت
        </Button>

      )
    }
    else if (GlobalState.userIsLogged && (
      state.userProfile.agencyName === null ||
      state.userProfile.agencyName === "" ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    )) {
      return (
        <Button
          variant='outlined'
          fullWidth
          className={classes.registrationStyle}
          onClick={() => navigate("/profile")}
        >
          برای ثبت ملک، ابتدا اطلاعات حساب کاربری خود را تکمیل نمایید
        </Button>

      )
    } else if (!GlobalState.userIsLogged) {
      return (
        <Button
          variant='outlined'
          fullWidth
          className={classes.registrationStyle}
          onClick={() => setLoginOpen(true)}
        >
          برای ثبت ملک، ابتدا ورود نمایید.
        </Button>
      )
    }
  }


  //seting for text in the textfield price
  function PriceDisplay() {
    if (state.bargainTypeValue === "فروش") {
      return "قیمت فروش به تومان*"
    }
    else if (state.bargainTypeValue === "رهن کامل") {
      return "رهن کامل به تومان*"
    }
    else if (state.bargainTypeValue === "اجاره") {
      return "رهن یا ودیعه به تومان*"
    }
    else {
      return "قیمت*"
    }
  }


  return (

    <div className={styles.formContainer}>
      <Card cardClass={styles.cardContainer} >
        <form onSubmit={formSubmit}>
          <Grid item container
            justifyContent={"center"}>
            <Typography variant='h5' style={{ color: "gray", marginBottom: "20px" }}>
              ثبت ملک
            </Typography>
          </Grid>

          <Divider >
            <Chip label="اطلاعات مهم اولیه" style={{ backgroundColor: "#fff", border: "1px solid red", fontSize: "15px" }} />
          </Divider>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                id="bargainType"
                label="نوع معامله*"
                variant="standard"
                fullWidth
                value={state.bargainTypeValue}
                onChange={(e) =>
                  dispatch({
                    type: 'catchBargianTypeChange',
                    bargainTypeChose: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: 'catchBargainTypeErrors',
                    bargainTypeChose: e.target.value,
                  })
                }
                error={state.bargainTypeErrors.hasErrors}
                helperText={state.bargainTypeErrors.errorMessage}
                select
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        textAlign: 'right',
                        pr: 1,
                      },
                    },
                  },
                }}
              >
                {bargainTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                id="listingType"
                label="نوع مکان*"
                variant="standard"
                fullWidth
                value={state.listingTypeValue}
                onChange={(e) =>
                  dispatch({
                    type: 'catchListingTypeChange',
                    listingTypeChose: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: 'catchListingTypeErrors',
                    listingTypeChose: e.target.value,
                  })
                }
                error={state.listingTypeErrors.hasErrors}
                helperText={state.listingTypeErrors.errorMessage}
                select
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        textAlign: 'right',
                        pr: 1,
                      },
                    },
                  },
                }}
              >
                {listingTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid
              style={{ marginTop: "1rem" }}
              size={{ xs: 12, md: 5 }}>
              <TextField
                id="propertyType"
                label="نوع ساختمان*"
                variant="standard"
                value={state.propertyTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchPropertyTypeChange',
                    propertyTypeChose: e.target.value
                  })}
                onBlur={(e) =>
                  dispatch({
                    type: 'catchPropertyTypeErrors',
                    propertyTypeChose: e.target.value
                  })}

                error={state.propertyTypeErrors.hasErrors ? true : false}
                helperText={state.propertyTypeErrors.errorMessage}
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {propertyTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="propertyType"
                label="تعداد اتاق*"
                variant="standard"
                value={state.roomNumberValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchRoomNumbeChange',
                    roomNumberChose: e.target.value
                  })}

                onBlur={(e) =>
                  dispatch({
                    type: 'catchRoomNumberErrors',
                    roomNumberChose: e.target.value
                  })
                }

                error={state.roomNumberErrors.hasErrors ? true : false}
                helperText={state.roomNumberErrors.errorMessage}
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {RoomNumberOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}

              </TextField>
            </Grid>
          </Grid>
          

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="area-metere"
                type="number"
                label="زیربنا(مترمربع)*"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                variant="standard"
                value={state.areaMetereValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAreaMetereChange',
                    areaMetreChose: e.target.value
                  })}
                onBlur={(e) =>
                  dispatch({
                    type: 'catchAreaMetereErrors',
                    areaMetereChose: e.target.value
                  })}
                error={state.areaMetereErrors.hasErrors ? true : false}
                helperText={state.areaMetereErrors.errorMessage}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="price"
                type="number"
                label={PriceDisplay()}
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                variant="standard"
                value={state.priceForSaleValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchPriceForSaleChange',
                    priceForSaleChose: e.target.value
                  })}

                onBlur={(e) =>
                  dispatch({
                    type: 'catchPriceForSaleErrors',
                    priceForSaleChose: e.target.value
                  })}

                error={state.priceForSaleErrors.hasErrors ? true : false}
                helperText={state.priceForSaleErrors.errorMessage}
              />
            </Grid>
          </Grid>



          <Grid container spacing={2} justifyContent="space-between">
            {state.bargainTypeValue === "اجاره" ? (
              <Grid item xs={12} md={5}
                style={{ marginTop: "1rem" }}>
                <TextField
                  id="rentPerMonth"
                  type="number"
                  label="اجاره (ماهیانه)*"
                  variant="standard"
                  sx={{
                    '& .MuiInputBase-input': { fontSize: 15 },
                    '& .MuiInputLabel-root': { fontSize: 17 },
                    '& .MuiFormHelperText-root': { fontSize: 13 },
                  }}
                  disabled={state.bargainTypeValue === "رهن کامل" || state.bargainTypeValue === "فروش" ? true : false}
                  value={state.rentPerMonthValue}
                  fullWidth
                  onChange={(e) =>
                    dispatch({
                      type: 'catchRentPerMonthChange',
                      rentPerMonthChose: e.target.value
                    })}
                />
              </Grid>
            )
              :
              ("")}
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingAge"
                type="number"
                label="سن ساختمان به سال*"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.buildingAgeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBuildingAgeChange',
                    buildingAgeChose: e.target.value
                  })}

                onBlur={(e) =>
                  dispatch({
                    type: 'catchbuildingAgeErrors',
                    buildingAgeChose: e.target.value
                  })}

                error={state.buildingAgeErrors.hasErrors ? true : false}
                helperText={state.buildingAgeErrors.errorMessage}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingFace"
                label="جهت ملک"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.buildingFaceValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBuildingFaceChange',
                    buildingFaceChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {BuildingFaceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>


          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="area"
                label="شهر*"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.areaValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAreaChange',
                    areaChose: e.target.value
                  })}
                onBlur={(e) =>
                  dispatch({
                    type: 'catchAreaErrors',
                    areaChose: e.target.value
                  })}
                error={state.areaErrors.hasErrors ? true : false}
                helperText={state.areaErrors.errorMessage}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {areaOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* //ralated to the borough############################################################# */}
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="borough"
                label="منطقه*"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.boroughValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBoroughChange',
                    boroughChose: e.target.value
                  })}
                onBlur={(e) =>
                  dispatch({
                    type: 'catchBoroughErrors',
                    boroughChose: e.target.value
                  })}
                error={state.boroughErrors.hasErrors ? true : false}
                helperText={state.boroughErrors.errorMessage}
                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {boroughOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: "1rem" }}>
            {state.latitudeValue && state.longitudeValue ?
              <Alert severity="success"
                style={{ padding: "20px", fontSize: "12", fontFamily: "YekanBakh", fontWeight: "500" }}>
                محله شما قرار دارد در  {state.latitudeValue} , {state.longitudeValue}
              </Alert>
              :
              <Alert severity="warning"
                style={{ padding: "20px", fontSize: "14", fontFamily: "YekanBakh", fontWeight: "700" }}>
                توجه! توجه!
                لطفاً روی نقشه با درگ کردن نشان محل سکونت خود را مشخص نمایید.
              </Alert>
            }
          </Grid>

          <div className={styles.mapContainer}>
            <MapContainer center={[35.73087557318668, 51.35107070174615]} zoom={16} scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TheMapComponent />
              {BoroughDisplay()}
              <Marker
                draggable
                eventHandlers={eventHandlers}
                position={state.markerPosition}
                ref={markerRef}>
              </Marker>
            </MapContainer>
          </div>


          <Divider style={{ margin: "10px 0px", color: "red" }}>
            <Chip label="اطلاعات مهم ثانویه" style={{ backgroundColor: "#fff", border: "1px solid red", fontSize: "15px" }} />
          </Divider>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="numberOfFloorOfBuilding"
                type="number"
                label="تعداد طبقات ساختمان*"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.numberOfFloorOfBuildingValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchNumberOfFloorOfBuildingChange',
                    numberOfFloorOfBuildingChose: e.target.value
                  })}

                onBlur={(e) =>
                  dispatch({
                    type: 'catchNumberOfFloorOfBuildingErrors',
                    numberOfFloorOfBuildingChose: e.target.value
                  })}

                error={state.numberOfFloorOfBuildingErrors.hasErrors ? true : false}
                helperText={state.numberOfFloorOfBuildingErrors.errorMessage}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="rentPerMonth"
                type="number"
                label="تعداد واحد در هر طبقه* "
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.numberOfUnitPerFloorValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchNnumberOfUnitPerFloorChange',
                    numberOfUnitPerFloorChose: e.target.value
                  })}

                onBlur={(e) =>
                  dispatch({
                    type: 'catchNumberOfUnitPerFloorErrors',
                    numberOfUnitPerFloorChose: e.target.value
                  })
                }

                error={state.numberOfUnitPerFloorErrors.hasErrors ? true : false}
                helperText={state.numberOfUnitPerFloorErrors.errorMessage}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="floorOfBuilding"
                type="number"
                label="طبقه ملک*"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.floorOfBuildingValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchFloorOfBuildingChange',
                    floorOfBuildingChose: e.target.value
                  })}

                onBlur={(e) =>
                  dispatch({
                    type: 'catchFloorOfBuildingErrors',
                    floorOfBuildingChose: e.target.value
                  })
                }

                error={state.floorOfBuildingErrors.hasErrors ? true : false}
                helperText={state.floorOfBuildingErrors.errorMessage}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="propertyStatuse"
                label="وضعیت ملک"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.propertyStatusValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchPropertyStatusChange',
                    propertyStatusChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {propertyStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item container justifyContent="space-between" style={{ marginTop: "10px" }}>
            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.poolValue} onChange={(e) =>
                  dispatch({
                    type: "catchPoolChange",
                    poolChose: e.target.checked
                  })} />}
                label="استخر" />
            </Grid>


            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.elevatorValue} onChange={(e) =>
                  dispatch({
                    type: "catchElevatorChange",
                    elevatorChose: e.target.checked
                  })} />}
                label="آسانسور" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.parkingValue} onChange={(e) =>
                  dispatch({
                    type: "catchParkingChange",
                    parkingChose: e.target.checked
                  })} />}
                label="پارکینگ" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "10px" }}>
              <FormControlLabel
                control={<Checkbox checked={state.balconyValue} onChange={(e) =>
                  dispatch({
                    type: "catchBalconyChange",
                    balconyChose: e.target.checked
                  })} />}
                label="بالکن"
              />
            </Grid>
          </Grid>


          <Grid item container justifyContent="space-between" style={{ marginBottom: "40px" }}>
            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.lobbyValue} onChange={(e) =>
                  dispatch({
                    type: "catchLobbyChange",
                    lobbyChose: e.target.checked
                  })} />}
                label="لابی" />
            </Grid>


            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.guardValue} onChange={(e) =>
                  dispatch({
                    type: "catchGuardChange",
                    guardChose: e.target.checked
                  })} />}
                label="نگهبان" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.warehouseValue} onChange={(e) =>
                  dispatch({
                    type: "catchWarehouseChange",
                    warehouseChose: e.target.checked
                  })} />}
                label="انباری" />
            </Grid>

            <Grid item xs={12} md={2}
              style={{ marginTop: "1rem" }}>
              <FormControlLabel
                control={<Checkbox checked={state.jacuzziValue} onChange={(e) =>
                  dispatch({
                    type: "catchJacuzziChange",
                    jacuzziChose: e.target.checked
                  })} />}
                label="جکوزی"
              />
            </Grid>
          </Grid>

          <Divider>
            <Chip label="اطلاعات جانبی" style={{ backgroundColor: "#fff", border: "1px solid red", fontSize: "15px" }} />
          </Divider>


          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingApearenc"
                label="ظاهر ساختمان"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.buildingApearenceValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchBuildingApearencehange',
                    buildingApearenceChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {BuildingApearenceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="FloorCovering"
                label="پوشش کف ملک"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.floorCoveringValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchFloorCoveringcehange',
                    floorCoveringChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {FloorCoveringOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="buildingApearenc"
                label="نوع سرویس"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.wcTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchwcTypechange',
                    wcTypeChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {WcTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="kitchenApearence"
                label="آشپزخانه"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.kitchenApearenceValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchKitchenApearencechange',
                    kitchenApearenceChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {KitchenApearenceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="FloorCovering"
                label="نوع سیستم گرمایشی"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.heatingSystemValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchHeatingSystemChange',
                    heatingSystemChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {HeatingSystemOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="kitchenApearence"
                label="نوع سیستم سرمایشی"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.coolingSystemValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchCoolingSystemChange',
                    coolingSystemChose: e.target.value
                  })}
                select
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right",
                        paddingRight: "10px",
                      },
                    },
                  },
                }}
              >
                {coolingSystemOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {state.bargainTypeValue === "فروش" ? (
            <Grid container spacing={2} justifyContent="space-between">
              <Grid size={{ xs: 12, md: 5 }}
                style={{ marginTop: "1rem" }}>
                <TextField
                  id="HouseDocumentStatus"
                  label="وضعیت سند"
                  variant="standard"
                  sx={{
                    '& .MuiInputBase-input': { fontSize: 15 },
                    '& .MuiInputLabel-root': { fontSize: 17 },
                    '& .MuiFormHelperText-root': { fontSize: 13 },
                  }}
                  value={state.houseDocumentStatusValue}
                  fullWidth
                  onChange={(e) =>
                    dispatch({
                      type: 'catchHouseDocumentStatusChange',
                      houseDocumentStatusChose: e.target.value
                    })}
                  select
                  SelectProps={{
                    native: false,
                    MenuProps: {
                      PaperProps: {
                        style: {
                          textAlign: "right",
                          paddingRight: "10px",
                        },
                      },
                    },
                  }}
                >
                  {houseDocumentStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}
                style={{ marginTop: "1rem" }}>
                <TextField
                  id="FloorCovering"
                  label="نوع سند"
                  variant="standard"
                  inputProps={{ style: { fontSize: 15 } }}
                  InputLabelProps={{ style: { fontSize: 17 } }}
                  FormHelperTextProps={{ style: { fontSize: 13 } }}
                  value={state.houseDocumentTypeValue}
                  fullWidth
                  onChange={(e) =>
                    dispatch({
                      type: 'catcHouseDocumentTypeChange',
                      houseDocumentTypeChose: e.target.value
                    })}

                  select
                  SelectProps={{
                    native: false,
                    MenuProps: {
                      PaperProps: {
                        style: {
                          textAlign: "right",
                          paddingRight: "10px",
                        },
                      },
                    },
                  }}
                >
                  {HouseDocumentTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}

                </TextField>
              </Grid>
            </Grid>

          )
            :
            ("")}

          <Grid container spacing={2} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="nameOfPropertyOwner"
                type="text"
                label="اسم مالک "
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.nameOfPropertyOwnerValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchNameOfPropertyOwnerChange',
                    nameOfPropertyOwnerChose: e.target.value
                  })}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="kitchenApearence"
                label="آگهی کننده"
                variant="standard"
                sx={{
                  '& .MuiInputBase-input': { fontSize: 15 },
                  '& .MuiInputLabel-root': { fontSize: 17 },
                  '& .MuiFormHelperText-root': { fontSize: 13 },
                }}
                value={state.advertiserTypeValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAdvertiserTypeChange',
                    advertiserTypeChose: e.target.value
                  })}

                select
                SelectProps={{
                  native: false, // اینجا گزینه native غیرفعال است
                  MenuProps: {
                    PaperProps: {
                      style: {
                        textAlign: "right", // تنظیم راست‌چین متن
                        paddingRight: "10px", // تنظیم فاصله داخلی
                      },
                    },
                  },
                }}
              >
                {AdvertiserTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>


          <Grid container spacing={2} justifyContent="space-between"
            style={{ marginTop: "1rem" }}>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="addressOfBuilding"
                type="text"
                label="آدرس دقیق ملک"
                variant="outlined"
                multiline
                rows={4}
                value={state.addressOfBuildingValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchAddressOfBuildingChange',
                    addressOfBuildingChose: e.target.value
                  })}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}
              style={{ marginTop: "1rem" }}>
              <TextField
                id="description"
                label="توضیحات"
                variant="outlined"
                multiline
                rows={4}
                value={state.descriptionValue}
                fullWidth
                onChange={(e) =>
                  dispatch({
                    type: 'catchDescriptionChange',
                    descriptionChose: e.target.value
                  })}
              />
            </Grid>

          </Grid>

          <Grid container spacing={3}  style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
          <Grid size={{ xs:8, md: 5 }}
            style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
            >
            <Button
              component="label"
              variant='contained'
              fullWidth
              type='submit'
              className={classes.pictureBtn}

            >
              بارگزاری تصاویر
              <input type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                hidden
                onChange={(e) => dispatch({
                  type: "catchAploadedPictures",
                  picturesChose: e.target.files
                })}
              />
              <DownloadForOfflineIcon style={{ marginRight: "10px" }} />
            </Button>
          </Grid>
          {/* //display the names of pictures################################## */}
          <Grid item>
            <ul>
              {state.picture1Value ? <li>{state.picture1Value.name}</li> : ""}
              {state.picture2Value ? <li>{state.picture2Value.name}</li> : ""}
              {state.picture3Value ? <li>{state.picture3Value.name}</li> : ""}
              {state.picture4Value ? <li>{state.picture4Value.name}</li> : ""}
              {state.picture5Value ? <li>{state.picture5Value.name}</li> : ""}
              {state.picture6Value ? <li>{state.picture6Value.name}</li> : ""}
            </ul>
          </Grid>
          <Grid size={{ xs:8, md: 5 }}
            style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
            >
            {SubmitButtonDisplay()}
          </Grid>
          </Grid>


        </form>
      </Card >
      <Snackbar
        open={state.openSnack}
        message="ملک با موفقیت ثبت شد!"
        ContentProps={{
          style:
          {
            fontSize: "1rem",
            fontFamily: "YekanBakh",
            fontWeight: "500",
            background: "#FFA28B",
            justifyContent: "center",
            color: "black"
          }
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
      {loginOpen && <Login setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />}
      {registerOpen && <Register setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />}
    </div >
  )
}

export default AddProperty