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

          //create book summary div to organize data on screen
          $div2 = $('<div>')
          .addClass('bookSum')
          .attr('id', 'bookSum' + i)
          $div.append($div2)

          //book picture
          $bookImg = $('<img>')
          .addClass('bookImg')
          .attr('id', 'bookImg' + i)
          .attr('src', data.items[i].volumeInfo.imageLinks.smallThumbnail)
          .css({'height': '288', 'width': '192'})
          $div2.append($bookImg)

          //div for book info
          $div3 = $('<div>')
          .addClass('bookSumRight')
          .attr('id', 'bookSumRight' + i)
          $div2.append($div3)

          //book information
          $bookAuthor = $('<p>')
          .addClass('bookAuthor')
          .attr('id', 'bookAuthor' + i)
          .text('Author: ' + data.items[i].volumeInfo.authors)
          $div3.append($bookAuthor)

          $bookPublisher = $('<p>')
          .addClass('bookPublisher')
          .attr('id', 'bookPublisher' + i)
          .text('Publisher: ' + data.items[i].volumeInfo.publisher)
          $div3.append($bookPublisher)

          $bookPublishedDate = $('<p>')
          .addClass('bookPublishedDate')
          .attr('id', 'bookPublishedDate' + i)
          .text('Year Published: ' + data.items[i].volumeInfo.publishedDate)
          $div3.append($bookPublishedDate)

          $bookDescriptionButton = $('<button>')
          .addClass('bookDescriptionButton')
          .attr('id', 'bookDescriptionButton' + i)
          .text('Description')
          $div.append($bookDescriptionButton)

          $bookDescription = $('<p>')
          .addClass('bookDescription')
          .attr('id', 'bookDescription' + i)
          .text(data.items[i].volumeInfo.description)
          .hide()
          $div.append($bookDescription)


            $('#bookDescriptionButton' + i).on('click', (event) => {

                if($('#bookDescriptionButton' + i).text() === 'Description'){
                  $('#bookDescription' + i).show()
                  $('#bookDescriptionButton' + i).text('Hide')
                  console.log('show')
                } else {
                  $('#bookDescription' + i).hide()
                  $('#bookDescriptionButton' + i).text('Description')
                }
            })


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
          .attr('href', 'https://www.amazon.com/s?k=' + data.items[i].volumeInfo.title)
          $div.append($bookAmazon)


        }

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

  $('.random').on('click', (event) => {

    event.preventDefault()
    $('.carousel').empty()

    //show carousel div and buttons on search
    $('.results-container').show()
    $('.carousel-btns').show()

    //vars on userinput
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
    const key = '&key=AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ'


    $.ajax({
      url: 'https://random-word-api.herokuapp.com/word?number=1',
      type: 'GET',
      mode: 'cors',
      credentials: 'include'
    }).then(
      (word) => {
        console.log(word)

        $.ajax({
          url: url + 'subject' + word + ':' + key,
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

              //create book summary div to organize data on screen
              $div2 = $('<div>')
              .addClass('bookSum')
              .attr('id', 'bookSum' + i)
              $div.append($div2)

              //book picture
              $bookImg = $('<img>')
              .addClass('bookImg')
              .attr('id', 'bookImg' + i)
              .attr('src',  data.items[i].volumeInfo.imageLinks.smallThumbnail)
              .css({'height': '288', 'width': '192'})
              $div2.append($bookImg)

              //div for book info
              $div3 = $('<div>')
              .addClass('bookSumRight')
              .attr('id', 'bookSumRight' + i)
              $div2.append($div3)

              //book information
              $bookAuthor = $('<p>')
              .addClass('bookAuthor')
              .attr('id', 'bookAuthor' + i)
              .text('Author: ' + data.items[i].volumeInfo.authors)
              $div3.append($bookAuthor)

              $bookPublisher = $('<p>')
              .addClass('bookPublisher')
              .attr('id', 'bookPublisher' + i)
              .text('Publisher: ' +   data.items[i].volumeInfo.publisher)
              $div3.append($bookPublisher)

              $bookPublishedDate = $('<p>')
              .addClass('bookPublishedDate')
              .attr('id', 'bookPublishedDate' + i)
              .text('Year Published: ' +  data.items[i].volumeInfo.publishedDate)
              $div3.append($bookPublishedDate)

              $bookDescriptionButton = $('<button>')
              .addClass('bookDescriptionButton')
              .attr('id', 'bookDescriptionButton' + i)
              .text('Description')
              $div.append($bookDescriptionButton)

              $bookDescription = $('<p>')
              .addClass('bookDescription')
              .attr('id', 'bookDescription' + i)
              .text(data.items[i].volumeInfo.description)
              .hide()
              $div.append($bookDescription)


                $('#bookDescriptionButton' + i).on('click', (event) => {

                    if($('#bookDescriptionButton' + i).text() === 'Description'){
                      $('#bookDescription' + i).show()
                      $('#bookDescriptionButton' + i).text('Hide')
                      console.log('show')
                    } else {
                      $('#bookDescription' + i).hide()
                      $('#bookDescriptionButton' + i).text('Description')
                    }
                })

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
              .attr('href', 'https://www.amazon.com/s?k=' +   data.items[i].volumeInfo.title)
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

  //----------------------------------------------------------------------------------------------------------------------//
  //Quiz script


  const questions = [
    {question: 'What Year Was Book Published', answerA: '1999', answerB: '1998', answerC: '2001', answerD: '2000'},
    {question: 'Who Is The Author Of Book', answerA: 'author1', answerB: 'author2', answerC: 'author3', answerD: 'author4'},
    {question: 'What Year Was Book 2 Published', answerA: '2003', answerB: '2004', answerC: '2005', answerD: '2005'},
    {question: 'Who Is The Author Of Book2', answerA: 'author5', answerB: 'author6', answerC: 'author7', answerD: 'author8'}
  ]

  for (let i = 0; i < questions.length; i++){

    $questionsDiv = $('<div>')
    .addClass('questionsForm')
    .attr('id', 'questionsForm' + i)
    $('#questions-container').append($questionsDiv)

    $question = $('<h2>')
    .addClass('question')
    .attr('id', 'question' + i)
    .text(questions[i].question)
    $questionsDiv.append($question)

    $choiceA = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceA' + i)
    .text(questions[i].answerA)
    $questionsDiv.append($choiceA)

    $choiceB = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceB' + i)
    .text(questions[i].answerB)
    $questionsDiv.append($choiceB)

    $choiceC = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceC' + i)
    .text(questions[i].answerC)
    $questionsDiv.append($choiceC)

    $choiceD = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceD' + i)
    .text(questions[i].answerD)
    $questionsDiv.append($choiceD)

  }


  $('#questionsForm0').addClass('activeQ')
  $('#nextQuestionButton').click(function() {

    let currentQuestion = $('.questionsForm.activeQ')
    let nextQuestion = currentQuestion.next()
    let buttonCheck = nextQuestion.next()

    if(buttonCheck.length === 0){
      $('#nextQuestionButton').text('Submit')
    }
    if(nextQuestion.length === 0){
      $('#nextQuestionButton').hide()
      $('#prevQuestionButton').hide()
    } else {
      $('#prevQuestionButton').show()
    }
    currentQuestion.removeClass('activeQ')
    nextQuestion.addClass('activeQ')


  })

  $('#prevQuestionButton').hide()

  $('#prevQuestionButton').click(function() {

    let currentQuestion = $('.questionsForm.activeQ')
    let previousQuestion = currentQuestion.prev()
    let buttonCheck = previousQuestion.prev()

    if(buttonCheck.length == 0){
      $('#prevQuestionButton').hide()
    }

    currentQuestion.removeClass('activeQ')
    previousQuestion.addClass('activeQ')



  })


  //---------------------------------------------------------------------------------------------------------------------//




})


//api key: AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ
