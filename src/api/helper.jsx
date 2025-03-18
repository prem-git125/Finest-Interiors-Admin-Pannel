export default function asset(path) {
    const baseUrl = 'http://localhost:7000/uploads/';
    return `${baseUrl}/${path}`;
}