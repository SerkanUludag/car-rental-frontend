import { ResponseModel } from "../responseModel";
import { CarImage } from "./car-image";

export interface CarImageResponseModel extends ResponseModel {
    data:CarImage[];
}