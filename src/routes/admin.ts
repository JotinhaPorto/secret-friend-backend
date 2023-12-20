import { Router } from "express";
import * as auth from '../controllers/auth'
import * as events from '../controllers/events'
import * as groups from '../controllers/groups'

const router = Router()

router.post("/login", auth.login)

router.use(auth.validate)

router.get("/events", events.getAll)
router.get("/events/:id", events.getEvent)
router.post("/events", events.addEvent)
router.patch("/events/:id", events.editEvent)
router.delete("/events/:id", events.deleteEvent)

router.get("/events/:id_event/groups", groups.getAll)
router.get("/events/:id_event/groups/:id", groups.getGroup)
router.post("/events/:id_event/groups", groups.addGroup)
router.patch("/events/:id_event/groups/:id", groups.editGroup)
router.delete("/events/:id_event/groups/:id", groups.deleteGroup)



export default router;