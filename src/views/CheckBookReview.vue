<template>
  <div class="CheckBookReview">
    <v-app>
      <bar></bar>
      <v-container>
        <v-card class="mx-auto" outlined style="margin-top:40px;">
          <v-toolbar class="lxtToolbar ">
            <v-toolbar-title>书评信息</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn class="ma-2" text icon color="blue lighten-2" @click="like">
                 <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            <el-button type="info" round v-if="isCollect" @click="cancelCollect" class="applyBtn">取消收藏</el-button>
            <el-button color="#8fc19c" round v-else @click="collect" class="applyBtn">收藏书评</el-button>
            <el-button 	color="#45a165" v-if="$store.state.person.userID==this.bookReviewInfo.userID" @click="toEditBookReview" class="applyBtn">修改书评</el-button>
          </v-toolbar>

          <v-list-item three-line>
            <v-list-item-avatar left size="200" color="grey">
              <img
                :src="bookReviewCommentUser[0] && bookReviewCommentUser[0].headImage ? bookReviewCommentUser[0].headImage : require('@/assets/avatar.jpg')"
                :alt="bookReviewInfo.username"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="headline mb-4" style="margin-left:70px">{{bookReviewInfo.title}}</div>
              <div style="margin-left:70px; white-space: pre-wrap; word-wrap: break-word; max-width: 100%;">{{bookReviewInfo.content}}</div>
              <v-list-item-subtitle style="margin-left:70px">{{bookReviewInfo.score}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions> </v-card-actions>
        </v-card>

        <v-card class="content">
          <v-toolbar class="elevation-1">
            <v-toolbar-title>书评评论区</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
            <v-container class="pa-4 text-center">
               <v-card>>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel v-for="(bookReviewComment, i) in bookReviewCommentList" :key="i">
            <v-expansion-panel-header>
              <template>
                <v-container>
              
            <p >
              <v-avatar size="30">
              <img :src="bookReviewCommentUser[i].headImage"/>
            </v-avatar>
              {{bookReviewCommentUser[i].username}}
              ——
              {{bookReviewComment.commentTime}} :
              </p>
              </v-container>
              </template>
              </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ bookReviewComment.content }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <v-card>
          <v-container fluid>
        <v-textarea v-model="content" color="teal">
          <template v-slot:label>
            <div>内容</div>
          </template>
        </v-textarea>
          </v-container>
              <v-spacer></v-spacer>
              <v-btn text color="cyan" @click="addMessage">发布评论</v-btn>
      </v-card>
            </v-container>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
