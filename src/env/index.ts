import { envKeyIsInvalidOrMissing } from "./helpers";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || envKeyIsInvalidOrMissing('VITE_BACKEND_URL');
