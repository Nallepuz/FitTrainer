type Props = {
    search: string;
    setSearch: (value: string) => void;
};

export default function SearchBar({search, setSearch}: Props) {
    return (
        <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} />
    );
}