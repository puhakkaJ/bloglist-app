const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')


commentsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.body=== undefined && body.post === undefined) {
    return response.status(400).send({ error: error.message })
  }

  const post = await Blog.findById(body.id)

  const comment = new Comment({
    body: body.body,
    post: request.params.id
  })

  const savedComment = await comment.save()

  post.comments = post.comments.concat(savedComment)
  await post.save()

  response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter