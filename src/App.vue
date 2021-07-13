<template>
  <div id="app">
    <el-form label-width="100px">
      
        <el-input v-model="password" id="password" size="large"></el-input>
      
      <el-form-item label="密码长度：">
        <el-slider v-model="length" @change="generate"></el-slider>
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
    // HelloWorld符号
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
  margin-top: 30%;
}
#password {
  margin-left: 10px;
  margin-bottom: 30px;
}
</style>
