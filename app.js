let randomNumber = Math.floor(Math.random() * 100)

let attempts = 10

let numbersGuessed = []

const userNumber = document.querySelector("#number")
const message = document.querySelector("#message")
const attemptsEl = document.querySelector("#attempts")
const numbersGuessedEl = document.querySelector("#numbers-guessed")

const clear = () => (message.textContent = "")
const restart = document.querySelector("#restart")

restart.addEventListener("click", () => location.reload())

function displayMessage(content, color) {
  message.textContent = content
  message.style.color = color
}

function showRestartButton() {
  userNumber.readOnly = true
  restart.classList.remove("hidden")
}

function checkGuess() {
  if (userNumber.value > 100 || userNumber.value < 0)
    return displayMessage(
      "You typed in an invalid number!",
      "var(--color-danger)"
    )

  if (userNumber.value == "")
    return displayMessage("You have to type a number!", "var(--color-danger)")

  if (attempts == 0) {
    document.querySelector("main").classList.add("game-over")
    displayMessage(`Game over! The right number is ${randomNumber}`, "#fff")
    showRestartButton()
  } else {
    if (userNumber.value < randomNumber) {
      displayMessage("Too Low!", "var(--color-alert)")
      attempts--
    } else if (userNumber.value > randomNumber) {
      displayMessage("Too High!", "var(--color-alert)")
      attempts--
    } else {
      document.querySelector("main").classList.add("right-answer")
      displayMessage("You got it right!", "#fff")
      showRestartButton()
    }
  }
  numbersGuessed.push(userNumber.value)
  numbersGuessedEl.textContent =
    numbersGuessed.length > 1 ? numbersGuessed.join(", ") : numbersGuessed
  attemptsEl.textContent = attempts
}

userNumber.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkGuess()
    userNumber.value = ""
  }
})
