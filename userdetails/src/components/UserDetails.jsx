import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Tab, Tabs } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import CardView from "./CardView";
import TableView from "./TableView";
import "../App.css";
import Pagination from "./Pagination"
import Form from "react-bootstrap/Form";
import Navbar from "./Navbar";
import Spinner from "react-bootstrap/Spinner";
import { useData } from "./DataContext";



export default function CardList({ setIsAuthenticated }) {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [view, setView] = useState("card");
    const [page, setPage] = useState(1);
    const [cardPerPage, setCardPerPage] = useState(3);
    const [fade, setFade] = useState(true);
    // const call = useRef(false);


    const { data, loading } = useData();
    // useEffect(() => {
    //     if (call.current) return;
    //     call.current = true;
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(res => res.json())
    //         .then(data => {
    //             setData(data)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setLoading(false)
    //         });
    // })

    const toggleSort = (key) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }
    };

    const handleSelect = (k) => {
        setFade(false);
        setTimeout(() => {
            setView(k);
            setFade(true);
            setSortKey(null);
            setSortDirection("asc");
            setPage(1);
            setCardPerPage(3);
        }, 200);
    };

    const filteredData = data.filter(item =>
        (item.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
        (item.company?.name && item.company.name.toLowerCase().includes(search.toLowerCase()))
    );



    const getValue = (obj, key) => {
        if (key === "company") return obj.company?.name ?? "";
        return obj[key] ?? "";
    };

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortKey) return 0;
        const aValue = String(getValue(a, sortKey));
        const bValue = String(getValue(b, sortKey));
        return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });

    const getArrow = (key) => {
        if (sortKey !== key) return "↕";
        return sortDirection === "asc" ? "▲" : "▼";
    };

    const startIndex = (page - 1) * cardPerPage;
    const endIndex = startIndex + cardPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    return (
        <>
                <Navbar setIsAuthenticated={setIsAuthenticated} />
                <div className="container-fluid">
                    <div className={`d-flex justify-content-end mt-3   ${view === "card" ? "me-4" : "me-2"}`}>
                        <Tabs
                            activeKey={view}
                            onSelect={handleSelect}
                            className="mb-0"
                            variant="pills"
                        >
                            <Tab
                                eventKey="card"
                                title={
                                    <span>
                                        <i className="bi bi-card-text me-1"></i> Card
                                    </span>
                                }
                            />
                            <Tab
                                eventKey="table"
                                title={
                                    <span>
                                        <i className="bi bi-table me-1"></i> Table
                                    </span>
                                }
                            />
                        </Tabs>
                    </div>

                    <div className="DropdownCtn">
                        {view === "card" && (
                            <Dropdown show={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)} className="m-4">
                                <Dropdown.Toggle onClick={() => setDropdownOpen(!dropdownOpen)} variant="primary">
                                    Sort Options
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ minWidth: "200px" }}>
                                    {["name", "email", "company"].map((key) => (
                                        <Dropdown.Item
                                            as="div"   // prevent automatic close
                                            key={key}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                            <Button
                                                title="Click to sort"
                                                size="sm"
                                                variant="outline-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();   // prevent closing dropdown
                                                    toggleSort(key);
                                                }}
                                            >
                                                {getArrow(key)}
                                            </Button>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>

                            </Dropdown >
                        )}
                        <span className="inputBox">
                            <label className="m-2"></label>
                            <input type="text"
                                value={search}
                                placeholder="Search here...."
                                onInput={(e) => setSearch(e.target.value)} />
                        </span>
                    </div>


                    <div className={`view-container ${fade ? "fade-in" : "fade-out"}`}>
                        {loading ? (
                            <div className="loading-container">
                                <Spinner animation="border" variant="light" />
                            </div>
                        ) :
                            sortedData.length > 0 ? (
                                view === "card" ? (
                                    <CardView data={currentData} navigate={navigate} />
                                ) : (
                                    <TableView
                                        data={currentData}
                                        sortKey={sortKey}
                                        sortDirection={sortDirection}
                                        toggleSort={toggleSort}
                                        navigate={navigate}
                                    />
                                )
                            ) : (
                                <div className="text-center w-100 my-5">
                                    <h4 style={{ color: "red", fontSize: "24px" }}>No data found</h4>
                                </div>
                            )}
                    </div>


                    {sortedData.length > 0 && (
                        <div className=" paginationCtn">

                            <Form.Select
                                style={{
                                    maxWidth: "100px",
                                    zIndex: "2"
                                }}
                                value={cardPerPage}
                                onChange={(e) => {
                                    setCardPerPage(Number(e.target.value));
                                    setPage(1);
                                }}
                            >
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={10}>All</option>
                            </Form.Select>

                            <div className=" pagesToShow" >
                                <Pagination
                                    total={sortedData.length}
                                    cardPerPage={cardPerPage}
                                    page={page}
                                    setPage={setPage}
                                />
                            </div>
                        </div>
                    )}
                </div >
        </>
    )
}