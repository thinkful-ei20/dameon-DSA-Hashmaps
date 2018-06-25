'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    console.log('hash:',hash);
    console.log('start:',start);
    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      console.log('slot',slot);
      console.log('index',index);
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


let lor = new HashMap();
lor.set('Hobbit','Bilbo');
console.log('New Set added-----------------------------\n',lor);
lor.set('Tobbih','Frodo');
console.log('Get-----------------------------',lor.get('Hobbit'));
console.log('New Set added-----------------------------\n',lor);
//console.log(lor.get('Hobbit'));
//lor.set('Hobbit','Frodo');
//console.log('\nNew Set added-----------------------------\n',lor);
//console.log(lor.get('Hobbit'));
// lor.set('Wizard','Gandolf');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('Human','Aragon');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('Elf','Legolos');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('Maiar','The Necromancer');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('Maiar','Sauron');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('RingBearer','Gollum');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('LadyOfLight','Galadriel');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('HalfElven','Arwen');
// console.log('New Set added-----------------------------\n',lor);
// lor.set('Ent','Treebeard');
// console.log('New Set added-----------------------------\n',lor);
// console.log('Get-----------------------------',lor.get('Maiar'));