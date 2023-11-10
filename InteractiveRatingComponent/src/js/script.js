const inputs = document.querySelector(".rating__inputs");
const form = document.getElementById("rating__form");

Array.from(inputs.children).forEach((input) => {
  const label = Array.from(input.children)[1];
  label.addEventListener("click", (e) => {
    handleClick(e, inputs);
  });
});

Array.from(inputs.children).forEach((input) => {
  const [rating, label] = Array.from(input.children);
  label.addEventListener("keydown", (e) => {
    handleSpaceOrEnter(e, inputs, rating);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.querySelector('input[name = "rating"]:checked')?.value;
  const error = document.getElementById("error");
  const thankyou__container = document.getElementById("thankyou__container");
  const rating_container = document.getElementById("rating__container");
  if (value === undefined) {
    error.classList.add("p-4");
    error.classList.remove("h-0");
    error.classList.remove("opacity-0");
  } else {
    error.classList.remove("block");
    error.classList.add("hidden");

    thankyou__container.classList.add("block");
    thankyou__container.classList.remove("hidden");

    rating_container.classList.add("hidden");
    rating_container.classList.remove("block");

    const text = document.createTextNode("You selected " + value + " out of 5");
    const para = document.getElementById("thankyou__text");
    para.appendChild(text);
  }
});

function handleClick(e) {
  Array.from(inputs.children).forEach((input) => {
    const label = Array.from(input.children)[1];
    if (label.classList.contains("bg-orange")) {
      label.classList.remove("bg-orange");
      label.classList.add("bg-mediumgrey/25");
    }
  });
  const classes = e.target.classList;
  classes.toggle("bg-orange");
}

function handleSpaceOrEnter(e, inputs, rating) {
  if (e.code == "Space" || e.code == "Enter") {
    rating.setAttribute("checked", true);
    Array.from(inputs.children).forEach((input) => {
      const label = Array.from(input.children)[1];
      if (label.classList.contains("bg-orange")) {
        label.classList.remove("bg-orange");
        label.classList.add("bg-mediumgrey/25");
      }
    });
    const classes = e.target.classList;
    classes.add("bg-orange");
  }
}
