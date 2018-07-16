'use strict'

class PostController {
	static get inject() {
		return [
			'App/Model/Post'
		]
	}

	constructor(Post) {
		this.Post = Post
	}

	* index(req, res) {
		console.log('Entrou no index')
		const posts = yield this.Post.all()

		res.json({
			posts
		})
	}

	* create(req, res) {
		const data = req.only('title', 'text')
		console.log("Entrou no método")
		yield this.Post.create(data)

		res.json({
			data
		})
	}

	* show(req, res) {
		const post = yield this.Post.find(req.param('id'))
		//const post = yield this.Post.query().where('id', req.param('id'))

		if (post) {
			res.json({
				post
			})
		}
		res.json({
			post: {}
		})
		return
	}

	* update(req, res) {
		const post = yield this.Post.find(req.param('id'))
		const data = request.only('title', 'text')

		post.fill(data)
		yield post.save()
		res.json({
			post
		})
	}

}

module.exports = PostController