
import { Button } from "@/components/ui/button";
import { useExportPdf } from "@/hooks/usePDF";
import { Download, Loader2 } from "lucide-react";

interface ExportPdfButtonProps {
  disabled?: boolean;
}

export const ExportPdfButton = ({ disabled = false }: ExportPdfButtonProps) => {
  const { mutate, isPending } = useExportPdf();

  const handleExport = () => {
    mutate(undefined, {
      onSuccess: (blob) => {
        // Создаем URL для скачивания
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Генерируем имя файла с текущей датой
        const date = new Date().toISOString().split('T')[0];
        link.download = `all_transactions_${date}.pdf`;
        
        // Автоматическое скачивание
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Освобождаем память
        window.URL.revokeObjectURL(url);

        // Уведомление об успехе
        alert("PDF файл со всеми транзакциями успешно скачан");
      },
      onError: (error) => {
        alert("Ошибка экспорта: " + error.message);
      },
    });
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isPending}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Выгрузить все в PDF
    </Button>
  );
};