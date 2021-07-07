$(() => {

  $('form').on('submit', (event) => {

    event.preventDefault()

    //vars on userinput
    const $searchOption = $('#option').val()
    const $userInput = $('input[type="text"]').val() + ':'
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const key = '&key=AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ'


    console.log($searchOption)
    console.log($userInput)

    $.ajax({
      url: url + $searchOption + $userInput + key,
      type: 'GET'
    }).then(
      (data) => {
        console.log(data)
    })





  })


})


//api key: AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ
