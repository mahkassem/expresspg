import supertest from 'supertest'
import app from '../app'
import { createTestUser, TestUser } from '../utils/test.auth.heler'

let testUser: TestUser

describe('Users API', () => {
    beforeAll(async () => {
        testUser = await createTestUser()
    })

    it('Should get all users', async () => {
        const response = await supertest(app)
            .get('/api/users')
            .set({ Authorization: `Bearer ${testUser.token}` })
            .send()

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })
})
