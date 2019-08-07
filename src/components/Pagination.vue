<template>
  <div class="pagination">
    <button @click="onclick">首页</button>
    <button @click="onclick">上一页</button>
    <button class="ellipsis" v-if="judge">...</button>
    <span>
        <button v-for="btn in buttons"
                :class="[{active:btn === currentPage},'pageBtn']"
                @click="onclick(btn)">
        {{btn}}
      </button>
      </span>
    <button class="ellipsis">...</button>
    <button @click="onclick">下一页</button>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: "pagination",
    data() {
      return {
        buttons: [1, 2, 3, 4, 5],
        currentPage: 1,
        judge: false
      }
    },
    methods: {
      onclick(btn) {
        if (typeof btn !== 'number') {
          switch (btn.target.innerText) {
            case '上一页':
              $('button.active').prev().click()
              break;
            case '下一页':
              $('button.active').next().click()
              break;
            case '首页':
              this.buttons = [1, 2, 3, 4, 5]
              this.onclick(1)
              break;
          }
          return
        }
        this.currentPage = btn
        if (btn > 4) {
          this.judge = true
        } else {
          this.judge = false
        }
        if (btn === this.buttons[4]) {
          this.buttons.shift() // 移除第一个
          this.buttons.splice(4, 0, this.buttons[3] + 1) // 添加最后一个
        }
        if (btn === this.buttons[0] && btn !== 1) {
          this.buttons.unshift(this.buttons[0] - 1) // 添加第一个
          this.buttons.splice(5, 1) // 移除最后一个
        }
        this.$emit('handleList',this.currentPage)
      }
    }
  }
</script>

<style scoped>

  button {
    width: 4em;
    height: 2em;
    background: #ffffff;
    color: #999;
    outline: none;
    vertical-align: top;
    border: 1px solid #ddd;
    font-weight: 500;
  }

  button.active {
    background: #b4b4b4;
  }

  span {
    margin: 0 0.5em;
  }

  .pageBtn {
    border-left: none;
  }

  .pageBtn:first-child {
    border: 1px solid #ddd;
  }
</style>
