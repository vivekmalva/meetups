import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';
import { MongoClient } from "mongodb";
const DUMMY_MEETUPS = [{
    id: 'm1',
    title: 'First Meetup',
    image: 'https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/08/20201008-199WaterSt-2_v1-scaled.jpg',
    address: 'Place for first meetup'
},
{
    id: 'm2',
    title: 'Second Meetup',
    image: 'https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/08/20201008-199WaterSt-2_v1-scaled.jpg',
    address: 'Place for Second meetup'
}]

const Homepage = (props) => {
    return (<>
        <Head>
            <title>Meetups</title>
            <meta name="description" content="List of Meetups" />
        </Head>
        <MeetupList meetups={props.meetups} /></>
    )
}
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://malvavivek:OWMbcOTlnrgHPqy0@cluster0.9oads9c.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10 // no. of seconds later this page will be regenerated
    }
}
export default Homepage;