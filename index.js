const express = require('express');
const app = express();

app.use(express.json()); // to read JSON body

// In-memory customer data
let customers = [
    { id: 1, name: "John", email: "john@test.com", mobile: "1234567890" },
    { id: 2, name: "David", email: "david@test.com", mobile: "9876543210" }
];

// GET - Get all customers
app.get('/customers', (req, res) => {
    res.status(200).json(customers);
});

// GET - Get customer by id
app.get('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
});

// POST - Add new customer
app.post('/customers', (req, res) => {
    const { name, email, mobile } = req.body;

    const newCustomer = {
        id: customers.length + 1,
        name,
        email,
        mobile
    };

    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

// PUT - Update customer
app.put('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, mobile } = req.body;

    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.mobile = mobile || customer.mobile;

    res.status(200).json(customer);
});

// DELETE - Remove customer
app.delete('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = customers.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Customer not found" });
    }

    const deletedCustomer = customers.splice(index, 1);
    res.status(200).json(deletedCustomer[0]);
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
