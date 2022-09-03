const initialPriceInput = document.querySelector("#initial-price");
const stocksQuantityInput = document.querySelector("#quantity");
const currentPriceInput = document.querySelector("#current-price");
const userGuessProfit = document.querySelector("#profit");
const userGuessLoss = document.querySelector("#loss");
const resultDiv = document.querySelector("#finalResult");
const submitBtn = document.querySelector("#submit-btn");

function submitHandler(e) {
  e.preventDefault();
  const initialPrice = Number(initialPriceInput.value);
  const stocksQuantity = Number(stocksQuantityInput.value);
  const currentPrice = Number(currentPriceInput.value);
  const userGuess = userGuessLoss.checked ? "loss" : "profit";

  if (validateInput(initialPrice, stocksQuantity, currentPrice)) {
    calculateProfitAndLoss(
      initialPrice,
      stocksQuantity,
      currentPrice,
      userGuess
    );
  }
}

function validateInput(initialPrice, stocksQuantity, currentPrice) {
  if (initialPrice <= 0) {
    resultDiv.innerText = "Initial price cannot be less than or equal to 0";
    return false;
  }
  if (stocksQuantity <= 0) {
    resultDiv.innerText = "Quantity cannot be less than or equal to 0";
    return false;
  }
  if (currentPrice <= 0) {
    resultDiv.innerText = "Buddy, you are in a terrible situation🙄";
    return false;
  }

  return true;
}

function calculateProfitAndLoss(
  initialPrice,
  stocksQuantity,
  currentPrice,
  userGuess
) {
  const previousTradePrice = initialPrice * stocksQuantity;
  const currentTradePrice = currentPrice * stocksQuantity;

  if (currentTradePrice < previousTradePrice) {
    const loss = previousTradePrice - currentTradePrice;
    const lossPercentage = (loss / previousTradePrice) * 100;

    if (userGuess === "loss") {
      resultDiv.innerText = `Unfortunately, you guessed it right😥. Your loss is ${loss} and loss percentage is ${lossPercentage}%`;
    } else {
      resultDiv.innerText = `Sorry😔, you guessed it wrong. Your loss is ${loss} and loss percentage is ${lossPercentage}%`;
    }
  } else if (currentTradePrice > previousTradePrice) {
    const profit = currentTradePrice - previousTradePrice;
    const profitPercentage = (profit / previousTradePrice) * 100;

    if (userGuess === "profit") {
      resultDiv.innerText = `Congratulations🎉, you guessed it right. Your profit is ${profit} and profit percentage is ${profitPercentage}%`;
    } else {
      resultDiv.innerText = `Celebrate buddy you've made a profit🎉. Your profit is ${profit} and profit percentage is ${profitPercentage}%`;
    }
  }
}

submitBtn.addEventListener("click", submitHandler);
