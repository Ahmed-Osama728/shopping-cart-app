import { Alert, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = 'Something went wrong. Please try again.' }: ErrorMessageProps) {
  return (
    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
      <Text>{message}</Text>
    </Alert>
  );
}

