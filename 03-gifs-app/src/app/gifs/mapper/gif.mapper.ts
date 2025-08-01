import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.fixed_height.url,
    };
  }

  static mapGiphyItemsToGifsArray(items: GiphyItem[]): Gif[] {
    return items.map(GifMapper.mapGiphyItemToGif);
  }
}
