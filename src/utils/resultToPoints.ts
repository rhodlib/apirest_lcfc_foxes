/**
 * Takes a map, convert map into an array to separate and compare numbers.
 * and returns points according to which is bigger.
 * @param result Map of <string, number>.
 */
export const resultToPoints = (result: Map<string, number>) => {
    const entries = Array.from(result.entries());
    const [, leicesterCity = 0] =
        entries.find(([team]) => team === 'Leicester City') ?? [];
    const [, opponent = 0] =
        entries.find(([team]) => team !== 'Leicester City') ?? [];

    return leicesterCity > opponent ? 3 : leicesterCity === opponent ? 1 : 0;
};
