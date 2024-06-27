import { MinLength, MaxLength,
  IsDateString,
  IsInt, Max, Min,
  IsBoolean,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize} from 'class-validator';

import { CityType } from '../../../types/city.type.js';
import { Goods, HousingType, Location } from '../../../types/offer.type.js';
import { CreateOfferValidationMessage } from './create-offer.message.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.date.invalidFormat })
  public date: Date;

  @IsString({ message: CreateOfferValidationMessage.type.invalid })
  public city: CityType;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.arrayMinSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.arrayMaxSize })
  public photo: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsString({ message: CreateOfferValidationMessage.type.invalid })
  public type: HousingType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public guests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsString({each: true})
  public goods: Goods[];

  @IsString()
  public location: Location;

  public userId: string;
}
