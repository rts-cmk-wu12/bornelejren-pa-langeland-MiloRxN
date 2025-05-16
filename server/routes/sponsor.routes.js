import express from 'express'
import { getSponsors, getSponsor, createSponsor, updateSponsor, deleteSponsor } from '../controllers/sponsor.controller.js'

const router = express.Router()

router.route('/')
    .get(getSponsors)
    .post(createSponsor)

router.route('/:id')
    .get(getSponsor)
    .put(updateSponsor)
    .delete(deleteSponsor)

export default router