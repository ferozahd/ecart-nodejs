import type { Request, Response, NextFunction } from "express";
import Item from "../entities/item";

/** DTO for create/update */
type ItemBody = {
  name: string;
  description: string;
};

/** Create */
export const createItem = async (
  req: Request<{}, {}, ItemBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;

    const newItem = await Item.create({ name, description });
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

/** Read */
export const getItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

/** Update */
export const updateItem = async (
  req: Request<{ id: string }, {}, ItemBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!updatedItem) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

/** Delete */
export const deleteItem = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
