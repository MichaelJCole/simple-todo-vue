import { Meteor } from 'meteor/meteor';

import '/imports/both/collections/Tasks';
import '/imports/server/publications/Tasks';
import '/imports/server/methods/Tasks';

Meteor.startup(() => {
  // Print the current time from the database
});
