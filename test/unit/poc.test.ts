test('poc pass Test', () => {
    const diablo = 666
    expect(diablo).toBe(666);
});

test('poc fail Test', () => {
    const diablo = 666
    const baal = 665
    expect(diablo > baal).toBe(true);
});
