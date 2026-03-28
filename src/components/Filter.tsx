type Option = {
    value: string;
    label: string;
}

type Props = {
    value: string;
    setValue: (value: string) => void;
    options: Option[]
}

export default function Filter({ value, setValue, options }: Props) {
    return (
        <select value={value} onChange={(event) => setValue(event.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}