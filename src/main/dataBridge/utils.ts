export async function handleFetch<T>(requestUrl: string): Promise<T> {
  try {
    const rawData = await fetch(requestUrl);

    return rawData.json();
  } catch (error) {
    console.warn('👎 Fetch failed.');

    throw new Error(`Tried fetching: "${requestUrl}".\nMore: ${error}`);
  }
}
