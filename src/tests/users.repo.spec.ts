import { User } from '../entities/users/user.model'
import {
    createUser,
    getUserById,
    getAllUsers
} from '../entities/users/users.repo'

let testUser: User = {
    name: 'Test User',
    color: '#ffffff',
    email: 'test@test.com',
    password: 'test'
}
let userId: number

describe('Users Repository', () => {
    it('Should create user', async () => {
        const createdUser = await createUser(testUser)
        userId = createdUser.id as number
        delete createdUser.id // * remove id from created user
        createdUser.password = createdUser.password?.trim() // * trim password to (char whitespace)
        expect(createdUser).toEqual(testUser)
    })

    it('Should get user by id', async () => {
        const user = await getUserById(userId)
        expect(user.id as number).toEqual(userId)
    })

    it('Should get all users', async () => {
        const users = await getAllUsers()
        expect(users.length).toBeGreaterThan(0)
    })
})
