// Import the createNextRouteHandler function from the "uploadthing/next" library
import { createNextRouteHandler } from "uploadthing/next";

// Import the ourFileRouter from the "./core" module
import { ourFileRouter } from "./core";

// Export routes for Next App Router using createNextRouteHandler
export const { GET, POST } = createNextRouteHandler({
  // Use ourFileRouter as the router for handling routes
  router: ourFileRouter,
});
