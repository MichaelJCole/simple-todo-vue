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

export default {
  /**
   * this was place where was bug mentioned in
   *
   * https://github.com/meteor/guide/issues/590
   *
   * You need use props or events, in this case
   * props are simpler, when you created data
   * especially with `return` then any component
   * duplicated his own task detached from array
   * of tasks from App component that was still
   * reactive. Please explain it in text of
   * this tutorial, because it can be confusing
   * for many users. Great sources for further
   * reading:
   *
   * > https://medium.com/front-end-weekly/vues-v-model-directive-vs-sync-modifier-d1f83957c57c
   * > https://forum.vuejs.org/t/keeping-item-array-synced-between-children-and-parent/4044/4
   */
  props: ['task'],
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
}
</script>
