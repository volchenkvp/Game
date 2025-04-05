const questions = [
  "Что я избегаю чувствовать?",
  "Где я притворяюсь, что всё под контролем?",
  "Что требует моего внимания прямо сейчас?",
  "Что я бы сделал, если бы знал, что уже достоин?",
  "Какой страх зовёт меня к росту?"
];

const answers = [
  "Ты уже знаешь ответ. Просто доверься.",
  "Отпусти. Это не твоё.",
  "Сделай шаг. Даже маленький.",
  "Будь честен. Даже если страшно.",
  "То, что ты ищешь — уже внутри тебя."
];

let currentQuestion = "";

function newQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = q;
  document.getElementById('questionBox').innerText = q;
  document.getElementById('answerBox').innerText = '';
}

function getAnswer() {
  if (!currentQuestion) return alert("Сначала задай вопрос.");
  const a = answers[Math.floor(Math.random() * answers.length)];
  document.getElementById('answerBox').innerText = a;

  if (navigator.vibrate) navigator.vibrate(100);

  const saved = JSON.parse(localStorage.getItem('insights') || '[]');
  saved.push({ q: currentQuestion, a: a, t: new Date().toLocaleString() });
  localStorage.setItem('insights', JSON.stringify(saved));
}

function viewSaved() {
  const savedBox = document.getElementById('savedBox');
  const saved = JSON.parse(localStorage.getItem('insights') || '[]');
  if (saved.length === 0) {
    savedBox.innerHTML = "Нет сохранённых озарений.";
  } else {
    savedBox.innerHTML = saved.map(item =>
      `<p><strong>${item.q}</strong><br>${item.a}<br><em>${item.t}</em></p>`
    ).join("<hr>");
  }
  savedBox.style.display = savedBox.style.display === "none" ? "block" : "none";
}