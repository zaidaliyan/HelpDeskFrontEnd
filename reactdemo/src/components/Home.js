import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
    return (
        <>
        <Header/>
        <div className="container-fluid">
            <main className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Ticket Management</h5>
                                    <p className="card-text">Manage support tickets: create, view, update, and close tickets.</p>
                                    <Link to="/tickets" className="btn btn-primary">Go to Tickets</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Knowledge Base</h5>
                                    <p className="card-text">Access articles and FAQs to resolve common issues independently.</p>
                                    <Link to="/knowledge-base" className="btn btn-primary">Go to Knowledge Base</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Live Chat Support</h5>
                                    <p className="card-text">Engage in real-time chat with support agents.</p>
                                    <Link to="/live-chat" className="btn btn-primary">Start Live Chat</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Analytics</h5>
                                    <p className="card-text">View statistics and reports on support performance.</p>
                                    <Link to="/analytics" className="btn btn-primary">View Analytics</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Settings</h5>
                                    <p className="card-text">Configure your account settings and preferences.</p>
                                    {/* <Link to="/settings" className="btn btn-primary">Go to Settings</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <Footer/>
    </>
    );
};

export default Home;
