import CreateCityDto from '../city/create-city.dto';
import CreateUserDto from '../user/create-user.dto';

export enum CityType {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export class LocationDto {
  public latitude!: number;
  public longitude!: number;
}

export type Goods =
  | 'Wi-Fi'
  | 'Washing machine'
  | 'Towels'
  | 'Coffee machine'
  | 'Baby seat'
  | 'Kitchen'
  | 'Dishwasher'
  | 'Cable TV'
  | 'Fridge'
  | 'Heating';

export type HousingType =
  | 'apartment'
  | 'room'
  | 'house'
  | 'hotel';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: string;
  public city!: CreateCityDto;
  public previewImage!: string;
  public photo!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public type!: HousingType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public goods!: Goods[];
  public location!: LocationDto;
  public rating!: number;
  public userId!: string;
  public host!: CreateUserDto;
}
