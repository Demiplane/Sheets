function groupBy<TKey, TItem>(array: TItem[], keySelector: (item: TItem) => TKey) {
  let groupArray: { key: TKey, items: TItem[] }[] = [];

  array.forEach(i => {
    let key = keySelector(i);
    let existing = groupArray.filter(g => g.key === key)[0];
    if (!existing) {
      existing = { key: key, items: [] };
      groupArray.push(existing);
    }
    existing.items.push(i);
  });

  return groupArray;
}

export default groupBy;