import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../../database/mongooseDatabase";
import { User } from "../../models/usermodel";

export async function getEmployee(req: Request, res: Response) {
  try {
    const employees = await collections?.employees?.find({}).toArray();
    res.status(200).send(employees);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getEmployeeById(req: Request, res: Response) {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const employee = await collections?.employees?.findOne(query);

    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
  }
}

export async function createEmployee(req: Request, res: Response) {
  try {
    const employee = req.body;
    const ops = await User.create({
      email: "123123",
      firstName: "123",
      lastName: "123",
      city: {
        coordinates: [0, 0],
      },
    });
    console.log(ops);
    console.log(ops._id);

    const result = await collections?.employees?.insertOne(employee);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new employee: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new employee.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function updateEmployee(req: Request, res: Response) {
  try {
    const id = req?.params?.id;
    const employee = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.employees?.updateOne(query, {
      $set: employee,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.employees?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an employee: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
}
