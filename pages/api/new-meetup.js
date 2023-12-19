// OWMbcOTlnrgHPqy0

import { MongoClient } from 'mongodb'
async function handler(req, res) {
    if (req.method === "POST") {

        const data = req.body;
        // const { title, image, address, description } = data;
        const client = await MongoClient.connect('mongodb+srv://malvavivek:OWMbcOTlnrgHPqy0@cluster0.9oads9c.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log("result", result);

        client.close();

        res.status(201).json({ message: 'Meetups inserted!' });
    }
}

export default handler;