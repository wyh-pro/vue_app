<template>
  <div id="book">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in carouselList" :key="item">
          <img :src="'https://images.weserv.nl/?url=' + item" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tab">
      <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="虚构类" name="fiction">
          <div class="book-list">
            <el-row v-for="item in bookList" :key="item.id">
              <el-col :span="8">
                <div class="img">
                  <img :src="'https://images.weserv.nl/?url='+ item.cover.url" alt="">
                </div>
              </el-col>
              <el-col :span="16">
                <div class="content">
                  <h3> {{item.title}} </h3>
                  <p> {{item.info}} </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane label="非虚构类" name="nonfiction"> 
           <div class="book-list">
            <el-row v-for="item in bookList" :key="item.id">
              <el-col :span="8">
                <div class="img">
                  <img :src="'https://images.weserv.nl/?url='+ item.cover.url" alt="">
                </div>
              </el-col>
              <el-col :span="16">
                <div class="content">
                  <h3> {{item.title}} </h3>
                  <p> {{item.info}} </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselList: [],
      bookList:[],
      activeName: "fiction",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let bookUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/book_${this.activeName}/items?os=ios&start=0&count=8`;
      this.axios
        .get(baseUrl + bookUrl)
        .then((res) => {
          console.log(res);
          this.carouselList = res.data.subject_collection_items.map((item) => {
            return item.cover.url;
          });
          this.bookList = res.data.subject_collection_items;
          console.log(this.carouselList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.getData();
    },
  },
};
</script>


<style lang="scss" scoped>
.carousel {
  img {
    width: 100%;
  }
}
.tab {
  padding: 0.2rem;
  .book-list{
    .img{
      img{
        width: 100px;
      }
    }
    .content{
      padding: .2rem;
      h3{
        font-weight: bolder;
        margin-bottom: .4rem;
      }
    }
  }
}
</style>