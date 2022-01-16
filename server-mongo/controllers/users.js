const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
   try {
      const users = await User.all
      res.json({ entries: users })
   } catch (err) {
      res.status(500).send({ err })
   }
})

router.get('/:user', async (req, res) => {
   try {
      const user = await User.findByUser(req.params.user)
      res.json({ user: user })
   } catch (err) {
      res.status(500).send({ err })
   }
})

router.post('/upsert', async (req, res) => {
   try {
      await User.upsert(req.body.entries)
      res.status(201)
   } catch (err) {
      res.status(500).send({ err })
   }
})

router.delete('/:user', async (req, res) => {
   try {
      await User.delete(req.params.user)
      res.status(201)
   } catch (err) {
      res.status(500).send({ err })
   }
})

module.exports = router