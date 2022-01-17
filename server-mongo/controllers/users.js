const express = require('express');
const router = express.Router();

const User = require('../models/User');

async function getAll(req, res) {
   try {
      const users = await User.all
      res.json({ entries: users })
   } catch (err) {
      res.status(500).send({ err })
   }
}

// router.get('/', async (req, res) => {
//    try {
//       const users = await User.all
//       res.json({ entries: users })
//    } catch (err) {
//       res.status(500).send({ err })
//    }
// })

async function findByName(req, res) {
   try {
      const user = await User.findByName(req.params.name)
      user ? res.json({ user: user }) : res.status(404).send('User not found')
   } catch (err) {
      res.status(500).send({ err })
   }
}

// router.get('/:name', async (req, res) => {
//    try {
//       const user = await User.findByName(req.params.name)
//       user ? res.json({ user: user }) : res.status(404).send('User not found')
//    } catch (err) {
//       res.status(500).send({ err })
//    }
// })

async function upsert(req, res) {
   try {
      //await User.upsert(req.body.entries)
      res.status(201)
   } catch (err) {
      res.status(500).send({ err })
   }
}

async function deleteByName(req, res) {
   try {
      await User.delete(req.params.name)
      user ? res.status(204) : res.status(404).send('User does not exist')
   } catch (err) {
      res.status(500).send({ err })
   }
}

module.exports = { getAll, findByName, deleteByName, upsert }