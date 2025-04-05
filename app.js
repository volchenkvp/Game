const questions = ['Что именно я считаю реальностью?', 'Где моё внимание прямо сейчас?', 'Как мои убеждения формируют моё восприятие?', 'Что я вижу — это правда или моя интерпретация?', 'Какие фильтры я применяю, не осознавая этого?', 'Что я не замечаю из-за привычного взгляда?', 'На что я смотрю, когда думаю, что смотрю на другое?', 'Что для меня по-настоящему важно — и вижу ли я это?', 'Смотрю ли я на мир глазами страха или любви?', 'Как часто я путаю ощущения с фактами?', 'Какая мысль искажает моё восприятие прямо сейчас?', 'Что я решил про этот момент до того, как он случился?', 'Могу ли я наблюдать, не вмешиваясь?', 'Что я проецирую на других людей?', 'Какой сценарий управляет моей интерпретацией происходящего?', "Что я решил считать 'правильным' и почему?", 'Если всё — энергия, как я взаимодействую с ней прямо сейчас?', 'Что бы я увидел, если бы смотрел без прошлого?', 'Чему я придаю значение — и зачем?', 'Что я выбираю не воспринимать?', 'Как моё тело участвует в восприятии этого момента?', 'Что меняется, если я сменю точку обзора?', 'Кто внутри меня смотрит на этот мир?', 'Что станет видимым, если я перестану контролировать?', 'Что я воспринимаю автоматически?', 'Какова структура моего восприятия?', 'Что я вижу в другом, что избегаю увидеть в себе?', 'Где грань между восприятием и интерпретацией?', 'Что я бы хотел воспринимать иначе?', 'Если бы я смотрел как Истина — что бы я увидел?'];

const answers = [
  "Ты уже знаешь ответ. Просто доверься.",
  "Отпусти. Это не твоё.",
  "Сделай шаг. Даже маленький.",
  "Будь честен. Даже если страшно.",
  "То, что ты ищешь — уже внутри тебя."
];

let currentQuestion = "";
let currentHint = "";

function newQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
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
      `<p><strong>${item.q}</strong><br>
       <em>Подсказка:</em> ${item.a}<br>
       <em>Мой ответ:</em> ${item.u || '—'}<br>
       <small>${item.t}</small></p>`
    ).join("<hr>");
  }
  savedBox.style.display = savedBox.style.display === "none" ? "block" : "none";
}