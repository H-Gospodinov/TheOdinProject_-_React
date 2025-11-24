import { memo } from 'react'

function LabelItem({ label, active, onFilter, onEdit, onRemove }) {

    return (
        <li className="nav-item label">
            <button className="nav-link" type="button"
                onClick={() => {
                    onFilter({ name: 'label', text: label });
                    active(false); // mobile menu
            }}>{label}
            </button>
            <div className="action">
                <button className="label-btn edit-label" type="button" title="edit"
                    onClick={() => onEdit(label)}>
                </button>
                <button className="label-btn remove-label" type="button" title="remove"
                    onClick={() => onRemove(label)}>
                </button>
            </div>
        </li>
    );
} export default memo(LabelItem)