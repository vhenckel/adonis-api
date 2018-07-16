'use strict'

class UserController {

	static get inject() {
		return [
			'App/Model/User'
		]
	}

	constructor(User) {
		this.User = User
	}

	* index(req, res) {
		const users = yield this.User.all()
		if (users) {
			res.json({
				users
			})
		}
		res.json({
			users: {}
		})
	}

	* create(req, res) {
		const data = req.only('username', 'email', 'password')
		const user = yield this.User.create(data)
		const token = yield req.auth.generate(user)

		res.json({
			user,
			token
		})
	}

	* auth(req, res) {
		const user = this.User.find(req.param('id'))
		const token = yield req.auth.generate(user)
		res.json({
			token
		})
	}

	* admin(req, res) {
		res.json({
			msg: 'Acessou o ambiente controlado!'
		})
	}
}

module.exports = UserController