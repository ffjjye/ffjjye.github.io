import Vue from "vue";
import Vuex from "vuex";
import { mockUser, mockGroups, mockBooks, mockReviews, mockMessages, mockUpdates } from '../mock';

Vue.use(Vuex);
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    login: true,
    isAdmin: false,
    person: {
      ...mockUser,
      username: 'fjy',
      avatar: require('@/assets/avatar.jpg')
    },
    groups: mockGroups,
    books: mockBooks,
    reviews: mockReviews,
    messages: mockMessages,
    updates: mockUpdates
  },
  mutations: {
    setLogin(state) {
      state.login = true
    },
    setAdmin(state) {
      state.isAdmin = true
    },
    setUserID(state, UserID) {
      state.person.id = UserID
    },
    setUserName(state, username) {
      state.person.username = username
    },
    setUserEmail(state, email) {
      state.person.email = email
    },
    setUserSignature(state, signature) {
      state.person.bio = signature
    },
    setUserHeadImage(state, headImage) {
      state.person.avatar = headImage
    },
    setIsTeacher(state,isTeacher){
      state.person.isTeacher = isTeacher;
    },
    setLogout(state) {
      state.login = false
    },
    setUser(state, Person){
      state.person = Person
    },
    addGroup(state, group) {
      state.groups.push(group)
    },
    addBook(state, book) {
      state.books.push(book)
    },
    addReview(state, review) {
      state.reviews.push(review)
    },
    addMessage(state, message) {
      state.messages.push(message)
    },
    addUpdate(state, update) {
      state.updates.push(update)
    }
  },
  actions: {},
  modules: {},
});