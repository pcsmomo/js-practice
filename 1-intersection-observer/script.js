const cardContainer = document.querySelector(".card-container");
const cards = document.querySelectorAll(".card");

// 1. Basic
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);

      // Good pattern to use lazy loading image: Loading once
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
    // threshold: 0.5,
    rootMargin: "100px",
  }
);

cards.forEach(card => {
  observer.observe(card);
});

// 2. Easy Loading?
const lastCardObserver = new IntersectionObserver(entries => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadNewCards();
  lastCardObserver.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}, {});

lastCardObserver.observe(document.querySelector(".card:last-child"));

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
