<template>
  <div class="allGroup">
    <bar></bar>
    <v-container>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-row justify="center">
          <v-chip-group active-class="primary--text">
            <v-chip v-for="(tag, i) in tags" :key="i" @click="search = tag.Tag">
              {{ tag.Tag }}
            </v-chip>
          </v-chip-group>
        </v-row>
        <v-data-table :headers="headers" :items="groups" :search="search">
          <template v-slot:item.action="{ item }">
          <v-btn text color="cyan" :to="'/Group/GroupIndex/' + item.groupID"> 查看 </v-btn>
        </template>
        </v-data-table>
        
      </v-card>
    </v-container>
  </div>
</template>

<script>
import bar from "../components/Bar.vue";
import { mockGroups } from "@/mock/index.js";

export default {
  data() {
    return {
      search: "",
      choosedTag: "",
      tags: [
        {
          Tag: "文学",
        },
        {
          Tag: "科幻",
        },
        {
          Tag: "侦探",
        },
        {
          Tag: "纪实",
        },
        {
          Tag: "儿童",
        },
        {
          Tag: "艺术",
        },
        {
          Tag: "历史",
        },
        {
          Tag: "武侠小说",
        },
        {
          Tag: "地理",
        },
        {
          Tag: "IT",
        },
      ],
      groups: [],
      headers: [
        {
          text: "名称",
          align: "start",
          value: "groupName",
        },
        { text: "圈子ID", value: "groupID" },
        { text: "标签", value: "tag" },
        { text: "人数", value: "memberNum" },
        { text: "简介", value: "introduce" },
        { text: "创建者ID", value: "createID" },
        { text: "操作", value: "action" },
      ],
    };
  },
  components: {
    bar,
  },
  created() {
    this.searchGroup();
  },
  methods: {
    useMockData() {
      this.groups = mockGroups.map(group => ({
        groupID: group.id,
        groupName: group.name,
        tag: group.description,
        memberNum: group.memberCount,
        introduce: group.description,
        createID: group.name === '读书会' ? 2 : 1 // 读书会创建者ID为2，其他为1
      }));
    },
    
    searchGroup() {
      this.$http({
        method: "get",
        url: "/searchGroup",
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.success && res.data.group && res.data.group.length > 0) {
            this.groups = res.data.group;
          } else {
            // 接口失败或返回空数据时使用mock
            this.useMockData();
          }
        })
        .catch((e) => {
          console.log(e);
          this.useMockData();
        });
    },
  },
};
</script>
