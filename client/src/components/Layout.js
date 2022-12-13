import React from "react";
import "./styles/Layout.css";

const Layout = ({children}) => {
    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-light p-0"
                style={{
                    backgroundColor: "#275fb3",
                    position: "fixed",
                    width: "100%",
                    zIndex: 99999,
                }}
            >
                <div className="container-fluid">
                    <div
                        className="navbar-brand"
                        style={{color: "#d5d2d2", fontWeight: "600"}}
                    >
                        SISEP
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className="nav-link navItem">
                                    <Link className="linkItem" to="/Entrevista">
                                        Mis entrevistas
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link navItem">Mis detalles</div>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
};

export default Layout;
