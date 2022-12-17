const btn = document.querySelector(".get-quotes")
btn.addEventListener("click", getQuotes);
const number = document.getElementById("number")

function getQuotes(e) {
  e.preventDefault();

  if(number.value.length == 0) {
    return alert("Please enter a number")
  } else {
    const http = new XMLHttpRequest();

    http.open("GET", "https://type.fit/api/quotes", true )
  
    http.onload = function() {
      if(this.status == 200) {
        console.log(this.responseText)
  
        const response = shuffle(JSON.parse(this.responseText)); // this line is being wrapped by the function shuffle to randomize the quotes
        let output = "";
        // response.forEach(function(quote) {
        //   output += `
        //     <li style="textDecoratio: none">Quote: ${quote.text}</li style="textDecoratio: none">
        //     <li style="textDecoratio: none">Author: ${quote.author}</li style="textDecoratio: none">
        //     <hr>
  
        //   `;
        // })

        for(let i = 0; i< response.length; i++) {
          if(i == number.value) {break;}  // break out of the loop i.e stop looping
          output += `
               <li style="listStyle: none" >Quote: ${response[i].text}</li style="textDecoratio: none">
               <li style="listStyle: none">Author: ${response[i].author}</li style="textDecoratio: none">
               <hr>
  
            `;
        }
  
             document.querySelector(".quotes").innerHTML = output;
      }
  
    }
  
    http.send();
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