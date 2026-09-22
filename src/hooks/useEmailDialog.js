import { createContext, useContext } from 'react';

export const EmailContext = createContext(() => {});

/** Returns a click handler that opens the email options instead of a bare mailto. */
export default function useEmailDialog() {
  return useContext(EmailContext);
}
