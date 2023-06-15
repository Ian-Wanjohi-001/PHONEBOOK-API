import { dbConfig } from "../config/config.js";
import sql from "mssql";

export const getContacts = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const query = "SELECT * FROM contacts";
    const contacts = await connection.request().query(query);
    res.json(contacts.recordset);
  } catch (error) {
    res.json(error);
  } finally {
    sql.close();
  }
};

export const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM contacts WHERE id = @id";
    const connection = await sql.connect(dbConfig);
    const user = await connection
      .request()
      .input("id", sql.Int, id)
      .query(query);
    res.json(user.recordset);
  } catch (error) {
    res.json(error);
  } finally {
    sql.close();
  }
};

export const newContact = async (req, res) => {
  try {
    const { fullname, mobilenumber, homeaddress, worknumber, email, groupid } =
      req.body;
    const query =
      "INSERT INTO contacts (fullname, mobilenumber, worknumber, homeaddress, email) VALUES (@fullname, @mobilenumber, @worknumber, @homeaddress, @email)";
    const connection = await sql.connect(dbConfig);
    await connection
      .request()
      .input("fullname", sql.VarChar, fullname)
      .input("mobilenumber", sql.VarChar, mobilenumber)
      .input("worknumber", sql.VarChar, worknumber)
      .input("homeaddress", sql.VarChar, homeaddress)
      .input("email", sql.VarChar, email)
      .query(query);
    res.json({ message: "Contact created successfully" });
  } catch (error) {
    res.json(error.message);
  } finally {
    sql.close();
  }
};

export const updateContact = async (req, res) => {
  try {
    const { fullname, mobilenumber, homeaddress, worknumber, email, groupid } =
      req.body;
      const {id} = req.params
    const query =
      "UPDATE contacts SET fullname = @fullname,mobilenumber = @mobilenumber, worknumber = @worknumber,homeaddress = @homeaddress, email= @email,groupid = @groupid WHERE id = @id";
    const connection = await sql.connect(dbConfig);
    await connection
      .request()
      .input("id", sql.Int, id)
      .input("fullname", sql.VarChar, fullname)
      .input("mobilenumber", sql.VarChar, mobilenumber)
      .input("worknumber", sql.VarChar, worknumber)
      .input("homeaddress", sql.VarChar, homeaddress)
      .input("email", sql.VarChar, email)
      .input("groupid", sql.VarChar, groupid)
      .query(query);
    res.json({ message: "Contact updated successfully" });
  } catch (error) {
    res.json(error.message);
  } finally {
    sql.close();
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM contacts WHERE id = @id";
    const connection = await sql.connect(dbConfig);
    await connection.request().input("id", sql.Int, id).query(query);
    res.json({ message: "Contact  deleted succucessfully" });
  } catch (error) {
    res.json(error.message);
  } finally {
    sql.close();
  }
};

export const assignGroup = async (req, res) => {
  try {
    const { contactid, groupname } = req.params;

    const groupsQuery =
      "SELECT groupid FROM groups WHERE groupname = @groupname";
    const connection = await sql.connect(dbConfig);
    const results = await connection
      .request()
      .input("groupname", sql.VarChar, groupname)
      .query(groupsQuery);
    const groupid = results.recordset[0].groupid;
    const contactsQuery =
      "UPDATE contacts SET groupid = @groupid WHERE id = @contactid";
    await connection
      .request()
      .input("contactid", sql.Int, contactid)
      .input("groupid", sql.Int, groupid)
      .query(contactsQuery);
    res.json({ message: "Assigned succussessfully" });
  } catch (error) {
    res.json(error.message);
  }
};
