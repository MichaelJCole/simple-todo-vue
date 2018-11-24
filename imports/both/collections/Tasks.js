import { Mongo } from 'meteor/mongo';

console.log('Tasks collection initialized');

export const Tasks = new Mongo.Collection('Tasks');
