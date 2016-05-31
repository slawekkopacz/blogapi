var ObjectId = require('mongoose').Types.ObjectId;

module.exports =
  [
    {
      _id: ObjectId('574d79da3d616b171df30001'),
      title: 'Post 1',
      body: 'Body 1',
      postedDate: Date('2012-04-23T18:00:00.001Z'),
    },
    {
      _id: ObjectId('574d79da3d616b171df30002'),
      title: 'Post 2',
      body: 'Body 2',
      postedDate: Date('2012-04-24T18:00:00.001Z'),
    },
    {
      _id: ObjectId('574d79da3d616b171df30003'),
      title: 'Post 3',
      body: 'Body 3',
      postedDate: Date('2012-04-25T18:00:00.001Z'),
    },
    {
      _id: ObjectId('574d79da3d616b171df30004'),
      title: 'Post 4',
      body: 'Body 4',
      postedDate: Date('2012-04-26T18:00:00.001Z'),
    },
  ];