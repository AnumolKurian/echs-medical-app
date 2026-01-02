import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CmpLogin.css';

function CmpLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate(); 

    const checklogin = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", formData.username);
        data.append("password", formData.password);

        fetch('http://localhost/echs_app/check_login.php', {
            method: "POST",
            body: data,
        })
        .then((result) => result.json())
        .then((data) => {
            if (data.Status === "true") {
                if (data.Role === "admin") {
                    alert("Successfully logged in to admin panel!");
                    navigate(`/admin?username=${formData.username}`); // Fix: Use quotes for path
                } else {
                    alert("Successfully logged in!");
                    navigate(`/user?username=${formData.username}`); // Fix: Use quotes for path
                }
            } else {
                alert(data.Message);
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <link 
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
                rel="stylesheet" 
                integrity="sha384-5Ql58MgsaY1Z6wl+F21OwyOtvGhmf4/H/TLO1pE7ME89czDi8UYAYsG0NPFq7TfF" 
                crossOrigin="anonymous" 
            />
            
            {/* Background Image applied to the body */}
            <div 
                style={{
                    backgroundImage: 'url("https://example.com/background.jpg")', // Replace with your image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh', // Full viewport height
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div className="card shadow-lg p-4" style={{ width: "400px", padding: "20px" }}>
                    <form onSubmit={checklogin}>
                        <h2 className="text-center mb-4">Login</h2>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                className="form-control" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CmpLogin;
