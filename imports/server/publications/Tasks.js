import { Meteor } from 'meteor/meteor';

import { Tasks } from '/imports/both/collections/Tasks';
 
// This code only runs on the server
Meteor.publish('Tasks', function () {
  console.log(`User ${this.userId} subscribed to Tasks`);
  return Tasks.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId },
    ],
  });
});
