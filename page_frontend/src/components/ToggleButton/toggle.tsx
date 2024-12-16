import React from 'react';

interface ToggleButtonProps {
    isChecked: boolean;
    onToggle: (checked: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isChecked, onToggle }) => {
    return (
        <div className="header-row">
            <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Monthly</p>
            <label className="toggle-switch">
                <input
                    className="toggle-checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => { onToggle(e.target.checked) }}
                />
                <div className="slider"></div>
            </label>
            <div className="annually-container">
                <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Annually</p>
                <span className="discount-message">15% discount</span>
            </div>
        </div>
    );
};

export default ToggleButton;