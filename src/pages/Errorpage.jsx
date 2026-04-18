import '../App.css'
export default function Errorpage() {
    return (
        <div>
            <h1>404 Not Found</h1>
            <button className='counter' onClick={() => window.location.href = '/'}>Go Home</button>
        </div>
    );
}