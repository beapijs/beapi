export class ManifestError extends SyntaxError {
	public readonly code: string;

	public constructor(code: string, error: string) {
		super(error);
		this.code = code;
		Error.captureStackTrace?.(this, ManifestError);
	}

	public override get name(): string {
		return `${super.name} [${this.code}]`;
	}
}
