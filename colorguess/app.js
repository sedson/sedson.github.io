 const dom = {
   get: (x) => document.querySelector(x),
   new: (x) => document.createElement(x)
 }

let chan = () => Math.floor(Math.random() * 256);

const [r, g, b] = [chan(), chan(), chan()];

const [c, m, y, k] = rgb2cmyk(r, g, b);


let randCol = `rgb(${r}, ${g}, ${b})`

let col = randCol;

dom.get('.swatch').style.backgroundColor = randCol;
console.log([c, m, y, k])


const cyan = dom.get('#cyan');
const cyanValue = dom.get('#cval');
cyan.value = 50;
cyanValue.value = 50;
cyan.oninput = () => {
  cyanValue.value = cyan.value;
}
cyanValue.onchange = () => {
  cyan.value = cyanValue.value;
}

const magenta = dom.get('#magenta');
const magentaValue = dom.get('#mval');
magenta.value = 50;
magentaValue.value = 50;
magenta.oninput = () => {
  magentaValue.value = magenta.value;
}
magentaValue.onchange = () => {
  magenta.value = magentaValue.value;
}

const yellow = dom.get('#yellow');
const yellowVal = dom.get('#yval');
yellow.value = 50;
yellowVal.value = 50;
yellow.oninput = () => {
  yellowVal.value = yellow.value;
}
yellowVal.onchange = () => {
  yellow.value = yellowVal.value;
}

const black = dom.get('#black');
const blackVal = dom.get('#kval');
black.value = 50;
blackVal.value = 50;
black.oninput = () => {
  blackVal.value = black.value;
}
blackVal.onchange = () => {
  black.value = blackVal.value;
}


guess.onclick = () => {
  const actual = dom.new('p');
  actual.innerText = `Color was C: ${c} | M: ${m} | Y: ${y} | K: ${k}`
  dom.get('body').append(actual);

  console.log(cyan.value, magenta.value, yellow.value, black.value)
  let offBy = Math.abs(cyan.value - c) +
              Math.abs(magenta.value - m) +
              Math.abs(yellow.value - y) +
              Math.abs(black.value - k);


  let percent = ( 100 * ( 1 - (offBy / 400))).toFixed(2);
  const per = dom.new('h3');
  per.innerText = `${percent}% accurate`;
  dom.get('body').append(per);
}
