export default function DuplicateServiceModal({ isOpen, onClose, onMergeDuplicates, onFixDuplicates, hasDuplicate }: any) {
  return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <p>Duplicate service names are not allowed. Please choose an action:</p>
        <div className="modal-buttons">
          <button onClick={onMergeDuplicates}>Merge Duplicates</button>
          <button onClick={onFixDuplicates}>Fix Duplicates</button>
        </div>
      </div>
    </div>
  );
};
