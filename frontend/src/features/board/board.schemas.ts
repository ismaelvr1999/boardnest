import * as z from "zod";

export const DroppableTaskSchema = z.object({
    position: z.number(),
    role: z.literal("droppable-task"),
    columnId: z.string(),
    columnPosition: z.number()
});

export const DroppableColumnSchema = z.object({
    position: z.number(),
    role: z.literal("droppable-column")
});

export const DraggrableTaskSchema = z.object({
    id:z.string(),
    position: z.number(),
    role: z.literal("task"),
    columnPosition: z.number(),
    columnId: z.string()
});

export const DraggrableColumnSchema = z.object({
    id:z.string(),
    position: z.number(),
    role: z.literal("column")
});