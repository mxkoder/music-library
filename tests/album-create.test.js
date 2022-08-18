const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
    let db;
    beforeEach(async () => (db = await getDb()));

    afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.end();
    });

    describe('/artist/:artistId/album', () => {
        
        describe('POST', () => {
            //to create a new album associated to an artist. 
            it('creates a new album in the database if the artist already exists', async () => {
                const [ artist ] = await db.query(
                    `INSERT INTO Artist (name, genre)
                    VALUES (?, ?)`, [
                        'Tame Impala',
                        'rock',
                    ]);
                    
                // console.log('===>')
                // console.log(artist.insertId);

                const res = await request(app).post(`/artist/${artist.insertId}/album`).send({
                    name: 'Innerspeaker',
                    year: 2010,
                });

                expect(res.status).to.equal(201);

                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE artistId = ${artist.insertId}`
                );
                // console.log('album entries');
                // console.log(albumEntries);

                expect(albumEntries.name).to.equal('Innerspeaker');
                expect(albumEntries.year).to.equal(2010);
            });

            //You will need to make sure there is an artist in your database before you try and create an album.
            // it('returns 404 if there is no artist id associated with the album', async () => {
            //     const res = await request(app).post('/artist/999999/album').send({
            //         name: 'Album with no artist',
            //         year: 1990,
            //     });

            //     expect(res.status).to.equal(404);
            // });
        });

        describe('/album',() => {
            // test to check if album path in app is working as expected
            it('receives back a status code from /album', async () => {
                const res = await request(app).get('/album')

                expect(res.status).to.equal(200);
            })
        })
    });
});