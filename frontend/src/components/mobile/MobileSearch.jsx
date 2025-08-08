import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import axios from "axios";
import MobileBottomNavigation from "./MobileBottomNavigation.jsx";

export default function MobileSearch({ setIsCatalogOpen }) {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://test4-30.onrender.com/api/categories');
                setCategories(response.data);
            } catch (err) {
                console.error("카테고리 로딩 실패:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/products?categoryId=${categoryId}`);
    };

    return (
        <div className="p-3 bg-white fixed top-0 left-0 w-full z-30 shadow">
            <div className="flex items-center gap-3">
                {/* 검색창 */}
                <div className="flex items-center border rounded bg-gray-50 flex-grow" style={{height: 32}}>
                    <input
                        type="text"
                        placeholder="探す..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1 px-3 py-1 bg-gray-50 outline-none text-sm"
                        style={{height: 28}}
                    />
                    <button
                        className="bg-purple-600 text-white px-3 flex items-center justify-center rounded-r"
                        onClick={handleSearch}
                        aria-label="Submit search"
                        style={{height: 28, minWidth: 32}}
                    >
                        <Search size={14}/>
                    </button>
                </div>
            </div>

            {/* 검색창 바로 아래 펼쳐진 카테고리 리스트 */}
            <div className="fixed top-14 bottom-16 left-0 right-0 overflow-y-auto bg-white z-20">
                <ul className="border-t border-gray-200">
                    {/* 'すべて' 카테고리도 추가 */}
                    <li
                        onClick={() => handleCategoryClick('')}
                        className="py-2 px-4 cursor-pointer border-b hover:bg-purple-100"
                    >
                        すべて
                    </li>

                    {categories.map(category => (
                        <li
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="py-2 px-4 cursor-pointer border-b hover:bg-purple-100"
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>

            <MobileBottomNavigation setIsCatalogOpen={setIsCatalogOpen}/>
        </div>
    );
}
