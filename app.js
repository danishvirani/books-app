$(() => {

  //hide container div and buttons on page load
  $('.results-container').hide()
  $('.carousel-btns').hide()

  $('.submit').on('click', (event) => {

    event.preventDefault()
    $('.carousel').empty()

    //show carousel div and buttons on search
    $('.results-container').show()
    $('.carousel-btns').show()

    //vars on userinput
    const $searchOption = $('#option').val() + '+'
    const $searchInput = $('.searchBox').val().replace(/ /g, '+') + '+'
    const $userInput = $('.searchBox2').val() + ':'
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const key = '&key=AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ'


    console.log($searchOption)
    console.log($userInput)

    $.ajax({
      url: url + $userInput + $searchOption + $searchInput + key,
      type: 'GET'
    }).then(
      (data) => {
        console.log(data)

        // console.log(data.items[1])
        //for loop to create content based on search results
        for (let i = 0; i < data.items.length; i++){

          //create div element for every book result
          $div = $('<div>')
          .addClass('bookDiv')
          .attr('id', 'bookDiv' + i)
          $('.carousel').append($div)

          //populate content within $div
          //book title
          $h2 = $('<h2>')
          .addClass('bookTitle')
          .attr('id', 'bookTitle' + i)
          .text(data.items[i].volumeInfo.title)
          $div.append($h2)

          //book picture
          $bookImg = $('<img>')
          .addClass('bookImg')
          .attr('id', 'bookImg' + i)
          .attr('src', data.items[i].volumeInfo.imageLinks.smallThumbnail)
          $div.append($bookImg)

          //book information
          $bookAuthor = $('<p>')
          .addClass('bookAuthor')
          .attr('id', 'bookAuthor' + i)
          .text(data.items[i].volumeInfo.authors)
          $div.append($bookAuthor)

          $bookPublisher = $('<p>')
          .addClass('bookPublisher')
          .attr('id', 'bookPublisher' + i)
          .text(data.items[i].volumeInfo.publisher)
          $div.append($bookPublisher)

          $bookPublishedDate = $('<p>')
          .addClass('bookPublishedDate')
          .attr('id', 'bookPublishedDate' + i)
          .text(data.items[i].volumeInfo.publishedDate)
          $div.append($bookPublishedDate)

          $bookInfo = $('<a>')
          .addClass('bookInfo')
          .attr('id', 'bookInfo' + i)
          .text('More Information')
          .attr('href', data.items[i].volumeInfo.infoLink)
          $div.append($bookInfo)
          $div.append($('<br />'))

          $bookAmazon = $('<a>')
          .addClass('bookAmazon')
          .attr('id', 'bookAmazon' + i)
          .text('Buy it on Amazon')
          .attr('href', 'https://www.amazon.com/s?k=' + data.items[i].volumeInfo.title)
          $div.append($bookAmazon)


        }
      // $('#bookDiv0').removeClass('bookDiv')
      $('#bookDiv0').addClass('active')
      $('#next').click(function() {
          let currentDiv = $('.bookDiv.active')
          let nextDiv = currentDiv.next()
          currentDiv.removeClass('active')
          nextDiv.addClass('active')

          if(nextDiv.length === 0){
            $('.bookDiv').first().addClass('active')
          }
      })
      $('#prev').click(function() {
        let currentDiv = $('.bookDiv.active')
        let previousDiv = currentDiv.prev()
        currentDiv.removeClass('active')
        previousDiv.addClass('active')

        if(previousDiv.length === 0){
          $('.bookDiv').last().addClass('active')
        }

      })



    })

    $.ajax({
      url: 'https://random-word-api.herokuapp.com/word?number=1',
      type: 'GET'
    }).then(
      (word) => {
        console.log(word)

        $.ajax({
          url: url + 'intitle' + word + ':' + key,
          type: 'GET'
        }).then(
          (data) => {
            console.log(data)
        })
    })





  })


})


//api key: AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ
