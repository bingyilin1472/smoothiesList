<template>
  <!-- Navbar這個component是不進去Router因為他是不動的static -->
  <div class="navbar">
    <nav class="nav-extended">
      <div class="nav-content">
      <!-- 針對樣式套在不同的區塊，而將router-link至於不同之處來去做listening -->
        <!-- 樣式在內，就將router-link至於外 -->
        <router-link to="">
          <span class="nav-title">Smoothies List</span>
        </router-link>
        <!-- 樣式在外，就將router-link至於內(而這個外部a是沒有href因此不會有連結效果 -->
        <a class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
          <router-link to="">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
    export default {
        name: "Navbar",
        // 作為之後可能要data的用途
        data(){
          return{

          }
        }
    }
</script>

<style scoped>
  /* nav title太貼邊緣，用padding去做邊框距離調整 */
  .navbar nav{
    /* 上0 右邊空出20px */
    padding: 0 20px;
  }
</style>
