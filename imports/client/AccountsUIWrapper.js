import Vue from 'vue';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

Vue.component('AccountsUIWrapper', {
  render(createElement) {
    return createElement('span', {
      attrs: {
        id: 'AccountsUIWrapper',
      }
    });
  },
  mounted() {
    // Use Meteor Blaze to render login buttons
    this.$nextTick(function () {
      this.view = Blaze.render(Template.loginButtons, document.getElementById('AccountsUIWrapper'));
    });
  },
  beforeDestroy() {
    Blaze.remove(this.view);
  }
});
