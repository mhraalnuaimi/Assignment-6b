const panels = document.querySelectorAll(".text-side");

window.addEventListener("scroll", () => {
  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      panel.classList.add("visible");
    }
  });

  stopAlarmIfOutOfView(); // 🔔 check alarm panel visibility
});

function shuffleObjects(el) {
  el.style.transition = "transform 0.4s ease";
  const randomRotate = Math.random() * 60 - 30;
  const randomScale = 0.8 + Math.random() * 0.4;
  el.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
  setTimeout(() => el.style.transform = "rotate(0deg) scale(1)", 600);
}

const alarmButton = document.getElementById("alarm");
const alarmSound = document.getElementById("alarmSound");

function ringAlarm() {
  if (!alarmSound.paused) return; // already playing

  alarmButton.classList.add("ringing");
  alarmButton.innerText = "🔔 Ringing!";

  alarmSound.currentTime = 0;
  alarmSound.play().catch(err => {
    console.warn("Audio play blocked until user interacts:", err);
  });
}

function stopAlarmIfOutOfView() {
  const alarmPanel = alarmButton.closest(".panel");
  const rect = alarmPanel.getBoundingClientRect();

  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (!isVisible && !alarmSound.paused) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmButton.classList.remove("ringing");
    alarmButton.innerText = "⏰ Tap to Ring";
  }
}

