import { BarCodeType } from "react-native-camera/types";

export type IRNCameraOnBarCodeReadResponse = {
    data: string;
    rawData?: string;
    type: keyof BarCodeType;
}
