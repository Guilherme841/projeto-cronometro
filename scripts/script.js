const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

let começo = 0;
let decorrido = 0;
let interval;
let execução = false;

function padTime(num, size = 2) {
  let s = String(num);
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function começar() {
  if (execução) {
    return;
  }
  execução = true;
  começo = Date.now() - decorrido;
  interval = setInterval(function () {
    decorrido = Date.now() - começo;
    const minutos = padTime(Math.floor(decorrido / 60000));
    const segundos = padTime(Math.floor((decorrido - minutos * 60000) / 1000));
    const mili = padTime(decorrido - minutos * 60000 - segundos * 1000, 3);
    timer.textContent = `${padTime(minutos)}:${padTime(segundos)}:${padTime(
      mili
    )}`;
  });
}

start.addEventListener("click", function () {
  const promisse = new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(começar);
    }, 10);
  });
  promisse.then((começar) => {
    começar();
  });
});

stop.addEventListener("click", function () {
  if (!execução) {
    return;
  }
  execução = false;
  clearInterval(interval);
});

reset.addEventListener("click", function () {
  execução = false;
  clearInterval(interval);
  decorrido = 0;
  timer.textContent = "00:00:00";
});
