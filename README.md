# be-full [![NPM Version][npm-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/el-full

ðdomèç¹å¨å±

## å¨çº¿æ¼ç¤º
[:rocket: æ¼ç¤º](https://wenhe114.github.io/el-full/demo/)

## å®è£

```shell
npm i el-full
```

## å¿«éå¼å§

```javascript
import {beFull} from 'be-full';

// æ´ä¸ªç½é¡µå¨å±æ¾ç¤º
beFull();

// æå®åç´ å¨å±
beFull(document.getElementById('video'));
```

## ð¥æ´å¤API(4ä¸ªå½æ°)

### exitFull(éåºå¨å±)
```javascript
exitFull();
```

### toggleFull(åæ¢å¨å±/éåº)
ä½¿ç¨æ¹æ³å`beFull`, åªæ¯ç¬¬äºæ¬¡ç¹å»ä¼æ§è¡`exitFull`
```javascript
toggleFull();

// åæ¢æå®åç´ å¨å±/éåº
toggleFull(document.getElementById('video'));
```

### isFull(åç´ æ¯å¦å¨å±)
```javascript
isFull(document.getElementById('video'));
```

### watchFull(çè§åç´ å¨å±ç¶æåå)
```javascript
const {cancel} = watchFull(document.documentElement, ev => {
    // å¨å±ç¶æååæ§è¡         
});

// åæ¶çå¬
cancel();
```
