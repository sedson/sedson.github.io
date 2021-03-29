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


const cyan = dom.get("#cyan");
cyan.value = 50;
cyan.oninput = () => {
  dom.get('#cval').innerText = cyan.value;
}

const magenta = dom.get("#magenta");
magenta.value = 50;

magenta.oninput = () => {
  dom.get('#mval').innerText = magenta.value;
}

const yellow = dom.get("#yellow");
yellow.value = 50;

yellow.oninput = () => {
  dom.get('#yval').innerText = yellow.value;
}

const black = dom.get("#black");
black.value = 50;

black.oninput = () => {
  dom.get('#kval').innerText = black.value;
}


guess.onclick = () => {
  const actual = dom.new('p');
  actual.innerText = `Color was C: ${c} | M: ${m} | Y: ${y} | K: ${k}`
  dom.get('body').append(actual);
  let offBy = Math.abs(cyan.value - c) + Math.abs(magenta.value - m) +
              Math.abs(yellow.value - y) + Math.abs(black.value - b);

  let percent = ( 100 * (offBy / 400)).toFixed(2);
  const per = dom.new('h3');
  per.innerText = `${percent}% accurate`;
  dom.get('body').append(per);
}
