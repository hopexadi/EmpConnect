import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';
import '../App.css';

function AddEmployee({
    showModal, setShowModal, fetchEmployees, employeeObj
}) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj);
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode
                ? await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);

            notify(message, success ? 'success' : 'error');

            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employee', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    return (
        <div
            className={`custom-modal ${showModal ? 'd-block' : ''}`}
            tabIndex="-1"
            role="dialog"
        >
            <div className="custom-modal-dialog" role="document">
                <div className="custom-modal-content">
                    <div className="custom-modal-header">
                        <h5 className="custom-modal-title">
                            {updateMode ? 'Update Employee' : 'Add Employee'}
                        </h5>
                        <button
                            type="button"
                            className="custom-btn-close"
                            onClick={handleModalClose}
                        >
                            ×
                        </button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}>
                            {[ 
                                { label: 'Name', type: 'text', name: 'name' },
                                { label: 'Email', type: 'email', name: 'email' },
                                { label: 'Phone', type: 'text', name: 'phone' },
                                { label: 'Department', type: 'text', name: 'department' },
                                { label: 'Salary', type: 'text', name: 'salary' },
                            ].map((field, idx) => (
                                <div className="mb-3" key={idx}>
                                    <label className="custom-label">{field.label}</label>
                                    <input
                                        type={field.type}
                                        className="custom-input"
                                        name={field.name}
                                        value={employee[field.name]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}

                            <div className="mb-3">
                                <label className="custom-label">Profile Image</label>
                                <input
                                    type="file"
                                    className="custom-input"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <button type="submit" className="custom-btn">
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
