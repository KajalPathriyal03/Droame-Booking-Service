import asyncHandler from "express-async-handler"
import Customer from "../models/customerModel.js"

// @desc   Add new customer
// @route  POST /api/customer
// @access Private
const addCustomer = asyncHandler(async (req, res) => {
  const { phoneNumber: registeredNumber, email, name, gender, age } = req.body

  const emailExists = await Customer.findOne({ email })

  if (emailExists) {
    res.status(400)
    res.json({ message: "Email already exists" })
    return
  }

  const customer = new Customer({
    email,
    name,
    gender,
    age,
    registeredNumber,
  })

  await customer.save()

  res.status(201)
  res.json(customer)
})

// @desc   Edit customer
// @route  POST /api/customer/:email
// @access Private
const editCustomer = asyncHandler(async (req, res) => {
  const { name, gender, age } = req.body

  const customer = await Customer.findOne({ email: req.params.email })

  if (customer) {
    customer.name = name
    customer.gender = gender
    customer.age = age

    const updatedCustomer = await customer.save()
    res.json(updatedCustomer)
  } else {
    res.status(404)
    res.json("Customer not found")
  }
})

// @desc   Fetch customer details
// @route  GET /api/customer/:email
// @access Private
const getCustomerDetails = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({ email: req.params.email })

  if (customer) {
    res.json(customer)
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
})
export { addCustomer, editCustomer, getCustomerDetails }
