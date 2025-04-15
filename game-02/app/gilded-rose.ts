// Represents an item in the Gilded Rose inventory.
// Each item has a name, a number of days to sell (`sellIn`), and a quality score (`quality`).
export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

// Interface for updating an item based on specific rules.
// Each item type will implement its own update logic.
interface ItemUpdater {
  update(item: Item): void;
}

// Default behavior for normal items.
// - Decrease sellIn by 1 each day.
// - Degrade quality by 1 before sellIn date, and by 2 after it.
// - Quality never goes below 0.
class DefaultItemUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn--;
    const degrade = item.sellIn < 0 ? 2 : 1;
    item.quality = Math.max(0, item.quality - degrade);
  }
}

// Behavior for "Aged Brie".
// - Increases in quality over time.
// - Quality increases twice as fast after the sellIn date.
// - Quality is capped at 50.
class AgedBrieUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn--;
    if (item.quality < 50) item.quality++;
    if (item.sellIn < 0 && item.quality < 50) item.quality++;
  }
}

// Behavior for "Backstage passes".
// - Increases in quality as sellIn approaches:
//   - +1 if sellIn > 10
//   - +2 if sellIn <= 10
//   - +3 if sellIn <= 5
// - Drops to 0 after the concert (sellIn < 0).
// - Quality never exceeds 50.
class BackstagePassUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn--;

    if (item.sellIn < 0) {
      item.quality = 0;
    } else if (item.sellIn < 5) {
      item.quality = Math.min(50, item.quality + 3);
    } else if (item.sellIn < 10) {
      item.quality = Math.min(50, item.quality + 2);
    } else {
      item.quality = Math.min(50, item.quality + 1);
    }
  }
}

// Behavior for "Sulfuras, Hand of Ragnaros".
// - A legendary item.
// - Its quality and sellIn do not change.
class SulfurasUpdater implements ItemUpdater {
  update(_: Item): void {
    // No changes needed.
  }
}

// Behavior for "Conjured" items.
// - Degrade in quality twice as fast as normal items.
// - After sellIn, degrade four times as fast.
// - Quality is never negative.
class ConjuredItemUpdater implements ItemUpdater {
  update(item: Item): void {
    item.sellIn--;
    const degrade = item.sellIn < 0 ? 4 : 2;
    item.quality = Math.max(0, item.quality - degrade);
  }
}

// Factory that returns the appropriate updater based on item name.
// This separates business rules from the main update logic.
class ItemUpdaterFactory {
  static getUpdater(item: Item): ItemUpdater {
    const name = item.name;

    if (name === 'Aged Brie') {
      return new AgedBrieUpdater();
    }

    if (name === 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasUpdater();
    }

    if (name === 'Backstage passes to a TAFKAL80ETC concert') {
      return new BackstagePassUpdater();
    }

    if (name.toLowerCase().indexOf('conjured') !== -1) {
      return new ConjuredItemUpdater();
    }

    return new DefaultItemUpdater();
  }
}

// Main Gilded Rose class responsible for updating all items.
// - Delegates item-specific update logic to the appropriate updater.
// - Follows the Open/Closed Principle by using polymorphism and a factory.
export class GildedRose {
  constructor(public items: Array<Item>) {}

  updateQuality(): Item[] {
    for (const item of this.items) {
      const updater = ItemUpdaterFactory.getUpdater(item);
      updater.update(item);
    }

    return this.items;
  }
}
