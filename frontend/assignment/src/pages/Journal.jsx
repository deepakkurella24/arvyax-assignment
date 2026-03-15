import { useState,useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./authSlice";

function Journal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth.user);
    const [text,setText] = useState("");
    const [ambience,setAmbience] = useState("forest");

    const [analysis,setAnalysis] = useState(null);
    const [entries,setEntries] = useState([]);
    const [insights,setInsights] = useState(null);

    useEffect(()=>{
        loadEntries();
        loadInsights();
    },[]);

    const loadEntries = async ()=>{

        const res = await API.get(`/api/journal/${user._id}`);
        setEntries(res.data);

    };

    const loadInsights = async ()=>{

        const res = await API.get(`/api/journal/insights/${user._id}`);
        setInsights(res.data);

    };

    const analyze = async ()=>{

        const res = await API.post("/api/journal/analyze",{text});
        setAnalysis(res.data);

    };

    const saveEntry = async ()=>{

        await API.post("/api/journal",{
            userId:user._id,
            ambience,
            text
        });

        setText("");
        setAnalysis(null);

        loadEntries();
        loadInsights();

    };

    const handleLogout = async ()=>{

        await API.post("/auth/logOut");
        dispatch(logout());
        navigate("/login");

    };

    return (

    <div className="p-8 bg-gray-100 min-h-screen">

        <div className="flex justify-between mb-6">

            <h1 className="text-2xl font-bold">
            Welcome {user.name}
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
            Logout
            </button>

        </div>

        <div className="bg-white p-6 rounded shadow mb-6">

            <h2 className="font-bold mb-3">Write Journal</h2>

            <select
                value={ambience}
                onChange={(e)=>setAmbience(e.target.value)}
                className="border p-2 mb-3"
            >

                <option value="forest">Forest</option>
                <option value="ocean">Ocean</option>
                <option value="mountain">Mountain</option>

            </select>

            <textarea
                className="border p-2 w-full mb-3"
                rows="3"
                value={text}
                onChange={(e)=>setText(e.target.value)}
            />

            <div className="space-x-3">

                <button
                    onClick={analyze}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                Analyze
                </button>

                <button
                    onClick={saveEntry}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                Save
                </button>

            </div>

            {analysis && (

                <div className="mt-4">

                    <p><b>Emotion:</b> {analysis.emotion}</p>
                    <p><b>Keywords:</b> {analysis.keywords?.join(", ")}</p>
                    <p><b>Summary:</b> {analysis.summary}</p>

                </div>

            )}

        </div>

        <div className="bg-white p-6 rounded shadow mb-6">

            <h2 className="font-bold mb-3">Insights</h2>

            {insights && (

                <div>

                    <p><b>Total Entries:</b> {insights.totalEntries}</p>
                    <p><b>Top Emotion:</b> {insights.topEmotion}</p>
                    <p><b>Most Used Ambience:</b> {insights.mostUsedAmbience}</p>
                    <p><b>Recent Keywords:</b> {insights.recentKeywords?.join(", ")}</p>

                </div>

            )}

        </div>

        <div>

            <h2 className="font-bold mb-3">Entries</h2>

            {entries.map((e)=>(

                <div
                    key={e._id}
                    className="bg-white p-4 mb-3 rounded shadow border-b border-black"
                >

                <p className="text-sm text-gray-500">
                <b>Ambience:</b> {e.ambience}
                </p>

                <p><b>Text:</b> {e.text}</p>

                {e.analysis && (

                    <div className="text-sm mt-2">

                        <p><b>Emotion:</b> {e.analysis.emotion}</p>
                        <p><b>Keywords:</b> {e.analysis.keywords?.join(", ")}</p>

                    </div>

                )}

                </div>

            ))}

        </div>

    </div>

    );

}

export default Journal;