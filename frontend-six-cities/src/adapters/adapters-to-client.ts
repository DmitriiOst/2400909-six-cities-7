import { UserType } from '../const';
import CreateCityDto from '../dto/city/create-city.dto';
import LocationDto from '../dto/city/location.dto';
import CreateCommentDto from '../dto/comment/create-comment.dto';
import CreateOfferDto from '../dto/offer/create-offer.dto';
import CreateUserDto from '../dto/user/create-user.dto';
import { UserTypeDto } from '../dto/user/user-type.dto';
import { City, Comment, Location, Offer, User } from '../types/types';

export function adaptLocationToClient(locationDto: LocationDto): Location {
  return {
    latitude: locationDto.latitude,
    longitude: locationDto.longitude,
  };
}

export function adaptCityToClient(cityDto: CreateCityDto): City {
  return {
    name: cityDto.name,
    location: cityDto.location,
  };
}

export function adaptUserTypeToClient(userTypeDto: UserTypeDto): UserType {
  switch (userTypeDto) {
    case UserTypeDto.usual:
      return UserType.Regular;
    case UserTypeDto.pro:
      return UserType.Pro;
    default:
      return UserType.Regular;
  }
}

export function adaptCreateUserToClient(createUserDto: CreateUserDto): User {
  return {
    name: createUserDto.name,
    email: createUserDto.email,
    avatarUrl: createUserDto.avatarUrl,
    type: adaptUserTypeToClient(createUserDto.type),
  };
}

export function adaptOfferToClient(offerDto: CreateOfferDto): Offer {
  return {
    id: offerDto.userId,
    price: offerDto.price,
    rating: offerDto.rating,
    title: offerDto.title,
    isPremium: offerDto.isPremium,
    isFavorite: offerDto.isFavorite,
    previewImage: offerDto.previewImage,
    bedrooms: offerDto.rooms,
    description: offerDto.description,
    goods: offerDto.goods,
    images: offerDto.photo,
    maxAdults: offerDto.guests,
    type: offerDto.type,
    location: adaptLocationToClient(offerDto.location),
    city: adaptCityToClient(offerDto.city),
    host: adaptCreateUserToClient(offerDto.host),
  };
}

export function adaptCommentToClient(commentDto: CreateCommentDto): Comment {
  return {
    id: commentDto.offerId,
    comment: commentDto.text,
    date: commentDto.date,
    rating: commentDto.rating,
    user: adaptCreateUserToClient(commentDto.userId),
  };
}

export function adaptOffersToClient(offerDto: CreateOfferDto[]): Offer[] {
  return offerDto.map(((offer) => adaptOfferToClient(offer)));
}

export function adaptCommentsToClient(commentDto: CreateCommentDto[]): Comment[] {
  return commentDto.map(((comment) => adaptCommentToClient(comment)));
}

export function adaptCitiesToClient(cityDto: CreateCityDto[]): City[] {
  return cityDto.map(((city) => adaptCityToClient(city)));
}
