<template>
  <div class="SearchBook">
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
            <v-chip
              v-for="(tag,i) in tags"
              :key="i"
              @click="search = tag.Tag"
            >
              {{ tag.Tag }}
            </v-chip>
          </v-chip-group>
        </v-row>
        <v-row class="searchText" justify="center">搜索结果</v-row>
        <v-data-table
          :headers="headers"
          :items="filteredBooks"
        >
        <template v-slot:item.action="{ item }">
          <v-btn text color="cyan" :to="'/Book/CheckBook/' + item.bookID"> 查看 </v-btn>
        </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import bar from "../components/Bar.vue";
import { mockBooks } from "@/mock/index.js";

export default {
  data() {
    return {
      search: "",
      choosedTag:"",
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
      headers: [
        {
          text: "书名",
          align: "start",
          filterable: false,
          value: "bookName",
        },
        { text: "类别", value: "kind" },
        { text: "作者", value: "author" },
        { text: "评分", value: "score" },
        { text: "操作", value: "action" },
      ],
      book: mockBooks.map(b => ({
        bookID: b.id,
        bookName: b.title,
        kind: b.category,
        author: b.author,
        score: b.rating
      })),
    };
  },
  computed: {
    filteredBooks() {
      if (!this.search) {
        return this.book;
      }
      return this.book.filter(book => {
        return book.bookName.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  components: {
    bar,
  },
  created() {},
  methods: {
  },
};
</script>
