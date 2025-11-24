import LabelItem from './Label'

function LabelList({ labels, active, onFilter, onEdit, onRemove }) {

    return (
        <ul className="nav-list labels">
            {labels.map(label => label &&
                <LabelItem key={label} label={label}
                    active={active} onFilter={onFilter}
                    onEdit={onEdit} onRemove={onRemove}
                />
            )} {/*memo*/}
        </ul>
    );
} export default LabelList;