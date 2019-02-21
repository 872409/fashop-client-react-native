import { Platform } from "react-native";
import IosScrollView from "./iosScrollView";
import AndroidScrollView from "./androidScrollView";

const ScrollView = Platform.OS === 'ios' ? IosScrollView : AndroidScrollView

export default ScrollView