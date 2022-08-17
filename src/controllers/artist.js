const getDb = require('../services/db');

exports.create = async(req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;

    try {
        await db.query(
            `INSERT INTO Artist (name, genre)
            VALUES (?, ?)`, [
                name,
                genre,
            ]);
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500).json(err);
    }
    db.end();
};

exports.read = async (_, res) => {
    const db = await getDb();

    try {
        const [artists] = await db.query('SELECT * FROM Artist');

        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json(err);
    }
    db.end();
};

exports.readById = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

    const [[selectedArtist]] = await db.query(
        'SELECT * FROM Artist WHERE id = ?', [ artistId, ]
        );

    if(!selectedArtist) {
        res.sendStatus(404);
    } else {
        res.status(200).json(selectedArtist);
    }

    db.end();
};

exports.updateArtist = async (req, res) => {
    const db = await getDb();
    const data = req.body;
    const { artistId } = req.params;

    try {

        const [
            { affectedRows },
        ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);

        if (!affectedRows) {
        res.sendStatus(404);
        } else {
        res.sendStatus(200);
        }
    } catch (err) {
        res.sendStatus(500);
    }

    db.end();
};

exports.deleteArtist = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

    try {
        const [[artistToDelete]] = await db.query(
            'SELECT * FROM Artist WHERE id = ?', [ artistId, ]
            );

        if (!artistToDelete) {
        res.sendStatus(404);
        } else {
            await db.query('DELETE FROM Artist WHERE id = ?', [artistId]);
            res.sendStatus(200);
        }
    } catch (err) {
        res.sendStatus(500);
    }

    db.end();
};

