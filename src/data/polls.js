const polls = [
  {
    'id': 1,
    'name': 'Best Band',
    'description': 'Who is the best band of all time?',
    'options': [{ "name": "Television", "votes": 2}, { "name": "The Smiths", "votes": 3}, { "name": "Joy Division", "votes": 1},
    { "name": "Fugazi", "votes": 1}]
  },
  {
    'id': 2,
    'name': 'Favorite Food',
    'description': 'What is your favorite food in this list?',
   'options': [{ "name":"Pizza", "votes": 5}, {"name": "Broccoli", "votes": 0}, {"name": "French Fries", "votes": 3}]

  },
   {
    'id': 3,
    'name': 'Best Taco Filling',
    'description': 'What is the best taco filling in this list?',
    'options': [ {"name": "Chicken", "votes" :4},{"name": "Beef", "votes" :2},{"name": 'Guacamole', "votes" :1}]
  }
];

export default polls;