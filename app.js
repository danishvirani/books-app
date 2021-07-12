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

          $favorite = $('<a>')
          .addClass('favorite')
          .attr('id', 'favorite' + i)
          $div.append($favorite)

          //resource https://blog.logrocket.com/localstorage-javascript-complete-guide/

          //add favorites to local storage.
            $('#favorite' + i).on('click', (event) => {
              localStorage.setItem(JSON.stringify('favBookTitle' + localStorage.length), JSON.stringify($('#favorite' + i).siblings('h2').html()))
              console.log($('#favorite' + i).siblings('h2').html())
            })

        console.log(localStorage)


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


  })

  //--------------------- Local Storage Append & OnClick-----------//

  //resource https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

  let favoriteBookTitles = []

  keys = Object.keys(localStorage),
  i = keys.length

  while ( i-- ) {
    favoriteBookTitles.push(localStorage.getItem(keys[i]));
  }
  console.log(localStorage)
  console.log(favoriteBookTitles)

  for (let i = 0; i < favoriteBookTitles.length; i++){
    $favLi = $('<li>')
    .text(favoriteBookTitles[i].replace(/"/g, ''))
    $('.favList').append($favLi)
  }
  $('.favList').append($('<button>').text('Close').attr('id', 'favClose'))

  $('#favClose').on('click', (event) => {
    $('#favModal').css('display', 'none')
  })

  $('#favorites').on('click', (event) => {
    $('#favModal').css('display', 'block')
  })

  //---------------------------------------------------------------//
  //------------------ Random Word Function ------------------------//

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


  })

  //----------------------------------------------------------------------------------------------------------------------//
  //Quiz script
  const startGame = () => {


  $('#modal-container').css('display', 'block')


  $('#nextQuestionButton').show().text('Next').removeClass('close')
  $('#prevQuestionButton').show()

  $('#questionsForm0').remove()
  $('#questionsForm1').remove()
  $('#questionsForm2').remove()
  $('#questionsForm3').remove()
  $('#questionsForm4').remove()
  $('#questionsForm5').remove()
  $('#questionsForm6').remove()
  $('#questionsForm7').remove()
  $('#questionsForm8').remove()
  $('#questionsForm9').remove()



  // trivia API
  $.ajax({
    url: 'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple',
    type: 'GET',
  }).then(
    (data) => {
      console.log(data)


  const questions = [
    {question: data.results[0].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[0].incorrect_answers[1],
    answerB: data.results[0].incorrect_answers[0],
    answerC: data.results[0].correct_answer,
    answerD: data.results[0].incorrect_answers[2],
    correct: data.results[0].correct_answer},
    {question: data.results[1].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[1].correct_answer,
    answerB: data.results[1].incorrect_answers[0],
    answerC: data.results[1].incorrect_answers[1],
    answerD: data.results[1].incorrect_answers[2],
    correct: data.results[1].correct_answer},
    {question: data.results[2].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[2].incorrect_answers[1],
    answerB: data.results[2].correct_answer,
    answerC: data.results[2].incorrect_answers[0],
    answerD: data.results[2].incorrect_answers[2],
    correct: data.results[2].correct_answer},
    {question: data.results[3].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[3].incorrect_answers[1],
    answerB: data.results[3].incorrect_answers[0],
    answerC: data.results[3].correct_answer,
    answerD: data.results[3].incorrect_answers[2],
    correct: data.results[3].correct_answer},
    {question: data.results[4].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[4].correct_answer,
    answerB: data.results[4].incorrect_answers[0],
    answerC: data.results[4].incorrect_answers[1],
    answerD: data.results[4].incorrect_answers[2],
    correct: data.results[4].correct_answer},
    {question: data.results[5].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[5].incorrect_answers[1],
    answerB: data.results[5].incorrect_answers[0],
    answerC: data.results[5].incorrect_answers[2],
    answerD: data.results[5].correct_answer,
    correct: data.results[5].correct_answer},
    {question: data.results[6].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[6].incorrect_answers[1],
    answerB: data.results[6].correct_answer,
    answerC: data.results[6].incorrect_answers[0],
    answerD: data.results[6].incorrect_answers[2],
    correct: data.results[6].correct_answer},
    {question: data.results[7].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[7].incorrect_answers[1],
    answerB: data.results[7].incorrect_answers[0],
    answerC: data.results[7].correct_answer,
    answerD: data.results[7].incorrect_answers[2],
    correct: data.results[7].correct_answer},
    {question: data.results[8].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[8].incorrect_answers[1],
    answerB: data.results[8].incorrect_answers[0],
    answerC: data.results[8].incorrect_answers[2],
    answerD: data.results[8].correct_answer,
    correct: data.results[8].correct_answer},
    {question: data.results[9].question.replace(/&quot;/g, ' ').replace(/&#039;/g, ' '),
    answerA: data.results[9].incorrect_answers[1],
    answerB: data.results[9].correct_answer,
    answerC: data.results[9].incorrect_answers[0],
    answerD: data.results[9].incorrect_answers[2],
    correct: data.results[9].correct_answer},
  ]



  let score = 0
  let scorePercentage = ''

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
    $questionsDiv.append('<br>')

    $choiceA = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceA' + i)
    .text(questions[i].answerA)

      $choiceA.on('click', function() {
      //remove onclick for other buttons with the same # id

      //https://stackoverflow.com/questions/19053917/enable-the-button-to-be-clicked-only-to-once-exception
      $(this).off('click')
      $(this).siblings().off('click')

        if($('#choiceA' + i).text() == questions[i].correct){
          console.log('correct')
          score++
          //score calculator
          console.log(score)
          let scorePercentage = (score / questions.length)*100
          $('#score').text(`Score: ${scorePercentage}%`)
          $('#choiceA' + i).css('background', 'green')
        } else {
          console.log('wrong')
          $('#choiceA' + i).css('background', 'red')
        }
      })

    $questionsDiv.append($choiceA)

    $choiceB = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceB' + i)
    .text(questions[i].answerB)

    $choiceB.click(function() {
      //remove onclick for other buttons with the same # id
      $(this).off('click')
      $(this).siblings().off('click')


      if($('#choiceB' + i).text() == questions[i].correct){
        console.log('correct')
         score++
         //score calculator
         console.log(score)
         let scorePercentage = (score / questions.length)*100
         $('#score').text(`Score: ${scorePercentage}%`)
        $('#choiceB' + i).css('background', 'green')
      } else {
        console.log('wrong')
        $('#choiceB' + i).css('background', 'red')
      }
    })

    $questionsDiv.append($choiceB)

    $choiceC = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceC' + i)
    .text(questions[i].answerC)

    $choiceC.click(function() {
      //remove onclick for other buttons with the same # id
      $(this).off('click')
      $(this).siblings().off('click')


      if($('#choiceC' + i).text() == questions[i].correct){
        console.log('correct')
        score++
        //score calculator
        console.log(score)
        let scorePercentage = (score / questions.length)*100
        $('#score').text(`Score: ${scorePercentage}%`)
        $('#choiceC' + i).css('background', 'green')
      } else {
        console.log('wrong')
        $('#choiceC' + i).css('background', 'red')
      }
    })

    $questionsDiv.append($choiceC)

    $choiceD = $('<button>')
    .addClass('choices')
    .attr('id', 'choiceD' + i)
    .text(questions[i].answerD)

    $choiceD.click(function() {
      //remove onclick for other buttons with the same # id
      $(this).off('click')
      $(this).siblings().off('click')


      if($('#choiceD' + i).text() == questions[i].correct){
        console.log('correct')
        score++
        //score calculator
        console.log(score)
        let scorePercentage = (score / questions.length)*100
        $('#score').text(`Score: ${scorePercentage}%`)
        $('#choiceD' + i).css('background', 'green')
      } else {
        console.log('wrong')
        $('#choiceD' + i).css('background', 'red')
      }
    })

    $questionsDiv.append($choiceD)

    $questionNumber = $('<p>')
    .addClass('questionNumber')
    .attr('id', 'questionNumber' + i)
    .text(`${i+1} out of ${questions.length}`)
    $questionsDiv.append($questionNumber)

    //score calculator
    // console.log(score)
    // let scorePercentage = (score / questions.length)
    // $('#score').text(`Score: ${scorePercentage}`)

  }

  // Questions carousel
  $('#questionsForm0').addClass('activeQ')
  $('#nextQuestionButton').click(function() {

    let currentQuestion = $('.questionsForm.activeQ')
    let nextQuestion = currentQuestion.next()
    let buttonCheck = nextQuestion.next()

    if(buttonCheck.length === 0){
      $('#nextQuestionButton').text('Close')
      .addClass('close')

      $('.close').on('click', (event) => {
        $('#modal-container').css('display', 'none')

        if (score < 3) {
          alert('You can do better than that!')
        } else if (score >= 3 && score < 7) {
          alert('Good Try! You got it next time!')
        } else if (score >= 6 && score < 10 ) {
          alert('Great Job!')
        } else if (score == 10) {
          alert('Your a Book Whiz!')
        }

        $('.questionsForm').last().removeClass('activeQ')

      })
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


  })

}
$('#bookQuiz').on('click', (event) => {
  startGame()
})



  //---------------------------------------------------------------------------------------------------------------------//




})


//api key: AIzaSyDKgDMRxcqFncYqIaabxgc1x7YBqJTnhqQ
