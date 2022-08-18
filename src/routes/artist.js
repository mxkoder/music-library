// import artist controller
//define a POST / route to connect to controller

const express = require('express');
const artistController = require('../controllers/artist');
const albumController = require('../controllers/album');

const router = express.Router();

router.post('/', artistController.create);
router.post('/:artistId/album', albumController.create)

router.get('/', artistController.read);
router.get('/:artistId', artistController.readById);

router.patch('/:artistId', artistController.updateArtist);

router.delete('/:artistId', artistController.deleteArtist);

module.exports = router

