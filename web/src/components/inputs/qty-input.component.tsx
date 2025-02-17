import {Button, ButtonGroupProps, NumberInput} from '@mantine/core';
import {IconMinus, IconPlus} from '@tabler/icons-react';

interface QtyInputProps extends ButtonGroupProps {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function QtyInput({
        min = 1,
        max = 99,
        step = 1,
        value,
        onChange,
        size = 'md',
        className,
        ...rest
    }: QtyInputProps) {

    const iconSize = size === 'lg' ? 20 : size === 'sm' ? 14 : 18;
    const elementWidth = size === 'lg' ? 70 : size === 'sm' ? 50 : 60;

    const handleValueChange = (action: 'increment' | 'decrement') => {
        const newValue =
            action === 'increment'
                ? Math.min(value + step, max)
                : Math.max(value - step, min);
        onChange(newValue);
    };

    return (
        <Button.Group className={className} {...rest}>
            <Button
                variant="filled"
                size={size}
                style={{ width: elementWidth }}
                className={value <= min ? "" : "hover:scale-110 transition-transform"}
                onClick={() => handleValueChange('decrement')}
                disabled={value <= min}
            >
                <IconMinus size={iconSize} />
            </Button>
            <NumberInput
                value={value}
                onChange={(val) => onChange(Math.min(Math.max(Number(val), min), max))}
                min={min}
                max={max}
                step={step}
                hideControls
                size={size}
                style={{ width: elementWidth, textAlign: 'center' }}
                styles={{
                    input: { textAlign: 'center', width: '100%', fontWeight: '500', border: "none", borderRadius: "0" },
                }}
            />
            <Button
                variant="filled"
                size={size}
                style={{ width: elementWidth }}
                className={value >= max ? "" : "hover:scale-110 transition-transform"}
                onClick={() => handleValueChange('increment')}
                disabled={value >= max}
            >
                <IconPlus size={iconSize} />
            </Button>
        </Button.Group>
    );
};
