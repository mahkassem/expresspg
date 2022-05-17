import supertest from 'supertest'
import app from '../app'
import { createTestUser, TestUser } from '../utils/test.auth.heler'

let testUser: TestUser

describe('Users API', () => {
    beforeAll(async () => {
        testUser = await createTestUser()
    })

    it('[post] create user successfully return 200', async () => {
        const response = await supertest(app)
            .post('/api/users')
            .set({
                Authorization: `Bearer ${testUser.token}`,
                'Content-Type': 'application/json'
            })
            .send({
                name: 'mohamed',
                color: 'black',
                email: '123@gmail.com',
                password: '123123123',
            })

        expect(200)
        expect(response.body.name).toBe('mohamed')
        expect(response.body.email).toBe('123@gmail.com')
    })

    it('Should get all users', async () => {
        const response = await supertest(app)
            .get('/api/users')
            .set({ Authorization: `Bearer ${testUser.token}` })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })

    // test create user end point
})
