import { useRouter } from "next/router";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetails({ meetup }) {
    const router = useRouter();
    const pageID = router.query.meetupId;
    return (
        <>
            <Head>
                <title>{meetup.title}</title>
                <meta name="description" content={meetup.description} />
            </Head>
            <MeetupDetail alt="Meetup" src={meetup.image} title={meetup.title} address={meetup.address} description={meetup.description} />
        </>
    )
}


export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://malvavivek:OWMbcOTlnrgHPqy0@cluster0.9oads9c.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    // console.log(meetup)

    client.close();
    return {
        props: {
            meetup: {
                id: meetup._id.toString(),
                image: meetup.image,
                title: meetup.title,
                address: meetup.address,
                description: meetup.description
            }
        }
    }
}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://malvavivek:OWMbcOTlnrgHPqy0@cluster0.9oads9c.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() }
        }))
    }
}