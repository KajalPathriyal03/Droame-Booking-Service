import { Router } from "express"
import {
  getCustomerDetails,
  addCustomerBooking,
  deleteCustomerBooking,
  viewCustomerBooking,
  editCustomerBooking,
} from "../controllers/dashboardControllers.js"

const router = Router()

router.route("/:email").get(getCustomerDetails).post(addCustomerBooking)
router
  .route("/:email/booking/:bookingId")
  .get(viewCustomerBooking)
  .put(editCustomerBooking)
  .delete(deleteCustomerBooking)

export default router
