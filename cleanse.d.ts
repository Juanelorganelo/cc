/**
 * An almost type-safe library declaration file.
 * @author Juan Manuel Garcia Junco Moreno
 */
type AnyRecord = Record<string | number | symbol, unknown>;

/**
 * The cleanse function will recursively remove undefined or null values
 * from an object and it's nested arrays, and will parse any numeric strings into numbers.
 * @param o The object to cleanse.
 * @return The cleansed object. This is a copy from the original object. 
 * We return a Partial<T> since some properties might be missing from T so I chose to err on the side of caution.
 */
export default function cleanse<T extends AnyRecord>(o: T): Partial<T>;
