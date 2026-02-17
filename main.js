const entryForm = document.getElementById("entryForm");
const numberInput = document.getElementById("numberInput");
const nicknameInput = document.getElementById("nicknameInput");
const entryList = document.getElementById("entryList");
const resultList = document.getElementById("resultList");
const drawButton = document.getElementById("drawButton");
const message = document.getElementById("message");

const applicants = [];

function renderApplicants() {
  entryList.innerHTML = "";
  applicants.forEach((applicant) => {
    const li = document.createElement("li");
    li.textContent = `${applicant.number} - ${applicant.nickname}`;
    entryList.appendChild(li);
  });
}

function showMessage(text) {
  message.textContent = text;
}

function pickRandomWinners(list, count) {
  const copied = [...list];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied.slice(0, count);
}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const number = numberInput.value.trim();
  const nickname = nicknameInput.value.trim();

  if (!number || !nickname) {
    showMessage("번호와 닉네임을 모두 입력해 주세요.");
    return;
  }

  const isDuplicate = applicants.some(
    (applicant) => applicant.number === number || applicant.nickname === nickname,
  );

  if (isDuplicate) {
    showMessage("같은 번호 또는 닉네임은 중복 등록할 수 없습니다.");
    return;
  }

  applicants.push({ number, nickname });
  renderApplicants();
  showMessage(`신청자 ${nickname} 추가 완료`);
  entryForm.reset();
  numberInput.focus();
});

drawButton.addEventListener("click", () => {
  if (applicants.length < 3) {
    showMessage("최소 3명 이상 등록해야 추첨할 수 있습니다.");
    resultList.innerHTML = "";
    return;
  }

  const winners = pickRandomWinners(applicants, 3);
  resultList.innerHTML = "";

  winners.forEach((winner) => {
    const li = document.createElement("li");
    li.textContent = `${winner.number} - ${winner.nickname}`;
    resultList.appendChild(li);
  });

  showMessage("추첨이 완료되었습니다.");
});
