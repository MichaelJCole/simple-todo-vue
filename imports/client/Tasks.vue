<template>
  <li v-bind:class="{ checked: task.checked, private: task.private }">
    <button class="delete" @click="deleteTask">&times;</button>
 
    <input class="toggle-checked" type="checkbox" :checked="task.checked" @click="toggleChecked" />
 
    <span v-if="isOwner">
      <button class="toggle-private" @click="togglePrivate">
        <span v-if="task.private">Private</span>
        <span v-else>Public</span>
      </button>
    </span>

    <span class="text"><strong>{{task.username}}</strong> - {{task.text}}</span>
  </li>
</template>

<script>
import { Tasks } from '/imports/both/collections/Tasks';

export default {
  data() {
    console.log('... rendering Tasks.vue component', this);
    return {
      ...this.$attrs,
    }
  },
  // Vue Methods
  methods: {  
    isOwner() {
      console.log('isOwner', this);
      return this.task.owner === Meteor.userId();
    },
    toggleChecked() {
      console.log('toggleChecked', this);
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setChecked', this.task._id, !this.task.checked);
    },
    deleteTask() {
      console.log('deleteTask', this);
      Meteor.call('tasks.remove', this.task._id);
    },
    togglePrivate() {
      console.log('togglePrivate', this);
      Meteor.call('tasks.setPrivate', this.task._id, !this.task.private);
    },
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      //'TaskById': [task.id]
    },
  }
}
</script>

<style scoped>
</style>