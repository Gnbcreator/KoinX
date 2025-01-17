export default function dateTimestampFormater(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', {
        "month": 'long',
        "day": '2-digit',
        "year": 'numeric'
    });

}
