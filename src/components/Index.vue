<template>
  <!-- 用到materialize的utility class called container
       this class'll center your content. 會佔據 ~70%的(不會超過70%)
       就不會讓你的body content靠左邊、靠右邊、或者置中後左右長度不均，像燒烤串一樣
   -->
  <div class="index container">
    <!-- Each materialize card for each smoothie -->
    <!-- v-for其實有三個參數1. 迭代物件、2. key鍵值(類似ID)使用者自訂未必要數字、3. index(空間)所在位置0~n
         v-for="(smoothie, index) in smoothies" :key="smoothie.id"
         v-for="smoothie in smoothies" :key="smoothie.id"
         上述二者都是可以考慮的，:key是一定要做data-binding這樣才能辨識你是哪一個資料
    -->
    <!-- 設置key的用意是為了防止重複產生DOM而使得資源浪費，將key作為一個辨識的依據
         v-for好像可以有三個值可以取出 value、index、key(若沒綁定key可以用index綁定 :key="index"
         若用index可能就得v-for="(smoothie, index) in smoothies" :key="index"
    -->
    <div class="card" v-for="smoothie in smoothies" :key="smoothies.id">
      <div class="card-content">

        <!--  這class前面是套用前端庫樣式以空格再加一個作為套用客製CSS -->
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>

        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <!-- 有些資料並沒有想要unique id譬如像是ingredients就可以直接用index來做替代 -->
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <!-- Materialize的chip就是一個小塊的tag -->
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      // array of objects
      // 用objects裡面就可以included different properties
      smoothies:[
        // slug有小塊/蛞蝓的意思在，這邊是作為之後可能要編輯時候，呼叫的部分core path(URL)
        // 由於URL路徑上是沒有大小寫，因此會編寫成ex: ninja-brew
        // {title: 'Ninja Brew', slug: 'ninja-brew', ingredients:['apple', 'coffee', 'milk'], id:'1'},
        // {title: 'Morning Mood', slug: 'morning-mood', ingredients: ['mango', 'lime', 'juice'], id:'2'},
        // {title: 'Morning Mood', slug: 'morning-mood', ingredients: ['mango', 'lime', 'juice'], id:'3'},
        // {title: 'Morning Mood', slug: 'morning-mood', ingredients: ['mango', 'lime', 'juice'], id:'4'}

      ]
    }
  },
  methods:{
    deleteSmoothie(id){
      //這是採用ES6的arrow function，每次將smoothie帶入作為參數，這味道跟python有點像
      // this.smoothies = this.smoothies.filter(smoothie =>{
      //   return smoothie.id != id
      // })

      console.log(id)
      // .doc(id)可以get某筆資料，其中有delete()方法可以刪除
      // delete方法也是一個promise物件(async任務)，因此他後面可以再接一個then去做處理
      db.collection('smoothies').doc(id).delete().then(()=> {
        // 因為為刪除任務，不像get()要逐筆處理，這邊要處理的問題在於
        // 刪除了，firestore上的資料後，但是並沒有改變我們已經load到data的資料
        // 因此我們再對smoothies內容做一個顧慮，不是刪除目標的id就給他true留下來，達到database跟view同步sysnc
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      })
      }
  },
  created(){
    // 希望fetch data from the firestore
    db.collection('smoothies').get().then(snapshot => {
      // iterable obj可以配合forEach處理
      snapshot.forEach(doc => {
        // 這個smoothie僅為此處的local variable不希望擴及整個func因此用let宣告
        let smoothie = doc.data()
        // 加入id key/field透過doc.id，作法類似python dict的增加key
        smoothie.id = doc.id
        console.log(smoothie)
        // array物件有提供push可以放進json內容
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only
     不採用<style scoped>比較好的做法是將class名稱、id取得更具鑑別度，這種方式效率差
-->
<style>
  .index{
    /* index class會變成網格容器grid container
       他可以配合很多相關操作，grid-template-columns、grid-gap ...(感覺可以做一些簡單的響應)
    */
    display: grid;
    /* 格線容器中能夠定義要多少個fraction空間分塊，
       一個column的大小由fr作為單位，他會照這個比例，依照動態縮放去調整，會responsive
    */
    grid-template-columns: 1fr 1fr 1fr;
    /* gutter槽的間距，看起來像是column左右之間的距離 */
    grid-gap: 30px;
    /* 外距上，這並非gird相關的，是整個div與他上面的element距離，我們這邊就是navbar */
    margin-top: 60px;
  }
  /* 原始標題有點過於下面，因此以margin-top修正成px */
  .index h2{
    margin-top: 0px;
    /* 置中 */
    text-align: center;
    /* em是會以預設單位去做調整，乘上去 1.8em就是針對內定h2大小乘以1.8倍
       用相對是有好處，當你頁面放大縮小的時候，絕對值px就會導正問題發生
    */
    font-size: 1.8em;
  }

  /* 對成分chips做調整 */
  .index .ingredients{
    /* 兩個值得就是，先上下(這邊間格是60ox)、後左右auto就自動*/
    margin: 60px auto;
  }
  /* index class之下的class也要dot */
  .index .ingredients li{
    /* 將list element轉成行內元素 */
    display: inline-block;
  }
  /* class前面都用dot ，未必要tag中class全抓像這邊只抓delete*/
  .index .delete{
    /* 有一說absolute設定後，就會跳脫該頁面/元素，浮在頁面/元素上，若沒有他就會影響到其他元素的排版 */
    position: absolute;
    /* 從上面算過來多少 */
    top: 10px;
    /* 從右邊算過來多少 */
    right: 10px;
    /* 游標過來時候變成點選手指pointer*/
    cursor: pointer;
    color: #aaa;
    /* 本身大小放大1.4倍 */
    font-size: 1.4em;
  }
</style>
