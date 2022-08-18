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
                await request(app).post('/artist').send({
                    name: 'Tame Impala',
                    genre: 'rock',
                });

                const res = await request(app).post('/artist/1/album').send({
                    name: 'Innerspeaker',
                    year: 2010,
                });

                expect(res.status).to.equal(201);

                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = 'Innerspeaker'`
                );

                expect(albumEntries.name).to.equal('Innerspeaker');
                expect(albumEntries.genre).to.equal(2010);
            });

            //You will need to make sure there is an artist in your database before you try and create an album.
            it('returns an error if there is no artist associated with the album at the artist Id in the path', async () => {
                await request(app).post('/artist').send({
                    name: 'Tame Impala',
                    genre: 'rock',
                });

                const res = await request(app).post('/artist/999999/album').send({
                    name: 'Album with no artist',
                    year: 1990,
                });

                expect(res.status).to.equal(404);
            });
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