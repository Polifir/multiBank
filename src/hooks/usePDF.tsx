import { useMutation } from '@tanstack/react-query';

const exportToPdf = async (): Promise<Blob> => {
  const response = await fetch('http://localhost:8080/api/v1/transactions/export/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка экспорта: ${response.status} - ${errorText}`);
  }

  return response.blob();
};

export const useExportPdf = () => {
  return useMutation({
    mutationFn: exportToPdf,
    onError: (error: Error) => {
      console.error('PDF export error:', error.message);
    },
  });
};