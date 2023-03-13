import type { ManifestError } from './error';
import type { FormatVersion, Manifest } from './types';

export class ManifestBuilder {
	public format_version: FormatVersion = 1;

	public constructor(obj: Manifest | string) {
		if (typeof obj === 'object') this._hydrateFromRaw(obj);
		else {
			const unknownObject = JSON.parse(obj);
			const errors = ManifestBuilder.Errors(unknownObject);

			// If errors throw first one.
			if (errors[0]) throw errors[0];

			this._hydrateFromRaw(unknownObject);
		}
	}

	public static Validate(unkObj: object): boolean {
		return !ManifestBuilder.Errors(unkObj).length;
	}

	public static Errors(unkObj: object): ManifestError[] {
		// TODO - implement validator logic
		void unkObj;
		return [];
	}

	public setFormatVersion(version: FormatVersion) {
		this.format_version = version;
	}

	public toObject(): Manifest {
		return Object.fromEntries(
			Object.getOwnPropertyNames(this).map((prop) => [prop, this[prop as keyof this]]),
		) as unknown as Manifest;
	}

	private _hydrateFromRaw(obj: Manifest): void {
		// Assign manifest object to this.
		for (const [key, value] of Object.entries(obj)) {
			this[key as keyof this] = value;
		}
	}
}
