<template>
  <div class="PersonalInfo">
    <v-app>
    <bar></bar>
    <v-img src="../assets/widthPic.jpg" width="100%" height="100%">
    <v-card :loading="loading" class="mx-auto my-12" max-width="500" min-height="600">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        :src="'/'+this.backGroundImage"
      >
        <v-card-title class="white--text mt-8">
          <v-avatar size="56">
            <img
                :src="this.headImage"
                :alt="this.username"
              />
          </v-avatar>
          <p class="ml-3">{{username}}</p>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-img>

      <v-card-text>
        <div class="my-4 text-subtitle-1">学号：{{userID}}</div> 
        <div class="my-4 text-subtitle-1">生日：{{birthday}}</div>
        <div class="my-4 text-subtitle-1">邮箱：{{email}}</div>
        <div>
          签名：{{signature}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
         
      <v-card-text v-if="$store.state.person.userID==this.userID">
         <el-button type="warning" round @click="toChangePersonalInfo">修改个人信息</el-button>
         <el-button type="success" round @click="toChangePictures">编辑个人页面</el-button>
         <el-button type="primary" round @click="toMyCollections">查看个人收藏</el-button>
      </v-card-text>

    </v-card>
    </v-img>
    </v-app>
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
import { mockUser } from "@/mock/index.js";
export default {
  data: () => ({
      isFollowed:false,
      loading: false,
      email:"",
      birthday:null,
      headImage:"",
      backGroundImage:"assets/bg.jpg", // mock背景
      signature:"",
      userID:"",
      username:""
  }),

  created() {
    // 如果id为undefined，直接用mockUser
    if (!this.$route.params.id || this.$route.params.id === 'undefined') {
      this.useMockUser();
    } else {
      this.getInit();
    }
  },

  methods: {
    useMockUser() {
      this.username = mockUser.username;
      this.email = mockUser.email;
      this.birthday = '2004-01-01'; // mock
      this.signature = '且行且看';
      this.userID = '1001';
      this.headImage = require('@/assets/avatar.jpg');
      this.backGroundImage = require('@/assets/bg.jpg');
    },
    follow(){
      this.$http({
        method: "post",
        url: "/addFollow",
        data: {
          FollowedID:this.$route.params.id,
        },
      })
        .then((res) => {
          if (res.data.success) {
            this.isFollowed = true;
            alert("关注成功");
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toChangePersonalInfo() {
      this.$router.push({ path: "/ChangePersonalInfo" });
    },
    toChangePictures() {
      this.$router.push({ path: "/ChangePictures" });
    },
    toMyCollections() {
      this.$router.push({ path: "/MyCollections" });
    },

    getInit() {
      const formData=new FormData();
      formData.append("UserID",this.$route.params.id)
      this.$http({
        
        method: "get",
        url: "/inspectUser",
        params: { userID:this.$route.params.id,}
      })
        .then((res) => {
          if (res.data.success) {
            this.backGroundImage = res.data.userInfo.backGroundImage || require('@/assets/bg.jpg');
            this.headImage = res.data.userInfo.headImage || require('@/assets/avatar.jpg');
            this.email = res.data.userInfo.email;
            this.birthday = res.data.userInfo.birthday;
            this.userID = res.data.userInfo.userID;
            this.signature = res.data.userInfo.signature;
            this.username = res.data.userInfo.username;
            this.isFollowed = res.data.isFollowed;
            this.$store.commit("setUserHeadImage",res.data.userInfo.headImage );
          } else {
            // 接口失败时用mock
            this.useMockUser();
          }
        })
        .catch((err) => {
          this.useMockUser();
        });
    },
  },
  setup() {},
  components: {
    Bar,
  },
};
</script>