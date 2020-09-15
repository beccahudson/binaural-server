const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
    return [
      {
        id: 1,
        email: 'user1@mail.com',
        name: 'test-user1',
        password: 'testPassword1',
        admin: 'true',
      },
      {
        id: 2,
        email: 'user1@mail.com',
        user_name: 'test-user2',
        password: 'testPassword2',
        admin: 'false',
      },
      {
        id: 3,
        email: 'user1@mail.com',
        user_name: 'test-user3',
        password: 'testPassword3',
        admin: 'false',
      },
    ];
  }

function makeFixtures() {
    const testUsers = makeUsersArray();

    return {testUsers};
}