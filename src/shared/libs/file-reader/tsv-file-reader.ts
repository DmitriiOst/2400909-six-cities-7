import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { CityType } from '../../types/city.type.js';
import { Offer, HousingType, Goods } from '../../types/offer.type.js';
import { FileReader } from './file-reader.interface.js';
import { UserType } from '../../types/user-data.type.js';


export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; //16KB

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      date,
      city,
      previewImage,
      photo,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      goods,
      userName,
      email,
      avatarUrl,
      password,
      comments,
      latitude,
      longitude
    ] = line.split('\t');

    return {
      title,
      description,
      date: new Date(date),
      city: city as CityType,
      previewImage,
      photo: photo.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: parseFloat(rating),
      type: type as HousingType,
      rooms: parseInt(rooms, 10),
      guests: parseInt(guests, 10),
      price: parseInt(price, 10),
      goods: goods.split(';') as Goods[],
      user: {name: userName, email, avatarUrl, password, type: type as UserType},
      comments: parseInt(comments, 10),
      location: {latitude, longitude}
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });

        nextLinePosition = remainingData.indexOf('\n');
      }
    }

    this.emit('end', importedRowCount);
  }
}
