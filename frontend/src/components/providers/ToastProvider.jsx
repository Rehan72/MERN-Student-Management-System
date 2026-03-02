import { Toaster } from 'sonner';

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster 
        position="top-center" 
        theme="system"
        toastOptions={{
          className: 'cinematic-toast',
          style: {
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          },
        }}
        closeButton
      />
    </>
  );
}
