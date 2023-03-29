import asyncHandler from "express-async-handler"
import Customer from "../models/customerModel.js"

// @desc   Fetch customer details
// @route  GET /api/dashboard/:email
// @access Private
const getCustomerDetails = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({
    email: req.params.email,
  })

  if (customer) {
    res.json(customer)
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
})

// @desc   Add new customer booking
// @route  POST /api/dashboard/:email
// @access Private
const addCustomerBooking = asyncHandler(async (req, res) => {
  const { location_id, drone_shot_id, date } = req.body

  const customer = await Customer.findOne({
    email: req.params.email,
  })

  if (customer) {
    const bookingData = {
      location_id,
      drone_shot_id,
      date,
    }

    await customer.bookings.push(bookingData)

    await customer.save()

    res.status(201).json({ message: "Booking Created successfully" })
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
})

// @desc    Delete customer booking
// @route   DELETE /api/dashboard/:email/booking/:bookingId
// @access  Private
const deleteCustomerBooking = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({
    email: req.params.email,
  })

  if (customer) {
    let updatedBookingsArr = []
    customer.bookings.forEach((booking) => {
      if (!booking._id.equals(req.params.bookingId)) {
        updatedBookingsArr.push(booking)
      }
    })

    if (updatedBookingsArr.length === customer.bookings.length) {
      res.status(404)
      throw new Error("Booking not found")
    }

    customer.bookings = updatedBookingsArr
    await customer.save()

    res.json({ message: "Booking removed successfully" })
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
})

// @desc    View customer booking
// @route   GET /api/dashboard/:email/booking/:bookingId
// @access  Private
const viewCustomerBooking = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({
    email: req.params.email,
  })

  if (customer) {
    let foundBooking
    customer.bookings.forEach((booking) => {
      if (booking._id.equals(req.params.bookingId)) {
        foundBooking = booking
      }
    })

    if (!foundBooking) {
      res.status(404)
      throw new Error("Booking not found")
    }

    res.json(foundBooking)
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
})

// @desc    Edit customer booking
// @route   PUT /api/dashboard/:email/booking/:bookingId
// @access  Private
const editCustomerBooking = asyncHandler(async (req, res) => {
  const { location_id, drone_shot_id, date } = req.body

  const customer = await Customer.findOne({
    email: req.params.email,
  })

  if (customer) {
    let isBookingExist = false
    customer.bookings.forEach((booking) => {
      if (booking._id.equals(req.params.bookingId)) {
        isBookingExist = true
        booking.date = date
        booking.location_id = location_id
        booking.drone_shot_id = drone_shot_id
      }
    })

    if (!isBookingExist) {
      res.status(404)
      throw new Error("Booking not found")
    }

    await customer.save()

    res.json({ message: "Booking updated successfully" })
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
})

export {
  getCustomerDetails,
  addCustomerBooking,
  deleteCustomerBooking,
  viewCustomerBooking,
  editCustomerBooking,
}
