const getDb = require('../services/db');

exports.create =  async (req, res) => {
    //res.sendStatus(200);
    const db = await getDb();
    const { name, year } = req.body;
    const { artistId } = req.params;


    // need to check if artists is in db first

    //creating a new album
    try {
        await db.query(
            `INSERT INTO Album (name, year, artistId)
            VALUES (?, ?, ?)`, [
                name,
                year,
                artistId
            ]);
        res.sendStatus(201);
    } catch (err) {
        // if send a .json(err), risk sending SQL / backend data to public domain
        // better to console log the error and then send a status code
        console.error(err);
        res.sendStatus(500);
    }
    db.end();
};

//check to see if controller is connected to app and sending status back
exports.read = async (_, res) => {
    res.sendStatus(200);
};