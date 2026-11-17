import {
  Order as PrismaOrder,
  Item,
  Products,
  User,
  OrderNote,
} from "@prisma/client";

export type Order = PrismaOrder & {
  items: (Item & {
    product?: Products | null;
  })[];
};

export type OrderWithUser = Order & {
  user: User;
};

export type OrderWithNotes = Order & {
  OrderNote: (OrderNote & {
    user: Pick<User, "id" | "name"> | null;
  })[];
};

export type OrderNoteType = OrderNote & {
  user: Pick<User, "id" | "name"> | null;
};

export type ItemWithRelations = Item & {
  product?: Products | null;
};
