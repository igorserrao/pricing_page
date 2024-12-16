import ToggleButton from '../ToggleButton/toggle';
import './header.css';

interface HeaderProps {
    title: string;
    subtitle: string;
    onToggle: (checked: boolean) => void;
    isChecked: boolean;
}

export function Header({ title, subtitle, onToggle, isChecked }: HeaderProps) {
    return (
        <header>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <div className="header-row">
                <ToggleButton isChecked={isChecked} onToggle={onToggle} />
            </div>
        </header>
    );
}
