import { IsNumber, IsString, Length } from "class-validator";
import { makeErorrMessage } from "../application/make.error.message";

export class ProductInputModel {
  @IsString(makeErorrMessage("name"))
  @Length(3, 50)
  name: string;
  @IsString(makeErorrMessage("description"))
  @Length(10, 200)
  description: string;
  @Length(10, 200)
  composition: string;
  @IsString(makeErorrMessage("category"))
  @Length(10, 50)
  category: string;
  @IsNumber()
  weight: number;
  @IsNumber()
  price: number;
  @IsNumber()
  proteins: number;
  @IsNumber()
  fats: number;
  @IsNumber()
  carbohydrates: number;
  @IsNumber()
  kilocalories: number;
};

export class ProductViewModel {
  id: string;
  name: string;
  description: string;
  composition: string;
  category: string;
  imgUrlHigh: string;
  imgUrlSmall: string;
  weight: number;
  price: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  kilocalories: number;
  available: boolean;
};