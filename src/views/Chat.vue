<template>
  <div id="chat">
    <div class="chat-area">
      <div v-for="(item, index) in this.chatList" :key="index">
        <div class="question">
          <span>{{ item.question }}</span>
        </div>
        <div class="answer">
          <span>{{ item.answer }}</span>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="chatText"
            placeholder="请输入信息 . . ."
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
export default {
  data() {
    return {
      chatText: "",
      chatList: [],
    };
  },
  methods: {
    getTimeStamp() {
      let timer = new Date();
      timer = Date.parse(timer);
      timer = timer.toString().substr(0, 10);
      timer = Number.parseInt(timer);
      return timer;
    },
    getRandomStr() {
      let str = Math.random();
      str = str.toString(16);
      str = str.substr(2);
      return str;
    },
    getSign(obj) {
      //计算步骤
      //1.key字典升序排列
      let arr = Object.keys(obj);
      arr = arr.sort();
      //2.url键值对格式拼接成字符串
      let str = "";
      arr.forEach((key) => {
        str += key + "=" + encodeURI(obj[key]) + "&";
      });
      //3.应用密钥以app_key为键名，组成URL键值拼接到字符串T末尾
      str += "app_key=8CPq9nvKc2ZDSwjL";
      //4.对字符串S进行MD5运算，将得到的MD5值所有字符转换成大写
      str = md5(str).toUpperCase();
      return str;
    },
    sendMessage() {
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let requestUrl = "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
      let params = {
        app_id: 2155983479,
        time_stamp: this.getTimeStamp(),
        nonce_str: this.getRandomStr(),
        session: "10000",
        question: this.chatText,
      };
      params.sign = this.getSign(params);
      this.axios
        .get(baseUrl + requestUrl, { params })
        .then((res) => {
          this.chatList.push({
            question: this.chatText,
            answer: res.data.data.answer,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-area {
  font-size: 0.37rem;

  .question {
    text-align: right;
    span {
      background: #e6ceac;
    }
  }
  .answer {
    text-align: left;
    span {
      background: #ecad9e;
    }
  }
}
.chat-input {
  position: fixed;
  bottom: 1rem;
  background: #ecad9e;
  width: 100%;
  text-align: center;
}
#chat {
  padding-bottom: 1.6rem;
}
</style>