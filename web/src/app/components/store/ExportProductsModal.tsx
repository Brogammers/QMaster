import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useState } from 'react';

interface ExportProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportProductsModal({
  isOpen,
  onClose,
}: ExportProductsModalProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Here you would typically call your backend API to generate the export
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `products-export.${exportFormat}`;
      link.click();
      
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Export Products</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-black/70">
            Choose your preferred format to export your product data.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setExportFormat('csv')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                exportFormat === 'csv'
                  ? 'border-baby-blue bg-baby-blue/5'
                  : 'border-black/10 hover:border-baby-blue/50'
              }`}
            >
              <FileText
                className={`w-8 h-8 mx-auto mb-2 ${
                  exportFormat === 'csv' ? 'text-baby-blue' : 'text-black/50'
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  exportFormat === 'csv' ? 'text-baby-blue' : 'text-black/70'
                }`}
              >
                CSV
              </p>
            </button>

            <button
              onClick={() => setExportFormat('excel')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                exportFormat === 'excel'
                  ? 'border-baby-blue bg-baby-blue/5'
                  : 'border-black/10 hover:border-baby-blue/50'
              }`}
            >
              <FileSpreadsheet
                className={`w-8 h-8 mx-auto mb-2 ${
                  exportFormat === 'excel' ? 'text-baby-blue' : 'text-black/50'
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  exportFormat === 'excel' ? 'text-baby-blue' : 'text-black/70'
                }`}
              >
                Excel
              </p>
            </button>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-2 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="!bg-gradient-to-r !from-baby-blue !to-ocean-blue hover:!opacity-90 !text-white"
            >
              {isExporting ? (
                'Exporting...'
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 