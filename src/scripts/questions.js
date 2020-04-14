import $ from 'jquery'
import _ from 'lodash'

const questions = {
  slug: '20200411-quiz-emotionforest',
  title: `情緒の森`,
  subtitle: `測測你是哪隻受傷的小動物`,
  intro: `
<p>Hey， 你，被來去無蹤的傳染病毒困在家裏的你，最近還好嗎？</p>
<p>能做的太少，時間卻空出很多；需要擁抱，卻不得不社交隔離。這大概是最容易被壞情緒偷襲的時刻。焦慮、抑鬱甚至絕望，我們被困在一片迷霧遍佈的情緒森林。就讓作為病友的我們為你把脈，看看你是哪隻受傷的小動物，然後，和你分享編輯記者們親測有效的小小貼士。</p>`,
  privacy: '<p>本測試搜集的所有資料僅用於研究統計及日後新聞報導用途，我們尊重您的個人隱私，絕不向任何機構或個人披露遊戲參與者的個人資料，但對數據，我們保留研究、歸納、出版的用途。</p>',
  styles: {
    'Dark Color': '#004e8b', // 進度條完成部分的顏色、被選中選項的顏色
    'Light Color': 'rgba(244, 244, 244, 0.2)', // 進度條背景色、沒被選中選項的顏色、按鈕顏色
    'Dark Text Color': '#333', // 選項文字顏色、按鈕文字顏色
    'Light Text Color': '#fff', // 被選中選項文字顏色
    'Headline Text Color': '#f4f4f4', // 標題顏色
    'Background Color': '#adf6ff', // 背景顏色
    'Background Image': 'images/bg.jpg',// 背景圖片路徑
    'Blue Bg Image': 'images/blue_bg.png',// 雜點圖片路徑
    'Background Mobile Image': 'images/bg_mobile.jpg',// 背景圖片路徑（移動端）
  },
  sharePreview: 'https://theinitium.com/project/20200411-quiz-emotionforest/images/sharepic-01.jpg', // 分享到 FB 中的圖片
  wechatSharePreview: 'https://theinitium.com/project/20200411-quiz-emotionforest/images/sharepic-02.jpg', // 分享到 FB 中的圖片
  issues: [
    {
      question: ' 1 今天又是全球被冠狀病毒疫情籠罩下的一天，而你的一天',
      comment: '（本測試所有題目均可選取多個答案）',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 0,
      options: [
        {text: '如往常一樣，被鬧鐘在清晨喚醒 ', score: '0'},
        {text: '被同居的人友善地叫醒', score: '0'},
        {text: '不是很確定幾點醒來，沒有動力起床，一直在床上放空', score: '1,1,0,0,0,0,1,1'},
        {text: '反正也沒人知道，就繼續躺著吧', score: '0,1,0,0,0,0,0,0'},
        {text: '被同居的人製造的聲音吵醒', score: '0,0,1,0,0,0,0,0'},
        {text: '最近有些失眠，一直在半夢半醒之間', score: '0,0,0,1,0,1,0,1'},
        {text: '昨天玩手機／電腦／iPad太晚，起身已經快到中午', score: '1,0,0,0,0,1,0,0'},
        {text: '好想再睡一會，但是很多人需要我，很多事情要做，起床！', score: '0,0,0,0,1,1,0,0'},
      ]
    },

    {
      question: '2 這是你這段時間長居的房子',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 10,
      options: [
        {text: '房間裏還蠻整潔的，每天都要稍微整理一下', score: '0'},
        {text: '房間裏亂亂的，還是沒有動力收拾', score: '1,0,0,0,0,1,0,1'},
        {text: '由於工作和生活的原因，需要換地方住，要不停適應不同的空間', score: '0,1,0,1,1,1,0,0'},
        {text: '房間太小，就算清潔整理得太好，又有什麼意義呢？', score: '1,0,1,0,0,1,0,1'},
        {text: '天下大亂，整理房子也不能改變什麼啊......', score: '0,0,1,0,0,1,1,1'},
        {text: '寄住在別人的地方／旅店，倒不需要我出力打掃', score: '0,1,0,0,0,0,0,0'},
        {text: '每天整理就要很多時間，不僅自己的房間，還要處理父母、小孩、伴侶製造的垃圾......', score: '0,0,0,0,1,0,0,0'},
      ]
    },
    {
      question: '3 說到這間近乎24小時罩著你的房子',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 20,
      options: [
        {text: '還蠻感恩這時候有這樣一個地方', score: '0'},
        {text: '和別人共住一個房子，好像需要學習24小時共處的平衡，好難啊', score: '0,0,1,0,0,0,0,0'},
        {text: '和別人共住一個房子，幸運的是大家都蠻合得來，可以互相陪伴', score: '0'},
        {text: '寄住在異國他鄉，難免有些寂寞', score: '0,1,0,0,0,0,1,0'},
        {text: '實在是太小了，壓抑得讓人發瘋', score: '0,0,1,0,0,0,0,0'},
        {text: '在人口密集的小區，會擔心鄰里間傳染的可能', score: '0,0,0,1,0,0,0,0'},
        {text: '忽然多了人一起住，有許多要操心的地方', score: '0,0,0,0,1,0,0,0'},
        {text: '如果家世更好或者以前自己更努力，可能居住條件會提升很多，有點自責......', score: '0,0,0,0,0,0,0,1'},
        {text: '很羨慕在家生活的人，不得已還是在路上，奔波流蕩', score: '0,1,0,1,0,1,0,0'},
      ]
    },
    {
      question: '4 每天大部分的時間',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 30,
      options: [
        {text: '都在工作和學習', score: '0,0,0,0,0,1,0,0'},
        {text: '其實是無所事事，整個世界都糟透了，做什麼好像也都沒用',   score: '1,0,0,0,0,0,0,0'},
        {text: '還蠻焦慮的，但都在恐懼學業、事業、疾病，覺得自己好沒用', score: '1,0,0,0,0,0,0,1'},
        {text: '有點寵溺自己，以前想做沒做的，現在有時間可以補上了',    score: '1,0,0,0,0,1,0,0'},
        {text: '好像都花在了別人身上，周圍蠻多人需要照顧的......',    score: '0,0,0,0,1,0,0,0'},
        {text: '都在網絡上看疫情新聞、參加辯論，似乎這樣可以消耗一些能量', score: '0,0,1,0,0,0,1,0'},
        {text: '收看情報，檢查自己和家人有沒有被感染',                 score: '0,0,0,1,0,0,0,0'},
        {text: '都是一個人度過',                                   score: '0,1,0,0,0,0,0,0'},
      ]
    },
    {
      question: '5 生活中最親近的人',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 40,
      options: [
        {text: '就住在一起，雖然有些小磨擦，但還是蠻慰藉的', score: '0'},
        {text: '已經很久沒見了，雖然可以靠網絡鏈接，但有時候真的感覺很孤單', score: '0,1,0,0,0,0,1,0'},
        {text: '已經很久沒見了，全靠網絡鏈接，還好聯繫頻繁', score: '0'},
        {text: '最近很多事情的看法都和你不一樣，多了不少爭吵',             score: '0,1,1,0,0,0,0,0'},
        {text: '需要幫助和照顧，你在盡自己的全力', score: '0,0,0,0,1,1,0,0'},
        {text: '好像並沒有很親近的人......',     score: '0,1,0,0,0,0,0,0'},
        {text: '並不是很需要和人類親近',         score: '1,1,1,0,0,0,0,0'},
        {text: '不幸被困，或者感染病毒，非常擔心', score: '0,0,0,0,0,0,1,1'},
      ]
    },
    {
      question: '6 今天最擔心的事情',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 50,
      options: [
        {text: '當然是自測體溫看看有沒有被感染啦', score: '0,0,0,1,0,0,0,1'},
        {text: '口罩、廁紙什麼的漲價、斷貨',      score: '0,0,0,1,0,0,0,1'},
        {text: '失業、找不到工作',              score: '1,0,0,0,0,0,0,1'},
        {text: '又是什麼也沒有做的一天',         score: '1,0,0,0,0,0,0,0'},
        {text: '好像又長胖了......',           score: '0,0,0,0,0,1,0,0'},
        {text: '真的害怕自己再這樣自我隔離下去會發瘋', score: '0,1,1,0,0,1,1,1'},
        {text: '又要和同居的人或鄉民們口水戰',        score: '0,0,1,0,0,0,0,0'},
        {text: '沒有人記得我的存在',                score: '1,1,0,0,0,0,1,1'},
        {text: '家人的健康和需求',                  score: '0,0,0,0,1,0,0,0'},
        {text: '都還好啊，沒特別擔心什麼', score: '0'},
      ]
    },
    {
      question: '7 每天最開心的事情',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 60,
      options: [
        {text: '完成了計畫好的事情', score: '0'},
        {text: '和同事、朋友、家人甚至陌生人深度溝通', score: '0'},
        {text: '或多或少幫到了別人', score: '0'},
        {text: '寵溺自己吃點好的，打打遊戲，網購喜歡的東西', score: '1,0,0,0,0,1,0,0'},
        {text: '沒什麼好開心的',                        score: '1,1,1,1,0,0,1,1'},
        {text: '看到別人也很頹廢的一天',                 score: '1,1,0,0,0,0,0,1'},
      ]
    },
    {
      question: '8 最近漸漸可以外出',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 70,
      options: [
        {text: '至少每天出去一次，呼吸新鮮空氣，走一走', score: '0'},
        {text: '慢慢習慣蝸居的方式，反而不想出去見人了',    score: '1,1,0,0,0,1,1,0'},
        {text: '哪怕可以出去，但很擔心被傳染，寧願待在家裏', score: '0,0,0,1,0,1,0,0'},
        {text: '因為管控，出去一次還是很難啊',             score: '0,0,1,0,0,0,0,1'},
        {text: '好開心可以出去，要跑步、行山！', score: '0'},
        {text: '雖然可以出去，但是為了節省口罩，能不出去就不出去吧', score: '0,0,0,1,0,1,0,1'},
        {text: '不想出去，害怕因為自己的外表和身份被歧視',         score: '0,1,1,1,0,0,0,0'},
        {text: '主要都是為家人補充物資',                        score: '0,0,0,0,1,0,1,0'},
      ]
    },
    {
      question: '9 劃開手機，訂閱的媒體 app 顯示有推送，你......',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 80,
      options: [
        {text: '新聞而已，想看就看，不用花費那麼多心思反思這個吧', score: '0'},
        {text: '發現疫情在好幾個國家又惡化了，非常擔心自己或親友不小心會中招......',   score: '0,0,0,1,0,0,1,0'},
        {text: '被某些文章和評論區留言氣到不行，怎麼會有這麼冷血和愚蠢的人類啊！ ',     score: '0,0,1,0,0,0,0,0'},
        {text: '訂閱了太多媒體，一看就是幾個小時，原本要做的事情好像又耽擱了......',   score: '1,1,0,0,0,0,1,0'},
        {text: '被一輪輪的悲慘故事打倒了，有時還會哭出來，有時甚至覺得這個世界完蛋了',   score: '0,0,0,0,0,0,1,0'},
        {text: '幾天前已經決定不看新聞了，反正有重要的事情，身邊人或政府一定會讓你知道', score: '1,0,0,0,0,0,1,1'},
        {text: '非常不想看更多信息，但是由於工作和生活的必須，還是多少要看一些',        score: '0,0,0,0,1,0,0,0'},
        {text: '疫情新聞已經麻木了，現在又有新的經濟下行新聞，太可怕了  ',             score: '0,0,1,0,0,0,0,1'},
      ]
    },
    {
      question: '10 當然更多的 app 還是社交軟件了，你......',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 90,
      options: [
        {text: '並沒有人聯絡你......',                                     score: '0,1,0,0,0,0,1,0'},
        {text: '親友都有給你發訊息，但你已經失去和外界溝通的動力......',         score: '1,1,1,0,0,0,0,0'},
        {text: '每條訊息都認真回覆，希望能傳遞一些正向能量，幫到別人',            score: '0,0,0,0,1,0,0,0'},
        {text: '非常想看想回覆，但是工作／照料家人已讓你手忙腳亂，等閒下來再說吧',  score: '0,0,0,0,1,0,0,0'},
        {text: '最近加入很多討論群組，每天都看到一些同溫層以外的信息，受益匪淺', score: '0'},
        {text: '最近加入很多討論群組，但似乎大家都在討論疫情越來越糟糕',                 score: '0,0,1,1,0,0,1,0'},
        {text: '每次看心情都不好，但還是忍不住看，好像別人都過得比你有規律，更加討厭自己了', score: '1,1,0,0,0,0,0,1'},
        {text: '啊，怎麼看著看著，一天就過去了，該完成的事情好像又要拖延了',              score: '1,0,0,0,0,1,0,0'},
      ]
    },
    {
      question: '11 最近最難以釋懷的事情',
      image: false,
      scoreTag: 'familiarity',
      type: 'choice',
      variant: 'multiple',
      showModal: false,
      progress: 100,
      options: [
        {text: '文化差異導致的誤解、歧視、溝通障礙',                score: '0,1,0,0,0,0,1,0'},
        {text: '人類在疾病前的脆弱和無力',                        score: '1,0,0,1,1,0,1,1'},
        {text: '發現自己並不能改變這個絕望的世界，世界以後可能會更糟', score: '1,0,1,0,1,0,0,1'},
        {text: '經濟收入下降或將會下降',                          score: '0,0,0,0,0,0,0,1'},
        {text: '越來越沒有成就感，非常挫敗',                       score: '1,0,1,0,0,0,0,0'},
        {text: '害怕自己感染病毒', score: '0,0,0,1,0,0,0,1'},
        {text: '身體似乎越來越差', score: '0,0,0,0,0,1,0,0'},
      ]
    }
  ],
  result: function () {
    // 計算答案
    //'頹廢樹熊','孤獨企鵝','暴躁蜂','恐懼兔','操勞驢媽媽','怕肥橘貓','悲哀狗狗','焦慮小豬'
    const emotions = [0,0,0,0,0,0,0,0];
    let hopeful = 0;
    $('.option input:checked').each(function () {
      let score = $(this).data('score');
      if(score == 0){
        //total hopeful
        hopeful += 1;
      }else{
        let scoreArray = score.split(',');
        for (let index = 0; index < scoreArray.length; index++) {
          if(scoreArray[index] > 0){
            emotions[index] = emotions[index] + parseInt(scoreArray[index]);
          }
        }
      }
    })

    let resultIndex;
    let despair = false;
    const emotionSum = _.sum(emotions);
    console.log('emotions:' + emotions + '| emotionSum:' + emotionSum);
    console.log('hopeful:' + hopeful);
    if(hopeful > 9 && emotionSum < 10){
      // strict : no negative emotions
      resultIndex = 0;

    }else if(hopeful < 5 && emotionSum > 80){
      //High emotional score : hopelessness
      resultIndex = 9;
      despair = true;

    }else{
      const emotionMax = _.max(emotions);
      const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
      const dup = findDuplicates(emotions);
      let random = 0;
      if(dup.length > 0){
        random = _.sample(dup);
      }
      resultIndex = _.indexOf(emotions, emotionMax, random) + 1;
    }
    console.log('resultIndex:' + resultIndex);

    const scoreTitle = ['比卡端','頹廢樹熊','孤獨企鵝','暴躁蜂','恐懼兔','操勞驢媽媽','怕肥橘貓','悲哀狗狗','焦慮小豬', '絕望鯨魚'];
    let shareText = `情緒の森，你是哪隻受傷的小動物呢？`;
    let scoreDesc = '';

    switch (resultIndex) {
      case 0:
        shareText = '我是一隻比卡端，奔跑著，積聚閃電，照亮黑暗！';
        scoreDesc = `<p>我也是比卡端，今天我不關心人類，我只關心你。</p>
                    <p>在災難中，純粹的樂觀是個偽命題。人總是站在如此絕境，一代又一代。卡繆說，唯一嚴肅的哲學問題就是自殺。我們往往處在這樣的黑暗中，思考為甚麼不自殺。在私人層面上，處理負面情緒的第一步就是承認接受它；在公共層面上，突破問題的起點是理解甚至擁抱它們的結構性根源。</p>
                    <p>然而「人」的存在並不完全被「結構」所限。人是能改變的，如水波中跳躍的陽光，帶來流水線與機器之外的「錯位」之美，也會帶來閃爍的「希望」——拋棄結構加諸自身的枷鎖，重新發現與他人、世界的關係。</p>
                    <p>除了對外批判，也可以向內追尋；除了迎接自己，也可以接住他人。與世隔絕中，最動搖人心的是信任與安全的稀缺，這既來自於穩定的自我，也來自於集體行動與公共團結。在社會正義與生活正義雙贏的路上，比卡端在奔跑，跑出想要的人生和世界的樣子。</p>
                    <p>我在這裏等你，積聚閃電，照亮黑暗。</p>
                    <p class="autor">端傳媒評論組 雨欣</p>`;
        break;
      case 1:
        shareText = '我是一隻頹廢樹熊，我會慢慢翻滾起來，不再停滯！';
        scoreDesc = `<p>覺得自己沒用這件事情，不是一天兩天啦。</p>
                    <p>曾自覺得可以一鳴驚人，呼風喚雨。今天卻在渾渾噩噩裏又睡掉整個早上，然後恨自己，又縱容自己，再揮霍一天吧，明天重新做人。世界在沉淪，我又何嘗不是，固然可以怪天災人禍，但心底裏最怪的是無所作為的自己。</p> 
                    <p>劃手機看整個世界在眼前呼嘯前行時，讀到一個叫郭晶的女孩，她在封鎖的武漢市內一筆一畫寫每天的晚餐，和朋友的對話，寫空曠街道上騎行的所見——譬如一兩個清潔工阿姨，牙齒有煙漬的中年男子。她的生活那樣小，卻那樣鮮活，她24小時裏經驗的多過我這一個月。</p> 
                    <p>她說「人可以困住，但不能停下」。這句話似乎長了腿，在我屁股上就是一腳，我滾了幾下，終於洗完水池裏的碗，坐下寫一個新的遊戲劇本。你呢？慢慢滾起來了嗎？</p> 
                    <p class="autor">端傳媒Game On 楊靜</p>`;
        break;
      case 2:
        shareText = '我是一隻孤獨企鵝，但我知道孤獨其實是回到自我相處和生活本身。';
        scoreDesc = `<p>我是一隻孤獨且笨拙的企鵝，也許，你和我一樣，正在一遍遍翻轉手機，等待某個人的信息。</p>
                    <p>見不到面時，時常會懷疑自己掉入黑洞，手機沉默的時間總比我預想要長，計較訊息裏每個字和貼圖的含義，試圖在點讚和評論中證實自己依舊被愛。所有真實社交都依靠無法傳遞溫度的網線連結，一不小心就可能被誤解、爭執或舉報剪斷，流放到網絡世界的孤島。</p>
                    <p>後來索性關掉手機，拿鋼筆和顏色筆塗畫無法分享的感受。再把自己丟進忙碌的工作裏，聽我走不進的土地上發生著什麼。相比整個世界的沉淪，一個人的隔離顯得微不足道。用木心的話說，生活是時時刻刻不知如何是好。</p>
                    <p>或許孤獨，也只是回到自我相處和生活本身。</p>
                    <p class="autor">端傳媒中國組 Iris</p>`;
        break;
      case 3:
        shareText = '我是一隻暴躁蜂，刺，就該用來戳破虛偽！';
        scoreDesc = `<p>疫情期間，我見到海量惡意揣測和流言。這些信息在人們囫圇吞棗之後，又被粗暴推向更遠的地方。然而本可以反駁它們的友鄰，在社交平台上沒有任何表示。也許疫情在他們的時間線上，只是一次繞城公路的堵車</p>
                    <p>我討厭這種轉過頭去的姿勢。無論它們是下意識的鴕鳥心態，還是潛藏更深的自私或惡意，都讓他人的生活更加艱難。就好像在高速公路上疲勞駕駛，那些本可讓我警覺的徵兆被空氣清新劑假扮出鳥語花香，如何不暴躁？想順利開下去，我必須報以刺耳的鳴笛。</p>
                    <p>刺，就該用來戳破虛偽，溫柔留給那些坦誠的藝術。</p>
                    <p>小提琴家 Oleg Kagan得知自己患癌且康復無望後，還堅持巡演歐洲，其中那套巴赫的小提琴無伴奏讓我不斷自省：當生命不斷流失，何等的坦率才可交出這樣的表演？我們有努力守護生活嗎？</p>
                    <p class="autor">端傳媒文化組 書瑋</p>`;
        break;
      case 4:
        shareText = '我是一隻驚恐兔，一起來以恐怖吞噬恐懼，忘卻病毒橫行的世界！';
        scoreDesc = `<p>從超市買東西回家，接下來是浩大的消毒工程：雙腳把鞋子蹭掉，摘下口罩捲好扔掉，按醫護標準洗手20秒，用酒精噴霧把袋裏東西噴一遍，用消毒濕紙巾把每件物品拎出來擦乾淨。衣褲換掉，洗個熱水澡，記得洗頭，如果要做飯，還得洗很多遍手。</p>
                    <p>日防夜防，室友卻告訴我，她公司有人確診……</p>
                    <p>萬一我被感染進隔離病房，是不是得採訪寫稿，別浪費現場？可如果病得很重，如果精神休養不好，如果肺功能從此失去幾成……胡思亂想、天馬行空，恐怖漫畫和電視劇成了睡前安眠藥——德古拉、朝鮮喪屍、Hill House的秘密、黑盒子的怪力亂神……</p>
                    <p>恐怖名單推薦給你，一起以恐怖吞噬恐懼，忘卻病毒橫行的世界！</p>
                    <p class="autor">端傳媒香港組 奇洛李維斯</p>`;
        break;
      case 5:
        shareText = '我是一隻驢媽媽，自我鞭笞，痛與快樂渾然無分。';
        scoreDesc = `<p>同一時間完成多重任務、除了抱怨沒有其他逃脫生活密室方法的驢，才是宇宙奧秘的窺探者。</p>
                    <p>而秘密就是，生存源自受虐與自虐。Master or Servant，兩個都是你。</p>
                    <p>在家的日子多了，意味著原來被自己外判的，要被重新拎回來自己解決。你要照顧的，一個個坐在蛛網結點上，你腰纏絲絲孽債，要去承托生活的一盤陣法。繩網，身上血痕很易見，心上的，誰知道？——我願意知道。</p>
                    <p>驢子最偉大的發明就是蒙了雙眼，繼續走下去。它是這遊戲中的被發明者，也是自我鞭笞者。匹諾曹故事裏，小孩貪玩要去歡樂島，被騙變成了小驢，做了奴隸，死在命運農夫皮鞭之下。痛與快樂渾然無分，這故事告訴我們的，跟佛經差不多。</p>
                    <p class="autor">端傳媒文化組 疏影</p>`;
        break;
      case 6:
        shareText = '我是一隻怕肥橘貓，吃能解百憂，吃完也努力走一走。';
        scoreDesc = `<p>困在家裏不吃點什麼，很難鼓起勇氣面對每天絕望的新聞，久而久之，我也變得和你一樣，缺乏運動。</p>
                    <p>睡夢裏我念著台北的牛肉麵，碗邊騰起的熱氣，入口即化的牛肉，連帶小小牛油，混著牛骨熬成的湯和店家多年密調的醬汁的香味，一起融進爽滑綿柔的麵裏，一切都是那麼的恰到好處……疫情間我又學會六七種菜色，美食總能安慰到悲傷的靈魂。但吃太多也有些困擾，譬如長胖……</p>
                    <p>我在過去半年減掉40斤體重，也許能給些建議：保持每天在社區裏走走看看，超過1萬步；若無法外出，不妨找枕頭或乾淨的衣服做平板撐，初學者每次控制一分鐘，每天三五組就好。</p>
                    <p>吃能解百憂，疫情後，朋友總會需要你的一頓大餐，好好吃一段，再好好聊一聊。</p>
                    <p class="autor">端傳媒社媒組 小刀</p>`;
        break;
      case 7:
        shareText = '我是一隻悲傷狗，我的悲哀無法立即化解，不如一起接受它的存在。';
        scoreDesc = `<p>你感到的，叫做悲哀，我與你一樣。</p>
                    <p>這份悲哀像一條橫跨天際的痕跡，從武漢出發，慢慢砸向我生活的城市，消失在密集的屋頂上空，取走街頭生機，又繼續出發下一個地點。望向天空時，就知道它又去哪裏。其實，我什麼都看不到——那些正在發生的絕望，那個「一切都是暫時」的承諾。</p>
                    <p>研究悲傷的醫生 David Kessler 說，疫情下的那種不安有個名字，叫做悲傷——「如果我們允許這些情緒的存在，它們會按序發生。那麼我們便不再是受害者了。」</p>
                    <p>讀過他的話，我不再時時自我懲罰，回到緊張規律的工作當中——追隨空中的那條痕跡就是我的工作。我已慢慢啟動了那個週期——悲傷的五個階段——否認、憤怒、與之談判、沮喪、接受。</p>
                    <p>這份悲哀，也許無法被立即化解，但我們可以一起接受它的存在。</p>
                    <p class="autor">端傳媒國際組 lulu</p>`;
        break;
      case 8:
        shareText = '我是一隻焦慮豬，偶爾看看招聘廣告，幻想未來會不一樣⋯⋯';
        scoreDesc = `<p>在世界崩壞，疫情肆虐時，我還在緊張找工作的事。</p>
                    <p>畢業後一直沒認真找工作，以為大部分工作都是智力正常、有基本待人處事能力就可以勝任。但原來搵工難，自己什麼都不會，還要學懂自誇的HR語言。</p>
                    <p>一份推銷員工作終於有眉目，春節後上班。不過疫情突至，公司裁員，我還沒上班就失業。招聘平台的廣告也沒有更新，每天新聞都傳來裁員和停業的報導。世界這麼多死傷，人類文明毀壞，香港的社會運動不知何去何從，而我卻煩惱於怎樣活在「舊秩序」中：我什麼時候才能找到工作？</p>
                    <p>焦慮時，我會看招聘廣告，想象疫情後可以過不一樣的生活：廟祝原來有證書讀，工作好像挺穩定的；學做地盤安全主任好像也不錯，可以監督工地的安全；痛症治療班也很好，那樣我學會按摩就可以紓緩家人的痛症了。</p>
                    <p class="autor">端傳媒特約撰稿人 林婷婷</p>`;
        break;
      case 9:
        shareText = '我是一隻絕望鯨，期待發現閃光的線，順著它找到想做的事情';
        scoreDesc = `<p>「樂觀的人只是信息不靈通的人。」韋爾貝在短篇集《大樹》中寫。淺薄如我，也會對盲目相信「明天會更好」的人敬而遠之。樂觀很可能源於懶惰。而絕望，大抵是人勤奮好學地掌握了盡可能多的信息後，體會到的第一層感受。作為新聞從業者，我每一天都浸泡在這種絕望裏，要花費力氣消化那些令人悲憤的信息。</p>
                    <p>但我願意把這種感受視作一個人決定生活在真實世界的代價，以及，一個新的開端——世界可真是糟透了，我們可以做點什麼呢？人類社會做出的一切努力，從女團選秀到探索外星生命，無論是有意無意都是在抵抗這種絕望。</p>
                    <p>接受、消化這種絕望，並帶著它負重前行，漫長且辛苦。不如多給自己點時間，偶爾耍廢沒什麼大不了，和朋友分享絕望心得，閱讀、思考、運動，堅持這樣做，期待有天你會在絕望裏發現一條閃光的線，順著它走，找到想做的事情——那便是你抵抗絕望的最佳手段。在此之前，hang in there.</p>
                    <p class="autor">端傳媒中國組 Susie</p>`;
        break;
      default:
        break;
    }

    const resultText = `
      <div class="resultImg">
        <img src="images/result/${resultIndex}.png" alt="${scoreTitle[resultIndex]}">
      </div>
      <div id="answer" class="resultDesc">
        ${scoreDesc}
      </div>
    `;

    let resultTopList = '';
    if(resultIndex > 0){
      let resIndex = resultIndex;
      let scoreList = '';
      let despairText = '';
      let mean = _.floor(_.mean(emotions));
      
      for (let i = 0; i < emotions.length; i++) {
        if(i != (resIndex - 1)){
          if(emotions[i] > mean){
            scoreList += `<li>${scoreTitle[i+1]} : ${(emotions[i]/emotionSum*100).toFixed(1)}%</li>`;
          }
        }
      }

      if(despair){
        despairText = '(多種情緒的總和)';
      }
      if(scoreList != ''){
        resultTopList = `
          <p>其他隱含的小動物們${despairText}：</p>
          <ul>
            ${scoreList}
          </ul>
        `;
      }
    }
    // 分享标题:shareText
    return {resultText, shareText, resultTopList, resultIndex}
  }
}

export default questions