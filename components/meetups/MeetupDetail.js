import classes from './MeetupDetail.module.css';
export default function MeetupDetails(props) {
    return (
        <section className={classes.detail}>
            <img alt={props.alt} src={props.src} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}