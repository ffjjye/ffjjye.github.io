<template>
  <div class="grouplist">
    <v-app>
      <bar></bar>
      <v-container>
        <v-toolbar flat>
          <v-toolbar-title>圈子</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn v-if="$store.state.person.isTeacher" text color="cyan" to="/Group/CreateGroup"> 创建圈子 </v-btn>

          <v-btn text color="deep-orange" to="/Group/AllGroup">
            所有圈子
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="tab">
              <v-tab>热门圈子</v-tab>
              <v-tab>我的圈子</v-tab>
              <v-tab-item>
                  <v-container class="pa-4 text-center">
                    <v-row class="fill-height" align="center" justify="center">
                      <template v-for="(group, i) in hotGroups">
                        <v-col :key="i" cols="12" md="3">
                          <v-hover v-slot="{ hover }">
                            <v-card
                              :elevation="hover ? 7 : 2"
                              :class="{ 'on-hover': hover }"
                              width="300"
                              :to="'/Group/GroupIndex/' + group.groupID"
                            >
                              <v-img :src="group.groupImage" height="225px">
                                <v-card-title  class="white--text mt-8">
                                  <v-row
                                    class="fill-height flex-column"
                                    justify="space-between"
                                  >
                                    <p class="mt-4 subheading text-left">
                                      {{ group.groupName }}
                                    </p>

                                    <div>
                                      <p
                                        class="
                                          ma-0
                                          body-1
                                          font-weight-bold font-italic
                                          text-left
                                        "
                                      >
                                        {{ group.tag }}
                                      </p>
                                      <p
                                        class="
                                          caption
                                          font-weight-medium font-italic
                                          text-left
                                        "
                                      >
                                        {{ group.introduce }}
                                      </p>
                                    </div>
                                  </v-row>
                                </v-card-title>
                              </v-img>
                            </v-card>
                          </v-hover>
                        </v-col>
                      </template>
                    </v-row>
                  </v-container>
              </v-tab-item>

              <v-tab-item>
                  <v-container class="pa-4 text-center">
                    <v-row class="fill-height" align="center" justify="center">
                      <template v-for="(group, i) in myGroups">
                        <v-col :key="i" cols="12" md="3">
                          <v-hover v-slot="{ hover }">
                            <v-card
                              :elevation="hover ? 7 : 2"
                              :class="{ 'on-hover': hover }"
                              width="300"
                              :to="'/Group/GroupIndex/' + group.groupID"
                            >
                              <v-img :src="group.groupImage" height="225px">
                                <v-card-title class="white--text mt-8">
                                  <v-row
                                    class="fill-height flex-column"
                                    justify="space-between"
                                  >
                                    <p class="mt-4 subheading text-left">
                                      {{ group.groupName }}
                                    </p>

                                    <div>
                                      <p
                                        class="
                                          ma-0
                                          body-1
                                          font-weight-bold font-italic
                                          text-left
                                        "
                                      >
                                        {{ group.tag }}
                                      </p>
                                      <p
                                        class="
                                          caption
                                          font-weight-medium font-italic
                                          text-left
                                        "
                                      >
                                        {{ group.introduce }}
                                      </p>
                                    </div>
                                  </v-row>
                                </v-card-title>
                              </v-img>
                            </v-card>
                          </v-hover>
                        </v-col>
                      </template>
                    </v-row>
                  </v-container>
              </v-tab-item>
              
            </v-tabs>
          </template>
        </v-toolbar>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
export default {
  data: () => ({
    tab: null,
    hotGroups: [],
    myGroups: [],
  }),
  components: {
    Bar,
  },
  created() {
    this.showGroupList();
  },
  methods: {
    showGroupList() {
      // 使用 Vuex store 中的模拟数据
      this.hotGroups = this.$store.state.groups.map(group => ({
        groupID: group.id,
        groupName: group.name,
        groupImage: require('@/assets/group-avatars/' + group.avatar),
        tag: group.category || '读书会',
        introduce: group.description
      }));
      
      // 我的圈子只显示"文学爱好者"这一个圈子
      this.myGroups = this.$store.state.groups
        .filter(group => group.id === 2) // 只保留id为2的"文学爱好者"
        .map(group => ({
          groupID: group.id,
          groupName: group.name,
          groupImage: require('@/assets/group-avatars/' + group.avatar),
          tag: group.category || '读书会',
          introduce: group.description
        }));
    },
  },
};
</script>
