// Helper: Map card titles in HTML to JSON titles
const titleMap = {
  "Works": "Work",
  "Play": "Play",
  "Study": "Study",
  "Exercise": "Exercise",
  "Social": "Social",
  "Self-care": "Self Care"
};

let timeData = [];
let currentOption = "weekly"; // Default

// Fetch data.json
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    timeData = data;
    updateCards(currentOption);
  });

// Listen for option clicks
document.querySelectorAll('.BottomCard p').forEach(option => {
  option.addEventListener('click', function() {
    currentOption = this.dataset.option;
    updateCards(currentOption);
    // Optional: highlight selected
    document.querySelectorAll('.BottomCard p').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
  });
});

function updateCards(option) {
  const cards = document.querySelectorAll('.wrapper2 .cards');
  cards.forEach(card => {
    // Get card title from HTML
    const cardTitleElem = card.querySelector('.text1 p:first-child');
    if (!cardTitleElem) return;
    const htmlTitle = cardTitleElem.textContent.trim();
    const jsonTitle = titleMap[htmlTitle] || htmlTitle;

    // Find matching data
    const data = timeData.find(item => item.title === jsonTitle);
    if (!data) return;

    // Update current hours
    const currentElem = card.querySelector('.text1 p:nth-child(2)');
    if (currentElem) {
      currentElem.textContent = data.timeframes[option].current + "hrs";
    }

    // Update previous hours
    const previousElem = card.querySelector('.text2 p:nth-child(2)');
    if (previousElem) {
      let label = "Last Week";
      if (option === "daily") label = "Yesterday";
      if (option === "monthly") label = "Last Month";
      previousElem.textContent = `${label} - ${data.timeframes[option].previous}hrs`;
    }
  });
}