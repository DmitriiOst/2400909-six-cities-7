import {UserType} from '../const';
import CreateCityDto from '../dto/city/create-city.dto';
import LocationDto from '../dto/city/location.dto';
import CreateCommentDto from '../dto/comment/create-comment.dto';
import CreateOfferDto, { Goods } from '../dto/offer/create-offer.dto';
import CreateUserDto from '../dto/user/create-user.dto';
import LoginUserDto from '../dto/user/login-user.dto';
import { UserTypeDto } from '../dto/user/user-type.dto';
import { City, Comment, Location, Offer, UserAuth, UserRegister} from '../types/types';
import { getTime } from '../utils';

export const adaptAuthToServer = (user: UserAuth): LoginUserDto => ({
  email: user.email,
  password: user.password,
});

function adaptUserTypeToServer(userType: UserType): UserTypeDto {
  switch (userType) {
    case UserType.Regular:
      return UserTypeDto.usual;
    case UserType.Pro:
      return UserTypeDto.pro;
    default:
      return UserTypeDto.usual;
  }
}

export const adaptRegisterToServer = (user: UserRegister): CreateUserDto | LoginUserDto => ({
  name: user.name,
  avatarUrl: ' ',
  type: adaptUserTypeToServer(user.type),
  email: user.email,
  password: user.password,
});

export const adaptLocationToServer = (location: Location): LocationDto => ({
  latitude: location.latitude,
  longitude: location.longitude,
});

export const adaptCityToServer = (city: City): CreateCityDto => ({
  name: city.name,
  location: adaptLocationToServer(city.location),
});

export const adaptNewOfferToServer = (offer: Offer): CreateOfferDto => ({
  title: offer.title,
  description: offer.description,
  city: adaptCityToServer(offer.city),
  previewImage: offer.previewImage,
  isPremium: offer.isPremium,
  type: offer.type,
  rooms: offer.bedrooms,
  price: offer.price,
  goods: offer.goods as Goods[],
  location: adaptLocationToServer(offer.location),
  photo: offer.images,
  date: getTime(),
  isFavorite: offer.isFavorite,
  guests: offer.maxAdults,
  rating: offer.rating,
  userId: offer.id,
  host: adaptRegisterToServer(offer.host),
});

export const adaptCreateCommentToServer = (comment: Comment): CreateCommentDto => ({
  offerId: comment.id,
  text: comment.comment,
  date: comment.date,
  rating: comment.rating,
  userId: adaptRegisterToServer(comment.user),
});

export const adaptAvatarToServer = (file: string) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};

export const adaptPhotoToServer = (file: string) => {
  const formData = new FormData();
  formData.set('photo', file);

  return formData;
};


