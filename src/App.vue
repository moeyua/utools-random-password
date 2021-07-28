<template>
  <div id="app">
    <el-form label-width="100px">

      <el-form-item label-width="0">
        <el-input v-model="password" id="password" size="large" disabled>
          <div slot="suffix" style="background-color:#FFF;height: 38px;margin-top:1px">
          <el-button icon="el-icon-refresh" circle  class="refresh-button"
          :class="{'rotate360':showAnimate}" @click="play"
          ></el-button>
          </div>
          <el-button slot="append" @click="copyToClip(password)">复制</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="密码长度：">
        <el-slider v-model="length" @input="generate"></el-slider>
      </el-form-item>

      <el-form-item label="可用字符：">
        <el-checkbox-group v-model="symbolType" @change="generate">
          <el-checkbox label="upper">ABC</el-checkbox>
          <el-checkbox label="lower">abc</el-checkbox>
          <el-checkbox label="number">123</el-checkbox>
          <el-checkbox label="symbol">#$*</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var Mock = require('mockjs')
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      password: "",
      length: 15,
      symbolType: ["lower","upper","number"],
      lower: "abcdefghijklmnopqrstuvwxyz",
      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      number: "0123456789",
      symbol: "!@#$%^&*()[]",
      showAnimate: false
    };
  },
  mounted() {
    this.generate();
  },
  methods: {
    // generate() {
    //   if(this.symbolType.length === 0) {
    //     this.$alert('请至少选择一项')
    //   }else {
    //     this.password = '';
    //     for (let index = 0; index < this.length; index++) {
    //       this.password += this.randomSymbol(this.randomType());
    //     }
    //   }
    // },
    // randomSymbol(array) {
    //   return array[Math.floor(Math.random() * array.length)];
    // },
    // randomType() {
    //   let type =
    //     this.symbolType[Math.floor(Math.random() * this.symbolType.length)];
    //   switch (type) {
    //     case "ABC":
    //       return this.capitalise;
    //     case "abc":
    //       return this.lowercase;
    //     case "123":
    //       return this.number;
    //     case "#$*":
    //       return this.symbol;
    //   }
    // },
    pool() {
      let symbolType = this.symbolType;
      let pool = "";
      for (const i in symbolType) {
        switch (symbolType[i]) {
        case "upper":
          pool = pool + this.upper;
          break;
        case "lower":
          pool = pool + this.lower;
          break;
        case "number":
          pool = pool + this.number;
          break;
        case "symbol":
          pool = pool + this.symbol;
          break;
        }
      }
      return pool;
    },
    generate() {
      this.password = Mock.Random.string( this.pool(), this.length );
    },
    copyToClip(content, message) {
      var aux = document.createElement("input"); 
      aux.setAttribute("value", content); 
      document.body.appendChild(aux); 
      aux.select();
      document.execCommand("copy"); 
      document.body.removeChild(aux);
      if (message == null) {
          this.$notify({
          title: '成功',
          message: '复制成功',
          type: 'success'
        });
      } else{
          this.$notify.error({
          title: '错误',
          message: message
        });
      }
    },
    play() {
      this.showAnimate = true;
      this.generate();
      setTimeout(()=>{
        this.reset()
      }, 500 )    
    },
    reset() {
      this.showAnimate = false
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 60%;
  margin-left: 20%;
  margin-top: 20%;
}
#password {
  margin-left: 10px;
  
}
.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  color: #000;
}
.el-input.is-disabled .el-input__inner {
  cursor: text;
}
.el-input-group__append, .el-input-group__prepend {
  background-color: rgb(64, 158, 255);
  color: #fff;
}
.refresh-button {
  font-size: 20px;
  border: none;
  background-color:rgba(255,255,255,0);
}
@keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
.rotate360 {
    animation: rotate360 .5s ease-out 0s;
}
</style>
