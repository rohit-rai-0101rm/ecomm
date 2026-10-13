import React from 'react';
import { OFFLINE_MESSAGE } from '../../utils/errors';
import { EmptyState } from '../EmptyState';

interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  const offline = message === OFFLINE_MESSAGE;
  return (
    <EmptyState
      icon={offline ? 'cloud-offline-outline' : 'alert-circle-outline'}
      title={offline ? 'You are offline' : 'Oops! Something went wrong'}
      message={message}
      actionLabel="Retry"
      onAction={onRetry}
    />
  );
}
