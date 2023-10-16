export async function handleFetch<T>(requestUrl: string): Promise<T> {
  try {
    const rawData = await fetch(requestUrl);

    return rawData.json();
  } catch (error) {
    console.warn('👎 Fetch failed.');

    throw new Error(`Tried fetching: "${requestUrl}".\nMore: ${error}`);
  }
}

export function findTargetId(target: number, array: { id: number }[]) {
  let targetId = -1;

  for (let i = 0; i < array.length; i++) {
    if (target === array[i].id) {
      targetId = i;

      break;
    }
  }

  return targetId;
}
