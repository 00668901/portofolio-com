import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

let app: App;

/**
 * Initializes the Firebase Admin SDK for server-side operations.
 * It uses a service account for authentication, which is required for
 * server environments like Next.js Server Actions.
 *
 * This function is idempotent, meaning it will only initialize the app once.
 */
export async function initializeServerFirebase() {
  if (getApps().length > 0) {
    app = getApps()[0];
  } else {
    // Retrieve the service account credentials from environment variables
    const serviceAccountString = process.env.FIREBASE_ADMIN_CONFIG;

    if (!serviceAccountString) {
      throw new Error(
        'FIREBASE_ADMIN_CONFIG environment variable is not set. Please add it to your .env.local file.'
      );
    }

    try {
      const serviceAccount = JSON.parse(serviceAccountString);
      app = initializeApp({
        credential: cert(serviceAccount),
        projectId: firebaseConfig.projectId,
      });
    } catch (e: any) {
        console.error("Failed to parse FIREBASE_ADMIN_CONFIG. Make sure it's a valid JSON string.", e);
        throw new Error("Server Firebase initialization failed.");
    }
  }

  const firestore = getFirestore(app);

  return { firestore, app };
}
