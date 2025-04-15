import { expect } from 'chai';
import { GildedRose, Item } from '../app/gilded-rose';

describe('Gilded Rose', () => {

  describe('Default items', () => {
    it('should decrease sellIn and quality by 1 each day', () => {
      const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 10, 20)]);
      const [item] = gildedRose.updateQuality();
      expect(item.sellIn).to.equal(9);
      expect(item.quality).to.equal(19);
    });

    it('should degrade quality twice as fast after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 0, 10)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(8);
    });

    it('should never reduce quality below 0', () => {
      const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 5, 0)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(0);
    });
  });

  describe('Aged Brie', () => {
    it('should increase quality as it gets older', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(1);
    });

    it('should increase quality twice as fast after sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(2);
    });

    it('should never increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(50);
    });
  });

  describe('Backstage passes', () => {
    it('should increase quality by 1 when there are more than 10 days left', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(21);
    });

    it('should increase quality by 2 when there are 10 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(22);
    });

    it('should increase quality by 3 when there are 5 days or less', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(23);
    });

    it('should drop quality to 0 after the concert', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(0);
    });

    it('should never increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(50);
    });
  });

  describe('Sulfuras', () => {
    it('should not decrease sellIn or quality', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 5, 80)]);
      const [item] = gildedRose.updateQuality();
      expect(item.sellIn).to.equal(5);
      expect(item.quality).to.equal(80);
    });

    it('should always have quality of 80', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(80);
    });
  });

  describe('Conjured items', () => {
    it('should degrade in quality twice as fast as normal items before sellIn', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 6)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(4);
    });

    it('should degrade in quality four times as fast after sellIn', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 8)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(4);
    });

    it('should not reduce quality below 0', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 1, 1)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).to.equal(0);
    });
  });

  describe('Mixed items', () => {
    it('should update multiple items correctly', () => {
      const items = [
        new Item('Aged Brie', 2, 0),
        new Item('Backstage passes to a TAFKAL80ETC concert', 9, 45),
        new Item('Conjured Mana Cake', 3, 6),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Elixir of the Mongoose', 0, 6),
      ];

      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].quality).to.equal(1); // Aged Brie
      expect(updatedItems[1].quality).to.equal(47); // Backstage
      expect(updatedItems[2].quality).to.equal(4); // Conjured
      expect(updatedItems[3].quality).to.equal(80); // Sulfuras
      expect(updatedItems[4].quality).to.equal(4); // Default after sellIn
    });
  });
});
