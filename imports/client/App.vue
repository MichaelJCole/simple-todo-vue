<template>
  <div class="container">
    <div v-if="!$subReady.Tasks">Loading...</div>
    <div v-else>
      <header>
        <h1>Todo List ({{incompleteCount}})</h1>

        <label class="hide-completed">
          <input type="checkbox" @model="hideCompleted"/>
          Hide Completed Tasks
        </label>

        <AccountsUIWrapper></AccountsUIWrapper>

        <form v-if="currentUser" id="inputWrapper" class="new-task" @submit.prevent="newTask">
          <input type="text" name="text" v-model="taskName" placeholder="Type to add new tasks"/>
        </form>

      </header>

      <ul>
        <TaskComponent
          v-for="task in tasks"
          :key="task._id"
          :task="task"></TaskComponent>
      </ul>
    </div>
  </div>
</template>

<script>
import { Tasks } from '/imports/both/collections/Tasks';
import TaskComponent from './Tasks.vue';
import AccountsUIWrapper from './AccountsUIWrapper.js';

export default {
  components: {
    TaskComponent
  },
  data() {
    console.log('... rendering App.vue component');
    return {
      hideCompleted: false,
      taskName: '',
    }
  },
  // Vue Methods
  methods: {
    newTask() {
      console.log('newTask Vue method', this);
      Meteor.call('tasks.insert', this.taskName);          // not Meteor reactive
      this.taskName = '';
    }
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      'Tasks': []
    },

    tasks() {
      console.log('Tasks Vue method', this);
      if (this.hideCompleted) {
        // If hide completed is checked, filter tasks
        return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      }
      // Otherwise, return all of the tasks
      return Tasks.find({}, { sort: { createdAt: -1 } });
    },

    incompleteCount() {
      console.log('incompleteCount Vue method');
      return Tasks.find({ checked: { $ne: true } }).count();
    },

    currentUser: Meteor.user,
  }
}
</script>

<style scoped>
</style>
