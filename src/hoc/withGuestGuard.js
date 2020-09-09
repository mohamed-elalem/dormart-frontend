import React from 'react';
import GuestGuard from './GuestGuard';
export default (WrappedComponent) => {
  return () => (
    <GuestGuard>
      <WrappedComponent />
    </GuestGuard>
  )
};