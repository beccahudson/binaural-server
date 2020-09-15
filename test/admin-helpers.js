const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
    return [
      {
        id: 1,
        email: 'user1@mail.com',
        name: 'test-user1',
        password: 'testPassword1',
        admin: true,
        create_date: new Date
      },
      {
        id: 2,
        email: 'user2@mail.com',
        name: 'test-user2',
        password: 'testPassword2',
        admin: false,
        create_date: new Date
      },
      {
        id: 3,
        email: 'user3@mail.com',
        name: 'test-user3',
        password: 'testPassword3',
        admin: false,
        create_date: new Date
      },
    ];
  }

  function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        users
        restart identity cascade`
    );
  }

  function seedUsersTable(db, users) {
    const preppedUsers = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1),
    }));
    return db
      .into('users')
      .insert(users)
      .then(() =>
        db.raw(`SELECT setval('users_id_seq', ?)`, [
          users[users.length - 1].id,
        ])
      );
  }

function makeFixtures() {
    const testUsers = makeUsersArray();

    return {testUsers};
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.email,
      algorithm: 'HS256',
    });
    return `bearer ${token}`;
  }

module.exports = {
    makeUsersArray,
    makeFixtures,
    makeAuthHeader,

    seedUsersTable,
    cleanTables,
}