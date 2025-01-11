import { Modal, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';

interface Counter {
  id: number;
  service: string;
}

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (counterId: string) => void;
  counters: Counter[];
}

export default function CustomModal({ open, onClose, onConfirm, counters }: CustomModalProps) {
  const [counterId, setCounterId] = useState('');

  const handleSubmit = () => {
    if (counterId) {
      onConfirm(counterId);
      setCounterId('');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="bg-white p-8 rounded-lg w-[500px] shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Counter</h2>
        <Select
          fullWidth
          value={counterId}
          onChange={(e) => setCounterId(e.target.value)}
          sx={{ mb: 4 }}
          className="bg-gray-50"
        >
          {counters.map((counter) => (
            <MenuItem key={counter.id} value={counter.id}>
              Counter {counter.id} - {counter.service}
            </MenuItem>
          ))}
        </Select>
        <div className="flex justify-end gap-3">
          <Button 
            onClick={onClose}
            variant="contained"
            sx={{ bgcolor: '#FF4D4F', '&:hover': { bgcolor: '#FF7875' } }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: '#1890FF', '&:hover': { bgcolor: '#40A9FF' } }}
            disabled={!counterId}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
} 