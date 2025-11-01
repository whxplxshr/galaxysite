// --- Приветствие и базовые ссылки на элементы
var introEl = document.getElementById('intro');
var fuel = document.getElementById('fuel');
var fuelOut = document.getElementById('fuelOut');
var statusEl = document.getElementById('status');
var resultBox = document.getElementById('result');
var smiley = document.getElementById('smiley');
var resultTitle = document.getElementById('resultTitle');
var resultText = document.getElementById('resultText');

// Вопрос при входе
if (confirm('Приступаем?')) {
  introEl.textContent = 'Жизнь продолжается, и мы должны двигаться дальше.';
} else {
  introEl.textContent = 'Камень остается на месте.';
}

// Слайдер (одиночный расчёт)
fuelOut.value = fuel.value;
fuel.addEventListener('input', function () {
  fuelOut.value = fuel.value;
});

// Простая функция расчёта (без заморочек)
function needLiters(km, rate) {
  return (km * rate) / 100;
}

// ОДИНОЧНЫЙ РАСЧЁТ (кнопки)
function handleSingle(rate) {
  var liters = Number(fuel.value);
  var input = prompt('Введите длину пути (в километрах):', '120');
  if (input === null) return;

  input = String(input).replace(',', '.');
  var km = Number(input);
  if (!isFinite(km) || km <= 0) {
    alert('Введите корректное положительное число.');
    return;
  }

  var need = needLiters(km, rate);
  var ok = liters >= need;

  statusEl.textContent =
    'Топлива: ' + liters + ' л · Расход ' + rate + ' л/100 км · Путь ' +
    km + ' км · Нужно примерно ' + need.toFixed(2) + ' л.';

  resultBox.hidden = false;
  smiley.hidden = false;

  // чёрный контур уже задан в CSS у .result
  smiley.src = ok ? 'sm_1.png' : 'sm_2.png';
  smiley.alt = ok ? 'Весёлый смайлик' : 'Грустный смайлик';
  resultTitle.textContent = ok ? 'Топлива достаточно — можно ехать!' : 'Топлива недостаточно.';
  resultText.textContent  = ok ? 'Удачной поездки.' : 'Нужно заправиться или сократить маршрут.';
}

document.getElementById('motoBtn').onclick = function(){ handleSingle(5); };
document.getElementById('carBtn').onclick  = function(){ handleSingle(10); };

// === НЕСКОЛЬКО ПОЛЬЗОВАТЕЛЕЙ ===
var userRows = document.getElementById('userRows');
var addRowBtn = document.getElementById('addRow');
var calcAllBtn = document.getElementById('calcAll');

addRowBtn.onclick = function () {
  var tr = document.createElement('tr');

  var tdName = document.createElement('td');
  var inpName = document.createElement('input');
  inpName.type = 'text';
  inpName.className = 'name';
  inpName.placeholder = 'Пользователь';
  tdName.appendChild(inpName);

  var tdL = document.createElement('td');
  var inpL = document.createElement('input');
  inpL.type = 'number';
  inpL.className = 'liters';
  inpL.min = '0';
  inpL.step = '1';
  inpL.value = '20';
  tdL.appendChild(inpL);

  var tdV = document.createElement('td');
  var sel = document.createElement('select');
  sel.className = 'vehicle';
  var o1 = document.createElement('option'); o1.value = 'moto'; o1.textContent = 'Мотоцикл';
  var o2 = document.createElement('option'); o2.value = 'car';  o2.textContent = 'Машина';
  sel.appendChild(o1); sel.appendChild(o2);
  tdV.appendChild(sel);

  var tdD = document.createElement('td');
  var inpD = document.createElement('input');
  inpD.type = 'number';
  inpD.className = 'distance';
  inpD.min = '1';
  inpD.step = '1';
  inpD.value = '120';
  tdD.appendChild(inpD);

  var tdOut = document.createElement('td');
  tdOut.className = 'out';

  tr.appendChild(tdName);
  tr.appendChild(tdL);
  tr.appendChild(tdV);
  tr.appendChild(tdD);
  tr.appendChild(tdOut);

  userRows.appendChild(tr);
};

calcAllBtn.onclick = function () {
  var rows = userRows.querySelectorAll('tr');
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var litersEl = row.querySelector('.liters');
    var vehicleEl = row.querySelector('.vehicle');
    var distanceEl = row.querySelector('.distance');
    var outCell = row.querySelector('.out');

    // читаем значения
    var liters = Number(String(litersEl.value).replace(',', '.'));
    var km = Number(String(distanceEl.value).replace(',', '.'));
    var rate = vehicleEl.value === 'moto' ? 5 : 10;

    // валидация простая
    if (!isFinite(liters) || liters < 0 || !isFinite(km) || km <= 0) {
      outCell.textContent = 'Неверные данные';
      continue;
    }

    var need = needLiters(km, rate);
    var ok = liters >= need;

    // очищаем и заполняем результат
    outCell.textContent = '';
    var box = document.createElement('div');
    box.className = 'out-box';

    var img = document.createElement('img');
    img.className = 'sm';
    img.alt = ok ? 'Ок' : 'Не ок';
    img.src = ok ? 'sm_1.png' : 'sm_2.png';

    var text = document.createElement('span');
    text.textContent = ok
      ? 'Хватает (нужно ~ ' + need.toFixed(2) + ' л)'
      : 'Не хватает (нужно ~ ' + need.toFixed(2) + ' л)';

    box.appendChild(img);
    box.appendChild(text);
    outCell.appendChild(box);
  }
};
