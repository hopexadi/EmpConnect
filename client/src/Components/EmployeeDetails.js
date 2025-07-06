import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetEmployeeDetailsById } from '../api';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const data = await GetEmployeeDetailsById(id);
                setEmployee(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch employee details');
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [id]);

    if (loading)
        return <div className="text-center mt-5 text-light">Loading...</div>;

    if (error)
        return <div className="text-danger mt-5 text-center">{error}</div>;

    if (!employee)
        return <div className="text-center mt-5 text-light">Employee not found</div>;

    return (
        <div className="employee-details-page py-5 text-light">
            <div className="container">
                <div className="employee-card card-custom shadow">
                    <div className="card-header-custom">
                        <h2 className="mb-0">Employee Details</h2>
                    </div>

                    <div className="card-body-custom">
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <img
                                    src={employee.profileImage || 'https://via.placeholder.com/150'}
                                    alt={employee.name || 'Profile'}
                                    className="img-fluid rounded border-dark"
                                />
                            </div>
                            <div className="col-md-9">
                                <h4 className="text-purple mb-3">{employee.name}</h4>
                                <p><strong className="text-purple">Email:</strong> {employee.email}</p>
                                <p><strong className="text-purple">Phone:</strong> {employee.phone}</p>
                                <p><strong className="text-purple">Department:</strong> {employee.department}</p>
                                <p><strong className="text-purple">Salary:</strong> ₹{employee.salary}</p>
                            </div>
                        </div>
                        <button className="custom-btn" onClick={() => navigate('/employee')}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
