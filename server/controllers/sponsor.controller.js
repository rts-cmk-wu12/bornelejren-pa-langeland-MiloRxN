import Sponsor from '../models/sponsor.model.js'

export const getSponsors = async (req, res) => {
    const sponsors = await Sponsor.find()
    res.json(sponsors)
}

export const getSponsor = async (req, res) => {
    const sponsor = await Sponsor.findById(req.params.id)
    res.json(sponsor)
}

export const createSponsor = async (req, res) => {
    const newSponsor = await Sponsor.create(req.body)
    res.status(201).json(newSponsor)
}

export const updateSponsor = async (req, res) => {
    const updatedSponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedSponsor)
}

export const deleteSponsor = async (req, res) => {
    await Sponsor.findByIdAndDelete(req.params.id)
    res.json({ message: 'Sponsor deleted' })
}