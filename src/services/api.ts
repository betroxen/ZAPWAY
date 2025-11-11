
export const fetchCasinos = async () => {
    const res = await fetch('/api/casinos');
    if (!res.ok) throw new Error('Failed to fetch casino data.');
    return await res.json();
};

export const fetchCasino = async (id: string) => {
    const res = await fetch(`/api/casinos/${id}`);
    if (!res.ok) throw new Error('Failed to fetch casino data.');
    return await res.json();
};
