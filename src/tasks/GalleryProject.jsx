import axios from "axios"
import { useState } from "react"

const GalleryProject = () => {
    const [Userdata, setUserdata] = useState([])

    const getData = async () => {
        const response = await axios.get('https://picsum.photos/v2/list?page=2&limit=10')
        setUserdata(response.data)
        console.log(response.data);
    }

    return (
        <div>
            <button
                onClick={getData}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Click me</button>
            <div>
                { }
            </div>
        </div>
    )
}

export default GalleryProject
