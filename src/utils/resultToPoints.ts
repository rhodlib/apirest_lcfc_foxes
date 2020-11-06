export const resultToPoints = (result: Map<string, number>) => {
    const entries = Array.from(result.entries());
    const [, leicesterCity = 0] =
        entries.find(([team]) => team === 'Leicester City') ?? [];
    const [, opponent = 0] =
        entries.find(([team]) => team !== 'Leicester City') ?? [];

    return leicesterCity > opponent ? 3 : leicesterCity === opponent ? 1 : 0;
};
