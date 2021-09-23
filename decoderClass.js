'use strict';
class decoder {
    constructor(cipher) {
      this._cipher = cipher;
      this._rebuildMaps();  
    }
    get cipher() {
        return this._cipher;
    }
    set cipher(newcipher) {
        this._cipher = newcipher;
        this._rebuildMaps();
    }
    _rebuildMaps() {
      this.encodeMap = {};
      this.decodeMap = {};
      
      for (let i = 0; i < 26; i++) {
        let asciiLetterCode = i + 97;
        let asciiLetter = String.fromCharCode(asciiLetterCode);
        let cipherLetter = this._cipher[i];
        this.encodeMap[asciiLetter] = cipherLetter;
        this.decodeMap[cipherLetter] = asciiLetter;
      }

      let whitespace = " ";
      this.encodeMap[whitespace] = whitespace;
      this.decodeMap[whitespace] = whitespace;
    }
    encode(str) {
        let l = str.split('').map((ch) => this.encodeMap[ch]);
        return l.join('');
    }
    decode(str) {
        let l = str.split('').map((ch) => this.decodeMap[ch]);
        return l.join('');
    }
}

let d = new decoder('cdefghijklmnopqrstuvwxyzab');
console.assert(d.encode('hello world') === 'jgnnq yqtnf');
console.assert(d.decode('jgnnq yqtnf') === 'hello world');
d.cipher = 'abcdefghijklmnopqrstuvwxyz';
console.assert(d.encode('hello world') === 'hello world');


class decoderRing extends decoder {
    constructor(rotation) {
      // DO THIS PART - build a string str
      // consisting of the rotated alphabet
      // then invoke the superclass constructor
      // e.g., if rotation === 2,
      //   str === 'cdefghj…';
      let alphabet = "abcdefghijklmnopqrstuvwxyz";
      let strArr = alphabet.split('').map((ch) => String.fromCharCode(((ch.charCodeAt(0) -97 + rotation) % 26) + 97));
      let str = strArr.join('');
      super(str);
    }
}


let r = new decoderRing(2);
console.assert(r.encode('hello world') === 'jgnnq yqtnf');
console.assert(r.decode('jgnnq yqtnf') === 'hello world');
r.cipher = 'abcdefghijklmnopqrstuvwxyz';
console.assert(r.encode('hello world') === 'hello world');
