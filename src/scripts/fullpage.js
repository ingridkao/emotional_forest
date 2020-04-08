/* global InitiumGPT: false, wx:false */
import $ from 'jquery'
import url from 'url'
import 'fullpage.js'
import 'fullpage.js/vendors/scrolloverflow'
import questions from './questions'
import { isProd } from './helpers'
import { uploadData } from './common'

export default function initFullpage() {
  $('#fullpage').fullpage({
    verticalCentered: false,
    lockAnchors: true,
    // Scrolling
    loopBottom: false,
    loopTop: false,
    loopHorizontal: false,
    // scrollOverflow: true,

    // Accessibility
    recordHistory: true,

    // Design
    controlArrows: false,

    afterRender: () => {
      // show the page
      $('.loader').fadeOut(() => {
        $('#fullpage').fadeIn()
      })
    },

    afterLoad: function (anchorLink) {
      let size
      if (window.innerWidth > 480) {
        size = [728, 90]
      } else {
        size = [320, 50]
      }
      if (anchorLink === 'result') {
        const results = questions.result()

        let url_obj = url.parse(location.href, true)
        delete url_obj.search
        delete url_obj.hash
        const targetUrl = url.format(url_obj)
        $.get(`http://wechat-sign.initiumlab.com/sign?url=${location.href}`).then((response) => {
          //console.log('sing resp:', response)
          wx.config({
            appId: 'wx20838cd205067e15', // 必填，公众号的唯一标识
            timestamp: response.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.nonceStr, // 必填，生成签名的随机串
            signature: response.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.onMenuShareTimeline({
            title: results.shareText, // 分享标题
            link: targetUrl, // 分享链接
            imgUrl: questions.wechatSharePreview, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
          }),
          wx.onMenuShareAppMessage({
            title: results.shareText, // 分享标题
            link: targetUrl, // 分享链接
            imgUrl: questions.wechatSharePreview, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
          })
        })

        $('#result').html(results.resultText);
        $('#resultTop3').html(results.resultTopList);

        if (!$('#banner').children().length) {
          new InitiumGPT({
            network_code: '108061385',
            ad_unit: 'SPECIAL_PAGE', // for special page
          }).addAds({
            selector: '#banner',
            dimensions: [size],
          })
        }
        uploadData()
      } else if (anchorLink === 'questions') {
        if (!$('#issue_banner').children().length) {
          new InitiumGPT({
            network_code: '108061385',
            ad_unit: 'SPECIAL_PAGE', // for special page
          }).addAds({
            selector: '#issue_banner',
            dimensions: [size],
          })
        }
      }
    }

  })

  // disabling scrolling
  $.fn.fullpage.setAllowScrolling(false, 'all')
  if (isProd) {
    $.fn.fullpage.setKeyboardScrolling(false, 'all')
  }
}