import { mockReviews, mockUser } from "@/mock/index.js";
export default {
  setup() {},
  created() {
    this.getInit();
  },
  data: () => ({
    content:"",
    panel:[0],
    bookReviewInfo:{},
    isCollect: false,
    bookReviewCommentList:[
      {content:"从前有座山.........",
       commentTime:"2020-4-12"}
    ],
    bookReviewCommentUser:[
      {username:"LONG"}
    ],
  }),
  methods: {
    useMockData() {
      const reviewId = parseInt(this.$route.params.id);
      if(reviewId === 4) {
        this.bookReviewInfo = {
          title: "测试书评",
          content: "传世经典，值得一读。",
          score: 5,
          userID: "fjy",
          username: "fjy"
        };
        this.bookReviewCommentList = [];
        this.bookReviewCommentUser = [];
        this.isCollect = false; // 默认未收藏
        return;
      }
      const mockReview = mockReviews.find(review => review.id === reviewId);
      if (mockReview) {
        this.bookReviewInfo = {
          title: mockReview.content.substring(0, 20) + '...',
          content: mockReview.content,
          score: mockReview.rating,
          userID: mockReview.userId,
          username: mockUser.username
        };
        // 多条mock评论
        if (reviewId === 1) {
          this.bookReviewCommentList = [
            { content: '我也很喜欢红楼梦，人物描写太细腻了！', commentTime: '2025-05-01' },
            { content: '宝黛爱情真的让人唏嘘。', commentTime: '2025-05-02' },
            { content: '四大家族的兴衰很有历史感。', commentTime: '2025-05-03' }
          ];
          this.bookReviewCommentUser = [
              { username: '张三', headImage: require('@/assets/group-avatars/group1.jpg') },
              { username: '李四', headImage: require('@/assets/group-avatars/group2.jpg') }
          ];
        } else if (reviewId === 2) {
          this.bookReviewCommentList = [
            { content: '悉达多的成长让我很有共鸣。', commentTime: '2025-05-05' },
            { content: '黑塞的哲思很深刻。', commentTime: '2025-05-06' }
          ];
          this.bookReviewCommentUser = [
              { username: '张三', headImage: require('@/assets/group-avatars/group1.jpg') },
              { username: 'fjy', headImage: require('@/assets/avatar.jpg') }
          ];
        } else if (reviewId === 3) {
          this.bookReviewCommentList = [
            { content: '阿德勒心理学确实很有启发。', commentTime: '2025-05-15' },
            { content: '这本书改变了我对人际关系的看法。', commentTime: '2025-05-16' }
          ];
          this.bookReviewCommentUser = [
              { username: '李四', headImage: require('@/assets/group-avatars/group2.jpg') },
              { username: '张三', headImage: require('@/assets/group-avatars/group1.jpg') }
          ];
        } else {
          this.bookReviewCommentList = [
            { content: '很棒的书评！', commentTime: '2025-05-10' }
          ];
        }
        // 所有评论用户都为fjy
        if(![1, 2, 3].includes(reviewId)) {
            this.bookReviewCommentUser = this.bookReviewCommentList.map(() => ({
              username: mockUser.username,
              headImage: mockUser.avatar
            }));
        }
        // 只允许id为2（悉达多）为收藏
        this.isCollect = reviewId === 2;
      }
    },
    toEditBookReview() {
      this.$router.push({ path: "/Book/EditBookReview/"+this.$route.params.id });
    },
    like() {
      this.$http({
        method: "post",
        url: "/likeBookReview",
        data: {
          BookReviewID:this.$route.params.id,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert("点赞成功");
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelCollect() {
      this.$http({
        method: "post",
        url: "/cancelCollectBookReview",
        data: {
          BookReviewID:this.$route.params.id,
        },
      })
        .then((res) => {
          if (res.data.success) {
            this.isCollect=false;
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },
    collect() {
      this.$http({
        method: "post",
        url: "/collectBookReview",
        data: {
          BookReviewID:this.$route.params.id,
        },
      })
        .then((res) => {
          if (res.data.success) {
            this.isCollect=true;
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addMessage(){
        this.$http({
          method:'post',
          url:"/commentReview",
          data:{
            BookReviewID:this.$route.params.id,
            Content:this.content,
          }
        }).then(res=>{
          this.getInit()
        })
        this.content="";
      },
    getInit() {
      this.$http({
        method: "get",
        url: "/inspectBookReview",
        params:{ BookReviewID:this.$route.params.id,}
      })
        .then((res) => {
          if (res.data.success && res.data.bookReviewInfo) {
            this.bookReviewInfo = res.data.bookReviewInfo;
            this.bookReviewCommentList = res.data.bookReviewCommentList;
            this.bookReviewCommentUser = res.data.bookReviewCommentUser;
            this.isCollect = res.data.isCollect;
          } else {
            this.useMockData();
          }
        })
        .catch((err) => {
          this.useMockData();
        });
    },
  },
  components: {
    Bar,
  },
};
</script>

<style scoped>
.content{
  margin-top:30px;
}

.lxtToolbar{
    padding-right:10px;
  
}

.pages{
  text-align: center; 
}

.lxtBtn{
  margin-right: 80px;

box-shadow:  18px 18px 36px rgba(0, 0, 0, 0.1),
             -18px -18px 36px #ffffff;
    		transition: box-shadow 0.2s ease-out;         
		background-color: #efeeee;
		position: relative;  
    		outline: none;
		border: none;                   
}

.applyBtn{
    margin-right:15px;
  	
		box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
			-9px -9px 18px rgba(255, 255, 255, 1);
		border-radius: 3rem;
		transition: box-shadow 0.2s ease-out;
		background-color: #efeeee;
		position: relative;
		top: 0px;
		width: 140px;
		height: 70 px;
		outline: none;
		border: none;
}


</style>