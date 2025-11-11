// hooks/useExportPdf.ts
import { useMutation } from '@tanstack/react-query';

const exportToPdf = async (): Promise<Blob> => {
  const response = await fetch('/backend/api/v1/transactions/export/pdf', {
    method: 'GET', // Меняем на GET
    // headers не обязательны для GET запроса
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