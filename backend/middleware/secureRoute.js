const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')


function secureRoute(req, res, next){

  const authToken = req.headers.authorization
  
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unathorized' })
  }

  const token = authToken.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).send({ message: 'Unathorized' })

    const userId = payload.sub
    
    User 
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unathorized' })

        req.currentUser = user

        next()
      })

      .catch(() => res.status(401).send({ message: 'Unathorized' }))

  })

  console.log('In my secure route!')

}

module.exports = secureRoute