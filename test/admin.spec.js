const app = require('../src/app')
const knex = require('knex')
const supertest = require('supertest')
const helpers = require('./admin-helpers')
const bcrypt = require('bcryptjs');


describe('Admin Endpoints', () => {
    let db

    let {testUsers} = helpers.makeFixtures()
    testUsers = testUsers.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1),
      }));
    const testUser = testUsers[0]
    
    before('make Knex instance', ()=>{
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
      })

      after('disconnect from db', ()=>db.destroy())
      before('cleanup tables', ()=>helpers.cleanTables(db))
      afterEach('cleanup tables', ()=>helpers.cleanTables(db))

      describe('GET /admin/:id', () => {
            beforeEach('Insert data', () =>
                helpers.seedUsersTable(db,testUsers)
            )

            it('Responds 200 with array of users', () => {
                const user_id = testUser.id

                return supertest(app)
                .get(`/admin/${user_id}`)
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .expect(200, testUsers)
            })
      })

    describe('DELETE /admin/:id', () => {
        beforeEach('Insert data', () =>
            helpers.seedUsersTable(db,testUsers)
        )

        it('Responds 204', () => {
            const admin = testUser.id
            const delete_email = testUsers[2].email
            const delete_id = testUsers[2].id
            const expectedUsers = testUsers.filter(user => (user.id != delete_id && user.email != delete_email))
            const toRemove = {delete_id, delete_email}
            
            return supertest(app)
                .delete(`/admin/${delete_id}`)
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(toRemove)
                .expect(204)
                .then(res => {
                    supertest(app)
                    .get(`/admin/${admin}`)
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(expectedUsers)
                })
        })
    })
})