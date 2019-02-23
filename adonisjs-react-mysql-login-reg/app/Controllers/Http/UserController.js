'use strict'

const User = use('App/Models/User')

class UserController {
    async login ({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password'])

        const token = await auth.attempt(email, password)
        return response.json(token)
    }

    async register ({ request, response }) {
        const { first_name, last_name, email, password } = request.only([
            'first_name',
            'last_name',
            'email',
            'password'
        ])

        await User.create({
            first_name,
            last_name,
            email,
            password
        })
        return response.send({ message: 'User has been created' })
    }

    async show ({ params, response }) {
        const user = await User.find(params.id)
        const res = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        return response.json(res)
    }
}

module.exports = UserController
