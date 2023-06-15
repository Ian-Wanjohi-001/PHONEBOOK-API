import {Router} from "express"
import { assignGroup, deleteContact, getContact, getContacts, newContact, updateContact } from "../controllers/controllers.js"

export const contactRouter = Router()


contactRouter.get("/",getContacts)
contactRouter.get("/:id",getContact)
contactRouter.post("/new", newContact)
contactRouter.put("/:id/update", updateContact)
contactRouter.delete("/:id/delete", deleteContact)
contactRouter.patch("/:contactid/assigngroup/:groupname", assignGroup)


