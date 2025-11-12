import axios from "axios"
import 'remixicon/fonts/remixicon.css'
import { useEffect, useState } from "react"

const GalleryProject = () => {
    const [Userdata, setUserdata] = useState([])
    const [page, setPage] = useState(6)

    const getData = async () => {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=15`)
        setUserdata(response.data)
        console.log(response.data);
    }

    useEffect(() => {
        document.title = "Gallery Project | Axios"
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    let printUserData = <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">Loading...</h3>;

    if (Userdata.length > 0) {
        printUserData = Userdata.map((user, idx) => {
            return (
                <div key={idx} className="p-4 m-4 rounded-2xl bg-white shadow-lg hover:scale-105 transition-transform duration-700 hover:bg-gray-500">
                    <img src={user.download_url} alt={user.author} className="w-full h-64 object-cover mb-2" />
                    <h2 className="text-lg font-bold italic text-center">{user.author}</h2>
                    {/* <p>ID: {user.id}</p>
                    <p>Width: {user.width}</p>
                    <p>Height: {user.height}</p> */}
                </div>
            )
        })
    }

    return (
        <div className="p-8 bg-gray-200 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Gallery Project using Axios</h1>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-2 text-md space-x-4">
                <button
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                        }
                    }}
                    className="p-3 bg-gray-500 font-semibold text-white rounded-lg cursor-pointer hover:bg-gray-400 hover:scale-105 transition-transform duration-300
                disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-gray-500" disabled={page === 1}>
                    <i class="ri-arrow-left-line"></i>
                    Prev</button>
                <div className="p-3 bg-amber-400 rounded-lg font-semibold text-gray-800">Page {page}</div>
                <button
                    onClick={() => {
                        setPage(page + 1);
                    }}
                    className="p-3 bg-gray-500 font-semibold text-white rounded-lg cursor-pointer hover:bg-gray-400 hover:scale-105 transition-transform duration-300">Next
                    <i class="ri-arrow-right-line"></i></button>
            </div>


            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {printUserData}
            </div>

        </div>
    )
}
export default GalleryProject
