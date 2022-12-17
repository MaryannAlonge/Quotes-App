const btn = document.querySelector(".get-quotes")
btn.addEventListener("click", getQuotes);
const number = document.getElementById("number")

function getQuotes(e) {
  e.preventDefault();
  if(number.value.length == 0) {
    return alert("Please enter a number")
  } else {
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();

    })
    .then(function(data) {
      // console.log(JSON.stringify(data))
      data = shuffle(data)

      let output = "";
      for(let i = 0; i< data.length; i++) {
        if(i == number.value) {break;}  // break out of the loop i.e stop looping
        output += `
             <li style="listStyle: none" >Quote: ${data[i].text}</li style="textDecoratio: none">
             <li style="listStyle: none">Author: ${data[i].author}</li style="textDecoratio: none">
             <hr>

          `;
      }
      document.querySelector(".quotes").innerHTML = output;
    })
  }

}

// function to shuffle the quotes

function shuffle(quotes) {
  let CI =quotes.length, tempValue, randomIndex;

  // while elements exist in the array
  while(CI > 0) {
     randomIndex = Math.floor(Math.random() * CI);
     // decrease the CI by 1
     CI --;

     // swap the last element with CI
     tempValue = quotes[CI];
     quotes[CI] = quotes[randomIndex];
     quotes[randomIndex] = tempValue;
  }

  return quotes;
}