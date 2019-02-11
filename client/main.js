import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

import '/imports/client/Accounts.js';

import App from '/imports/client/App.vue';
import './main.html';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
