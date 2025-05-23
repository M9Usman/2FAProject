// ---------- server.ts ----------
// In server.ts
import app from './app';
import prisma from './config/database';
import { startCleanupJob } from './utils/cleanupJob';

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Start the cleanup job for expired OTPs
  startCleanupJob();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0);
  });
});
