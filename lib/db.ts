/**
 * Neutralized database adapter.
 * Replaces Prisma with safe in-memory fallbacks so the app relies on Shopify
 * and no database server/connection string is required.
 */

const createMockQuery = () => {
  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      if (prop === "then") {
        return undefined;
      }
      return (..._args: any[]) => {
        return Promise.resolve([]);
      };
    },
  };
  return new Proxy({}, handler);
};

export const db: any = new Proxy(
  {},
  {
    get(_target, prop) {
      if (prop === "$connect" || prop === "$disconnect") {
        return () => Promise.resolve();
      }
      return createMockQuery();
    },
  }
);
