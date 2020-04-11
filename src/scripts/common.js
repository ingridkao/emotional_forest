import $ from 'jquery'
import url from 'url'
import questions from './questions'
import qrcode from 'qrcode-js'
import assign from 'object.assign'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export function buttonsInit() {
  $('.js-start-button').click(() => {
    $('input[type=radio]').prop('checked', false)
    $('input[type=checkbox]').prop('checked', false)
    $('input[type=range]').val(0)
    $.fn.fullpage.moveSectionDown()
  })

  $('.js-again-button').click(() => {
    const url_obj = url.parse(location.href, true)
    delete url_obj.query.s
    delete url_obj.search
    delete url_obj.hash
    location = url.format(url_obj)
  })

  //問卷按鈕按下的第一個進入點
  $('.js-show-result').click((event) => {
    const currentSlide = $(event.target).closest('.slide')
    if (!validateSlideInput(currentSlide)) return
    uploadData()
    nextSection()
  })

  $('.js-show-prev').click((event) => {
    const currentSlide = $(event.target).closest('.slide')
    return prevSlide(currentSlide)
  })

  $('.js-show-next').click((event) => {
    const currentSlide = $(event.target).closest('.slide')
    if (!validateSlideInput(currentSlide)) return
    nextSlide(currentSlide)
  })

  $('.js-show-modal').change(event => {
    const target = event.currentTarget
    const currentSlide = $(target).closest('.slide')
    if (!validateSlideInput(currentSlide)) return
    nextSlide(currentSlide)
  })

  $('.js-share-btn').on('click', function(event) {
    const platform = $(this).data('platform')
    let url_obj = url.parse(location.href, true)

    const shareText = questions.result().shareText
    delete url_obj.search
    delete url_obj.hash
    const targetUrl = encodeURIComponent(url.format(url_obj))

    if (platform === 'facebook') {
      FB.ui({
        display: 'popup',
        method: 'share',
        hashtag: '情緒の森',
        href: 'https://theinitium.com/project/20200411-quiz-emotionforest/',
      }, function(response){
        console.log('facebook');
      });
    } else if (platform === 'twitter') {
      let shareUrl = 'https://twitter.com/intent/tweet?url=' + targetUrl
      window.open(shareUrl)
    } else if (platform === 'wechat') {
      const userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent || ''
      if (/MicroMessenger/i.test(userAgent)) {
        document.getElementById('mask').style.display = 'block'
        document.getElementById('weixin_tips').style.display = 'block'
        return
      }
      const src = qrcode.toDataURL(decodeURIComponent(targetUrl), 4)
      const elem = document.getElementById('wechatqr')
      elem.src = src
      if (elem.style.display == 'none') {
        elem.style.display = 'block'
      } else {
        elem.style.display = 'none'
      }
    } else if (platform === 'weibo') {
      let shareUrl = 'http://service.weibo.com/share/share.php?title=' + shareText + '&url=' + targetUrl
      window.open(shareUrl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
    } else if (platform === 'whatsapp') {
      let shareUrl = 'https://api.whatsapp.com/send?text=' + targetUrl
      window.open(shareUrl, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
    } else if (platform === 'telegram') {
      let shareUrl = 'https://telegram.me/share/url?url=' + targetUrl + '&text=' + shareText
      window.open(shareUrl)
    }
  })

  let againEmail = false;
  $('.js-send').click(() => {
    let newEmail = $('#email').val();
    if(againEmail){
      $('#errorText').text('無法重複送出');
      $('#errorText').show();
    }else{
      if(newEmail == ''){
        $('#errorText').text('請輸入');
        $('#errorText').show();
      }else{
        let emailreg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g;
        if(emailreg.test(newEmail)){
          $.ajax(
            {
              url: 'https://awsnode-env.eba-5mnjrpyf.us-east-2.elasticbeanstalk.com/setEmail',
              type: 'POST',
              mimeType: 'multipart/form-data',
              data: {
                uuid: $('#uuidData').val(),
                newemail: newEmail
              },
              success: function(){
                console.log('AWS: sand email ok' );
                $('#succesText').show();
                againEmail = true;
              }
            }
          )
        }else{
          $('#errorText').text('Email格式不對');
          $('#errorText').show();
        }
      }
    }
  })

  $('#email').on('keyup', function(){
    $('#succesText').hide();
    $('#errorText').hide();
  });

  $('#mask').click(() => {
    document.getElementById('mask').style.display = 'none'
    document.getElementById('weixin_tips').style.display = 'none'
  })
  $('#weixin_tips').click(() => {
    document.getElementById('mask').style.display = 'none'
    document.getElementById('weixin_tips').style.display = 'none'
  })
  $('#creditsBtn').click(() => {
    $('.creditsBox').fadeIn()
  })
  $('#creditsBoxClose').click(() => {
    $('.creditsBox').hide()
  })
  $('.close-banner').click(event => {
    const close = event.target.dataset.close
    console.log(close)
    if (close && close.length) {
      $(`[data-close="${close}"]`).hide()
      $(`#${close}`).hide()
    }
  })
}

export function nextSection(currentSlide) {
  $.fn.fullpage.moveSectionDown()
}

export function nextSlide(currentSlide) {
  const currentAnchor = currentSlide.data('anchor')
  const nextSlide = currentSlide.next()
  const nextContainer = nextSlide.find('[data-hidden]')

  const showNextBoxes = currentSlide.find('input[data-show-next]:checked')
  if (showNextBoxes.length > 0 && nextContainer) {
    nextContainer.css('display', 'block')
  } else if (nextContainer.data('hidden') === '') {
    nextContainer.css('display', 'none')
    nextContainer.find('input[type=radio]').prop('checked', false)
    nextContainer.find('input[type=checkbox]').prop('checked', false)
  }

  // skip hidden slide
  if (nextContainer.css('display') === 'none') {
    $.fn.fullpage.moveTo('questions', currentAnchor + 2)
  } else {
    $.fn.fullpage.moveSlideRight()
  }
}

export function prevSlide(currentSlide) {
  const currentAnchor = currentSlide.data('anchor')
  const prevSlide = currentSlide.prev()
  const prevContainer = prevSlide.find('[data-hidden]')

  // skip hidden slide
  if (prevContainer.css('display') === 'none') {
    $.fn.fullpage.moveTo('questions', currentAnchor - 2)
  } else {
    $.fn.fullpage.moveSlideLeft()
  }
}

export function getAnswers() {
  // 計算答案
  let scoreArray = [0,0,0,0,0,0,0,0,0];
  $('.option input:checked').each(function () {
    let string = $(this).data('score');
    let score = string.split(',');
    for (let index = 0; index < score.length; index++) {
      if(score[index] > 0){
        scoreArray[index] = scoreArray[index] + _.floor(score[index], 2);
      }
    }
  })

  return scoreArray;
}

export function getAnswerIndex(array) {
  let maxIndex = 0;
  if(array[8] == 0){
    //沒有任何正向
    maxIndex = 9;
  }else{
    maxIndex = _.indexOf(array, _.max(array));
  }
  return maxIndex;
}

export function getAnimals(index) {
  let ansIndex = index;
  let count = 0;
  return count;
}

//問卷送出按鈕按下的第二個進入點
export function uploadData() {
  const scoreArray = getAnswers();

  const answerIndex = getAnswerIndex(scoreArray);
  
  const uuid = uuidv4();

  if (uuid) {
    $('#uuidData').val(uuid);
    $.ajax(
      {
        url: 'https://awsnode-env.eba-5mnjrpyf.us-east-2.elasticbeanstalk.com/setAnswer',
        type: 'POST',
        mimeType: 'multipart/form-data',
        data: {
          uuid: uuid,
          answer: answerIndex,
          email: 'none'
        },
        success: function(){
          console.log('aws OK' );
        }
      }
    )
  }
  /*
  const isProd = location.hostname !== 'localhost'
                  && location.hostname !== '127.0.0.1'
                  && location.hostname.indexOf('192.168.') === -1
                  && location.hostname.indexOf('dev.') === -1;

  const apiPrefix = 'https://ss.initiumlab.com/'
  const urlRemember = apiPrefix + 'remember/'
  const urlUUID = apiPrefix + 'utility/uuid/'
  const eventname = `${window.vueInstant.eventname}${isProd ? '' : '_dev' }`;
  const key = 'answers'
  const answers = collectAnswers();

  const UA = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent || ''
  const upload = JSON.stringify({ answers, UA })
  $.get(urlUUID).then(function (response) {
    let uuid = null
    uuid = response.data.uuid
    if (uuid) {
      $.ajax(
        {
          url: urlRemember + eventname + '/',
          type: 'POST',
          contentType: 'application/json;charset=UTF-8',
          async: true,
          data: JSON.stringify({
            username: uuid,
            key,
            value: upload,
            raw: ''
          }),
          success: function(response){
            console.log('server OK : ' + response.data)
          }
        }
      )
    }
  }, function(response){
    console.log('Error:' + response)
  })
  */
}

function collectAnswers() {
  const getBasic = elem => ({
    id: elem.id,
    name: elem.name,
    text: $(elem).closest('.option').find('[data-text]').data('text')
  })

  const checkedAnswers = $('input:checked').map(function (index, elem) {
    return assign(getBasic(elem), {
      score: $(elem).data('score')
    })
  }).get()

  const rangeAnswers = $('input[type=range]').map(function (index, elem) {
    return assign(getBasic(elem), {
      score: parseInt($(elem).val())
    })
  }).get()

  const textAnswers = $('input[type=text]').filter(function (index, elem) {
    return $(elem).val() && $(elem).val().length > 0
  }).map(function (index, elem) {
    return assign(getBasic(elem), {
      score: 0,
      value: $(elem).val(),
    })
  }).get()

  const selectedAnswers = $('select').filter(function (index, elem) {
    return $('#' + $(elem).closest('label').attr('for')).prop('checked')
  }).map(function (index, elem) {
    return assign(getBasic(elem), {
      score: 0,
      value: $(elem).val(),
    })
  }).get()

  const dropdownAnswers = $('select').filter(function (index, elem) {
    return $(elem).closest('.option--dropdown').length > 0
  }).map(function (index, elem){
    return assign(getBasic(elem), {
      score: 0,
      value: $(elem).val(),
    })
  }).get()

  return checkedAnswers.concat(rangeAnswers, textAnswers, selectedAnswers, dropdownAnswers)
}

function validateSlideInput(slide) {
  const checkedInputs = slide.find('input:checked')
  const rangeInputs = slide.find('input[type=range]')
  const dropdowns = slide.find('.option--dropdown')
  let valid = true;

  if (checkedInputs.length === 0 && rangeInputs.length === 0 && dropdowns.length === 0) {
    return false
  } else {
    checkedInputs.each(function () {
      const text = $(this).data('showText')
      const bingo = !!$(this).data('bingo') || false

      if (text && text.length > 0) {
        window.vueInstant.modalText = text
        window.vueInstant.showModal = true
        window.vueInstant.bingo = bingo
        window.currentSlide = slide
        valid = false
      }
    })
    return valid
  }
}

