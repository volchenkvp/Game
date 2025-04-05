
const topics = {
  "Восприятие": [
    "Что именно я считаю реальностью?",
    "Где моё внимание прямо сейчас?",
    "Как мои убеждения формируют моё восприятие?",
    "Что я вижу — это правда или моя интерпретация?",
    "Какие фильтры я применяю, не осознавая этого?",
    "Что я не замечаю из-за привычного взгляда?",
    "На что я смотрю, когда думаю, что смотрю на другое?",
    "Что для меня по-настоящему важно — и вижу ли я это?",
    "Смотрю ли я на мир глазами страха или любви?",
    "Как часто я путаю ощущения с фактами?"
  ],
  "Страх": [
    "Какой страх управляет мной прямо сейчас?",
    "Что я избегаю из-за страха быть отвергнутым?",
    "Где страх скрывается под видом логики?",
    "Чего я боюсь настолько, что даже не замечаю этого страха?",
    "Какой страх мешает мне быть собой?",
    "Что я выбрал не делать, чтобы не столкнуться со страхом?",
    "Как бы я поступал, если бы не было страха?",
    "Какая часть меня желает остаться в страхе?",
    "Чему меня учит этот страх?",
    "Где страх — это приглашение к росту?"
  ],
  "Цель": [
    "Что я действительно хочу?",
    "Зачем мне то, к чему я стремлюсь?",
    "Если бы у меня уже всё было — что бы я делал?",
    "Что приносит мне настоящую радость?",
    "Какая цель даёт мне энергию?",
    "Куда я иду — и откуда это желание?",
    "Что, если моя цель — просто быть?",
    "Чего я избегаю, прикрываясь целями?",
    "Что является истинным импульсом моего движения?",
    "Что произойдёт, когда я достигну цели?"
  ]
};

const answers = [
  "Ты уже знаешь ответ. Просто доверься.",
  "Отпусти. Это не твоё.",
  "Сделай шаг. Даже маленький.",
  "Будь честен. Даже если страшно.",
  "То, что ты ищешь — уже внутри тебя.",
  "Смени точку зрения — и увидишь новое.",
  "Замедлись и позволь себе наблюдать.",
  "Истина приходит в тишине.",
  "Наблюдай без суждений.",
  "Ты можешь смотреть глубже, чем привык."
];

let currentTopic = "Восприятие";
let currentQuestion = "";
let currentHint = "";

function changeTopic(value) {
  currentTopic = value;
  document.getElementById('currentTopic').innerText = value;
  newQuestion();
}

function newQuestion() {
  const qlist = topics[currentTopic];
  const q = qlist[Math.floor(Math.random() * qlist.length)];
  currentQuestion = q;
  document.getElementById('questionBox').innerText = q;
  document.getElementById('answerBox').innerText = '';
  document.getElementById('userAnswer').value = '';
}

function getHint() {
  if (!currentQuestion) return alert("Сначала задай вопрос.");
  const a = answers[Math.floor(Math.random() * answers.length)];
  currentHint = a;
  document.getElementById('answerBox').innerText = a;
  if (navigator.vibrate) navigator.vibrate(100);
}

function saveUserAnswer() {
  if (!currentQuestion || !currentHint) return alert("Сначала задай вопрос и получи подсказку.");
  const userText = document.getElementById('userAnswer').value;
  const saved = JSON.parse(localStorage.getItem('insights') || '[]');
  saved.push({
    topic: currentTopic,
    q: currentQuestion,
    a: currentHint,
    u: userText,
    t: new Date().toLocaleString()
  });
  localStorage.setItem('insights', JSON.stringify(saved));
  alert("Озарение сохранено!");
}

function viewSaved() {
  const savedBox = document.getElementById('savedBox');
  const saved = JSON.parse(localStorage.getItem('insights') || '[]');
  if (saved.length === 0) {
    savedBox.innerHTML = "Нет сохранённых озарений.";
  } else {
    savedBox.innerHTML = saved.map(item =>
      `<p><strong>[${item.topic}] ${item.q}</strong><br>
       <em>Подсказка:</em> ${item.a}<br>
       <em>Мой ответ:</em> ${item.u || '—'}<br>
       <small>${item.t}</small></p>`
    ).join("<hr>");
  }
  savedBox.style.display = savedBox.style.display === "none" ? "block" : "none";
}
