import $ from 'jquery'
const questions = {
  slug: 'test', // eg: 20161111-taiwanese_mainland
  title: `在中國大陸的台灣人，你過得好嗎？`,
  intro: `
<p>你離開了有2300萬鄉親的島嶼，跨進13億同胞的國度。你為什麼選擇在中國大陸生活、打拼？是為念書、創業、經商？還是跟著父母或者另一半遠走他鄉？</p>
<p>你在大陸結婚了嗎？買房了嗎？你未來想回台灣退休嗎？或者你更願意長長久久地在中國大陸落地生根？「台灣人」這個特殊的身份，對你在中國大陸發展是助力還是阻力？</p>
<p>端傳媒推出了「台灣人在大陸」的系列報導，報導之外，我們希望聽到你的聲音。</p>
<p>如果你是曾在、或正在中國大陸生活的台灣人，請在這裡花一點時間，讓我們知道你過得好不好。</p>`,
  privacy: '<p>本測試搜集的所有資料僅用於研究統計及日後新聞報導用途，我們尊重您的個人隱私，絕不向任何機構或個人披露遊戲參與者的個人資料，但對數據，我們保留研究、歸納、出版的用途。</p>',
  styles: {
    'Dark Color': '#183060', // 進度條完成部分的顏色、被選中選項的顏色
    'Light Color': '#f4f4f4', // 進度條背景色、沒被選中選項的顏色、按鈕顏色
    'Dark Text Color': '#000', // 選項文字顏色、按鈕文字顏色
    'Light Text Color': '#fff', // 被選中選項文字顏色
    'Background Color': '#183060', // 背景顏色
    'Background Image': 'images/bg.jpg',// 背景圖片路徑
    'Background Mobile Image': 'images/bg_mobile.jpg',// 背景圖片路徑（移動端）
  },
  sharePreview: 'https://theinitium.com/project/2016-taiwanese-in-mainland-quiz/images/sharepic-01.jpg', // 分享到 FB 中的圖片
  wechatSharePreview: 'https://theinitium.com/project/2016-taiwanese-in-mainland-quiz/images/sharepic-02.jpg', // 分享到 FB 中的圖片
  issues: [
    {
      question: '滑塊輸入題目',
      scoreTag: 'political',
      type: 'range',
      progress: 0,
      options: [
        {
          text: '2014 年的佔中／雨傘運動',
          min: -5,
          max: 5,
          reverse: true,
          left: '不認同', // 滑塊條左側顯示的文字
          right: '認同', // 滑塊條右側顯示的文字
        },
        {text: '2016 年的旺角騷亂', min: -5, max: 5},
      ]
    },
    {
      question: '香港能下載Pokemon Go啦！Peter抓到了Wigglytuff ,它在台灣叫胖可丁,它在香港叫什麼？',
      image: 'images/1.jpg',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      progress: 9,
      options: [
        {text: '胖波波', score: 0, showText: '不對哦，香港翻譯成肥波球。'},
        {text: '肥波球', score: 1, showText: '恭喜你，答對了！', 'bingo': true},
        {text: '粉粉球', score: 0, showText: '不對哦，香港翻譯成肥波球。'},
        {text: '皮皮丁', score: 0, showText: '不對哦，香港翻譯成肥波球。'},
      ]
    },
    {
      question: 'Peter在香港看到了《新鐵金剛》系列電影的宣傳海報。以下哪一張海報屬於《新鐵金剛》系列？',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: true,
      picture: true,
      progress: 20,
      options: [
        {image: 'images/1.jpg', text: 'alt文字', score: 0, showText: '不對哦，《新鐵金剛》系列在大陸和台灣都被翻譯成《007》系列。答案是C'},
        {image: 'images/2.jpg', text: 'alt文字', score: 0, showText: '不對哦，《新鐵金剛》系列在大陸和台灣都被翻譯成《007》系列。答案是C'},
        {image: 'images/3.jpg', text: 'alt文字', score: 1, showText: '恭喜你，答對了！', 'bingo': true},
        {image: 'images/4.jpg', text: 'alt文字', score: 0, showText: '不對哦，《新鐵金剛》系列在大陸和台灣都被翻譯成《007》系列。答案是C'},
      ]
    },
    {
      question: '你到中國大陸幾年了？',
      image: '',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: false,
      progress: 30,
      options: [
        {text: '0-3年', score: 0},
        {text: '3-6年', score: 1},
        {text: '7-10年', score: 2},
        {text: '10-15年', score: 3},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
        {text: '15年以上', score: 4},
      ]
    },
    {
      question: '此題隱藏',
      image: '',
      scoreTag: 'familiarity',
      type: 'choice',
      hidden: true,
      variant: 'multiple',
      showModal: false,
      progress: 34,
      options: [
        {text: '科技', score: 0},
        {text: '文創', score: 1},
      ]
    },
    {
      question: '你打算創業的業態？（複選）',
      image: '',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 35,
      options: [
        {text: '科技', score: 0},
        {text: '文創', score: 1},
        {text: '教育', score: 2},
        {text: '傳產', score: 3},
        {text: '餐飲', score: 4},
        {text: '其他', score: 5, extraInput: {type: 'text', prefix: ':'}},
      ]
    },
    {
      question: '你待過時間最長的地方（前二名）？',
      image: '',
      scoreTag: 'life-adapt',
      type: 'dropdown',
      variant: 'multiple',
      showModal: false,
      progress: 40,
      options: [
        {
          text: '在這裡選一個',
          items: [
            '-- 選擇地點 -- ',
            '北京市',
            '上海市',
            '广东省',
            '天津市',
            '江苏省',
            '浙江省',
            '重庆市',
            '河北省',
            '山西省',
            '辽宁省',
            '吉林省',
            '黑龙江省',
            '安徽省',
            '福建省',
            '江西省',
            '山东省',
            '河南省',
            '湖北省',
            '湖南省',
            '广东省',
            '海南省',
            '四川省',
            '贵州省',
            '云南省',
            '陕西省',
            '甘肃省',
            '青海省',
            '内蒙古自治区',
            '广西壮族自治区',
            '西藏自治区',
            '宁夏回族自治区',
            '新疆维吾尔自治区'
          ]
        },
        {
          text: '在這裡選第二個',
          items: [
            '-- 選擇地點 -- ',
            '北京市',
            '上海市',
            '广东省',
            '天津市',
            '江苏省',
            '浙江省',
            '重庆市',
            '河北省',
            '山西省',
            '辽宁省',
            '吉林省',
            '黑龙江省',
            '安徽省',
            '福建省',
            '江西省',
            '山东省',
            '河南省',
            '湖北省',
            '湖南省',
            '广东省',
            '海南省',
            '四川省',
            '贵州省',
            '云南省',
            '陕西省',
            '甘肃省',
            '青海省',
            '内蒙古自治区',
            '广西壮族自治区',
            '西藏自治区',
            '宁夏回族自治区',
            '新疆维吾尔自治区'
          ]
        }
      ]
    },
    {
      question: '15. 你曾為總統大選回台投票嗎？',
      image: '',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: false,
      progress: 64,
      options: [
        {text: '有', score: 0, extraInput: {type: 'select', options: ['一次', '多次']}, showNext: true},
        {text: '無', score: 1},
      ]
    },
    {
      question: '18. 你曾考慮讓下一代在中國大陸受教育嗎？',
      image: '',
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'single',
      showModal: false,
      progress: 80,
      options: [
        {text: '是', score: 0, showNext: true},
        {text: '否', score: 1},
      ]
    },
  ],
  result: function () {
    let score = 0

    $('.option input:checked').each(function () {
      score += parseInt($(this).data('score'))
    })

    $('.option input[type=range]').each(function () {
      score += parseInt($(this).val())
    })

    const suffix = '，繼續加油！歡迎關注<a href="https://theinitium.com">端傳媒</a>：立足香港，放眼世界！讓你擁有更寬闊的視野。'
    let desc
    if (score <= 40) {
      desc = '還是不夠了解哦' + suffix
    } else if (score <= 60) {
      desc = '已經有一定的解了' + suffix
    } else if (score <= 80) {
      desc = '已經有相當的了解了' + suffix
    } else {
      desc = '了然於胸，獲得稱號流行用語小專家！' + suffix
    }

    const resultText = `
<h2>感謝您的回答！</h2>
<p>有更多想說的，還可以寫信給我們：editor@theinitium.com</p>
<p>請繼續在<a href="https://theinitium.com">端傳媒</a>，關注這一話題的報導和分析。</p>`
    const shareText = `小測試：如果你是曾在、或正在中國大陸生活的台灣人，請在這里花一點時間，讓我們知道您過得好不好。`

    return {resultText, shareText}
  },
  more_quizzes: [
    { image: 'images/4.jpg', link: 'https://theinitium.com/project/20160613-mainland-mainlanderinhongkong-game/' },
    { image: 'images/5.jpg', link: 'https://theinitium.com/project/20160613-mainland-mainlanderinhongkong-game/' },
  ]
}

export default questions