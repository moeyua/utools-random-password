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
          <el-checkbox label="ABC"></el-checkbox>
          <el-checkbox label="abc"></el-checkbox>
          <el-checkbox label="123"></el-checkbox>
          <el-checkbox label="#$*"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      length: 15,
      symbolType: ["ABC","abc","123"],
      password: "",
      capitalise: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      lowercase: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
      number: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      symbol: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "?", "_", "-"],
      showAnimate: false
    };
  },
  mounted() {
    this.generate();
  },
  methods: {
    generate() {
      if(this.symbolType.length === 0) {
        this.$alert('请至少选择一项')
      }else {
        this.password = '';
        for (let index = 0; index < this.length; index++) {
          this.password += this.randomSymbol(this.randomType());
        }
      }
    },
    randomSymbol(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    randomType() {
      let type =
        this.symbolType[Math.floor(Math.random() * this.symbolType.length)];
      switch (type) {
        case "ABC":
          return this.capitalise;
        case "abc":
          return this.lowercase;
        case "123":
          return this.number;
        case "#$*":
          return this.symbol;
      }
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
